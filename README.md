# Gurukrupan AGL

Gurukrupan AGL is a Windows desktop application built with React, TypeScript, Vite, and Tauri.

## Current setup

- **Desktop shell:** Tauri v2 (Rust)
- **User interface:** React 19 + TypeScript
- **Frontend tooling:** Vite
- **Package manager:** npm
- **Target:** Windows desktop, with the option to support other Tauri platforms later

The repository begins on the `dev` branch. `main` is reserved for stable releases.

## Requirements

- Node.js (current LTS recommended)
- npm
- Rust stable toolchain (`rustup`)
- Windows development prerequisites required by Tauri when building on Windows

See the [Tauri prerequisites guide](https://v2.tauri.app/start/prerequisites/) for the platform-specific setup.

## Run locally

```bash
npm install
npm run tauri dev
```

For a browser-only UI session:

```bash
npm run dev
```

## Build

```bash
npm run build
npm run tauri build
```

## Planned data architecture

The desktop app will use a local SQLite database so it can work offline. If multi-PC support is added, each installation will retain its local database and exchange changes through a central sync service. This avoids sharing a live SQLite file across the network.

## Repository conventions

- Build work on `dev`; merge tested, stable work into `main`.
- Never commit `.env` files, SQLite database files, or Tauri/Rust build output.
- Update this README whenever setup, architecture, commands, or developer requirements change.
