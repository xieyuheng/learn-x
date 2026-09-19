#!/usr/bin/env bash

set -e

cd "$(dirname "$0")/.."

bash scripts/vendor.sh

pnpm exec tailwindcss \
  --input styles/app.css \
  --output public/app.css

pnpm exec tsc --noEmit
