---
title: Troubleshooting
description: No window, no data, Wayland and X11 problems, and where to report what you find.
group: Reference
order: 5
symbol: low
---

## The window doesn't open

rustywx renders on the GPU, so it needs a working graphics stack.

- **Headless machines and remote shells** have no display; rustywx can't open a window there.
- **Linux** needs a Vulkan-capable environment. Make sure your GPU drivers are installed and that other Vulkan programs run.
- **Wayland or X11?** rustywx prefers native Wayland and falls back to X11 automatically. To find out which backend is failing, force one:

  ```sh
  RUSTYWX_LINUX_BACKEND=wayland rustywx
  RUSTYWX_LINUX_BACKEND=x11 rustywx
  ```

## The radar never loads

- Check that the [hosts rustywx uses](../network/) are reachable, especially the AWS S3 archive.
- A failed fetch is retried automatically: after 30 seconds, then with the delay doubling up to 10 minutes. The display recovers on the next successful fetch, so a short outage needs no action.
- Some sites go offline for maintenance. Press <kbd>→</kbd> to try a neighboring site.

## The image looks wrong

- **Speckle or rings around the radar** are often clutter. Try the Aggressive TDBZ kernel, or turn on the fuzzy non-met classifier in [Settings](../settings/).
- **Weak rain is missing at the edges of storms.** The clutter filters may be removing it. Try the Sensitive TDBZ kernel or lower the noise floor.
- **Velocity has bright patches of the wrong color** inside strong winds. That is aliasing; check that Velocity dealias is on. See [Tilts, VCP and Nyquist](../tilts/#nyquist-velocity).
- **The highest tilt is missing.** That is a known limitation of the decoding library.

## It runs slowly from source

Run release builds: `just run` or `cargo run --release`. Debug builds are much slower at rasterizing each sweep.

## Location detection gives the wrong place

Without system location services, **Detect** falls back to an IP-based estimate, which can be off by many miles. Type coordinates or a ZIP code instead. See [Forecast and location](../forecast/#your-location).

## Reporting a problem

[Open an issue on GitHub](https://github.com/kerryhatcher/rustywx/issues) with your operating system, how you installed rustywx, the version, and what you saw. For questions and ideas, use [Discussions](https://github.com/kerryhatcher/rustywx/discussions). Report security issues privately as described in the project's [security policy](https://github.com/kerryhatcher/rustywx/blob/main/SECURITY.md).
