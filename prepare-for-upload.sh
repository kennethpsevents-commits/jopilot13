#!/bin/bash

echo "🚀 Preparing WeAreJobPilot files for Vercel upload..."

# Create a clean directory for upload
mkdir -p ~/Desktop/wearejobpilot-vercel-upload

# Copy the entire project
cp -r /Users/kenneth/wearejobpilot/* ~/Desktop/wearejobpilot-vercel-upload/

# Remove unnecessary files to save space
cd ~/Desktop/wearejobpilot-vercel-upload
rm -rf node_modules
rm -rf .next
rm -rf .git
rm -rf node-v20.10.0-darwin-x64
rm -f node.tar.gz
rm -f *.mp4
rm -f *.txt

echo "✅ Files prepared in ~/Desktop/wearejobpilot-vercel-upload/"
echo "📁 You can now upload this folder to GitHub or Vercel"
echo ""
echo "📋 Next steps:"
echo "1. Go to ~/Desktop/wearejobpilot-vercel-upload/"
echo "2. Create a new GitHub repository"
echo "3. Upload all files to the repository"
echo "4. Connect to Vercel and deploy"
