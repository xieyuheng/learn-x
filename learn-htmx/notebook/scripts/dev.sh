#!/usr/bin/env bash

set -e

cd "$(dirname "$0")/.."

bash scripts/vendor.sh

# Build the css once, so the first page load is styled.
pnpm exec tailwindcss \
  --input src/styles/index.css \
  --output public/index.css

# Ctrl-C already reaches every process in the group. This trap is a safety net
# for when only this script is signalled, and it resets the handlers first so
# that killing the group does not re-enter the handler.
cleanup() {
  trap - EXIT INT TERM
  kill 0
}
trap cleanup EXIT INT TERM

# `--watch always` matters: tailwind's plain `--watch` exits as soon as stdin
# ends, and a background job in a non-interactive shell gets stdin from
# /dev/null, so plain `--watch` would quit before it ever builds.
pnpm exec tailwindcss \
  --input src/styles/index.css \
  --output public/index.css \
  --watch always &

# Restart on anything under src/: server code, and templates (compiled
# templates are cached in memory, so a restart is what makes an edit take
# effect).
#
# `--watch-path` replaces the default module-graph watching, so src has to be
# listed explicitly.
node --watch \
  --watch-path=src \
  src/main.ts &

wait
