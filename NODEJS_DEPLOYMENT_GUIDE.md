# 🦀 Bitcrab Next.js Deployment Guide for Namecheap cPanel (Official Method)

## 📋 Prerequisites
✅ Namecheap hosting with Node.js support
✅ cPanel access with "Setup Node.js App" option
✅ Compatible Node.js version (Next.js 14 requires Node.js 18.17+)

## 🚀 Step-by-Step Deployment (Following Official Namecheap Guide)

### Step 1: Build Your Next.js Application Locally
1. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

2. **Build the application:**
   ```bash
   npm run build
   ```
   ⚠️ **Important**: Fix any build errors before proceeding!

3. **Test locally (optional):**
   ```bash
   npm run start
   ```
   Visit http://localhost:3000 to verify everything works

### Step 2: Prepare Files for Deployment
1. **Enable visibility for hidden files** in your file manager
2. **Exclude these folders/files from upload:**
   - `node_modules/` (will be installed on server)
   - `.git/`
   - `README.md`
   - `.gitignore`
   - `out/` (not needed for Node.js deployment)

3. **Include these files/folders:**
   - `app/`
   - `public/`
   - `package.json`
   - `package-lock.json`
   - `next.config.js`
   - `server.js`
   - `tsconfig.json`
   - `next-env.d.ts`
   - `.env.local` (if you have environment variables)
   - `.next/` (generated build files)

4. **Create a ZIP archive** of all the selected files

### Step 3: Upload Files to cPanel
1. **Log into your cPanel**
2. **Navigate to File Manager**
3. **Create a directory** for your website content (e.g., `bitcrab-app/`)
   ⚠️ **Important**: Do NOT use `public_html` for Node.js apps!
4. **Upload the ZIP file** to your created directory
5. **Extract the uploaded file**
6. **Delete the ZIP file** after extraction

### Step 4: Configure Node.js App in cPanel
1. **In cPanel, find and open "Setup Node.js app"**
2. **Select "+ CREATE APPLICATION"**
3. **Configure these settings:**
   - **Node.js version**: Select 18+ (compatible with Next.js 14)
   - **Application mode**: Production
   - **Application root**: Path to your directory (e.g., `/bitcrab-app`)
   - **Application URL**: Your domain name (bitcrab.io)
   - **Application startup file**: `server.js`

4. **Add environment variables (if needed):**
   - From your `.env.local` file
   - Any other Next.js environment variables

5. **Click "CREATE"** to create the Node.js application

### Step 5: Install Dependencies and Start App
1. **After creating the app, STOP it temporarily**
2. **Navigate to "Detected Configuration Files"**
3. **Click "Run NPM Install"** to install Node.js packages
4. **Wait for installation to complete**
5. **Click "START APP"** to start your application

### Step 6: Verify Deployment
- **Open your website**: https://bitcrab.io
- **Check functionality**: Test all features including the game page
- **Monitor logs**: Check for any errors in the cPanel Node.js interface

## 🔧 Your Configuration Summary

### ✅ Files Updated for Namecheap:
- **`server.js`**: Matches official Namecheap example exactly
- **`package.json`**: Start script set to `NODE_ENV=production node server.js`
- **`next.config.js`**: Configured for server-side rendering (no static export)

### 🎯 Key Differences from Static Deployment:
- ✅ **Full Next.js features**: SSR, API routes, image optimization
- ✅ **Dynamic content**: Real-time data, user interactions
- ✅ **Better SEO**: Server-side rendering for search engines
- ✅ **Advanced routing**: All Next.js routing features work

## 🛠 Future Updates
To update your application:
1. Make changes locally
2. Run `npm run build`
3. Create new ZIP file (excluding node_modules)
4. Upload and extract to your app directory
5. Restart the app in cPanel Node.js interface

## 🔍 Troubleshooting

### Common Issues:
- **"Module not found"**: Run NPM Install in cPanel
- **Build fails**: Check and fix TypeScript/build errors locally
- **App won't start**: Verify Node.js version compatibility
- **502 errors**: Check startup file is set to `server.js`

### Debug Steps:
1. Check error logs in cPanel Node.js app interface
2. Verify all files uploaded correctly
3. Ensure dependencies installed successfully
4. Test locally first with `npm run start`

## 📞 Support Resources
- [Official Namecheap Guide](https://www.namecheap.com/support/knowledgebase/article.aspx/10686/29/how-to-deploy-reactjs-vitejs-react-native-and-nextjs-applications-in-cpanel/#deploying_next)
- [Next.js Custom Server Documentation](https://nextjs.org/docs/pages/building-your-application/configuring/custom-server)
- [Namecheap Node.js App Guide](https://www.namecheap.com/support/knowledgebase/article.aspx/10047/2182/how-to-work-with-nodejs-app)

---

## � Congratulations!

Your Bitcrab Next.js application is now ready for professional deployment on Namecheap with full server-side rendering capabilities! 🦀🚀

**Benefits of this deployment:**
- ✅ Full Next.js features enabled
- ✅ Server-side rendering for better SEO
- ✅ Dynamic content and API routes
- ✅ Professional hosting setup
- ✅ Scalable architecture
