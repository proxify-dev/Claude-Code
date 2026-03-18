#!/usr/bin/env bash
# check-config-edit.sh — PreToolUse hook for Edit/Write
# Detects config file edits and reminds the agent to save decision memories.

set -euo pipefail

# Read tool input from stdin
INPUT=$(cat)

# Extract file_path from JSON input
FILE_PATH=$(echo "$INPUT" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"file_path"[[:space:]]*:[[:space:]]*"//;s/"$//')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Normalize: get just the filename and relative path components
BASENAME=$(basename "$FILE_PATH")
DIRPATH=$(dirname "$FILE_PATH")
PARENT=$(basename "$DIRPATH")
GRANDPARENT=$(basename "$(dirname "$DIRPATH")")

IS_CONFIG=false

# Check patterns:
# 1. CLAUDE.md (any path)
if [ "$BASENAME" = "CLAUDE.md" ]; then
  IS_CONFIG=true
# 2. agents/*.md
elif [ "$PARENT" = "agents" ] && [[ "$BASENAME" == *.md ]]; then
  IS_CONFIG=true
# 3. skills/*/SKILL.md
elif [ "$BASENAME" = "SKILL.md" ] && [ "$GRANDPARENT" = "skills" ]; then
  IS_CONFIG=true
# 4. hooks/hooks.json
elif [ "$BASENAME" = "hooks.json" ] && [ "$PARENT" = "hooks" ]; then
  IS_CONFIG=true
# 5. .claude-plugin/plugin.json
elif [ "$BASENAME" = "plugin.json" ] && [ "$PARENT" = ".claude-plugin" ]; then
  IS_CONFIG=true
fi

if [ "$IS_CONFIG" = true ]; then
  cat <<'ENDJSON'
{
  "systemMessage": "CONFIG DECISION TRACKING: You are about to edit a config file. Before or immediately after this edit, you MUST save a project memory documenting this decision. Create a file named decision_<topic>.md in the memory directory with: (1) What was changed, (2) Why — the rationale and context, (3) What it replaced or what the previous state was. Do this as part of your current flow — do not wait to be asked."
}
ENDJSON
else
  exit 0
fi
