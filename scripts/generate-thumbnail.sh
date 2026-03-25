#!/bin/bash
# サムネイル画像生成スクリプト
# Usage: ./scripts/generate-thumbnail.sh "記事タイトル" "CATEGORY" "output-filename"
# Example: ./scripts/generate-thumbnail.sh "Claude Code入門" "SETUP" "claude-code-intro"

set -euo pipefail

TITLE="$1"
CATEGORY="$2"
FILENAME="$3"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
TEMPLATE="$SCRIPT_DIR/thumbnail-template.html"
OUTPUT_DIR="$PROJECT_DIR/public/images/articles"
TMP_HTML="$SCRIPT_DIR/.tmp-thumbnail.html"

mkdir -p "$OUTPUT_DIR"

# テンプレートからタイトル・カテゴリを置換して一時HTMLを生成
sed -e "s|{{TITLE}}|$TITLE|g" -e "s|{{CATEGORY}}|$CATEGORY|g" "$TEMPLATE" > "$TMP_HTML"

# Playwright でスクリーンショット
npx --yes playwright screenshot \
  --browser chromium \
  --viewport-size="1200,630" \
  "file://$TMP_HTML" \
  "$OUTPUT_DIR/$FILENAME.png" 2>&1

rm -f "$TMP_HTML"

echo "Generated: $OUTPUT_DIR/$FILENAME.png"
