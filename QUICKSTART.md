# Quick Start Guide

Get the Campaign Dashboard running in 5 minutes.

## Step 1: Install Dependencies (1 min)

```bash
npm install
```

## Step 2: Configure Environment (1 min)

```bash
cp .env.example .env.local
```

Edit `.env.local` and add:
```
VITE_HEYREACH_API_KEY=your_heyreach_key
VITE_ASHBY_API_KEY=your_ashby_key
VITE_DASHBOARD_PASSWORD=your_password
```

## Step 3: Run Development Server (1 min)

```bash
npm run dev
```

Visit: http://localhost:3000

## Step 4: Login to Dashboard (1 min)

- Enter the password you set in `.env.local`
- See your campaigns, roles, and alerts

## Step 5: Deploy (Optional, 2 min)

See `GITHUB_SETUP.md` for GitHub + Netlify deployment.

---

## Key Features Explained

**Quick Stats**: 6 key metrics about your campaigns and roles

**Campaigns Table**: All your campaigns with performance metrics
- Active/Paused status
- Connection & reply rates
- Number of senders

**Open Roles**: Your open positions with linked campaigns
- Application and interview counts
- Alert if role has no active campaign
- See which campaigns target the role

**Alerts System**: Stay informed about critical issues
- Errors (red): Immediate attention needed
- Warnings (orange): Address soon
- Info (blue): Helpful insights

## Common Commands

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Create production build

# Data
npm run sync-data    # Manually refresh data from APIs
```

## Need Help?

- **Local issues**: Check `README.md`
- **Deployment**: See `DEPLOYMENT.md`
- **GitHub setup**: See `GITHUB_SETUP.md`

---

That's it! You're now running the Campaign Dashboard locally. 🚀
