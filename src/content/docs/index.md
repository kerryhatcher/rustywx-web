---
title: rustywx documentation
description: How to install rustywx, read every product it draws, tune it, and work on its code.
group: Getting started
order: 0
symbol: site
---

rustywx is a desktop radar scope. It downloads raw NEXRAD Level II volume scans from NOAA's public archive on AWS, decodes them on your computer, and draws them on a pannable, zoomable map together with National Weather Service warnings, National Hurricane Center guidance and a local forecast. It needs no account and no API key.

These pages describe **rustywx 0.10.2**.

## Start here

- [Install rustywx](install/) from a prebuilt download or with `cargo install`.
- [Your first scan](first-launch/) walks through the first minute after launch.
- [Reading the scope](the-scope/) explains the status line, rings and map controls.

## Using rustywx

- [Radar products](products/) covers all seven products and how to read each one.
- [Tilts, VCP and Nyquist](tilts/) explains elevation angles and what the status line numbers mean.
- [Warnings and overlays](overlays/) covers NWS watches and warnings, borders and your location.
- [Tropical guidance](tropical/) covers the NHC panel.
- [Forecast and location](forecast/) covers the Forecast view.
- [Demo mode](demo-mode/) replays historic storms.

## Reference

- [Keyboard shortcuts](keyboard/)
- [Settings](settings/)
- [Quality control](quality-control/)
- [Network and privacy](network/)
- [Troubleshooting](troubleshooting/)

## Working on rustywx

- [Contributing](contributing/) covers setup, tests, lints and releases.
- [Architecture](architecture/) follows the data from S3 to pixels.

> rustywx is an independent open-source project, not an official NOAA or NWS product. For life-safety decisions, follow official warnings from the National Weather Service and your local authorities.
