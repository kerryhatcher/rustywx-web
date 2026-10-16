---
title: Tilts, VCP and Nyquist
description: Elevation angles, scan strategies and the unambiguous velocity limit, and how they appear in rustywx.
group: Using rustywx
order: 3
symbol: isobar
---

## Elevation tilts

A NEXRAD radar builds a volume by spinning a full circle at one elevation angle, tilting up, and spinning again. Each angle is a **tilt** (or sweep). Low tilts such as 0.5° show what is happening near the ground close to the radar; higher tilts slice higher through the storm.

Because the beam rises as it travels and the Earth curves away beneath it, even the lowest tilt is far above the ground at long range. Keep that in mind when you look at storms near the 230 km edge of the scope.

Press <kbd>T</kbd> to step to the next tilt. After the highest available tilt it wraps back to the lowest. The status line shows how many tilts the current product has and which angle you are on.

### Things rustywx does with tilts

- **Split cuts are merged.** Many scan strategies sample the lowest angles twice in a row, once for reflectivity and once for velocity. rustywx treats two sweeps within 0.2° of each other as the same tilt for a given product, so you don't step through near-duplicates.
- **The topmost tilt is missing.** The decoding library rustywx relies on drops the final elevation of each volume. This is a known limitation, not a display bug.

## Volume Coverage Pattern

The **VCP** is the scan strategy the radar is running: which elevations it uses, in what order, and how fast. The status line shows the number and the operational mode, for example `VCP 215 — Precip`. Precipitation-mode patterns scan more tilts quickly to follow active weather; clear-air patterns scan slowly and sensitively when little is happening.

The VCP also explains why a new volume arrives every few minutes rather than continuously: that is how long the radar takes to complete one pattern.

## Nyquist velocity

A pulsed Doppler radar can only measure velocities up to a certain speed without ambiguity: the **Nyquist velocity**, shown in the status line as, for example, `Nyquist ±24.1 m/s`. It differs between tilts.

Motion faster than the Nyquist velocity **aliases** or folds: a strong outbound wind can appear as strong inbound, so a patch of bright green sits in the middle of bright red. This is especially common inside strong mesocyclones.

rustywx's **velocity dealiasing** (on by default) unfolds these values using gate-to-gate continuity along each radial and across neighboring radials, with a wind-profile fallback. It does nothing on a sweep where the Nyquist velocity is unknown. You can switch it off in [Settings](../settings/) to see the raw values. See [Quality control](../quality-control/) for the details.
