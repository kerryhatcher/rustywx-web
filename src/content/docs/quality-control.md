---
title: Quality control
description: The filters rustywx runs on raw radar data, which are on by default, and why the rest are opt-in.
group: Reference
order: 3
symbol: rain
---

Raw Level II data contains more than weather: ground clutter, wind turbines, birds and insects, interference, and gaps. rustywx cleans some of that up before drawing. Its rule is **honest rendering**: filters that remove obvious non-weather are on by default and adjustable, while anything cosmetic, or anything that could hide real weather, stays off until you turn it on.

All of these are in the [Settings](../settings/) panel.

## On by default

### Correlation-coefficient gating

Uses the dual-pol correlation coefficient to hide non-meteorological echo from **Reflectivity**. Gates with CC below the threshold (default **0.80**) are suppressed, which removes most birds, insects, chaff and ground clutter. Lower the threshold to keep more, raise it to remove more.

### Reflectivity noise floor

Drops reflectivity gates below a fixed value (default **20 dBZ**), applied together with rustywx's range-dependent floor. This removes faint noise that would otherwise speckle the display.

### TDBZ clutter filter

Removes wind-turbine and other ground clutter by measuring how "textured" the reflectivity is in a small window around each gate. Clutter is spiky; weather is smooth. The window size is the **TDBZ clutter kernel**: Sensitive 5×5, Default 9×9, or Aggressive 13×13 gates.

### Velocity dealiasing

Unfolds velocities that exceeded the Nyquist limit and wrapped around to the wrong sign. It works gate to gate along each radial, corrects for continuity across neighboring radials, and falls back to a wind-profile (VAD) estimate. It is skipped for any sweep whose Nyquist velocity is unknown. See [Tilts, VCP and Nyquist](../tilts/#nyquist-velocity).

### Velocity noise censoring

After dealiasing, gates whose local velocity spread is above a threshold (default **7.0 m/s**) are treated as noise and hidden. This cleans up dealiasing artifacts and non-weather velocity noise.

## Off by default

### Fuzzy non-met classifier

A multi-variable classifier that combines correlation coefficient, the texture of ΦDP and ZDR, and the magnitude of ZDR into one "non-meteorological" score. When it is on, it replaces the single CC threshold for Reflectivity. It is off by default because it changes the Reflectivity view everyone sees.

### Fill radial gaps

Real Level II data sometimes has thin slits where a few radials are missing. This pass cosmetically heals short runs of them. It is off because it draws data that was not measured.

### Multi-scale TDBZ

Runs the texture filter at two window sizes instead of one. It removes more clutter, and more weak weather with it.

### Sun-spike / RFI removal

Removes narrow, bright spokes that run a long way in range but are isolated in azimuth: radar pointing at the sun, or interference from another transmitter.

### Melting-layer hint

Draws a faint ring at the estimated height of the melting layer and shows that height in the status line. It is an annotation and removes nothing.

## What's never hidden

Gates the radar reported as below threshold or range-folded are always shown as such: transparent for no return, purple for range-folded. rustywx never invents a value for them.
