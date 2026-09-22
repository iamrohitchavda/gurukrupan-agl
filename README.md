# Gurukrupan AGL

A minimal Windows-focused desktop application using React and Electron.

## Stack

- React 19
- Electron 44
- Vite 6
- JavaScript
- Node.js 20.15.1 (declared in `.nvmrc`)

The current frontend implements the real five-document export workflow from the supplied forms: Purchase Order, Sales Contract, Customs Invoice/Packing List, Commercial Invoice, and Commercial Packing List. It uses in-memory values from those documents only; no database, sync layer, or PDF download behavior has been added yet.

## Requirements

- Node.js 20.0 or newer (Node 20.15.1 recommended)
- npm

## Install and run

```bash
npm install --legacy-peer-deps --ignore-scripts --no-audit --no-fund
node node_modules/electron/install.js
npm run dev:desktop
```

`npm run dev:desktop` starts Vite and opens the Electron desktop window. It includes linked document navigation, editable variable fields, buyer/supplier dropdowns, line-item calculations, validation, and an A4-style preview. For a browser-only preview, use `npm run dev`.

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
