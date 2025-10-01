#!/bin/bash

echo "🧪 Testing WeAreJobPilot build locally..."

# Navigate to the prepared files
cd ~/Desktop/wearejobpilot-vercel-upload

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in the project root directory"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔨 Testing build..."
cd apps/web
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Ready for deployment."
    echo "🚀 You can now deploy to Vercel with confidence."
else
    echo "❌ Build failed. Checking for issues..."
    echo "📋 Check the error messages above for details."
fi
