#!/usr/bin/env bash
set -euo pipefail

XML_PATH="${1:-frontend/coverage/cobertura-coverage.xml}"

TEXT_REPORT="frontend/coverage/text-report.txt"

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

# Print labeled lines. CI jobs will pick the relevant line and output a single "Coverage: X.Y%" for GitLab parsing
echo "Line coverage: ${LINE_PCT}%"
echo "Branch coverage: ${BRANCH_PCT}%"
# Generic fallback line for existing badge
echo "Coverage: ${LINE_PCT}%"

# --- Print filtered ASCII coverage table (only Branch + Lines) ---
if [ -f "$TEXT_REPORT" ]; then
  echo "DEBUG: Found text report at $TEXT_REPORT"
  echo
  echo "Filtered coverage table (Branch + Lines only):"

  # Strip ANSI color codes and normalize spacing before parsing
  sed -r 's/\x1B

\[[0-9;]*[mK]//g' "$TEXT_REPORT" \
    | awk -F'|' '{
        # Print separator/header lines as-is
        if ($0 ~ /^-+$/ || $0 ~ /^ *% Coverage report from v8/ || $0 ~ /^ *File *\|/) {
          # Rebuild header to reflect only Branch and Lines columns if it is the header row
          if ($0 ~ /^ *File *\|/) {
            printf "-------------------|----------|---------\n"
            printf "File               | % Branch | % Lines\n"
            printf "-------------------|----------|---------\n"
          } else {
            print $0
          }
          next
        }

        # Process table rows that have pipes
        if ($0 ~ /\|/) {
          # Split by '|' into fields
          n = split($0, a, "|")

          # Trim whitespace on the needed columns:
          # a[1] = File, a[3] = % Branch, a[5] = % Lines
          gsub(/^ +| +$/, "", a[1])
          gsub(/^ +| +$/, "", a[3])
          gsub(/^ +| +$/, "", a[5])

          # Print only File, Branch, Lines with fixed widths
          printf "%-19s | %-8s | %-7s\n", a[1], a[3], a[5]
          next
        }

        # Otherwise print the line as-is
        print $0
      }'
fi
