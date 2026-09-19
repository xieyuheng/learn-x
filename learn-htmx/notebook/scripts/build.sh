#!/usr/bin/env bash

set -e

cd "$(dirname "$0")/.."

bash scripts/vendor.sh

pnpm exec tailwindcss \
  --input src/styles/index.css \
  --output public/index.css

pnpm exec tsc --noEmit
