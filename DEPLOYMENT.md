# Deployment Instructions for presfads

## Overview
Your GitHub deployment flow is set up with two environments:
- **Development**: https://presfads-dev.onrender.com
- **Production**: https://presfads-fullstack.onrender.com (your main site)

## Deployment Flow

### 1. Deploy to Development (Automatic)
When you push code to the `develop` branch, it automatically deploys to the dev environment.

```bash
# Make your changes
git checkout develop
git add .
git commit -m "Your changes"
git push origin develop
```

✅ **Result**: Automatically deploys to https://presfads-dev.onrender.com

### 2. Deploy to Production (Manual)
When you're happy with changes in dev, promote them to production:

#### Option A: Command Line (Recommended)
```bash
# Switch to main branch
git checkout main

# Merge develop into main
git merge develop

# Push to trigger production deployment
git push origin main
```

#### Option B: GitHub Web Interface
1. Go to https://github.com/atorrrr/presfads
2. Click "Pull requests" → "New pull request"
3. Set: `base: main` ← `compare: develop`
4. Create pull request
5. Merge the pull request

✅ **Result**: Automatically deploys to production

## GitHub Actions Workflows

Your repository has these workflows:
- **Deploy to Development** - Triggers on push to `develop`
- **Deploy to Production** - Triggers on push to `main`

View status at: https://github.com/atorrrr/presfads/actions

## Service Details

### Development Service
- **Name**: presfads-dev
- **URL**: https://presfads-dev.onrender.com
- **Branch**: develop
- **Service ID**: srv-d2d7gtbe5dus73fm3g60

### Production Service  
- **Name**: presfads-fullstack
- **URL**: https://presfads-fullstack.onrender.com
- **Branch**: main
- **Service ID**: srv-d17kagbuibrs73fq20e0

## Troubleshooting

### If deployment fails:
1. Check GitHub Actions: https://github.com/atorrrr/presfads/actions
2. Common issues:
   - TypeScript errors → Run `npm run check` locally first
   - Build errors → Run `npm run build` locally first
   - Test failures → Run tests locally first

### If changes don't appear:
1. Wait 2-3 minutes for deployment to complete
2. Check Render dashboard: https://dashboard.render.com
3. Hard refresh your browser (Ctrl+F5 / Cmd+Shift+R)

## Quick Commands

```bash
# Deploy to dev
git checkout develop
git push origin develop

# Deploy to production
git checkout main
git merge develop
git push origin main

# Check deployment status
# Visit: https://github.com/atorrrr/presfads/actions
```

## Tools Integration
This workflow works with:
- Claude Code
- Replit
- Codex
- Any tool that can push to GitHub

Just make sure they push to the `develop` branch for testing!