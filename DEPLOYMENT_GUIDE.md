# 🦀 Bitcrab Next.js Deployment Guide for Namecheap

## 📋 Pre-Deployment Checklist

✅ Project built successfully for static export
✅ SEO meta tags updated with bitcrab.io domain
✅ All placeholder URLs replaced
✅ Static files generated in `out/` folder
✅ .htaccess file created for proper routing

## 🚀 Deployment Steps

### Step 1: Access Your Namecheap Hosting
1. Log in to your Namecheap account
2. Go to "Hosting List" 
3. Click "Manage" next to your hosting package
4. Open "File Manager" or use FTP/SFTP

### Step 2: Upload Your Files
1. **Navigate to your domain's public folder** (usually `public_html/` or `www/`)
2. **Delete any existing files** in the public folder (backup first if needed)
3. **Upload ALL contents from the `out/` folder** to your domain's public folder

**Important**: Upload the CONTENTS of the `out/` folder, not the folder itself.

Your file structure should look like this on Namecheap:
```
public_html/
├── .htaccess
├── index.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── _next/
├── assets/
├── css/
└── game/
```

### Step 3: Configure Domain Settings
1. Make sure your domain `bitcrab.io` points to your Namecheap hosting
2. Enable SSL certificate in Namecheap hosting panel
3. Wait for DNS propagation (can take up to 24 hours)

### Step 4: Verify Deployment
After upload, test these URLs:
- ✅ https://bitcrab.io/ (main page)
- ✅ https://bitcrab.io/game/ (game page)
- ✅ https://bitcrab.io/robots.txt (SEO)
- ✅ https://bitcrab.io/sitemap.xml (SEO)

## 🔧 Technical Details

### Static Export Configuration
- **Output**: Static HTML/CSS/JS files
- **Next.js Config**: Configured for static export with `output: 'export'`
- **Images**: Unoptimized for static hosting compatibility
- **Routing**: Handled by .htaccess file

### SEO Optimization
- ✅ Meta tags with correct domain (bitcrab.io)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Cards
- ✅ Structured data (Schema.org)
- ✅ Sitemap.xml for search engines
- ✅ Robots.txt for crawler guidance

### Security & Performance
- ✅ HTTPS redirect in .htaccess
- ✅ Security headers
- ✅ File compression (gzip)
- ✅ Browser caching
- ✅ CSP headers for iframe embedding

## 🛠 Future Updates

To update your website:
1. Make changes to your project files
2. Run: `npm run build`
3. Upload new contents of `out/` folder to Namecheap
4. Clear any caches if needed

## 📞 Support

If you encounter issues:
1. Check Namecheap hosting error logs
2. Verify all files uploaded correctly
3. Ensure SSL certificate is active
4. Test in incognito/private browsing mode

## 📂 Files Ready for Upload

Your deployment files are ready in:
`/Users/shahbaz/Desktop/project/gpt5 bitcrab/out/`

Simply upload ALL contents of this folder to your Namecheap hosting public directory.

---

🦀 **Your Bitcrab website is ready for the crypto world!** 🚀
