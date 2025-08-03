#!/bin/bash

# 🚀 Deployment Script for WhatCanIStart Frontend

echo "🚀 Starting deployment process..."

# Check if we're in the client directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the client directory"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found. Creating one..."
    cat > .env << EOF
# Backend API URL for development
VITE_API_URL=http://localhost:5000

# Other environment variables
VITE_APP_NAME=WhatCanIStart
VITE_APP_VERSION=1.0.0
EOF
    echo "✅ Created .env file"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build output in: dist/"
    
    # List build files
    echo "📋 Build contents:"
    ls -la dist/
    
    echo ""
    echo "🎉 Ready for deployment!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Push your code to GitHub"
    echo "2. Connect your repository to Vercel"
    echo "3. Add environment variables in Vercel dashboard"
    echo "4. Deploy!"
    echo ""
    echo "🔗 Useful commands:"
    echo "  git add ."
    echo "  git commit -m 'Update environment variables setup'"
    echo "  git push origin main"
else
    echo "❌ Build failed!"
    exit 1
fi 