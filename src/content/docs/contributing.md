---
title: Contributing
description: Set up a development build, run the tests and checks CI runs, and send a change.
group: Contributing
order: 1
symbol: isobar
---

rustywx welcomes bug reports, ideas and pull requests. The code lives at [github.com/kerryhatcher/rustywx](https://github.com/kerryhatcher/rustywx), and the project follows a [Code of Conduct](https://github.com/kerryhatcher/rustywx/blob/main/CODE_OF_CONDUCT.md).

## Prerequisites

- Rust with **edition 2024** support: rustc **1.85 or newer**.
- [`just`](https://github.com/casey/just) to run the project recipes.
- Network access for running the app and the live tests. No credentials are needed; the NEXRAD bucket is public.
- On Linux, standard build tooling (`build-essential`, `pkg-config`) and a Vulkan-capable graphics stack.

```sh
git clone https://github.com/kerryhatcher/rustywx
cd rustywx
just setup        # adds clippy and rustfmt
just run          # release build from app/
```

Run the app in release mode. Debug builds are fine for `cargo check` and tests, but rasterizing a sweep in debug is noticeably slow.

## Tests

```sh
just test                                          # cargo test --all-features, no network
cd app && cargo test --test network -- --ignored   # live fetch and decode from S3
```

The unit tests cover geometry, color tables, the scan model and rasterization using synthetic data, so they need no network and run in milliseconds. The network test is ignored by default because it downloads and decodes a real volume. Run it whenever you change the fetch path in `src/data.rs` or bump the `nexrad-data` or `nexrad-model` versions.

## The checks CI runs

`just ci` runs the same checks as the GitHub Actions workflow:

| Recipe | Runs |
| --- | --- |
| `just fmt` | `cargo fmt --all -- --check` |
| `just lint` | `cargo clippy --all-targets --all-features -- -D warnings` |
| `just check` | `cargo check --all-targets --all-features` |
| `just test` | `cargo test --all-features` |
| `just audit` | `cargo audit` |
| `just deny` | `cargo deny check` |
| `just gitleaks` | Secret scanning |
| `just typos` | Spell checking |

`just ci-full` adds doc tests, a Trivy filesystem scan, link checking and Kingfisher secret scanning. `just fmt-fix` and `just lint-fix` apply fixes. `just setup-tools` lists the external tools to install, and `just pre-commit-install` sets up the pre-commit and pre-push hooks.

On Linux, `just wayland-smoke` builds a release binary and runs a native Wayland smoke test.

## Commits and pull requests

- Use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`.
- Run `just ci` before opening a pull request.
- If you touch the fetch or decode path, also run the ignored network test.

## Releases

Releases are automated with [release-please](https://github.com/googleapis/release-please). Conventional Commit messages on `main` decide the next version and write the changelog. Merging the release pull request tags the release, builds the binaries and AppImages for every platform, publishes them to [GitHub Releases](https://github.com/kerryhatcher/rustywx/releases), and publishes the crate to crates.io.

## Security

Please report vulnerabilities privately, as described in [SECURITY.md](https://github.com/kerryhatcher/rustywx/blob/main/SECURITY.md), rather than in a public issue.

## Licenses

Code contributions are licensed under **AGPL-3.0-only**. Custom graphics, artwork and assets are **CC BY-SA 4.0**.
