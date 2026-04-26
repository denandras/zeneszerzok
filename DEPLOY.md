# Deployment Guide

## Quick Deploy

Use the improved deploy script for better commit messages:

```bash
./scripts/deploy-with-commit.sh
```

This will:
1. Build the project
2. Generate a descriptive commit message based on changed files
3. Commit changes to git
4. Push to GitHub
5. Deploy to Vercel

## Commit Message Format

The script automatically generates commit messages like:

- `ProgramViewer: add image preloading for adjacent pieces`
- `ProgramViewer: add wheel scroll navigation for desktop`
- `ProgramViewer: add cursor pointer and fix layout`
- `IndexPage: center content on desktop`
- `IndexPage: fix SZÜNET divider lines`
- `Data: update program content`

## Manual Deploy

If you need manual control:

```bash
# Build
npm run build

# Commit with descriptive message
git add -A
git commit -m "Component: what changed"
git push origin main

# Deploy
vercel --yes --prod
```

## Git Workflow

- `main` branch auto-deploys on Vercel
- Always commit before deploying
- Use descriptive commit messages
