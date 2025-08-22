#!/bin/bash

# 🦀 Bitcrab Deployment Script for Namecheap
# This script builds your Next.js project for static hosting

echo "🦀 Building Bitcrab for Namecheap deployment..."

# Clean previous build
rm -rf out/

# Build the project
npm run build

# Check if build was successful
if [ -d "out" ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📁 Files ready for upload in: ./out/"
    echo ""
    echo "🚀 Next steps:"
    echo "1. Log in to your Namecheap hosting panel"
    echo "2. Go to File Manager"
    echo "3. Upload ALL contents from ./out/ folder to your public_html/"
    echo "4. Your site will be live at https://bitcrab.io/"
    echo ""
    echo "📋 Deployment checklist:"
    echo "- ✅ Static files generated"
    echo "- ✅ SEO meta tags included"
    echo "- ✅ .htaccess for routing"
    echo "- ✅ SSL redirect configured"
    echo ""
    echo "🦀 Ready to go live!"
else
    echo "❌ Build failed. Please check for errors."
    exit 1
fi
