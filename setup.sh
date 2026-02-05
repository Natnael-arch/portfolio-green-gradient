#!/bin/bash

echo "🚀 Portfolio Project - Quick Start Setup"
echo "========================================"
echo ""

# Check if .env file exists
if [ -f .env ]; then
    echo "✅ .env file found"
else
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  IMPORTANT: Edit .env and add your DATABASE_URL"
    echo ""
fi

echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Get a free PostgreSQL database:"
echo "   - Neon: https://neon.tech (Recommended)"
echo "   - Supabase: https://supabase.com"
echo "   - Railway: https://railway.app"
echo ""
echo "2. Edit .env file and add your DATABASE_URL"
echo ""
echo "3. Initialize database:"
echo "   npm run db:push"
echo ""
echo "4. Start development server:"
echo "   npm run dev"
echo ""
echo "📚 For deployment to Vercel, see VERCEL_DEPLOYMENT.md"
echo ""
