#!/usr/bin/env bash

set -e

cd "$(dirname "$0")/.."

mkdir -p public/vendor
cp node_modules/htmx.org/dist/htmx.min.js public/vendor/htmx.min.js
