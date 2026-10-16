import { geoConicConformal, geoPath, geoGraticule, geoDistance } from 'd3-geo';
import { contours } from 'd3-contour';
import { feature, mesh } from 'topojson-client';
import statesTopo from 'us-atlas/states-10m.json' with { type: 'json' };
import worldTopo from 'world-atlas/countries-50m.json' with { type: 'json' };
import sites from '../data/sites.json' with { type: 'json' };

export const VIEW_W = 1600;
export const VIEW_H = 860;
// Where the radar screenshot inset sits on the sheet, in view units.
export const INSET = { x: 1112, y: 486, w: 440, h: 329 };

type LonLat = [number, number];
type Pt = [number, number];

// Illustrative pressure field (mb). Drawn for the page, not a real analysis.
const CENTERS = [
  { lon: -96.5, lat: 41.2, amp: -15, sx: 7.5, sy: 6.0 },
  { lon: -78.5, lat: 42.6, amp: 18, sx: 10, sy: 7.5 },
  { lon: -113.5, lat: 41.5, amp: 13, sx: 6.5, sy: 7 },
  { lon: -84.0, lat: 26.0, amp: 6, sx: 9, sy: 6 },
];
const BASE_MB = 1013;

function pressure(lon: number, lat: number): number {
  let p = BASE_MB;
  for (const c of CENTERS) {
    const dx = (lon - c.lon) * Math.cos((lat * Math.PI) / 180);
    const dy = lat - c.lat;
    p += c.amp * Math.exp(-((dx * dx) / (2 * c.sx * c.sx) + (dy * dy) / (2 * c.sy * c.sy)));
  }
  return p;
}

export const COLD_FRONT: LonLat[] = [
  [-96.5, 41.2], [-97.6, 39.0], [-99.0, 36.6], [-100.8, 34.0], [-103.0, 31.6], [-105.6, 29.6],
];
export const WARM_FRONT: LonLat[] = [
  [-96.5, 41.2], [-93.5, 40.3], [-90.0, 39.6], [-86.6, 38.9], [-83.4, 37.9],
];

function frontRain(lon: number, lat: number): number {
  let v = 0;
  const along = (line: LonLat[], offLon: number, offLat: number, w: number) => {
    for (let i = 0; i < line.length - 1; i++) {
      for (let t = 0; t <= 1; t += 0.2) {
        const lo = line[i][0] + (line[i + 1][0] - line[i][0]) * t + offLon;
        const la = line[i][1] + (line[i + 1][1] - line[i][1]) * t + offLat;
        const dx = (lon - lo) * Math.cos((lat * Math.PI) / 180);
        const dy = lat - la;
        v += w * Math.exp(-(dx * dx + dy * dy) / (2 * 1.15 * 1.15));
      }
    }
  };
  along(COLD_FRONT.slice(0, 5), 1.6, -0.4, 1);
  along(WARM_FRONT, 0.2, 1.4, 0.8);
  return v;
}

// Contiguous US only: rustywx 0.10.2 ships no Alaska, Hawaii or territory sites.
const NON_CONUS = new Set(['02', '15', '60', '66', '69', '72', '78']);
const conusTopo = {
  ...(statesTopo as any),
  objects: {
    states: {
      ...(statesTopo as any).objects.states,
      geometries: (statesTopo as any).objects.states.geometries.filter((g: any) => !NON_CONUS.has(g.id)),
    },
  },
};
const states = feature(conusTopo, conusTopo.objects.states) as any;
const stateLines = mesh(conusTopo, conusTopo.objects.states, (a: any, b: any) => a !== b);
const nation = mesh(conusTopo, conusTopo.objects.states, (a: any, b: any) => a === b);
const countries = feature(worldTopo as any, (worldTopo as any).objects.countries) as any;
const NEIGHBOURS = new Set(['Canada', 'Mexico', 'Cuba', 'Bahamas', 'Guatemala', 'Belize', 'Haiti', 'Dominican Rep.', 'Jamaica', 'Honduras']);
const neighbours = {
  type: 'FeatureCollection',
  features: countries.features.filter((f: any) => NEIGHBOURS.has(f.properties.name)),
};

export const projection = geoConicConformal()
  .parallels([33, 45])
  .rotate([96, 0])
  .fitExtent([[640, 18], [1540, 650]], states);

const path = geoPath(projection);

function project(p: LonLat): Pt {
  return projection(p) as Pt;
}

function polylinePath(pts: Pt[]): string {
  return 'M' + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join('L');
}

function smoothPath(pts: Pt[]): string {
  if (pts.length < 3) return polylinePath(pts);
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    d += `Q${x0.toFixed(1)},${y0.toFixed(1)} ${((x0 + x1) / 2).toFixed(1)},${((y0 + y1) / 2).toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  return d + `L${last[0].toFixed(1)},${last[1].toFixed(1)}`;
}

function densify(pts: Pt[], step: number): { pts: Pt[]; len: number } {
  const out: Pt[] = [pts[0]];
  let len = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i];
    const [bx, by] = pts[i + 1];
    const seg = Math.hypot(bx - ax, by - ay);
    const n = Math.max(1, Math.round(seg / step));
    for (let k = 1; k <= n; k++) out.push([ax + ((bx - ax) * k) / n, ay + ((by - ay) * k) / n]);
    len += seg;
  }
  return { pts: out, len };
}

function chaikin(pts: Pt[], rounds = 2): Pt[] {
  let p = pts;
  for (let r = 0; r < rounds; r++) {
    const q: Pt[] = [p[0]];
    for (let i = 0; i < p.length - 1; i++) {
      const [ax, ay] = p[i];
      const [bx, by] = p[i + 1];
      q.push([ax * 0.75 + bx * 0.25, ay * 0.75 + by * 0.25], [ax * 0.25 + bx * 0.75, ay * 0.25 + by * 0.75]);
    }
    q.push(p[p.length - 1]);
    p = q;
  }
  return p;
}

// Front symbols: triangles (cold) or half-discs (warm) spaced along the line,
// placed on the side the front is moving toward.
function frontSymbols(line: LonLat[], kind: 'cold' | 'warm', side: 1 | -1) {
  const pts = chaikin(line.map(project), 3);
  const { pts: dense } = densify(pts, 2);
  const spacing = 34;
  const size = kind === 'cold' ? 11 : 8;
  const shapes: string[] = [];
  let acc = spacing * 0.6;
  for (let i = 1; i < dense.length; i++) {
    const [ax, ay] = dense[i - 1];
    const [bx, by] = dense[i];
    acc += Math.hypot(bx - ax, by - ay);
    if (acc < spacing) continue;
    acc = 0;
    const ang = Math.atan2(by - ay, bx - ax);
    const nx = -Math.sin(ang) * side;
    const ny = Math.cos(ang) * side;
    const tx = Math.cos(ang);
    const ty = Math.sin(ang);
    if (kind === 'cold') {
      const p1: Pt = [bx - tx * size * 0.6, by - ty * size * 0.6];
      const p2: Pt = [bx + tx * size * 0.6, by + ty * size * 0.6];
      const tip: Pt = [bx + nx * size, by + ny * size];
      shapes.push(`M${p1[0].toFixed(1)},${p1[1].toFixed(1)}L${tip[0].toFixed(1)},${tip[1].toFixed(1)}L${p2[0].toFixed(1)},${p2[1].toFixed(1)}Z`);
    } else {
      const r = size;
      const p1: Pt = [bx - tx * r, by - ty * r];
      const p2: Pt = [bx + tx * r, by + ty * r];
      const sweep = side === 1 ? 1 : 0;
      shapes.push(`M${p1[0].toFixed(1)},${p1[1].toFixed(1)}A${r},${r} 0 0 ${sweep} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}Z`);
    }
  }
  return { line: smoothPath(pts), symbols: shapes };
}

function fieldContours(fn: (lon: number, lat: number) => number, thresholds: number[], cell: number) {
  const nx = Math.ceil(VIEW_W / cell) + 1;
  const ny = Math.ceil(VIEW_H / cell) + 1;
  const values = new Float64Array(nx * ny);
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const ll = projection.invert!([i * cell, j * cell]);
      values[j * nx + i] = ll ? fn(ll[0], ll[1]) : NaN;
    }
  }
  const gen = contours().size([nx, ny]).thresholds(thresholds);
  return gen(Array.from(values)).map((c) => ({
    value: c.value,
    rings: c.coordinates.flatMap((poly) =>
      poly.map((ring) => chaikin(ring.map(([x, y]) => [x * cell, y * cell] as Pt), 2)),
    ),
  }));
}

function ringPath(ring: Pt[]): string {
  return 'M' + ring.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join('L') + 'Z';
}

function isobarLabel(ring: Pt[], value: number) {
  // Label each long isobar once, at the point nearest the left edge of the
  // map so labels stack readably like a printed sheet.
  if (ring.length < 40) return null;
  let best = ring[0];
  for (const p of ring) {
    if (p[0] > 700 && p[0] < 1540 && p[1] > 40 && p[1] < 700 && (best[0] <= 700 || p[1] < best[1])) best = p;
  }
  if (best[0] <= 700) return null;
  return { x: best[0], y: best[1], text: String(value) };
}

export function buildAnalysis() {
  const isobars = fieldContours(pressure, [1000, 1004, 1008, 1012, 1016, 1020, 1024, 1028], 10).map((c) => ({
    value: c.value,
    d: c.rings.map(ringPath).join(''),
    labels: c.rings.map((r) => isobarLabel(r, c.value)).filter(Boolean) as { x: number; y: number; text: string }[],
  }));

  const rain = fieldContours(frontRain, [1.2], 8).flatMap((c) => c.rings.map(ringPath)).join('');

  const centers = CENTERS.slice(0, 3).map((c) => {
    const [x, y] = project([c.lon, c.lat]);
    return { x, y, kind: c.amp < 0 ? 'L' : 'H', mb: Math.round(pressure(c.lon, c.lat)) };
  });

  const graticule = geoGraticule().step([5, 5]).extent([[-140, 15], [-50, 60]]);
  const gratLabels: { x: number; y: number; text: string; axis: 'lat' | 'lon' }[] = [];
  for (let lon = -120; lon <= -70; lon += 10) {
    const p = project([lon, 24.2]);
    if (p[0] > 660 && p[0] < 1080) gratLabels.push({ x: p[0], y: p[1], text: `${-lon}°W`, axis: 'lon' });
  }

  const siteList = (sites as { id: string; name: string; lat: number; lon: number }[]).map((s) => {
    const [x, y] = project([s.lon, s.lat]);
    // Pixels per km at this site, measured by projecting a point 100 km north.
    const north = project([s.lon, s.lat + 100 / 111.2]);
    const pxPerKm = Math.hypot(north[0] - x, north[1] - y) / (geoDistance([s.lon, s.lat], [s.lon, s.lat + 100 / 111.2]) * 6371);
    return { ...s, x: +x.toFixed(1), y: +y.toFixed(1), k: +pxPerKm.toFixed(4) };
  });

  return {
    water: `M0,0H${VIEW_W}V${VIEW_H}H0Z`,
    neighbours: path(neighbours as any) ?? '',
    states: path(states) ?? '',
    stateLines: path(stateLines) ?? '',
    nation: path(nation) ?? '',
    graticule: path(graticule()) ?? '',
    gratLabels,
    isobars,
    rain,
    cold: frontSymbols(COLD_FRONT, 'cold', 1),
    warm: frontSymbols(WARM_FRONT, 'warm', 1),
    centers,
    sites: siteList,
  };
}
