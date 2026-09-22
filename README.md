# Gurukrupan AGL

A minimal Windows-focused desktop application using React and Electron.

## Stack

- React 19
- Electron 44
- Vite 6
- JavaScript
- Node.js 20.15.1 (declared in `.nvmrc`)

The current frontend implements the real five-document export workflow from the supplied forms: Purchase Order, Sales Contract, Customs Invoice/Packing List, Commercial Invoice, and Commercial Packing List. Its files, party profiles, and edits persist locally in the app through browser storage; SQLite and multi-PC sync will be added later. Print/save-PDF behavior uses the local print dialog.

Each document has its own PDF-derived schema: visible labels and table headings follow that individual printed form rather than a shared generic schema. Fixed printed content is separated from editable transaction values. The Party Profiles screen stores reusable seller and buyer/consignee details (name, address, contact, email, and GSTIN/tax ID); choosing a profile pre-fills the related form details while the saved document can still be edited independently later.

## Requirements

- Node.js 20.0 or newer (Node 20.15.1 recommended)
- npm

## Install and run

```bash
npm install --legacy-peer-deps --ignore-scripts --no-audit --no-fund
node node_modules/electron/install.js
npm run dev:desktop
```

`npm run dev:desktop` starts Vite and opens the Electron desktop window. It includes multiple customer export files, linked document navigation, editable variable fields, buyer/supplier dropdowns, line-item calculations, validation, A4 previews, and print/save-PDF access. For a browser-only preview, use `npm run dev`.

The supplied PDF contains three different real sample transactions: a Ramji/Fennel purchase order, a WGK/Coffee sales contract, and WGK/Tejpatta invoice documents. The frontend preserves them as separate source export files so values are not incorrectly mixed. A new export file can be created, left in draft at any step, reopened later, edited, validated, and printed.

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
