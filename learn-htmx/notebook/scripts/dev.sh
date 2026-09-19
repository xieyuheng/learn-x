#!/usr/bin/env bash

set -e

cd "$(dirname "$0")/.."

bash scripts/vendor.sh

# Ctrl-C takes down the whole process group.
trap 'kill 0' EXIT INT TERM

# `--watch always` matters: tailwind's plain `--watch` exits as soon as stdin
# ends, and a background job in a non-interactive shell gets stdin from
# /dev/null, so plain `--watch` would quit before it ever builds.
pnpm exec tailwindcss \
  --input styles/app.css \
  --output public/app.css \
  --watch always &

node --watch src/main.ts &

wait
