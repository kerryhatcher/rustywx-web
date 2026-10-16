---
title: Warnings and overlays
description: NWS watch and warning polygons, borders, and the other layers drawn over the radar.
group: Using rustywx
order: 4
symbol: warm
---

Overlays sit on top of the radar image. Toggle each one from the toolbar or with its key, and choose which are on at startup in [Settings](../settings/).

| Overlay | Key | Default |
| --- | --- | --- |
| Borders | <kbd>B</kbd> | on |
| NWS watches | <kbd>W</kbd> | on |
| NWS warnings | <kbd>A</kbd> | on |
| Tropical (NHC) data | <kbd>N</kbd> | on |
| Radar data | toolbar | on |

> In 0.10.2, <kbd>W</kbd> both selects Spectrum Width and toggles watches. Use the toolbar's Watches toggle if you only want one of the two.

## NWS watches and warnings

rustywx reads active alerts from the National Weather Service (`api.weather.gov`) and draws every **warning** and **watch** that comes with a polygon: tornado, severe thunderstorm, flash flood, special marine and more. Each type is drawn in a bright color close to the official NWS one, and the legend along the bottom names the types on screen.

The toolbar shows how many of each are active, for example `Watches (14)` and `Warnings (59)`.

**Double-click a polygon** to open the full alert: its headline, description and any instructions from the NWS. A single click is left free for panning, so dragging the map never pops a dialog by accident.

> Alerts are refreshed automatically, but rustywx is not an alerting system. If a warning applies to you, act on the official NWS warning and your local authorities, not on a radar app.

## Borders

State and province lines, international borders and coastlines from [Natural Earth](https://www.naturalearthdata.com/). They are downloaded on first use and drawn under the alerts.

## Tropical data

When the National Hurricane Center is tracking a storm, its track, forecast cone and points can be drawn on the map. <kbd>N</kbd> switches the whole tropical data layer on or off; the [Tropical panel](../tropical/) chooses which parts are drawn.

## Scope furniture

Range rings, cardinal spokes, city markers and site markers are part of the scope rather than overlays. Turn the rings and the sweep beam on or off in [Settings](../settings/).

## Your location

A marker for your own position can be shown on the scope, and the map can recenter on it. See [Forecast and location](../forecast/#your-location).
