# 📦 Installation Guide

Complete guide to setting up the portfolio project locally.

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18 or higher
- **npm** 10 or higher
- **Git** installed

Check versions:
```bash
node --version  # Should be v18.x.x or higher
npm --version   # Should be 10.x.x or higher
git --version
```

---

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YashTripathi-19/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

**Why `--legacy-peer-deps`?**

The `react-tilt@0.1.4` package has peer dependency conflicts with React 18. This flag tells npm to ignore version mismatches. The package works perfectly despite this warning.

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# EmailJS Configuration
VITE_APP_EMAILJS_SERVICE_ID=your_service_id_here
VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

> See [Configuration Guide](./CONFIGURATION.md) for detailed EmailJS setup.

### 4. Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173/`

### 5. Build for Production

```bash
npm run build
```

This will:
- Fetch latest GitHub projects
- Bundle and optimize all assets
- Generate `dist/` folder ready for deployment

### 6. Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```
Portfolio/
├── src/                  # Source code
├── public/               # Static assets
├── dist/                 # Production build (generated)
├── scripts/              # Build scripts
├── docs/                 # Documentation
├── .env                  # Environment variables (create this)
├── package.json          # Dependencies
└── vite.config.js        # Build configuration
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run fetch-projects` | Manually fetch GitHub projects |

---

## Troubleshooting Installation

### Error: `ERESOLVE could not resolve`

**Solution**: Use the `--legacy-peer-deps` flag
```bash
npm install --legacy-peer-deps
```

### Error: `node` version mismatch

**Solution**: Install Node.js 18 or use nvm
```bash
# Using nvm
nvm install 18
nvm use 18
```

### Port 5173 already in use

**Solution**: Kill the process or use a different port
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

---

## Next Steps

- ✅ Installation complete
- 📝 [Configure EmailJS](./CONFIGURATION.md)
- 🎨 [Customize content](./CONFIGURATION.md#customizing-content)
- 🚀 [Deploy to Netlify](./DEPLOYMENT.md)
