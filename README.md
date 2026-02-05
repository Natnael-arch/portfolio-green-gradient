# Portfolio Project - Green Gradient

A full-stack portfolio application built with React, Vite, Express, and PostgreSQL.

## 📁 Project Structure

```
Green-Gradient/
├── api/                    # Vercel serverless functions
│   └── index.ts           # API handler for Vercel
├── client/                # Frontend React application
│   ├── src/
│   ├── public/
│   └── index.html
├── server/                # Backend Express server
│   ├── index.ts
│   ├── routes.ts
│   └── storage.ts
├── shared/                # Shared types and schemas
├── vercel.json            # Vercel deployment configuration
└── package.json
```

## 🚀 Running Locally

### Prerequisites

- Node.js 20.x or higher
- PostgreSQL database (local or cloud-based)
- npm or yarn

### Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure your database:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/portfolio
   PORT=5000
   NODE_ENV=development
   ADMIN_PASSWORD=your_admin_password
   ```

   **Database Options:**
   - **Local PostgreSQL**: Install PostgreSQL locally and create a database
   - **Neon**: https://neon.tech (free tier available)
   - **Supabase**: https://supabase.com (includes free PostgreSQL)
   - **Railway**: https://railway.app
   - **Vercel Postgres**: https://vercel.com/storage/postgres

3. **Initialize the database:**
   ```bash
   npm run db:push
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The application will be available at:
   - Frontend: http://localhost:5000
   - API: http://localhost:5000/api

## 📦 Building for Production

```bash
npm run build
```

This will:
- Build the frontend (output: `dist/public`)
- Build the backend (output: `dist/index.cjs`)

To run the production build locally:
```bash
npm start
```

## 🌐 Deploying to Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

   For production deployment:
   ```bash
   vercel --prod
   ```

### Method 2: Vercel Dashboard

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import on Vercel:**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the settings

3. **Configure Environment Variables:**
   
   In the Vercel dashboard, add these environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `ADMIN_PASSWORD`: Your admin password
   - `NODE_ENV`: production

4. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy your application

### Setting Up Database for Vercel

**Option 1: Vercel Postgres** (Easiest)
```bash
# In your Vercel project
vercel postgres create
```

**Option 2: External Database Provider**
- Use Neon, Supabase, Railway, or any PostgreSQL provider
- Copy the connection string to your Vercel environment variables

**Run Migrations:**
After deploying, run database migrations:
```bash
# Using Vercel CLI
vercel env pull .env.production.local
npm run db:push
```

## 🔧 Configuration Files

### vercel.json

The `vercel.json` file configures how Vercel handles your application:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "installCommand": "npm install",
  "framework": null,
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/index"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This configuration:
- Routes all `/api/*` requests to the serverless function
- Serves static files from `dist/public`
- Enables client-side routing

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `PORT` | Server port (default: 5000) | No |
| `NODE_ENV` | Environment (development/production) | Yes |
| `ADMIN_PASSWORD` | Admin panel password | No |

## 🔍 Troubleshooting

### Local Development Issues

**Database connection failed:**
- Verify your `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Check if the database exists

**Port already in use:**
- Change the `PORT` in `.env`
- Or kill the process using port 5000: `lsof -ti:5000 | xargs kill`

### Vercel Deployment Issues

**Build failed:**
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify `package.json` scripts are correct

**API routes not working:**
- Check that `vercel.json` is properly configured
- Verify environment variables are set in Vercel
- Check function logs in Vercel dashboard

**Database connection issues:**
- Ensure `DATABASE_URL` is set in Vercel environment variables
- Check if your database allows connections from Vercel IPs
- For some providers, you may need to allow connections from 0.0.0.0/0

## 🛠️ Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production build locally
- `npm run check` - Type check TypeScript
- `npm run db:push` - Push database schema changes

## 📚 Tech Stack

- **Frontend**: React 18, Vite 7, TailwindCSS, Radix UI
- **Backend**: Express 5, Node.js 20
- **Database**: PostgreSQL with Drizzle ORM
- **Deployment**: Vercel (Serverless Functions)
- **Language**: TypeScript

## 🔐 Security Notes

- Never commit `.env` file to version control
- Use strong passwords for `ADMIN_PASSWORD`
- Secure your database connection string
- Enable SSL for database connections in production

## 📄 License

MIT
