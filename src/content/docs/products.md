---
title: Radar products
description: All seven products rustywx draws, the key for each, its color scale, and how to read it.
group: Using rustywx
order: 2
symbol: rain
---

A NEXRAD volume carries several **moments**: different measurements taken from the same pulses. rustywx draws three classic products and four dual-polarization products. Switch with the product toggles in the Radar panel or with a single key.

| Key | Product | Unit | Scale in rustywx |
| --- | --- | --- | --- |
| <kbd>R</kbd> | Reflectivity | dBZ | 5 to 75 |
| <kbd>V</kbd> | Velocity | m/s | −64 to +40 |
| <kbd>W</kbd> | Spectrum Width | m/s | 0 to 15 |
| <kbd>Z</kbd> | Differential Reflectivity (ZDR) | dB | −4 to +6 |
| <kbd>C</kbd> | Correlation Coefficient (CC) | none | 0.20 to 1.05 |
| <kbd>P</kbd> | Differential Phase (ΦDP) | degrees | 0 to 360 |
| <kbd>K</kbd> | Specific Differential Phase (KDP) | °/km | −1 to +8 |

Gates with no usable return are drawn transparent. Range-folded gates, where the radar can't tell which pulse an echo belongs to, are drawn in a distinct purple, following the NWS convention.

## Reflectivity

How much energy came back to the radar, which tells you how intense the precipitation is. rustywx uses the NWS stepped color table in 5 dBZ bands.

- **Blues and greens, 5 to 30 dBZ:** light to moderate rain, or snow.
- **Yellows and oranges, 35 to 45 dBZ:** moderate to heavy rain.
- **Reds, 50 to 60 dBZ:** very heavy rain.
- **Magenta, purple and white, above 60 dBZ:** usually hail or extremely heavy rain.

By default, rustywx hides very weak returns and echoes that are clearly not weather. See [Quality control](../quality-control/).

## Velocity

Radial velocity: how fast targets move straight toward or away from the radar.

- **Green** is motion toward the radar (inbound).
- **Red** is motion away from the radar (outbound).
- A tight pair of strong green and strong red side by side, a **couplet**, is the signature of rotation.

Velocity can only be measured unambiguously up to the **Nyquist velocity** shown in the status line. Faster motion "folds" and appears as the wrong color. rustywx unfolds it with velocity dealiasing, on by default. See [Tilts, VCP and Nyquist](../tilts/).

## Spectrum Width

How spread out the velocities are within each sample volume, the standard deviation of the velocity spectrum. Low values are smooth, uniform flow. High values flag turbulence, wind shear or mixed targets. Rapidly increasing spectrum width often appears before rotation is obvious in velocity.

## Differential Reflectivity (ZDR)

The ratio of horizontally to vertically polarized reflectivity, which tells you about target shape.

- **Positive values** (greens to reds): large, flattened raindrops, and melting particles.
- **Near zero** (gray): round or tumbling targets such as small drops and hail.
- **Negative values** (blues): vertically oriented targets.

## Correlation Coefficient (CC)

How similar the horizontal and vertical pulses are from one sample to the next. Most of the color range is spent between 0.80 and 1.00, where the useful detail is.

- **Above about 0.97:** uniform weather such as rain or snow.
- **0.80 to 0.97:** mixed precipitation, hail, or the melting layer.
- **Below about 0.80:** non-weather targets such as birds, insects, chaff, ground clutter, or debris lofted by a tornado.

## Differential Phase (ΦDP)

The total phase difference between the horizontal and vertical pulses, accumulated as the beam travels through liquid water. It rises steadily along a path of heavy rain and is the raw ingredient for KDP.

## Specific Differential Phase (KDP)

How quickly ΦDP increases with range, in degrees per kilometer. It is a good indicator of heavy rain rates and is barely affected by hail. KDP is not in the Level II data: rustywx **derives it on your machine** from ΦDP. Values near zero or slightly negative are noise; rising values mean increasingly heavy rain.

## Tilts

Every product has its own set of elevation angles. Press <kbd>T</kbd> to move to the next tilt. The tilt count and angle are in the status line; see [Tilts, VCP and Nyquist](../tilts/).
