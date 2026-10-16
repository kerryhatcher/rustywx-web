---
title: Install rustywx
description: Prebuilt downloads for macOS, Linux and Windows, the Linux AppImage, cargo install, and building from source.
group: Getting started
order: 1
symbol: site
---

Every release is published on [GitHub Releases](https://github.com/kerryhatcher/rustywx/releases) and on [crates.io](https://crates.io/crates/rustywx). Pick whichever suits you; they are the same program.

## Prebuilt downloads

Release 0.10.2 (2026-08-21) ships these builds:

| System | Architecture | File |
| --- | --- | --- |
| macOS | Apple Silicon | [`rustywx-0.10.2-aarch64-apple-darwin.tar.gz`](https://github.com/kerryhatcher/rustywx/releases/download/v0.10.2/rustywx-0.10.2-aarch64-apple-darwin.tar.gz) |
| Linux | x86-64 | [`rustywx-0.10.2-x86_64.AppImage`](https://github.com/kerryhatcher/rustywx/releases/download/v0.10.2/rustywx-0.10.2-x86_64.AppImage) or [`.tar.gz`](https://github.com/kerryhatcher/rustywx/releases/download/v0.10.2/rustywx-0.10.2-x86_64-unknown-linux-gnu.tar.gz) |
| Linux | ARM64 | [`rustywx-0.10.2-aarch64.AppImage`](https://github.com/kerryhatcher/rustywx/releases/download/v0.10.2/rustywx-0.10.2-aarch64.AppImage) or [`.tar.gz`](https://github.com/kerryhatcher/rustywx/releases/download/v0.10.2/rustywx-0.10.2-aarch64-unknown-linux-gnu.tar.gz) |
| Windows | x86-64 | [`rustywx-0.10.2-x86_64-pc-windows-msvc.zip`](https://github.com/kerryhatcher/rustywx/releases/download/v0.10.2/rustywx-0.10.2-x86_64-pc-windows-msvc.zip) |

Download, unpack and run the `rustywx` executable inside. Intel Macs have no prebuilt binary; use `cargo install` below.

## Linux AppImage

The AppImages are signed and self-contained: they bundle rustywx and its ordinary runtime libraries while still using your system's graphics drivers. Download the AppImage for your architecture and its matching `.sha256` file, then verify and run it:

```sh
sha256sum --check rustywx-0.10.2-x86_64.AppImage.sha256
chmod +x rustywx-0.10.2-x86_64.AppImage
./rustywx-0.10.2-x86_64.AppImage
```

Each AppImage also carries zsync update metadata, so an AppImage updater can fetch only the parts that changed when a newer release comes out. The `.tar.gz` archives stay available if you prefer a conventional install.

## With cargo

If you have a Rust toolchain (edition 2024, **Rust 1.85 or newer**), install from crates.io:

```sh
cargo install rustywx
rustywx
```

Get Rust from [rustup.rs](https://rustup.rs) if you don't have it. On Linux you also need standard build tooling such as `build-essential` and `pkg-config`.

## From source

For development, clone the repository and run it with [`just`](https://github.com/casey/just):

```sh
git clone https://github.com/kerryhatcher/rustywx
cd rustywx
just run          # or: cd app && cargo run --release
```

`just run` launches from the `app/` directory so runtime assets resolve correctly. Always run the app in release mode; debug builds rasterize sweeps noticeably slower. See [Contributing](../contributing/) for the full workflow.

## Requirements

- **A GPU and graphics stack.** rustywx renders on the GPU with ply-engine. On Linux it needs a Vulkan-capable environment. A headless server will not open a window.
- **Network access** to NOAA's archive and the other [data sources](../network/). No credentials are needed.
- **Linux display server.** Native Wayland is preferred, with automatic fallback to X11. Set `RUSTYWX_LINUX_BACKEND=wayland` or `RUSTYWX_LINUX_BACKEND=x11` to require one backend while diagnosing problems.

## Updating

Download the newer release, run `cargo install rustywx` again, or let an AppImage updater apply the zsync delta.
