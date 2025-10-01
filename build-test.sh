#!/bin/bash

# Set the correct node path
export PATH="/Users/kenneth/wearejobpilot/node-v20.10.0-darwin-x64/bin:$PATH"

# Navigate to the web app directory
cd /Users/kenneth/wearejobpilot/apps/web

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the UI package first
echo "Building UI package..."
cd /Users/kenneth/wearejobpilot/packages/ui
npm install
npm run build

# Build the web app
echo "Building web app..."
cd /Users/kenneth/wearejobpilot/apps/web
npm run build

echo "Build completed successfully!"
