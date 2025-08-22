#!/bin/bash

# Namecheap cPanel Deployment Script for Bitcrab
# This script prepares a lightweight deployment package

echo "🦀 Creating lightweight deployment package for Namecheap cPanel..."

# Remove old deployment files
rm -f cashcrab-cpanel-deployment.zip
rm -rf temp-deployment

# Create temporary deployment directory
mkdir temp-deployment

echo "📦 Copying essential files..."

# Copy built application files
cp -r .next/server temp-deployment/
cp -r .next/static temp-deployment/
cp -r .next/types temp-deployment/
cp -r app temp-deployment/
cp -r public temp-deployment/

# Copy configuration files
cp server.js temp-deployment/
cp next.config.js temp-deployment/
cp tsconfig.json temp-deployment/
cp next-env.d.ts temp-deployment/
cp .env.local temp-deployment/

# Use production package.json (minimal dependencies)
cp package-production.json temp-deployment/package.json

echo "🔧 Creating minimal package-lock.json..."

# Create a minimal package-lock.json for faster installs
cat > temp-deployment/package-lock.json << 'EOF'
{
  "name": "bitcrab3",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "bitcrab3",
      "version": "1.0.0",
      "dependencies": {
        "next": "^14.2.31",
        "react": "18.2.0",
        "react-dom": "18.2.0"
      },
      "engines": {
        "node": ">=18"
      }
    }
  }
}
EOF

echo "📋 Creating deployment instructions..."

# Create deployment instructions
cat > temp-deployment/DEPLOY_ON_CPANEL.md << 'EOF'
# 🚀 Namecheap cPanel Deployment Instructions

## Step 1: Upload Files
1. Extract all files from this ZIP
2. Upload to your domain's public_html folder (or app folder if using subdirectory)

## Step 2: Node.js Configuration
1. Go to cPanel → Node.js App
2. Create new application:
   - Node.js Version: 18.x or higher
   - Application Mode: Production
   - Application Root: your-app-folder
   - Application URL: cashcrab.io
   - Application Startup File: server.js

## Step 3: Install Dependencies
Run in terminal (or use cPanel interface):
```bash
npm install --production --no-optional
```

## Step 4: Start Application
```bash
npm start
```

## Troubleshooting
- If npm install gets stuck: Use `npm install --production --no-optional --no-fund --no-audit`
- If page doesn't load: Check error logs in cPanel
- Memory issues: Restart the Node.js app in cPanel

Your site should be live at https://cashcrab.io
EOF

cd temp-deployment

echo "🗜️ Creating deployment ZIP..."
zip -r ../cashcrab-cpanel-deployment.zip . -x "*.DS_Store"

cd ..
rm -rf temp-deployment

echo "✅ Deployment package created: cashcrab-cpanel-deployment.zip"
echo "📁 Size: $(ls -lh cashcrab-cpanel-deployment.zip | awk '{print $5}')"
echo ""
echo "🚀 Next steps:"
echo "1. Download cashcrab-cpanel-deployment.zip"
echo "2. Extract and upload to cPanel"
echo "3. Follow instructions in DEPLOY_ON_CPANEL.md"
echo ""
echo "💡 This package excludes heavy Solana dependencies to prevent npm install issues!"
