#!/bin/bash

# BarBook Order Management - Railway Deployment Script
# This script helps you deploy to Railway

set -e

echo "🚀 BarBook Order Management - Railway Deployment Helper"
echo "====================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Function to test production build locally
test_build() {
    echo "🧪 Testing production build locally..."
    
    # Install dependencies
    echo "📦 Installing dependencies..."
    yarn install
    cd client && yarn install && cd ..
    
    # Build frontend
    echo "🏗️  Building frontend..."
    yarn client:build
    
    # Test production server
    echo "🔧 Testing production server..."
    echo "Starting server on http://localhost:3001"
    echo "Press Ctrl+C to stop the test server"
    
    # Start server in background
    NODE_ENV=production yarn server:start &
    SERVER_PID=$!
    
    # Wait a moment for server to start
    sleep 3
    
    # Test health endpoint
    if curl -f http://localhost:3001/api/health > /dev/null 2>&1; then
        echo "✅ Production build test successful!"
    else
        echo "❌ Production build test failed!"
        kill $SERVER_PID 2>/dev/null || true
        exit 1
    fi
    
    # Stop server
    kill $SERVER_PID 2>/dev/null || true
    echo "✅ Local test completed successfully!"
}

# Function to prepare for deployment
prepare_deployment() {
    echo "📋 Preparing for deployment..."
    
    # Check if git is clean
    if [ -n "$(git status --porcelain)" ]; then
        echo "⚠️  Warning: You have uncommitted changes"
        echo "Please commit your changes before deploying:"
        echo "  git add ."
        echo "  git commit -m 'Prepare for deployment'"
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
    
    # Run tests
    echo "🧪 Running tests..."
    yarn test
    
    # Build for production
    echo "🏗️  Building for production..."
    yarn build
    
    echo "✅ Deployment preparation complete!"
}

# Function to deploy to Railway
deploy_railway() {
    echo "🚂 Deploying to Railway..."
    echo ""
    echo "Option 1: Deploy via Railway Dashboard (Recommended)"
    echo "1. Go to https://railway.app"
    echo "2. Click 'New Project'"
    echo "3. Select 'Deploy from GitHub'"
    echo "4. Choose your repository"
    echo "5. Railway will automatically detect your Dockerfile and deploy!"
    echo ""
    echo "Option 2: Deploy via Railway CLI"
    echo "1. Install Railway CLI: https://docs.railway.app/develop/cli"
    echo "2. Login: railway login"
    echo "3. Link project: railway link"
    echo "4. Deploy: railway up"
    echo ""
    echo "Your app will be live at: https://your-app-name.railway.app"
}

# Main menu
echo ""
echo "Choose your deployment option:"
echo "1) Test production build locally"
echo "2) Prepare for deployment (run tests + build)"
echo "3) Deploy to Railway"
echo "4) Show deployment guide"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        test_build
        ;;
    2)
        prepare_deployment
        ;;
    3)
        prepare_deployment
        deploy_railway
        ;;
    4)
        echo "📖 Opening deployment guide..."
        if command -v open &> /dev/null; then
            open DEPLOYMENT.md
        elif command -v xdg-open &> /dev/null; then
            xdg-open DEPLOYMENT.md
        else
            echo "Please open DEPLOYMENT.md to view the full deployment guide"
        fi
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process completed!"
echo "Check DEPLOYMENT.md for detailed instructions."
