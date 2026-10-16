---
name: rustywx
description: The radar app's site and docs, printed as the day's surface-analysis weather map.
colors:
  cold-front: "#1f52d6"
  cold-front-deep: "#173e9f"
  warm-front: "#ee5a16"
  warm-ink: "#b13d0b"
  rain: "#3e9b4f"
  rain-ink: "#23703a"
  paper: "#f2f5f3"
  land: "#f8faf8"
  water: "#e2e9e9"
  ink: "#16202b"
  ink-2: "#45515d"
  ink-3: "#5a6570"
  rule: "rgb(22 32 43 / 0.2)"
  rule-strong: "rgb(22 32 43 / 0.55)"
  scope: "#0e1420"
typography:
  display:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(2rem, 1rem + 2.4vw, 3.6rem)"
    fontWeight: 850
    lineHeight: 1.02
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 125"
  display-page:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 3.4vw, 4.5rem)"
    fontWeight: 850
    lineHeight: 1.08
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2.2vw, 3rem)"
    fontWeight: 850
    lineHeight: 1.08
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.2rem + 1vw, 1.875rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 112"
  title-sm:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.08
    fontVariation: "'wdth' 105"
  lede:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 650
    letterSpacing: "0.14em"
    fontVariation: "'wdth' 72"
  label-nav:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 650
    letterSpacing: "0.12em"
    fontVariation: "'wdth' 80"
  value:
    fontFamily: "'Overpass Mono Variable', 'Overpass Mono', ui-monospace, monospace"
    fontSize: "0.86em"
    letterSpacing: "0"
    fontFeature: "tnum"
rounded:
  none: "0"
  hairline: "2px"
  key: "3px"
  full: "50%"
spacing:
  gutter: "clamp(16px, 3.2vw, 48px)"
  measure: "68ch"
  band: "clamp(72px, 9vw, 136px)"
  section-head: "28px"
  column-gap: "clamp(32px, 5vw, 80px)"
  ledger-row: "7px 0"
components:
  install-download:
    backgroundColor: "{colors.cold-front}"
    textColor: "#ffffff"
    rounded: "{rounded.none}"
    padding: "10px 16px"
    height: "64px"
  install-download-hover:
    backgroundColor: "{colors.cold-front-deep}"
  install-command:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.value}"
    rounded: "{rounded.none}"
    padding: "0 10px 0 12px"
    height: "64px"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.label-nav}"
    padding: "6px 0"
  nav-link-active:
    textColor: "{colors.cold-front-deep}"
  step-button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    size: "34px"
  step-button-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  kbd:
    backgroundColor: "{colors.land}"
    textColor: "{colors.ink}"
    rounded: "{rounded.key}"
    padding: "0.05em 0.4em"
  code-inline:
    backgroundColor: "{colors.land}"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "0.08em 0.32em"
  rail-link-current:
    backgroundColor: "{colors.land}"
    textColor: "{colors.ink}"
    padding: "5px 8px 5px 4px"
---

# Design System: rustywx

## Overview

**Creative North Star: "The Daily Weather Map"**

The site is a printed surface-analysis map. The landing page is one continuous sheet: a drafted US analysis fills the first viewport, a neat line with lat/lon graticule margins runs down both edges, and each band below is marked by one map symbol rather than an icon or a label. The docs are the back of the sheet. The masthead, the neat lines and the symbols carry over, but nothing moves behind the reading column. Real app screenshots go in as pasted insets, framed the way a chart frames an inset map, and are annotated with leader lines and numbered markers instead of being placed inside device mockups.

The page is dense the way a chart is dense. Values sit right-aligned on ruled lines, labels are condensed spaced caps, and depth comes from rules, never from light. Color is forecast notation, not decoration: cold-front blue, warm-front orange and rain green appear where a meteorologist would use them, plus the two install actions. Product truth (audience, what the app does, proof) lives in PRODUCT.md. This file is visual only.

Motion happens once. On first load the analysis draws itself: isobars and fronts stroke in, front symbols stamp along their lines, and H/L stamp last. After that, the only motion is the range rings moving when the visitor walks the site list. All motion is off under reduced motion, and content is visible without JS.

**Key Characteristics:**
- Cool newsprint ground with near-black isobar ink; color only as weather notation and action.
- Archivo on its width axis: expanded heavy gothic for titles and pressure centres, condensed spaced caps for lettering.
- Overpass Mono only for values, coordinates, versions, keys and code.
- Neat-line frames (1px ink, 4px paper, 1px ink) instead of cards; double rules instead of shadows.
- One map symbol anchors each section and each docs page.
- Values right-aligned in ruled ledgers.
- Screenshots annotated with leader lines and numbered markers.

## Colors

The palette is the weather map's: a pale cool sheet, one ink, and three notation colors, each with a darker ink-strength partner for text.

### Primary
- **Cold-Front Cobalt** (cold-front): the logo's blue and the cold front. Used for the download key, link hover, focus rings, nav underline, H pressure centres, cold-front lines and triangles, the data-path front line, `accent-color` and selection tint.
- **Deep Cobalt** (cold-front-deep): link text at rest, active nav text, download-key hover, and code keywords/functions. This is the blue that carries body-size text (8.6:1 on paper).

### Secondary
- **Warm-Front Orange** (warm-front): the logo's orange and the warm front. A fill color: warm-front semicircles, L pressure centres, the selected NEXRAD site dot, the demo rule (3px top border), the "wx" in the wordmark, the text caret.
- **Warm Ink** (warm-ink): orange as text. Site IDs in the site readout, annotation note numbers, the no-account claim line, code constants (5.4:1 on paper).

### Tertiary
- **Rain Green** (rain): precipitation hatching (45-degree line pattern) on the map and in the rain symbol. Not used for text.
- **Rain Ink** (rain-ink): green as text. QC "on" states and code strings.

### Neutral
- **Newsprint** (paper): the sheet itself. Page background, inner gap of every neat-line frame, masthead.
- **Land** (land): land masses on the analysis, and raised-in-place surfaces drawn on the sheet: site readout, kbd keys, inline code, code blocks on the landing page, product key tiles, current docs rail item.
- **Water** (water): ocean on the analysis map, behind the hero sheet.
- **Isobar Ink** (ink): text, every structural rule (1px and 2px), frame lines, the cargo command key.
- **Ink 2** (ink-2): secondary text. Ledes, captions, notes, table heads, rail group labels.
- **Ink 3** (ink-3): list markers and code comments only. On paper only, never on ink.
- **Rule** (rule): hairlines between ledger rows, table rows, toc and footer dividers.
- **Rule Strong** (rule-strong): graticule ticks, the map-key rule, the docs rail edge, outer lines of secondary frames, kbd borders.
- **Scope** (scope): the dark of the app itself. Only appears behind screenshots inside their frames.

### Named Rules
**The Notation Rule.** Blue, orange and green mean cold front, warm front and precipitation. Outside of the two install keys, links and focus, they show up only where a weather map would put them. They are never used as decorative fills, tints or backgrounds.

**The Ink-Strength Rule.** Warm-front orange and rain green are fill colors. Text in those hues uses warm-ink or rain-ink. Warm-front orange counts as text only at display size (the wordmark, the H/L letters).

**The Sheet Is Never Dark Rule.** The page ground is always paper. Scope dark belongs to the app and only appears inside a framed screenshot. The cargo key is the one solid ink surface.

## Typography

**Display Font:** Archivo Variable (with Archivo, system-ui, sans-serif), self-hosted via @fontsource-variable, on the wdth 62 to 125 axis
**Body Font:** Archivo Variable at wdth 100
**Label/Mono Font:** Overpass Mono Variable (with Overpass Mono, ui-monospace, monospace), self-hosted

**Character:** One family pushed to both ends of its width axis. The expanded 125 heavy gothic is the chart's title block and the pressure-centre letters. The condensed 72 to 80 spaced caps are the place-name lettering. Mono is the plotting hand for numbers.

### Hierarchy
- **Display** (850, wdth 125, clamp 2rem to 3.6rem, 1.02): the landing h1. Sized to fit in the open Pacific on the hero map.
- **Display, page** (850, wdth 125, clamp 2.5rem to 4.5rem, 1.08): docs page titles in the opener.
- **Headline** (850, wdth 125, clamp 2rem to 3rem, 1.08, -0.025em, max 22ch): landing section h2, always paired with its large map symbol.
- **Title** (800, wdth 112, clamp 1.5rem to 1.875rem): docs prose h2. **Title, small** (800, wdth 105 to 110, 1.25rem): h3 in data-path stations and docs prose.
- **Lede** (400, 1.25rem, 1.5, ink-2, 60 to 62ch): section intros and docs page descriptions. The hero lede is a little smaller (clamp 1rem to 1.125rem, 46ch).
- **Body** (400, wdth 100, 1.0625rem, 1.55): reading text. Docs prose holds to a 68ch measure.
- **Label / lettering** (650, wdth 72, 0.75rem, 0.14em, uppercase): rail group names, "Key to the sheet", "On this page", Previous/Next, the edition line, "Valid". Nav and table heads use the same voice at wdth 80, 0.12em (0.8rem nav, 0.72rem table heads).
- **Value** (Overpass Mono, tabular numerals, 0.86em): coordinates, site IDs, versions, sizes, valid time, ledger values, code, kbd.

### Named Rules
**The Three Hands Rule.** Gothic for titles and H/L, lettering for labels, mono for values. Mono never sets a sentence, and lettering never sets one longer than a label.

**The Width Axis Rule.** Hierarchy comes from the wdth axis as much as from size. Titles go wider (105 to 125) and labels go narrower (72 to 80). Body stays at 100.

## Layout

The landing page is a single sheet. The hero frame keeps the map's 1600:860 aspect, between 600px tall and the viewport height minus the masthead, over water. The title, lede and install key sit in a left column (37% wide, 40% below 1340px) set into the Pacific. The screenshot inset is placed in map coordinates off the Southeast coast. The site readout sits in the top right (bottom centre between 900 and 1180px), and the map key runs along the bottom left. Below the hero, the sheet body has 30px graticule margins on both sides: minor ticks every 40px, major ticks every 200px, and mono coordinate labels set vertically. Content bands are capped at 1360px, padded by the gutter (clamp 16 to 48px), and separated by band spacing (clamp 72 to 136px). Two-column bands use fractional splits (5fr/6fr, 6fr/5fr) with clamp(32px, 5vw, 80px) gaps. Each band opens with a section head: a large symbol beside the h2, 18px apart, with 28px below.

The docs use a two-column grid capped at 1320px: a sticky 230 to 280px rail (the map key) with a rule-strong right edge, and a reading column capped at 760px with prose at 68ch.

Below 900px everything collapses to one column. The hero map moves below the pitch as its own banded figure, followed by the site readout, inset and key. The graticule margins shrink to 10px tick strips without labels. The data-path front line turns vertical. The docs rail becomes a disclosure. Smaller breakpoints at 860px (valid time hides), 560px (secondary nav hides) and 520px (install keys stack).

**The Graticule Rule.** Everything on the landing page sits inside the neat line. New bands go inside the margins and never break the frame full-bleed.

**The One Symbol Rule.** Each section and each docs page is anchored by exactly one map symbol (cold, warm, isobar, rain, site, cyclone, H, L). No section gets a second anchor, an icon or a label above its heading.

## Elevation & Depth

The system is flat print. Depth is drawn, not lit. Separation comes from rule weight (1px rule, 1px rule-strong, 2px ink) and from double rules built with zero-blur spread shadows: an ink line, a paper gap, a second ink line. The masthead and colophon end in a 2px ink rule plus a 1px ink rule 2px below it. Land-colored surfaces lift off the sheet by tone alone.

### Shadow Vocabulary
- **Neat line** (`box-shadow: 0 0 0 4px var(--paper), 0 0 0 5px var(--ink)` on a 1px ink border): screenshot frames and crop windows.
- **Secondary neat line** (`box-shadow: 0 0 0 3px var(--land|--paper), 0 0 0 4px var(--rule-strong)` on a 1px ink border): the site readout and docs code blocks.
- **Double rule** (`box-shadow: 0 3px 0 -2px var(--paper), 0 4px 0 -2px var(--ink)` under a 2px ink border): masthead foot. The colophon uses the inset mirror of it at its head.
- **Margin offset** (`box-shadow: 3px 0 0 var(--paper), 4px 0 0 var(--rule-strong)`): the inner line of the graticule margins.

### Named Rules
**The Drawn-Depth Rule.** Shadows here are lines. Every structural box-shadow has zero blur and is built from paper and ink. New surfaces get a rule or a neat line, never a soft lift.

## Shapes

Square by default. Frames, keys, buttons, tables, rails and code blocks all have 0 radius. Curves are reserved for things that are round on a weather map or a keyboard: NEXRAD site dots and numbered markers (full circle), the rain-hatch capsule, kbd keys (3px with a 2px bottom border, like a keycap), and hairline rounding on inline code and focus rings (2px). Product key tiles use the same keycap form at larger size (2px ink border, 4px bottom border). Lines have weights that mean something: 1px for hairlines, 2px for section and table heads, 3px for the front lines inside content.

## Components

### Buttons
Two install actions with equal weight, side by side, each 64px tall and square-cornered with a 2px ink border.
- **Shape:** square (0), 2px ink border, 64px minimum height.
- **Primary (download key):** solid cold-front cobalt with white text. Label set at 800, wdth 110, 1.0625rem, with a mono arch/size line under it at 86% white. The label is OS-detected. Hover goes to deep cobalt over 160ms ease-out.
- **Command key (cargo):** solid ink with the paper-colored command in mono, plus a 44px copy button behind a translucent paper divider. The button hovers to a 12% paper wash, and the copied state swaps its icon for an inline SVG check.
- **Step buttons (site readout):** 34px paper squares with a 1px ink border and inline SVG chevrons. Hover inverts them to ink.
- **Focus:** 2px cobalt outline, 3px offset, everywhere.
- Below each key sits a 0.8125rem ink-2 line: a link or a plain note.

### Cards / Containers
There are no cards. Containment comes from three devices:
- **Framed inset:** 1px ink border, 4px paper gap, 1px ink outer line, scope background, caption below in 0.75 to 0.8125rem ink-2. Used for every screenshot.
- **Ruled ledger:** a 2px ink top rule, then rows split by 1px rule hairlines. The label sits left and the value sits right-aligned in mono ink-2, 7px row padding, 0.875rem. Capability lines, QC states, source links and station facts all use it. Tables follow the same logic: 2px ink head rule, lettering column heads, numeric columns right-aligned.
- **Readout panel:** a land surface with a 1px ink border and a secondary neat line. The site readout is the only one.

### Inputs / Fields
None shipped.

### Navigation
- **Masthead:** sticky, 56px, paper, ending in the double rule. Wordmark at 850, wdth 112, "rusty" in cobalt and "wx" in warm orange. Nav links set in label-nav caps in ink, with a 2px underline slot that turns cobalt on hover and when current (text goes deep cobalt). A valid-time stamp sits at the right, behind a rule hairline: lettering "Valid" plus a live mono UTC time.
- **Docs rail (map key):** "Key to the sheet" lettering over a 2px ink rule. Group names in lettering ink-2. Each entry is a 28px small map symbol plus its title. Hover gives a land wash and deep-cobalt text. The current page gets a land wash, weight 700 and a 1px inset ink frame. On mobile it becomes a disclosure whose summary shows the current page.
- **Pager:** 2px ink rule, with lettering "Previous" / "Next" over bold link titles. Next is right-aligned.

### Map Symbols
The world's icon set, drawn as inline SVG in two sizes (28x14 and 56x40): cold front (cobalt line with triangles), warm front (orange line with semicircles), isobar (ink curve), rain (green 45-degree hatch), NEXRAD site (land dot with ink ring, filled orange when selected, dashed warm-ink range ring at large size), cyclone (cobalt arms with an orange eye), and H / L (wdth 125, 900 weight, cobalt H and orange L). Large symbols anchor sections, and small ones key the map and the docs rail.

### Annotated Plate
A screenshot in a framed inset takes 68% of the figure. Numbered markers sit on regions of the image: 22px warm-ink (#b13d0b) discs with a 2px ink ring and white mono 12px numerals (warm-front orange fails AA behind small white text). Thin 1px ink polyline leaders run from each marker to a note column that starts at 72%. Each note gets a warm-ink mono number, a bold ink title and ink-2 text at 0.875rem. Below 900px the leaders drop out, the image goes full width, and the notes stack as a list under it (markers 18px).

### Analysis Map
A drawn analysis generated at build time: graticule, state lines, isobars with mono pressure values, fronts, rain hatching, H/L, and all real NEXRAD sites as small dots. The selected site gets 115 and 230 km range rings. The range rings and readout move with a 380ms cubic-bezier(0.16, 1, 0.3, 1) transform. On first load it draws once (see Overview). Any synthetic analysis is labeled illustrative in the map key.

## Do's and Don'ts

### Do:
- **Do** frame every screenshot as an inset: 1px ink border, 4px paper gap, 1px ink outer line, on scope.
- **Do** open each new section or docs page with one map symbol beside the heading.
- **Do** set every value, coordinate, version, size and key in Overpass Mono with tabular numerals, right-aligned on a ruled line.
- **Do** build hierarchy on Archivo's width axis: wdth 125 at 850 for titles, wdth 72 to 80 spaced caps for labels.
- **Do** separate with rules (1px rule, 2px ink heads) and double rules made from zero-blur spread shadows.
- **Do** use warm-ink and rain-ink for text in those hues; deep cobalt for link text.
- **Do** pin claims about a screenshot to the region they describe with a numbered marker and a leader line.
- **Do** give the two install actions equal weight: solid cobalt and solid ink, 64px, square.

### Don't:
- **Don't** build rounded or shadowed cards; contain with a neat-line frame, a ledger rule, or nothing.
- **Don't** add blurred drop shadows to new surfaces; depth is drawn in ink and paper.
- **Don't** use blue, orange or green as decorative fills, tints or color gradients; they are front and precipitation notation.
- **Don't** set body-size text in warm-front orange or rain green.
- **Don't** make the sheet dark or put the hero over a dark screenshot; scope dark lives only inside frames.
- **Don't** use mono for sentences or prose.
- **Don't** use glyph or stock icons where a map symbol or an inline-SVG mark belongs.
- **Don't** put small caps labels above section headings; the map symbol is the anchor.
