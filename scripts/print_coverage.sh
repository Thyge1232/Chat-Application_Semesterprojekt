#!/usr/bin/env bash
set -euo pipefail

XML_PATH="${1:-frontend/coverage/cobertura-coverage.xml}"

if [ ! -f "$XML_PATH" ]; then
  # If not found, print zeros so badges show 0.0%
  echo "Line coverage: 0.0%"
  echo "Branch coverage: 0.0%"
  echo "Statements coverage: 0.0%"
  # generic output for backward compatibility
  echo "Coverage: 0.0%"
  exit 0
fi

# extract attributes from root <coverage ...>
LINE_RATE=$(grep -oP 'line-rate="\K[0-9.]+' "$XML_PATH" || echo "0")
BRANCH_RATE=$(grep -oP 'branch-rate="\K[0-9.]+' "$XML_PATH" || echo "0")

# Statements coverage is not always a top-level attribute in Cobertura.
# We'll estimate statements by using line-rate as fallback if no explicit attribute exists.
STMT_RATE=$(grep -oP 'statement-rate="\K[0-9.]+' "$XML_PATH" || true)
if [ -z "$STMT_RATE" ]; then
  # fallback to line-rate if statement-rate not present
  STMT_RATE="$LINE_RATE"
fi

# convert fraction -> percent with one decimal
to_pct() {
  awk -v val="$1" 'BEGIN { printf "%.1f", (val * 100) }'
}

LINE_PCT=$(to_pct "${LINE_RATE:-0}")
BRANCH_PCT=$(to_pct "${BRANCH_RATE:-0}")
FUNC_PCT=$(to_pct "${FUNC_RATE:-0}")
STMT_PCT=$(to_pct "${STMT_RATE:-0}")

# Print labeled lines. CI jobs will pick the relevant line and output a single "Coverage: X.Y%" for GitLab parsing
echo "Line coverage: ${LINE_PCT}%"
echo "Branch coverage: ${BRANCH_PCT}%"
echo "Statements coverage: ${STMT_PCT}%"
# Generic fallback line for existing badge
echo "Coverage: ${LINE_PCT}%"
