#!/bin/bash
# Generate descriptive git commit message based on changed files

# Get changed files
CHANGED=$(git diff --name-only --cached 2>/dev/null || git diff --name-only HEAD~1 HEAD)

if [ -z "$CHANGED" ]; then
    echo "No changes to commit"
    exit 1
fi

# Count changes by file type
TSX_COUNT=$(echo "$CHANGED" | grep -c '\.tsx$' || echo 0)
TS_COUNT=$(echo "$CHANGED" | grep -c '\.ts$' || echo 0)
CSS_COUNT=$(echo "$CHANGED" | grep -c '\.css$' || echo 0)
JSON_COUNT=$(echo "$CHANGED" | grep -c '\.json$' || echo 0)

# Get component names changed
COMPONENTS=$(echo "$CHANGED" | grep -oE 'app/(components|data)/[^/]+' | sed 's|app/||' | sort -u | tr '\n' ', ' | sed 's/, $//')

# Build message
MSG=""

# Check for specific patterns
if echo "$CHANGED" | grep -q "ProgramViewer"; then
    MSG="ProgramViewer:"
    if git diff --cached app/components/ProgramViewer.tsx 2>/dev/null | grep -q "preload"; then
        MSG="${MSG} add image preloading for adjacent pieces"
    elif git diff --cached app/components/ProgramViewer.tsx 2>/dev/null | grep -q "wheel"; then
        MSG="${MSG} add wheel scroll navigation for desktop"
    elif git diff --cached app/components/ProgramViewer.tsx 2>/dev/null | grep -q "cursor"; then
        MSG="${MSG} add cursor pointer and fix layout"
    else
        MSG="${MSG} update component"
    fi
elif echo "$CHANGED" | grep -q "IndexPage"; then
    MSG="IndexPage:"
    if git diff --cached app/components/IndexPage.tsx 2>/dev/null | grep -q "mx-auto"; then
        MSG="${MSG} center content on desktop"
    elif git diff --cached app/components/IndexPage.tsx 2>/dev/null | grep -q "SZÜNET\|intermission"; then
        MSG="${MSG} fix SZÜNET divider lines"
    elif git diff --cached app/components/IndexPage.tsx 2>/dev/null | grep -q "px-"; then
        MSG="${MSG} add header padding"
    else
        MSG="${MSG} update layout"
    fi
elif echo "$CHANGED" | grep -q "program.ts"; then
    MSG="Data: update program content"
else
    # Generic message based on file count
    TOTAL=$((TSX_COUNT + TS_COUNT))
    if [ $TOTAL -gt 0 ]; then
        MSG="Update ${TOTAL} file(s): ${COMPONENTS}"
    else
        MSG="Update build artifacts"
    fi
fi

echo "$MSG"
