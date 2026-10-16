export const REPO = 'https://github.com/kerryhatcher/rustywx';
export const VERSION = '0.10.2';
export const RELEASED = '2026-08-21';
export const RELEASES = `${REPO}/releases`;
export const RELEASE_TAG = `${RELEASES}/tag/v${VERSION}`;
export const CRATE = 'https://crates.io/crates/rustywx';

const dl = (file: string) => `${RELEASES}/download/v${VERSION}/${file}`;

export type Download = {
  os: 'mac' | 'linux' | 'windows';
  label: string;
  arch: string;
  file: string;
  href: string;
  mb: number;
  kind: string;
};

export const DOWNLOADS: Download[] = [
  { os: 'mac', label: 'macOS', arch: 'Apple Silicon', kind: 'tar.gz', file: `rustywx-${VERSION}-aarch64-apple-darwin.tar.gz`, href: '', mb: 13.9 },
  { os: 'linux', label: 'Linux', arch: 'x86-64', kind: 'AppImage', file: `rustywx-${VERSION}-x86_64.AppImage`, href: '', mb: 10.8 },
  { os: 'linux', label: 'Linux', arch: 'ARM64', kind: 'AppImage', file: `rustywx-${VERSION}-aarch64.AppImage`, href: '', mb: 10.3 },
  { os: 'linux', label: 'Linux', arch: 'x86-64', kind: 'tar.gz', file: `rustywx-${VERSION}-x86_64-unknown-linux-gnu.tar.gz`, href: '', mb: 15.4 },
  { os: 'linux', label: 'Linux', arch: 'ARM64', kind: 'tar.gz', file: `rustywx-${VERSION}-aarch64-unknown-linux-gnu.tar.gz`, href: '', mb: 15.0 },
  { os: 'windows', label: 'Windows', arch: 'x86-64', kind: 'zip', file: `rustywx-${VERSION}-x86_64-pc-windows-msvc.zip`, href: '', mb: 14.3 },
].map((d) => ({ ...d, href: dl(d.file) })) as Download[];

export const PRIMARY_DOWNLOAD: Record<Download['os'], Download> = {
  mac: DOWNLOADS[0],
  linux: DOWNLOADS[1],
  windows: DOWNLOADS[5],
};

export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const href = (path: string) => `${base}${path.startsWith('/') ? path : `/${path}`}`;
