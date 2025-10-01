#!/bin/bash

echo "🚀 WeAreJobPilot - Vercel Build Script"
echo "======================================"

# Navigate to web app
cd apps/web

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the app
echo "🔨 Building Next.js app..."
npm run build

echo "✅ Build complete!"
echo "📁 Output: apps/web/.next/"





