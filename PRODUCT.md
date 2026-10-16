# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro, static output, deployed to GitHub Pages from the `kerryhatcher/rustywx-web` repo (served at `https://kerryhatcher.github.io/rustywx-web/`, so the site lives under the `/rustywx-web` base path). Chosen by the user.

## Users

This site is the public home of **rustywx**, a desktop app (source: `../rustywx`, GitHub `kerryhatcher/rustywx`).

- **Primary: weather enthusiasts.** Hobbyists, storm chasers, Skywarn-style spotters and radar nerds who already know what reflectivity and velocity are, and who want a fast, native radar scope that reads NOAA's raw data without subscriptions, accounts or a vendor's tile server. They arrive deciding whether to install it, then come back to the docs to learn controls, settings and how to read each product.
- **Secondary: Rust and open-source developers.** Interested in how it works (local Level II decoding, GPU rendering on ply-engine, QC pipeline) and possibly contributing. They need a clear path to architecture and contributor docs, but the site does not lead with them.

## Product Purpose

rustywx streams live NEXRAD Level II Doppler volumes straight from NOAA's public `unidata-nexrad-level2` archive on AWS, decodes them locally, and renders them on a pannable, zoomable map with live NWS warning/watch polygons, National Hurricane Center tropical guidance and a local forecast. The website exists to get enthusiasts to install it, and to be the user and contributor documentation once they have.

Success: a visitor understands within one screen what rustywx is and why it differs, can copy an install command or reach a prebuilt download immediately, and can find any control, setting or product explanation in the docs.

## Positioning

A small, native, self-contained radarscope that talks directly to the same public Level II archive the professionals use and decodes the raw Doppler volumes on your machine. No AWS account, no API key, no subscription, no telemetry, no middleman tile server. Free and open source (AGPL-3.0).

## Operating Context

- Install: `cargo install rustywx` (Rust 1.85+, edition 2024), or prebuilt binaries from GitHub Releases: Linux x86-64/ARM64 (`.tar.gz` and signed AppImages with `.sha256` + zsync update metadata), macOS Apple Silicon, Windows x86-64. Intel macOS builds from source.
- Needs a working GPU/graphics stack (renders via ply-engine); headless servers will not show a window. Linux prefers native Wayland with automatic X11 fallback; `RUSTYWX_LINUX_BACKEND=wayland|x11` forces one.
- First launch opens on **KFFC (Atlanta, GA)** per the v0.10.2 code, then remembers the last site chosen (the upstream README's "opens on KJGX" is stale; the screenshots show KJGX, Robins AFB, Macon GA). Radar poll (120 s) and NHC refresh (300 s) are shown read-only in the settings panel in 0.10.2; 142 NEXRAD sites selectable, all in the contiguous US (no Alaska, Hawaii or Puerto Rico sites in 0.10.2; list extracted to `src/data/sites.json`). Polls every 2 minutes by default; retry backoff doubles from 30 s, capped at 600 s.
- Demo mode: `rustywx --demo moore2013` (Moore, OK EF5 tornado, KTLX 2013-05-20 20:16 UTC), `--demo harvey2017` (Hurricane Harvey landfall, KCRP 2017-08-26 03:04 UTC), or `--demo <file>` for any local Level II volume. Status line is prefixed `DEMO —`.
- Data sources: NOAA/Unidata Level II archive (AWS), NWS alerts, NHC tropical products, Open-Meteo forecast and geocoding, Census TIGERweb borders (cached at `~/.rustywx/state_borders.geojson`).

## Capabilities and Constraints

Shipped in 0.10.2 (current release, 2026-08-21):

- **Seven radar products:** Reflectivity (R), Velocity (V), Spectrum Width (W), and dual-pol Differential Reflectivity (Z), Correlation Coefficient (C), Differential Phase (P), Specific Differential Phase/KDP (K). The upstream README and user guide still describe only the first three.
- Tilt selector (T cycles) with live VCP and Nyquist-velocity readout; previous/next site (← / →); reset pan & zoom (0); fullscreen (F); shortcut overlay (?).
- Overlays: borders (B), NWS watches (W) and warnings (A) with live counts, tropical data (N); range rings at 10 nmi, cardinal spokes, city markers, state and province lines, country borders and coastlines (Natural Earth; no county borders in 0.10.2 despite the upstream README), user-location marker.
- NHC tropical panel: storm tracks, forecast cones, points, wind probabilities, earliest/most-likely 34 kt arrival, graphics products (5-day cone, key messages, wind field, wind probs, peak surge) and full public advisory text.
- Forecast view: city search, current conditions, 7-day outlook, hourly rain-chance chart.
- Quality control: TDBZ clutter filter (5×5 / 9×9 default / 13×13), correlation-coefficient gating (on), reflectivity noise floor (on), velocity SD censoring (on), velocity dealiasing / Nyquist unfold (on); opt-in fuzzy multi-variable non-met classifier, reflectivity radial gap-fill, multi-scale texture filter, sun-spike/RFI removal, melting-layer hint. Default philosophy: honest rendering, cosmetic fixes opt-in.
- Settings persist across restarts: default site, poll interval, NHC refresh, overlay defaults, animation level (Full / Subtle / None), sweep beam, scope rings, location, QC toggles and thresholds, OpenDyslexic font.
- Known app quirk: `W` is bound to both Spectrum Width and the watches toggle. Document as the in-app overlay shows it; do not invent a different binding.
- License: code AGPL-3.0-only; custom graphics/artwork CC BY-SA 4.0. The website repo itself is MIT.
- Contributor workflow: `just` recipes (`run`, `test`, `lint`, `ci`, `ci-full`, `setup`), `cargo test` (no network), `cargo test --test network -- --ignored` (live), release-please with Conventional Commits.

## Brand Commitments

- Name is always lowercase **rustywx**.
- Existing logo assets in `../rustywx/assets/`: `logo.svg`, `logo-mark.svg` (two-armed cyclone spiral, cyan→blue gradient, orange eye), `header.svg`, `header-dark.svg`. Wordmark renders "rusty" in blue and "wx" in orange.
- The app itself is dark, map-first, with cyan toggle accents and a monospace status line; it describes its own look as "observatory".
- Voice in existing docs: plain, technical, confident, no hype; credits its data sources and dependencies explicitly.

## Evidence on Hand

- Screenshots: `../rustywx/assets/screenshot-radar.png` (live radar over the Southeast US with NHC tropical panel open, Tropical Storm Bertha), `../rustywx/assets/screenshot-forecast.png` (forecast view; coordinates are deliberately pixelated).
- Release history from 0.7.x to 0.10.2 in `../rustywx/app/CHANGELOG.md`.
- Acknowledged upstreams: NOAA/Unidata, NWS, NHC, Open-Meteo, `nexrad` crates (`nexrad-data`, `nexrad-model`), ply-engine.
- **Absent:** no testimonials, user counts, download counts, press, benchmarks, performance numbers or pricing. Do not fabricate any of them. No hosted demo or video.

## Product Principles

1. **Straight from the source.** Every claim points back to the public data and the user's own machine; no middleman is the core promise.
2. **Honest radar.** Show what the radar saw; filtering and cosmetic repair are explained and opt-in where they change the picture.
3. **Respect the enthusiast.** Speak the vocabulary (VCP, Nyquist, dual-pol) accurately instead of dumbing it down, and explain it for those still learning.
4. **Zero friction to first scan.** One command or one download, no credentials, no config.
5. **Open by default.** Credit upstream data and code, and keep the path to source and contributing visible.

## Accessibility & Inclusion

The app ships an OpenDyslexic font option; the site should be equally considerate: WCAG 2.2 AA, full keyboard navigation, respects reduced motion, and never relies on radar color alone to convey meaning (color tables need labelled values).
