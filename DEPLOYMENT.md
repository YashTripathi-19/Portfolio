# Deployment Guide

## Portfolio Website - Yash Tripathi

### 🎯 Pre-Deployment Checklist

- ✅ All personalization complete (name, email, projects)
- ✅ EmailJS configured and working
- ✅ Custom logos and favicon added
- ✅ Project screenshots added
- ✅ Code cleaned and optimized
- ✅ Build successful (`npm run build`)

---

## 🚀 Deployment Options

### Option 1: Netlify (Recommended)

#### Method A: Netlify CLI
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod

# Follow prompts:
# - Build directory: dist
# - Publish directory: dist
```

#### Method B: Drag & Drop (Easiest)
1. Go to https://app.netlify.com/drop
2. Drag and drop the `dist` folder
3. Done! Get your URL

#### Method C: GitHub Integration (Automatic)
1. Push code to GitHub
2. Go to https://app.netlify.com
3. Click "Add new site" → "Import from Git"
4. Select your Portfolio repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

**Environment Variables (if needed):**
- Add EmailJS credentials in Netlify dashboard under Site settings → Environment variables

---

### Option 2: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

**Or use GitHub integration:**
1. Push code to GitHub
2. Go to https://vercel.com
3. Import your Portfolio repository
4. Vercel will auto-detect Vite and deploy

---

### Option 3: GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

Then enable GitHub Pages in repo settings pointing to `gh-pages` branch.

---

## 🔧 Post-Deployment

### 1. Custom Domain (Optional)
- **Netlify**: Site settings → Domain management → Add custom domain
- **Vercel**: Project settings → Domains → Add domain

### 2. Environment Variables
Make sure these are set in your deployment platform:
```
VITE_APP_EMAILJS_SERVICE_ID=service_jyfq8sh
VITE_APP_EMAILJS_TEMPLATE_ID=template_5rkq342
VITE_APP_EMAILJS_PUBLIC_KEY=1ALCa5hAgf4qO-UQy
```

### 3. Testing
After deployment, test:
- ✅ All pages load correctly
- ✅ 3D models render
- ✅ Contact form works
- ✅ All project links work
- ✅ Mobile responsiveness

---

## 📊 Performance Optimization (Optional)

### Optimize Project Images
Large images detected:
- `portfolio-project.png` (2.5MB)
- `github-project.png` (3MB)
- `blockchain-project.png` (1.7MB)
- `auberon-project.png` (877KB)

**Optimize with:**
1. **TinyPNG**: https://tinypng.com
2. **Squoosh**: https://squoosh.app
3. **ImageOptim** (Mac): https://imageoptim.com

Target: < 500KB per image

---

## 🔄 Future Updates

### Automatic Deployments
Once connected to GitHub:
1. Push to `main` branch
2. Platform auto-builds and deploys
3. GitHub projects auto-fetch during build

### Manual Re-deployment
```bash
# Update local code
git pull origin main

# Test locally
npm run dev

# Build
npm run build

# Deploy
netlify deploy --prod
# or
vercel --prod
```

---

## 📝 Support

- **Netlify Docs**: https://docs.netlify.com
- **Vercel Docs**: https://vercel.com/docs
- **Vite Docs**: https://vitejs.dev/guide/

---

**Ready to deploy? Pick your platform and follow the steps above!** 🚀
