#!/usr/bin/env bash

set -e

cd "$(dirname "$0")/.."

# Only TS and CSS: prettier's handlebars parser drops `<!doctype html>` and
# mangles inline <script>, so views/ is left alone.
pnpm exec prettier src styles --write
