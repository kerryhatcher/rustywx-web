---
title: Settings
description: Every option in the settings panel, its default, and what it changes.
group: Reference
order: 2
symbol: isobar
---

Open the settings panel with the **gear** button in the bottom-right corner. Close it with the close button, by clicking outside it, or with <kbd>Esc</kbd>. Changes take effect immediately and are saved automatically, so they are restored the next time rustywx starts.

## General

| Setting | Default | What it does |
| --- | --- | --- |
| Default site | KFFC | The radar rustywx opens on. Pick one from the list, or press **Use current site** to make the site you're viewing the default. |
| Show borders on startup | on | Borders overlay at launch. |
| Show watches on startup | on | NWS watch polygons at launch. |
| Show warnings on startup | on | NWS warning polygons at launch. |
| Show tropical panel on startup | off | Opens the NHC panel at launch. |
| Dyslexia-friendly font | off | Sets body and label text in OpenDyslexic. |
| Radar sweep animation | on | Draws the rotating sweep beam. |
| Animation level | Full | **Full**, **Subtle** or **None**: how smoothly the display moves from one volume to the next. |

## Radar quality control

These change what the radar image shows. Each is explained in [Quality control](../quality-control/).

| Setting | Default |
| --- | --- |
| CC-gate reflectivity, with CC threshold | on, 0.80 |
| Fuzzy non-met filter, with non-met threshold | off |
| Fill radial gaps | off |
| Multi-scale TDBZ | off |
| Sun-spike / RFI removal | off |
| Melting-layer hint | off |
| Noise-floor cut (dBZ) | on, 20 dBZ |
| Velocity dealias | on |
| Velocity SD censor, with SD threshold | on, 7.0 m/s |
| TDBZ clutter kernel | Default (9×9) |

The TDBZ clutter kernel cycles through three presets:

- **Sensitive (5×5)** removes subtle clutter but may also remove weak precipitation at storm edges.
- **Default (9×9)** is balanced and recommended for most situations.
- **Aggressive (13×13)** removes strong clutter but may over-filter weak echoes.

## My Location

| Setting | What it does |
| --- | --- |
| Coords or ZIP | Type a latitude and longitude or a US ZIP code, or press **Detect**. |
| Center map on my location | Recenters the scope on your position. |

See [Forecast and location](../forecast/#your-location) for how location is resolved.

## Refresh intervals

The bottom of the panel shows the current refresh intervals, for example `Radar poll: 120s   NHC refresh: 300s`. In 0.10.2 these are fixed at 2 minutes for radar and 5 minutes for tropical data. When a radar fetch fails, rustywx backs off on its own, from 30 seconds up to 10 minutes, and returns to the normal interval after the next success.
