---
title: Your first scan
description: What happens in the first minute after you launch rustywx, and the three things to try first.
group: Getting started
order: 2
symbol: cold
---

Run `rustywx` (or open the downloaded executable). There is nothing to configure first.

## What happens on launch

1. **A site is chosen.** On the very first launch rustywx opens on **KFFC**, the Atlanta, Georgia radar. After that it opens on whichever site you last picked, or the default site you set in [Settings](../settings/).
2. **The newest volume is fetched.** A background worker lists the site's recent files in NOAA's public Level II archive, downloads the newest volume scan and decodes it on your machine. The first scan can take a few seconds.
3. **Overlays arrive.** State and province lines, country borders and coastlines, active NWS watches and warnings, and any National Hurricane Center storms load in parallel and appear as they come in.
4. **Polling begins.** Every 2 minutes rustywx checks for a newer volume and animates to it. If a fetch fails, it retries with a growing delay, starting at 30 seconds and capped at 10 minutes, then returns to the normal interval after the next success.

## Three things to try

- **Change site.** Press <kbd>←</kbd> or <kbd>→</kbd> to step through all 142 sites, pick one in the Radar panel, or double-click a site marker on the map.
- **Change product.** Press <kbd>R</kbd> for Reflectivity, <kbd>V</kbd> for Velocity, or any of the other [product keys](../products/).
- **Step through tilts.** Press <kbd>T</kbd> to move to the next elevation angle and look higher into the storm.

Press <kbd>?</kbd> at any time for the full shortcut overlay.

## Nothing happening outside?

If the sky is quiet, try [demo mode](../demo-mode/) to load a famous historical storm:

```sh
rustywx --demo moore2013
```

## Where to go next

Read [Reading the scope](../the-scope/) to learn what every number on screen means.
