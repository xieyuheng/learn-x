#!/usr/bin/env bash

set -e

cd "$(dirname "$0")/.."

pnpm exec prettier src views styles public/index.html --write
