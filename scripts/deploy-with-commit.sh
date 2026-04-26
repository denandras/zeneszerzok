#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Building Zeneszerzok ===${NC}"
npm run build

echo -e "\n${YELLOW}=== Generating commit message ===${NC}"
MSG=$(./scripts/generate-commit-msg.sh)
echo "Message: $MSG"

echo -e "\n${YELLOW}=== Committing changes ===${NC}"
git add -A
git commit -m "$MSG" || echo -e "${RED}No changes to commit${NC}"

echo -e "\n${YELLOW}=== Pushing to GitHub ===${NC}"
git push origin main

echo -e "\n${YELLOW}=== Deploying to Vercel ===${NC}"
vercel --yes --prod

echo -e "\n${GREEN}✓ Done!${NC}"
