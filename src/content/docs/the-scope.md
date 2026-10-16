---
title: Reading the scope
description: The status line, range rings, markers and map controls on the main radar display.
group: Using rustywx
order: 1
symbol: site
---

The main view is a **Plan Position Indicator (PPI)**: one elevation angle of one radar's volume scan, drawn as seen from above, centered on the radar and laid over a geographic basemap.

## Toolbar

Across the top of the window:

- **Radar**, **Tropical** and **Forecast** switch panels and views. The Radar panel holds the site picker and the radar controls; Tropical opens the [NHC panel](../tropical/); Forecast switches to the [Forecast view](../forecast/).
- **Overlay toggles** for radar data, tropical data, borders, watches and warnings. Watches and warnings show a live count of how many are active, for example `Watches (14)` and `Warnings (59)`.
- **Location** shows or recenters on [your location](../forecast/#your-location).
- **Fullscreen** and **close** sit at the right. Press <kbd>F</kbd> to toggle fullscreen.

## Status line

The line along the bottom describes the scan you are looking at. A typical one reads:

```text
2026-07-23 01:07 UTC — KJGX — 9 tilt(s) — 0.5° — VCP 215 — Precip — Nyquist ±24.1 m/s
```

| Field | Meaning |
| --- | --- |
| `2026-07-23 01:07 UTC` | When the volume scan was collected. |
| `KJGX` | The radar site. |
| `9 tilt(s)` | How many elevation angles this product has in the volume. |
| `0.5°` | The elevation angle you are viewing. |
| `VCP 215` | The Volume Coverage Pattern, the radar's scan strategy. See [Tilts, VCP and Nyquist](../tilts/). |
| `Precip` | The operational mode: precipitation or clear air. |
| `Nyquist ±24.1 m/s` | The largest velocity this tilt can measure without folding. |

To the right, the status line also shows the current zoom and pan offset. In [demo mode](../demo-mode/) the line starts with `DEMO —`.

Along the bottom edge, a legend shows the color scale for the current product and the colors of any warning types on screen.

## Rings, spokes and markers

- **Range rings** are drawn every 10 nautical miles from the radar, so you can judge distance at a glance.
- **Cardinal spokes** mark north, south, east and west through the radar.
- **City markers** label towns for orientation.
- **Site markers** show every NEXRAD radar. Double-click one to switch to it.
- **A sweep beam** rotates around the scope. It is decoration, not data; turn it off in [Settings](../settings/) if you find it distracting.

The scope shows data out to 230 km from the radar.

## Moving around

| Action | Result |
| --- | --- |
| Drag | Pan the map |
| Scroll wheel | Zoom between 0.05× and 8× |
| <kbd>0</kbd> | Reset pan and zoom |
| Double-click a site marker | Switch to that radar |
| Double-click a warning polygon | Open the warning's full text |
| <kbd>←</kbd> / <kbd>→</kbd> | Previous or next site in the list |

## Animation

When a newer volume arrives, rustywx animates from the old image to the new one. Choose **Full**, **Subtle** or **None** under Animation level in [Settings](../settings/).
