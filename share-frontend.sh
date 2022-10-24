#!/bin/sh
dir=../ds-frontend-shared
rm -rf "$dir/frontend"
rsync -av --progress ./frontend "$dir" --exclude node_modules
rm -f "$dir/frontend/https.cert"
touch "$dir/frontend/https.cert (removed contents)"
rm -f "$dir/frontend/https.key"
touch "$dir/frontend/https.key (removed contents)"
head -1 CHANGELOG.md > "$dir/VERSION.md"

