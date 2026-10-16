---
title: Tropical guidance
description: The National Hurricane Center panel, its map layers, graphics products and advisory text.
group: Using rustywx
order: 5
symbol: cyclone
---

Open the **Tropical** panel from the toolbar. It lists every active storm the National Hurricane Center is tracking and puts its guidance on the same map as your radar.

## Storm details

Choose a storm from the dropdown at the top of the panel. rustywx shows:

- name and classification, such as `Bertha — TS` for a tropical storm
- intensity in knots and central pressure in millibars
- position, movement direction and speed
- the advisory number and when it was issued

A link opens the storm's NHC graphics page in your browser.

## Map overlays

Each layer can be switched on or off independently:

| Layer | Shows |
| --- | --- |
| Forecast Cone | The probable path of the storm's center |
| Track | The forecast track line |
| Points | Forecast positions with their times |
| Watches/Warnings | Coastal tropical storm and hurricane watches and warnings |
| Wind Probabilities | Chance of tropical-storm-force winds |
| Earliest Arrival (34kt) | The earliest reasonable arrival of 34 kt winds |
| Most Likely Arrival (34kt) | The most likely arrival of 34 kt winds |

Press <kbd>N</kbd> to hide or show all tropical data at once.

## Graphics products

The panel shows the NHC's own graphics for the selected storm, with an option to open each in your browser:

- 5-Day Cone
- Key Messages
- Wind Field
- Wind Probs 34kt
- Peak Surge

## Public advisory

The full text of the latest public advisory is shown at the bottom of the panel, exactly as the NHC issued it.

## Refresh

Tropical data refreshes every 300 seconds (5 minutes), separately from the radar. The current interval is shown at the bottom of the [Settings](../settings/) panel. Turn on "Show tropical panel on startup" there if you want the panel open whenever rustywx starts.
