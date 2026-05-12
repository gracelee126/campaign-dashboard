# GitHub Setup Instructions

Follow these steps to initialize your GitHub repository and connect it to Netlify.

## Prerequisites

- GitHub account
- Git installed on your machine
- Netlify account

## Step 1: Initialize Git Repository

```bash
# Navigate to your project directory
cd campaign-dashboard

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Campaign dashboard setup"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the "+" icon in the top-right corner
3. Select "New repository"
4. Fill in the repository details:
   - **Repository name**: `campaign-dashboard`
   - **Description**: Campaign management dashboard for recruiting
   - **Visibility**: Private (recommended for sensitive data)
   - **Initialize with**: Leave unchecked (we already have files)
5. Click "Create repository"

## Step 3: Connect Local Repository to GitHub

After creating the repository, GitHub will show you the commands to push an existing repository. Run:

```bash
# Add remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/campaign-dashboard.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 4: Connect to Netlify

### Option A: Direct GitHub Connection (Recommended)

1. Log in to [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Select GitHub as your Git provider
4. Authorize Netlify with GitHub
5. Select your `campaign-dashboard` repository
6. Configure build settings:
   - **Base directory**: Leave blank
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
7. Click "Show advanced" and add environment variables:
   - `VITE_HEYREACH_API_KEY`: Your HeyReach API key
   - `VITE_ASHBY_API_KEY`: Your Ashby API key
   - `VITE_DASHBOARD_PASSWORD`: Your secure password
8. Click "Deploy site"

### Option B: Manual Netlify Connection

1. Build locally: `npm run build`
2. In Netlify: "Add new site" → "Deploy manually"
3. Drag and drop the `dist` folder
4. Configure environment variables in site settings after deployment

## Step 5: Configure Branch Protection (Optional)

To prevent accidental deployments to production:

1. Go to your GitHub repository settings
2. Click "Branches" in the left sidebar
3. Under "Branch protection rules", click "Add rule"
4. Set pattern to: `main`
5. Enable "Require pull request reviews before merging"
6. Enable "Require status checks to pass before merging"
7. Click "Create"

## Subsequent Deployments

After the initial setup, every push to `main` will automatically deploy to Netlify:

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push origin main
```

Netlify will automatically:
1. Detect the push
2. Run `npm run build`
3. Deploy the `dist` folder to your live site

## Troubleshooting

### Build fails on Netlify
- Check that `node_version` in `netlify.toml` matches your local Node.js version
- Verify environment variables are set in Netlify dashboard
- Check Netlify deployment logs for specific error messages

### Changes not reflecting on live site
- Wait for the Netlify build to complete (check the Deploys tab)
- Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Check that all files are properly committed and pushed

### Can't authenticate with GitHub
- Ensure you have proper permissions on the repository
- Try re-authorizing Netlify in your GitHub settings
- Verify your GitHub account has SSH keys configured if using SSH URLs
