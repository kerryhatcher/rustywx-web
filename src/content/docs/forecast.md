---
title: Forecast and location
description: The Forecast view, city search, and how rustywx finds and uses your location.
group: Using rustywx
order: 6
symbol: high
---

Choose **Forecast** in the toolbar to switch from the radar to a local forecast. Choose **Radar** to go back.

## The Forecast view

- **City search.** Type a city name. Results come from the [Open-Meteo](https://open-meteo.com) geocoding service.
- **Current conditions.** Temperature, a short description such as "Partly cloudy", feels-like temperature, wind and humidity.
- **7-day outlook.** Each day's high, low, icon and chance of rain.
- **Hourly rain chance.** A chart of the chance of rain for the next 24 hours.

Forecast data comes from the Open-Meteo forecast API. No key or account is needed.

## Your location

Set your location in the **My Location** section of [Settings](../settings/):

- **Coords or ZIP.** Type coordinates (latitude and longitude) or a 5-digit US ZIP code. ZIP codes are looked up with `zippopotam.us`.
- **Detect.** Asks the operating system for your position. Turning on the location marker with no saved position does the same. On macOS this uses Location Services when rustywx runs as a bundled app; otherwise, and on other systems, it falls back to an approximate position from your IP address (`ipapi.co`).

Your last resolved position is saved, so rustywx doesn't need the network to remember it next time.

With a location set you can:

- show a **marker** for your position on the scope
- turn on **Center map on my location** so the scope recenters on you

rustywx only contacts the ZIP and IP lookup services when you enter a ZIP, press **Detect**, or turn on the location marker before a position has been saved. See [Network and privacy](../network/).
