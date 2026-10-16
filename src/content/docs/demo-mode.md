---
title: Demo mode
description: Load a curated historical storm, or any Level II file, instead of live data.
group: Using rustywx
order: 7
symbol: low
---

Demo mode starts rustywx on a single historical volume instead of live data. It is the quickest way to explore the display when the weather is quiet, or to show someone what a famous storm looked like on radar.

```sh
rustywx --demo moore2013     # Moore, OK EF5 tornado
rustywx --demo harvey2017    # Hurricane Harvey landfall
rustywx --demo <file>        # any local NEXRAD Level II volume
```

## Built-in scenes

| Name | Event | Site | Volume time |
| --- | --- | --- | --- |
| `moore2013` | Moore, Oklahoma EF5 tornado | KTLX, Oklahoma City | 2013-05-20 20:16 UTC |
| `harvey2017` | Hurricane Harvey landfall | KCRP, Corpus Christi | 2017-08-26 03:04 UTC |

The volume is downloaded once from the NOAA archive and cached, so later runs start immediately.

## Your own files

Pass the path to any Level II archive volume. rustywx works out the radar site from the file name, which must start with the four-letter site ID, as archive files do (for example `KTLX20130520_201643_V06.gz`). A file whose site isn't in rustywx's site list is rejected with a message.

## How demo mode behaves

- Live polling is paused while the demo scene is shown.
- The status line starts with `DEMO —`, so a screenshot can't be mistaken for live data.
- Choose any site in the Radar panel to leave the demo and return to live data.

Running `rustywx --demo` with an unknown name prints the list of available scenes.
