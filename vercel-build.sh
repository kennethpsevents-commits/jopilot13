#!/bin/bash

# Vercel Build Script for WeAreJobPilot
# This script ensures the UI package is built before the web app

set -e

echo "🚀 Starting Vercel build process..."

# Build UI package first
echo "📦 Building UI package..."
cd packages/ui
npm install
npm run build
echo "✅ UI package built successfully"

# Build web app
echo "🌐 Building web app..."
cd ../../apps/web
npm install
npm run build
echo "✅ Web app built successfully"

echo "🎉 Build completed successfully!"
