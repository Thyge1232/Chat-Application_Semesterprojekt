#!/usr/bin/env bash
set -euo pipefail

XML_PATH="${1:-frontend/coverage/cobertura-coverage.xml}"

if [ ! -f "$XML_PATH" ]; then
  # If not found, print zeros so badges show 0.0%
  echo "Line coverage: 0.0%"
  echo "Branch coverage: 0.0%"
  # generic output for backward compatibility
  echo "Coverage: 0.0%"
  exit 0
fi

# extract attributes from root <coverage ...>
LINE_RATE=$(grep -oP 'line-rate="\K[0-9.]+' "$XML_PATH" || echo "0")
BRANCH_RATE=$(grep -oP 'branch-rate="\K[0-9.]+' "$XML_PATH" || echo "0")

# convert fraction -> percent with one decimal
to_pct() {
  awk -v val="$1" 'BEGIN { printf "%.1f", (val * 100) }'
}

LINE_PCT=$(to_pct "${LINE_RATE:-0}")
BRANCH_PCT=$(to_pct "${BRANCH_RATE:-0}")

# Print labeled lines. 
echo "Line coverage: ${LINE_PCT}%"
echo "Branch coverage: ${BRANCH_PCT}%"
# Generic fallback line for existing badge
echo "Coverage: ${LINE_PCT}%"

# get filtered ASCII coverage table
if command -v npx >/dev/null 2>&1; then
  echo
  echo "Filtered coverage table (Branch + Lines only):"
  npx vitest run --coverage --coverage.provider=v8 --coverage.reporter=text \
    | awk -F'|' '{
        # Keep header and separator lines as-is
        if (NR == 1 || $0 ~ /^-+$/) {
          print $0
        }
        # For table rows, print only File, Branch, Lines columns
        else if ($0 ~ /\|/) {
          # Trim whitespace around columns
          gsub(/^ +| +$/, "", $1)
          gsub(/^ +| +$/, "", $3)
          gsub(/^ +| +$/, "", $5)
          printf "%-20s | %-8s | %-8s\n", $1, $3, $5
        }
        else {
          print $0
        }
    }'
fi
