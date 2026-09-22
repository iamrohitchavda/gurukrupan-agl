# Gurukrupan AGL

A minimal Windows-focused desktop application using React and Electron.

## Stack

- React 19
- Electron 44
- Vite 6
- JavaScript
- Node.js 20.15.1 (declared in `.nvmrc`)

There is intentionally no database, sync layer, Tauri code, or packaging setup yet. Those will be added only when the app's business requirements are defined.

## Requirements

- Node.js 20.0 or newer (Node 20.15.1 recommended)
- npm

## Install and run

```bash
npm install --legacy-peer-deps --ignore-scripts --no-audit --no-fund
node node_modules/electron/install.js
npm run dev:desktop
```

`npm run dev:desktop` starts Vite and opens the Electron desktop window. For a browser-only preview, use `npm run dev`.

## Build the React interface

```bash
npm run build
```

## Structure

```text
electron/        Electron main process and secure preload bridge
src/             React interface
```

## Project convention

Work happens on `dev`; stable releases are merged into `main`. Update this README whenever the setup, commands, or architecture changes.
