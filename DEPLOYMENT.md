# Deployment Guide

Complete guide for deploying the Campaign Dashboard to Netlify with GitHub version control.

## Architecture Overview

```
Local Development
    ↓
GitHub Repository
    ↓
Netlify CI/CD Pipeline
    ↓
Live Dashboard
```

## Full Deployment Workflow

### Phase 1: Local Setup (One-time)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env.local
   ```

3. **Add your API credentials to `.env.local`**
   ```
   VITE_HEYREACH_API_KEY=your_key
   VITE_ASHBY_API_KEY=your_key
   VITE_DASHBOARD_PASSWORD=your_password
   ```

4. **Test locally**
   ```bash
   npm run dev
   # Visit http://localhost:3000 and verify functionality
   ```

### Phase 2: GitHub Setup (One-time)

1. **Initialize git repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Campaign dashboard"
   ```

2. **Create GitHub repository**
   - Visit github.com → New repository
   - Name it: `campaign-dashboard`
   - Choose Private visibility
   - Do NOT initialize with README (we have files)

3. **Connect local repo to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/campaign-dashboard.git
   git branch -M main
   git push -u origin main
   ```

### Phase 3: Netlify Setup (One-time)

1. **Create Netlify account**
   - Visit netlify.com
   - Sign up with GitHub

2. **Connect GitHub to Netlify**
   - Click "Add new site"
   - Select "Import an existing project"
   - Choose GitHub
   - Authorize Netlify
   - Select `campaign-dashboard` repository

3. **Configure Netlify build settings**
   - Base directory: (leave empty)
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Add environment variables**
   In Netlify dashboard → Site settings → Build & deploy → Environment:
   - `VITE_HEYREACH_API_KEY`
   - `VITE_ASHBY_API_KEY`
   - `VITE_DASHBOARD_PASSWORD`

5. **Trigger deployment**
   - Netlify will automatically deploy
   - Check Deploys tab for status
   - Your site will be live at the provided URL

### Phase 4: Ongoing Development

For every change you make:

```bash
# Make your changes to the code
# Test locally
npm run dev

# When ready to deploy
git add .
git commit -m "Description of changes"
git push origin main

# Netlify automatically builds and deploys
# Monitor at Netlify dashboard
```

## Workflow Summary

```
┌─────────────────────────────────────┐
│     Local Development               │
│  npm install, .env setup, npm dev   │
└─────────┬───────────────────────────┘
          │
          ↓ git push origin main
┌─────────────────────────────────────┐
│     GitHub Repository               │
│  Version control, change history    │
└─────────┬───────────────────────────┘
          │
          ↓ Auto webhook trigger
┌─────────────────────────────────────┐
│     Netlify CI/CD Pipeline          │
│  npm run build, environment vars    │
└─────────┬───────────────────────────┘
          │
          ↓ Deploy dist/ folder
┌─────────────────────────────────────┐
│     Live Dashboard                  │
│  https://your-site.netlify.app      │
└─────────────────────────────────────┘
```

## Configuration Files Explained

### netlify.toml
- **build.command**: Runs `npm run build` to create production bundle
- **build.publish**: Deploys files from `dist/` directory
- **redirects**: Routes all requests to `index.html` for SPA routing
- **headers**: Sets cache policies and security headers

### .env.example
- Template file for environment variables
- Never commit actual `.env` or `.env.local`
- Copy to `.env.local` and fill with real values

### .gitignore
- Prevents committing node_modules, build output, and .env files
- Keeps repository clean and secure

## Monitoring Deployment

### Netlify Dashboard
1. **Deploys tab**: See build history and status
2. **Logs**: View build output and error messages
3. **Settings → Build & deploy**: Manage environment variables
4. **Analytics**: Track visitor stats

### Troubleshooting Failed Builds

1. **Check Netlify logs**
   - Go to Failed deploy
   - Click "Deploy log" to see full error

2. **Common issues**
   - Missing environment variables
   - Node version mismatch
   - Dependency installation failure

3. **Fix and redeploy**
   - Make changes locally
   - Test with `npm run build`
   - Push to GitHub
   - Netlify automatically rebuilds

## Database and API Integration

### Data Fetching
- Data fetched from HeyReach and Ashby APIs on load
- Cached in browser localStorage for offline access
- Manual sync with `npm run sync-data`

### Scheduled Updates
Consider adding Netlify Functions for periodic data sync:

```javascript
// netlify/functions/sync-data.js
exports.handler = async (event, context) => {
  // Fetch from HeyReach and Ashby
  // Store in your database
  // Return status
}
```

## Security Considerations

1. **API Keys**
   - Never commit real API keys
   - Use environment variables in Netlify
   - Rotate keys regularly

2. **Password Protection**
   - Dashboard password is checked on client side
   - For production: implement server-side authentication
   - Consider OAuth or SSO integration

3. **Data Privacy**
   - All campaign and role data stored locally
   - Consider GDPR/CCPA implications
   - Implement data retention policies

## Rollback Procedure

If something goes wrong:

1. **View previous deployments**
   - Netlify Deploys tab
   - Each deploy is timestamped

2. **Rollback to previous version**
   - Click on previous successful deploy
   - Click "Publish deploy"
   - Netlify will revert to that version

3. **Or rollback in Git**
   ```bash
   git revert HEAD
   git push origin main
   ```

## Performance Optimization

### Current Optimizations
- Vite for fast builds and HMR
- CSS optimization in production build
- Component code splitting

### Future Optimizations
- Implement lazy loading for components
- Add service worker for offline support
- Compress images and assets
- CDN caching strategies

## Support and Maintenance

### Regular Tasks
- Monitor API status and rate limits
- Review error logs for issues
- Update dependencies monthly
- Back up campaign data regularly

### Resources
- Netlify docs: https://docs.netlify.com
- Vite docs: https://vitejs.dev
- React docs: https://react.dev
- HeyReach API: https://heyreach.io/docs
- Ashby API: https://developers.ashby.com
