---
title: Architecture
description: How a radar volume travels from NOAA's S3 bucket to pixels on your screen, module by module.
group: Contributing
order: 2
symbol: cold
---

The app is the `rustywx` crate under `app/`, built on the [ply-engine](https://github.com/TheRedDeveloper/ply-engine) graphics framework. Radar data flows in one direction, from the network to pixels:

```text
S3 archive bucket (unidata-nexrad-level2)
      │  poll every 2 min (src/data.rs, background thread + tokio runtime)
      ▼
nexrad-data / nexrad-model (raw Level II decode)
      │  ScanData::from_nexrad (src/model.rs)
      ▼
ScanData (rustywx's own thin model)
      │  mpsc channel → UI thread
      ▼
game loop (src/main.rs) + AppState (src/state.rs)
      │  quality control + scope::rasterize (src/scope.rs)
      ▼
pixel buffer → overlays (rings, spokes, cities, borders, alerts, NHC, legend)
```

## Modules

| Module | Responsibility |
| --- | --- |
| `main.rs` | App entry, async game loop, input handling and drawing each frame |
| `state.rs` | `AppState`: selected site, product and tilt, overlays, animation, and the `needs_reraster` flag |
| `data.rs` | Background worker: poll S3, download, decode, report scans and errors over a channel; owns retry and backoff |
| `model.rs` | `ScanData`, a rendering-oriented model: product → sweeps → radials → gates |
| `scope.rs` | PPI rasterizer, the clean-up pass, and overlay painting |
| `colors.rs` | NWS-style color tables for every product |
| `dealias.rs` | Velocity dealiasing (Nyquist unfold) |
| `kdp.rs` | KDP derived from ΦDP |
| `nonmet.rs` | Fuzzy multi-variable non-meteorological classifier |
| `melting_layer.rs` | Melting-layer height estimate for the optional hint |
| `geo.rs` | Range and bearing, polar-to-screen projection, and the radar site table |
| `cities.rs`, `borders.rs` | City markers and Natural Earth border lines |
| `alerts.rs`, `nhc.rs` | NWS alerts and National Hurricane Center products |
| `forecast.rs`, `location.rs`, `system_location.rs` | Forecast view, location parsing and lookup, OS location |
| `settings.rs` | Persisted settings and their defaults |
| `demo.rs` | `--demo` argument parsing and the curated scenes |
| `cache.rs`, `rle.rs` | Scan cache on ply storage, with run-length compression |
| `widgets/` | Reusable glass-panel UI widgets: dropdowns, toggles, toasts, settings, shortcuts |

## Why a separate scan model

`nexrad-model`'s `Scan`, `Sweep` and `Radial` types are built for decoding: they carry every moment together, with raw threshold and range-folding semantics baked into `MomentValue`. Rendering wants something flatter: "give me this product's sweeps, where each gate is a plain `f32` or nothing to draw". `ScanData::from_nexrad` does that conversion once, so `scope.rs` never needs to know about `MomentValue` variants or which accessor belongs to which product.

## Invariants worth knowing

These aren't enforced by types, so they are easy to break silently.

- **`None` gates are transparent, not zero.** A gate is `None` when it is below the detection threshold or range-folded. Both render as transparent unless the distinction is threaded through from `model.rs`.
- **Split cuts produce near-duplicate elevations.** `ScanData::from_sweeps` keeps the first of any two sweeps within 0.2° of each other for a product. A future VCP with legitimately close elevations may need that threshold revisited.
- **The topmost tilt is absent.** `Sweep::from_radials` in `nexrad-model` drops the final elevation group. Fix it upstream or by decoding radials directly, not locally.
- **Identifiers sort by name, and the name embeds the timestamp.** That is why `fetch_latest_scan` can take `.max()` of the file listing. Don't add separate date parsing.
- **The projection is azimuthal equidistant.** It is visually indistinguishable from a true map projection at the 230 km display range. Reassess before raising `MAX_RANGE_KM` much.
- **Retry backoff.** Zero errors means the normal 2-minute poll. Each consecutive failure doubles the delay from 30 seconds up to 600 seconds, and the next success resets it. See `retry_delay` in `src/data.rs`.

## Adding a product

1. Add a variant to `Product` in `model.rs` with a `label()`.
2. Add a field to `ScanData`, fill it in `from_sweeps`, and match it in `ScanData::sweeps()`.
3. Add a color table to `colors.rs` and wire it into the rasterizer's color lookup and the legend.
4. Add a toggle and a key binding in `main.rs`, and list the key in the shortcut overlay.
5. Add unit tests alongside the existing ones in `model.rs` and `colors.rs`. Keep legend entries sorted by threshold; the `legends_are_ascending` test checks this.

Design notes and plans live under [`docs/`](https://github.com/kerryhatcher/rustywx/tree/main/docs) in the repository.
