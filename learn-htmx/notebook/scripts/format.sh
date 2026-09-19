#!/usr/bin/env bash

set -e

cd "$(dirname "$0")/.."

# TS and CSS only: prettier's handlebars parser drops `<!doctype html>` and
# mangles inline <script>, so *.hbs is left alone.
pnpm exec prettier "src/**/*.ts" "src/**/*.css" --write
