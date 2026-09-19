# notebook

A playground for learning [htmx 4](https://four.htmx.org/) with:

- **backend**: plain `node:http` + TypeScript, run directly by Node (no build step)
- **templates**: [handlebars.js](https://handlebarsjs.com/)
- **styles**: `@tailwindcss/cli` (Tailwind v4)
- **htmx**: installed with pnpm, vendored from `node_modules` into `public/vendor/`

## Layout

```
src/main.ts        http server + routes
src/views.ts       handlebars engine (fragments, partials, layouts)
src/public.ts      static file serving from public/
views/             *.hbs templates
styles/app.css     tailwind entry
public/index.html  hand written page shell (tracked)
public/app.css     tailwind output (generated)
public/vendor/     copied from node_modules (generated)
scripts/*.sh       all entry points
```

## Commands

```sh
pnpm install

scripts/dev.sh      # tailwind --watch + node --watch
scripts/build.sh    # vendor + tailwind (once) + tsc --noEmit
scripts/start.sh    # run the server without watching
scripts/check.sh    # tsc --noEmit
scripts/format.sh   # prettier
scripts/clean.sh    # remove generated files in public/
scripts/vendor.sh   # copy htmx into public/vendor/
```

There are no `scripts` in `package.json` on purpose: every entry point is a
file in `scripts/`.

## The demo routes

The app is deliberately almost empty; the routes exist to prove the plumbing
works end to end.

| route                     | returns                                   |
| ------------------------- | ----------------------------------------- |
| `GET /`                   | `public/index.html`                       |
| `GET /fragments/hello`    | handlebars fragment                       |
| `POST /fragments/greet`   | fragment, or a 422 fragment for empty input |
| anything else             | handlebars page rendered into a layout    |
