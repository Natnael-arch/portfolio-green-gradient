# Portfolio Deployment Guide (Static Workflow)

This portfolio now uses a **static data flow**. You manage your content locally and push it to GitHub to update your live site. This removes the need for a production database and prevents connection errors.

## 🚀 How to update your site:

1.  **Run Locally**: Open your terminal and run:
    ```bash
    npm run dev
    ```
2.  **Add/Manage Content**: Go to `http://localhost:5000/admin`. Log in with your password.
3.  **Save Changes**: Add your projects or certificates. These are saved instantly to `client/src/data/projects.json` and `client/src/data/certificates.json`.
4.  **Push to GitHub**: Once you're happy with the changes:
    ```bash
    git add .
    git commit -m "Update portfolio content"
    git push origin main
    ```
5.  **Vercel Build**: Vercel will automatically build your site and bundle the new data!

## 🛠️ Vercel Setup (One-time):

1.  **Configure Vercel**: Connect your GitHub repository to [Vercel](https://vercel.com).
2.  **Environment Variables**: 
    - `ADMIN_PASSWORD`: Recommended for consistent local admin access.
    - `NODE_ENV`: Should be `production` on Vercel.
    - `DATABASE_URL`: **NO LONGER REQUIRED**.
3.  **Deployment Settings**: Vercel should automatically detect the settings:
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist/public`

Your site is now faster, more reliable, and easier to manage!
