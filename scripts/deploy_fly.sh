#!/usr/bin/env bash
set -euo pipefail

if [ -z "${FLY_API_TOKEN:-}" ]; then
  echo "Please set FLY_API_TOKEN in your environment before running this script."
  exit 1
fi

IMAGE="ghcr.io/${GITHUB_USER:-your-github-username}/gramavoice:latest"

echo "This script assumes you've already built & pushed the image to GHCR as ${IMAGE}."

echo "Creating Fly app (you may be prompted)"
flyctl apps create gramavoice || true

echo "Deploying image to Fly"
flyctl deploy --image ${IMAGE}

echo "Done. Use 'flyctl open' to open the app."
