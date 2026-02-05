# Vercel Deployment Guide

This guide will walk you through deploying your portfolio to Vercel step by step.

## Prerequisites

- [x] Code is ready and tested locally
- [ ] GitHub account
- [ ] Vercel account (free - sign up at https://vercel.com)
- [ ] PostgreSQL database (we'll set this up)

## Step 1: Set Up a PostgreSQL Database

Choose one of these free options:

### Option A: Neon (Recommended - Easiest)

1. Go to https://neon.tech
2. Sign up for a free account
3. Create a new project
4. Copy the connection string (it looks like: `postgresql://username:password@hostname.neon.tech/database`)
5. Save this connection string - you'll need it later!

### Option B: Supabase

1. Go to https://supabase.com
2. Sign up and create a new project
3. Wait for the project to be provisioned (~2 minutes)
4. Go to Settings → Database
5. Copy the "Connection String" (URI format)
6. Save this connection string!

### Option C: Vercel Postgres

1. Install Vercel CLI: `npm install -g vercel`
2. Login: `vercel login`
3. In your project: `vercel postgres create`
4. Follow the prompts
5. Copy the connection string from the output

## Step 2: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - portfolio project"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Via Vercel Dashboard (Easiest for beginners)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Click "Login" or "Sign Up" (you can use your GitHub account)

2. **Import Project**
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   - Vercel will auto-detect the settings
   - You should see:
     - Framework Preset: Other
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: `dist/public`

4. **Add Environment Variables**
   
   Click "Environment Variables" and add:
   
   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | Your PostgreSQL connection string from Step 1 |
   | `NODE_ENV` | `production` |
   | `ADMIN_PASSWORD` | Choose a secure password for admin access |

   **IMPORTANT**: Make sure to add these for "Production", "Preview", and "Development" environments.

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)
   - You'll get a URL like `your-project.vercel.app`

### Via Vercel CLI (For advanced users)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - What's your project's name? (accept default or customize)
# - In which directory is your code located? ./
# - Want to override settings? No

# Add environment variables
vercel env add DATABASE_URL
# Paste your connection string when prompted
# Select: Production, Preview, Development

vercel env add NODE_ENV
# Enter: production
# Select: Production, Preview, Development

vercel env add ADMIN_PASSWORD
# Enter your admin password
# Select: Production, Preview, Development

# Deploy to production
vercel --prod
```

## Step 4: Initialize Database

After deployment, you need to push the database schema:

### Method 1: Using Drizzle Studio Locally

```bash
# Make sure your .env has the production DATABASE_URL
DATABASE_URL="your-production-database-url" npm run db:push
```

### Method 2: Via Vercel CLI

```bash
# Pull environment variables from Vercel
vercel env pull .env.production.local

# Run database migration
npm run db:push
```

### Method 3: Manual SQL (if needed)

If the above doesn't work, you can create tables manually in your database dashboard. Check `shared/schema.ts` for the table definitions.

## Step 5: Test Your Deployment

1. Visit your Vercel URL
2. The portfolio should load
3. Test the API endpoints:
   - Visit `your-app.vercel.app/api/projects`
   - You should see sample data

## Step 6: Continuous Deployment (Automatic)

Now that everything is set up, every time you push to your GitHub repository, Vercel will automatically deploy your changes!

```bash
# Make changes to your code
git add .
git commit -m "Updated portfolio"
git push

# Vercel will automatically build and deploy!
```

## Troubleshooting

### Build Failed

**Check the build logs in Vercel dashboard:**
- Click on your deployment
- Check the "Building" section for errors

**Common issues:**
1. Missing environment variables - Add them in Project Settings
2. TypeScript errors - Run `npm run check` locally first
3. Module not found - Run `npm install` and commit `package-lock.json`

### API Routes Return 404

1. Verify `vercel.json` exists in your project root
2. Check that the `api/index.ts` file exists
3. Redeploy the project

### Database Connection Failed

1. Verify `DATABASE_URL` in Vercel environment variables
2. Check that your database allows external connections
3. For Neon/Supabase: Ensure the connection string includes password
4. Test the connection string locally first

### "Internal Server Error" on API calls

1. Check Vercel function logs:
   - Go to your project in Vercel
   - Click "Functions" tab
   - Check logs for errors

2. Common causes:
   - Database connection string is wrong
   - Database tables not created (run `db:push`)
   - Missing environment variables

## Advanced Configuration

### Custom Domain

1. Go to your Vercel project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Environment Variables per Branch

- `Production`: Main branch deployments
- `Preview`: Pull request previews
- `Development`: Local development

Add different values for each environment as needed.

### Monitoring

- Check deployment status: https://vercel.com/dashboard
- View function logs in real-time
- Set up error alerts in Vercel settings

## Need Help?

- Vercel Documentation: https://vercel.com/docs
- Vercel Discord: https://vercel.com/discord
- Check function logs in Vercel dashboard
- Review this project's README.md

## Success! 🎉

Your portfolio is now live on Vercel. Share your URL!

- Production URL: `https://your-project.vercel.app`
- Admin Panel: `https://your-project.vercel.app/admin`
