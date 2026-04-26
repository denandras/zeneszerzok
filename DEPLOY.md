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

## Safety Rules (MANDATORY)

**NEVER run `git reset --hard` with a dirty working tree.**
Uncommitted changes are permanently destroyed. Always check `git status` first:
- If there are unstaged/untracked changes you want to keep → `git stash` or commit them first
- Only reset --hard when the working tree is clean, or you are certain the changes are disposable

**If something is wrong after a deploy → `vercel rollback` first, then fix git.**
Rolling back on Vercel is instant (seconds) and doesn't touch the repository.
```bash
vercel rollback --token <token>                    # roll back to previous deploy instantly
vercel rollback <deploy-url> --token <token>       # roll back to a specific past deploy
```
Fix the code and git history only after the site is stable again.
Never use git resets as a shortcut to undo a bad deploy — use Vercel's rollback instead.
