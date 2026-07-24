# 🚀 Deployment Guide

Complete guide to deploying your portfolio to Netlify.

---

## Prerequisites

- ✅ Code pushed to GitHub
- ✅ EmailJS configured
- ✅ Local build tested (`npm run build`)

---

## Netlify Deployment

### Step 1: Create Netlify Account

1. Go to [Netlify](https://app.netlify.com)
2. Sign up with **GitHub** (recommended for auto-deployments)
3. Authorize Netlify to access your repositories

### Step 2: Import Project

1. Click **"Add new site"** → **"Import from Git"**
2. Select **GitHub**
3. Choose `YashTripathi-19/Portfolio` repository
4. Click **"Deploy"**

### Step 3: Configure Build Settings

Netlify should auto-detect Vite, but verify:

```
Build command: npm install --legacy-peer-deps && npm run build
Publish directory: dist
Branch to deploy: main
```

### Step 4: Add Environment Variables

1. Site settings → **Environment variables**
2. Click **"Add a variable"**
3. Add these three variables:

| Key | Value |
|-----|-------|
| `VITE_APP_EMAILJS_SERVICE_ID` | `service_jyfq8sh` |
| `VITE_APP_EMAILJS_TEMPLATE_ID` | `template_5rkq342` |
| `VITE_APP_EMAILJS_PUBLIC_KEY` | `1ALCa5hAgf4qO-UQy` |

> Use your actual EmailJS credentials from `.env`

### Step 5: Deploy!

1. Click **"Deploy site"**
2. Wait 2-3 minutes for build
3. Your site will be live at: `https://random-name-123.netlify.app`

---

## Custom Domain (Optional)

### Step 1: Change Site Name

1. Site settings → **General**
2. Click **"Change site name"**
3. Enter: `yashtripathi-portfolio`
4. New URL: `https://yashtripathi-portfolio.netlify.app`

### Step 2: Add Custom Domain

1. Site settings → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain: `yourname.com`
4. Follow DNS configuration instructions

**DNS Records**:
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site.netlify.app
```

---

## Automatic Deployments

After initial setup, every push to `main` triggers deployment:

```bash
# Make changes
git add .
git commit -m "Update content"
git push origin main

# Netlify automatically:
# 1. Detects push
# 2. Runs build
# 3. Deploys new version
# 4. Site updated in ~2 minutes
```

---

## Build Configuration Files

These files ensure smooth deployment:

### netlify.toml

```toml
[build]
  command = "npm install --legacy-peer-deps && npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--legacy-peer-deps"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### .nvmrc

```
18
```

### .npmrc

```
legacy-peer-deps=true
```

---

## Deployment Checklist

Before deploying:

- [ ] All content updated in `src/constants/index.js`
- [ ] EmailJS credentials added to Netlify
- [ ] GitHub username updated in `scripts/fetchGithubProjects.js`
- [ ] Custom logos and images added
- [ ] Local build successful (`npm run build`)
- [ ] All links tested locally
- [ ] Contact form tested locally
- [ ] Mobile responsive checked

---

## Monitoring Deployment

### Check Build Status

1. Netlify Dashboard → **Deploys**
2. Click latest deploy to see logs
3. Green ✅ = successful
4. Red ❌ = failed (check logs)

### Common Build Errors

**Error**: `dependency_installation script returned non-zero exit code`
- **Fix**: Environment variables not set in Netlify

**Error**: `Command failed: npm run build`
- **Fix**: Check build logs for specific error
- Usually: Missing dependencies or syntax errors

**Error**: `GitHub API rate limit`
- **Fix**: Fallback should handle this automatically
- Or: Wait 1 hour for rate limit reset

---

## Post-Deployment Testing

Test these after deployment:

1. **3D Models Load**: Check hero and contact sections
2. **Contact Form Works**: Send test email
3. **Project Cards**: Verify all projects load
4. **Links Work**: Test all external links
5. **Mobile View**: Check on phone
6. **Performance**: Run Lighthouse audit

### Lighthouse Audit

1. Open deployed site in Chrome
2. DevTools → **Lighthouse**
3. Click **Generate report**
4. Aim for:
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 100
   - SEO: 100

---

## Troubleshooting

See [Troubleshooting Guide](./TROUBLESHOOTING.md) for common issues.

---

## Alternative Deployment Options

### Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
```

### GitHub Pages

```bash
npm install --save-dev gh-pages
# Add to package.json:
# "deploy": "npm run build && gh-pages -d dist"
npm run deploy
```

---

## Next Steps

- ✅ Deployment complete
- 📊 Monitor analytics
- 🎨 Regular content updates
- 🚀 Share your portfolio!
