# 🐛 Troubleshooting Guide

Common issues and their solutions.

---

## Installation Issues

### Error: `ERESOLVE could not resolve`

**Symptom**: npm install fails with peer dependency conflicts

**Solution**:
```bash
npm install --legacy-peer-deps
```

**Why**: `react-tilt@0.1.4` only supports React 15-16, but works fine with React 18.

---

### Error: Node version mismatch

**Symptom**: `The engine "node" is incompatible with this module`

**Solution**:
```bash
# Check current version
node --version

# Install Node 18
# Using nvm (recommended)
nvm install 18
nvm use 18

# Or download from nodejs.org
```

---

### Error: Port 5173 already in use

**Symptom**: `Port 5173 is already in use`

**Solution**:
```bash
# Option 1: Kill the process
lsof -ti:5173 | xargs kill -9

# Option 2: Use different port
npm run dev -- --port 3000
```

---

## 3D Rendering Issues

### 3D Models Not Showing

**Possible Causes**:

1. **WebGL not supported**
   - Check: Open Chrome DevTools Console
   - Look for: WebGL context errors
   - Fix: Update browser or enable hardware acceleration

2. **Model files missing**
   - Check: `public/desktop_pc/` and `public/planet/` folders exist
   - Fix: Ensure all model files are present

3. **CORS issues**
   - Check: Console for CORS errors
   - Fix: Models must be served from same origin

**Debug WebGL**:
```javascript
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl');
if (!gl) {
  console.error('WebGL not supported');
}
```

---

### Black Screen / Blank Canvas

**Possible Causes**:

1. **Camera position wrong**
   - Check `Computers.jsx` camera settings

2. **Lights not configured**
   - Verify HemisphereLight and SpotLight present

3. **Model scale too large/small**
   - Adjust scale in model component

---

## Contact Form Issues

### Emails Not Sending

**Checklist**:
- [ ] Environment variables set in `.env`
- [ ] EmailJS service configured
- [ ] Gmail OAuth permissions granted
- [ ] Template variables correct: `{{name}}`, `{{email}}`, `{{message}}`
- [ ] Public key copied correctly (no spaces)
- [ ] No CORS errors in console

**Test Configuration**:
```javascript
// Add to Contact.jsx temporarily
console.log('Service ID:', import.meta.env.VITE_APP_EMAILJS_SERVICE_ID);
console.log('Template ID:', import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID);
console.log('Public Key:', import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY);
```

**Common Mistakes**:
1. Wrong template variable names (use `{{name}}` not `{{from_name}}`)
2. Missing OAuth permissions in Gmail
3. Typo in environment variable names
4. Spaces in credentials when copying

---

### Form Validation Not Working

**Issue**: Form submits without validation

**Solution**: Check HTML5 validation attributes
```jsx
<input
  type="email"  // Ensures email validation
  required      // Makes field mandatory
  name="email"
  value={form.email}
/>
```

---

## Build Issues

### Build Fails Locally

**Error**: `npm run build` fails

**Common Causes**:

1. **Syntax errors**
   - Check: Build output for error location
   - Fix: Correct JavaScript/JSX syntax

2. **Missing dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Environment variables missing**
   - Ensure `.env` file exists
   - Check variable names start with `VITE_APP_`

---

### GitHub Projects Not Fetching

**Symptom**: Build succeeds but uses fallback projects

**Causes**:
1. **GitHub API rate limit** (60 requests/hour)
2. **Network error**
3. **Username incorrect in script**

**Solution**:
```bash
# Test manually
npm run fetch-projects

# Check output for errors
```

**Fallback Behavior**: Script automatically uses manual project data if API fails.

---

## Deployment Issues (Netlify)

### Build Fails on Netlify

**Error**: `dependency_installation script returned non-zero exit code`

**Solutions**:

1. **Add `.npmrc` file**:
```
legacy-peer-deps=true
```

2. **Update `netlify.toml`**:
```toml
[build]
  command = "npm install --legacy-peer-deps && npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
```

3. **Check environment variables** are added in Netlify dashboard

---

### Contact Form Works Locally But Not in Production

**Cause**: Environment variables not set in Netlify

**Solution**:
1. Netlify Dashboard → Site settings → Environment variables
2. Add all three `VITE_APP_*` variables
3. Redeploy site

---

### 404 Error on Page Refresh

**Cause**: SPA routing not configured

**Solution**: Add to `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Performance Issues

### Slow Initial Load

**Causes & Solutions**:

1. **Large bundle sizes**
   ```bash
   # Check bundle sizes
   npm run build
   ls -lh dist/assets/
   ```

2. **Images not optimized**
   - Use [TinyPNG](https://tinypng.com) to compress
   - Target: < 500 KB per image

3. **3D models too large**
   - Check model file sizes
   - Desktop PC: ~2.5 MB (acceptable)
   - Consider LOD (Level of Detail) optimization

---

### Animations Stuttering

**Causes**:
1. **Low-end device**
2. **Too many animations simultaneously**
3. **Framer Motion conflicts**

**Solution**: Respect user preferences
```javascript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// Disable animations if user prefers
```

---

## Browser Compatibility

### Site Not Working in Safari

**Common Issues**:
1. **WebGL context creation fails**
   - Update Safari to latest version
   - Enable WebGL in Safari preferences

2. **ES6+ syntax not supported**
   - Vite should handle transpilation
   - Check build configuration

---

### Mobile View Issues

**Problems**:
1. **Touch interactions not working**
   - Ensure OrbitControls enables touch

2. **Layout breaks**
   - Check Tailwind responsive classes
   - Test on actual device, not just DevTools

3. **3D models too heavy**
   - Consider disabling on mobile
   - Or use simpler LOD models

---

## Debugging Tips

### Enable Verbose Logging

**Vite Dev Server**:
```bash
npm run dev -- --debug
```

**EmailJS**:
```javascript
emailjs.init(publicKey, {
  debug: true  // Enables console logging
});
```

### Check Build Output

```bash
npm run build

# Analyze bundle sizes
# dist/assets/ should show:
# - main-[hash].js
# - three-[hash].js (largest)
# - react-vendor-[hash].js
# - motion-[hash].js
```

### Browser DevTools

1. **Console**: Check for JavaScript errors
2. **Network**: Monitor API calls and asset loading
3. **Performance**: Profile rendering performance
4. **Lighthouse**: Run audit for optimization tips

---

## Still Having Issues?

1. **Check existing issues**: [GitHub Issues](https://github.com/YashTripathi-19/Portfolio/issues)
2. **Create new issue**: Include:
   - Error message (full console output)
   - Steps to reproduce
   - Environment (OS, Node version, browser)
   - Screenshots if applicable

3. **Contact**: [yash.tripathi.35175@gmail.com](mailto:yash.tripathi.35175@gmail.com)
