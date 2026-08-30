# Leaflet Components

Web components / custom elements for creating interactive maps on the web with [LeafletJS](https://leafletjs.com) and [Lit](https://lit.dev).

## Development

Make sure a compatible version of NodeJS (see [`.nvmrc`](./.nvmrc)) and [pnpm](https://pnpm.io/) (see [`package.json`](./package.json)) are available on your system prior to installing dependencies and proceeding with local development.

### Installing dependencies

Enable `pnpm` via `corepack`

```bash
corepack enable pnpm
```

Install dependencies using `pnpm`

```bash
pnpm install --frozen-lockfile
```

### Local development

Start Vite in dev mode:

```bash
pnpm start
```

Build components:

```bash
pnpm build
```

Preview build:

```bash
pnpm preview
```

Run Storybook

```bash
pnpm 'storybook'
```

Build Storybook stories

```bash
pnpm build-storybook
```
