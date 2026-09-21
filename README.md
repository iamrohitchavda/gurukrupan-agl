# Gurukrupan AGL

Gurukrupan AGL is a Windows desktop application built with React, TypeScript, Vite, and Electron.

## Current setup

- **Desktop shell:** Electron
- **User interface:** React 19 + TypeScript
- **Frontend tooling:** Vite
- **Local data:** SQLite, accessed only from Electron's main process
- **Package manager:** npm
- **Target:** Windows desktop, with the option to support other Electron platforms later

The repository begins on the `dev` branch. `main` is reserved for stable releases.

## Requirements

- Node.js 20.0 or later (current LTS recommended)
- npm

Rust is not required. On a Windows development computer, Electron may request Microsoft C++ Build Tools if a native SQLite dependency needs to compile.

The project uses Vite 6 for compatibility with Node.js 20, avoiding frontend native-binding requirements during normal development.

## Run locally

```bash
npm install
npm run dev:desktop
```

For a browser-only UI session:

```bash
npm run dev
```

## Build

```bash
npm run build
npm run package:win
```

## Planned data architecture

Each installation stores data in its own local SQLite database, so it can work offline. SQLite is accessed in Electron's main process; the React interface receives only explicitly approved data through a secure IPC bridge.

For multi-PC support, PC 1 will run a sync API and a master PostgreSQL database. Each installation will upload its pending local changes when PC 1 is available, then download changes made by other PCs. This avoids sharing a live SQLite file across the network. If PC 1 is offline, other PCs continue to work locally and sync later.

## Repository conventions

- Build work on `dev`; merge tested, stable work into `main`.
- Never commit `.env` files, SQLite database files, or generated build output.
- Update this README whenever setup, architecture, commands, or developer requirements change.
