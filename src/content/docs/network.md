---
title: Network and privacy
description: Every service rustywx contacts, when, and why. No account, no key, no telemetry.
group: Reference
order: 4
symbol: cold
---

rustywx has no server of its own and sends no telemetry. Everything it shows comes directly from public data services. This is the complete list in 0.10.2.

## Always used

| Service | Host | For |
| --- | --- | --- |
| NOAA / Unidata Level II archive | the `unidata-nexrad-level2` bucket on AWS S3 | Radar volume scans |
| National Weather Service | `api.weather.gov` | Active watches and warnings |
| National Hurricane Center | `nhc.noaa.gov`, `mapservices.weather.noaa.gov` | Storm list, tropical map layers, graphics and advisories |
| Natural Earth | `raw.githubusercontent.com` (nvkelso/natural-earth-vector) | Border and coastline lines, on first use |

## Used when you open the Forecast view

| Service | Host | For |
| --- | --- | --- |
| Open-Meteo | `api.open-meteo.com` | Forecast data |
| Open-Meteo geocoding | `geocoding-api.open-meteo.com` | City search |

## Used only when you set your location

| Service | Host | For |
| --- | --- | --- |
| Zippopotam.us | `api.zippopotam.us` | Looking up a US ZIP code you typed |
| ipapi.co | `ipapi.co` | Approximate position from your IP address, when you press **Detect** or turn on the location marker with no saved position, and the system can't provide one |

## What stays on your machine

Decoded scans are cached locally, along with your settings and your last resolved location. Nothing is uploaded anywhere.

## Firewalls and proxies

If you are behind a corporate proxy or firewall, the hosts above need to be reachable over HTTPS. A failed radar fetch is retried automatically with backoff; see [Troubleshooting](../troubleshooting/).
