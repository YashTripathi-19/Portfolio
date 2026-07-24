# 🏗️ High-Level Design (HLD)

System architecture and component overview.

---

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                                │
│  (Chrome/Firefox/Safari - Desktop, Tablet, Mobile)                 │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ HTTPS Request
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      NETLIFY CDN                                    │
│  - SSL/TLS Encryption                                              │
│  - Global Edge Network                                             │
│  - Automatic GZIP Compression                                      │
│  - SPA Redirect Rules (/* → /index.html)                          │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ Static Assets
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   REACT SPA (Client-Side)                          │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │  React 18 + Vite Bundle                                      │ │
│  │  - main.js (app logic)                                       │ │
│  │  - three.js (3D engine)                                      │ │
│  │  - react-vendor.js (React, ReactDOM, Router)                │ │
│  │  - motion.js (Framer Motion)                                 │ │
│  │  - CSS bundle (Tailwind utilities)                          │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │  COMPONENT LAYER                                             │ │
│  │  ├── Navbar (Navigation + Routing)                          │ │
│  │  ├── Hero (3D Desktop PC + WebGL Canvas)                    │ │
│  │  ├── About (Services + Tech Stack)                          │ │
│  │  ├── Experience (Timeline + Company Logos)                  │ │
│  │  ├── Tech (Tech Icons Grid)                                 │ │
│  │  ├── Works (Project Cards + Dynamic Data)                   │ │
│  │  ├── Feedbacks (Testimonials Carousel)                      │ │
│  │  ├── Contact (Form + 3D Earth Canvas + EmailJS)            │ │
│  │  └── Footer (Social Links + Copyright)                      │ │
│  └──────────────────────────────────────────────────────────────┘ │
└───────────────┬──────────────────────────────────┬─────────────────┘
                │                                  │
                │ Form Submit                      │ Asset Load
                ▼                                  ▼
┌───────────────────────────┐      ┌──────────────────────────────┐
│    EMAILJS API            │      │   STATIC ASSETS (CDN)        │
│  - Service: service_*     │      │  - 3D Models (.gltf, .bin)   │
│  - Template: template_*   │      │  - Textures (.png, .jpeg)    │
│  - Auth: Public Key       │      │  - Images (projects, logos)  │
│  - SMTP: Gmail OAuth      │      │  - Fonts (Webfonts)          │
└─────────┬─────────────────┘      └──────────────────────────────┘
          │
          │ Email Delivery
          ▼
┌───────────────────────────┐
│   RECIPIENT EMAIL         │
│  yash.tripathi.35175@     │
│  gmail.com                │
└───────────────────────────┘
```

---

## Tech Stack Overview

### Frontend Layer
- **React 18.2.0** - Component-based UI library
- **Vite 4.1.0** - Build tool with ESM and HMR
- **Tailwind CSS 3.2.6** - Utility-first CSS framework
- **React Router DOM 6.8.1** - Client-side routing

### 3D Graphics Layer
- **Three.js 0.149.0** - WebGL rendering engine
- **@react-three/fiber 8.11.1** - React renderer for Three.js
- **@react-three/drei 9.56.24** - Helper components
- **Framer Motion 9.0.7** - Animation library

### Integration Layer
- **EmailJS 3.10.0** - Serverless email delivery
- **GitHub API v3** - Dynamic project fetching
- **node-fetch 3.3.2** - Build-time HTTP client

### Infrastructure
- **Netlify** - Hosting + CI/CD
- **GitHub** - Version control + repository
- **Gmail SMTP** - Email delivery

---

## System Components

### 1. Presentation Layer
- **Navbar**: Navigation with smooth scrolling
- **Hero**: Landing section with 3D desktop model
- **About**: Services and introduction
- **Experience**: Work history timeline
- **Tech**: Technology stack display
- **Works**: Project showcase
- **Feedbacks**: Testimonials
- **Contact**: Contact form with 3D Earth
- **Footer**: Social links

### 2. 3D Rendering Layer
- **ComputersCanvas**: Hero 3D desktop PC
- **EarthCanvas**: Contact section planet
- **BallCanvas**: Tech stack spheres
- **StarsCanvas**: Background particles

### 3. State Management
- **React State**: Local component state
- **React Router**: Navigation state
- **Form State**: Contact form data

### 4. Data Layer
- **Static Data**: `src/constants/index.js`
- **Dynamic Data**: `src/constants/githubProjects.js`
- **Environment**: `.env` variables

---

## Request Flow

### Initial Page Load
1. User requests `https://yashtripathi-19.netlify.app`
2. Netlify CDN serves cached `index.html`
3. Browser downloads JS/CSS bundles (code-split)
4. React hydrates and renders components
5. Three.js initializes WebGL contexts
6. 3D models loaded and rendered
7. Animations triggered on scroll

### Contact Form Submission
1. User fills form and clicks Submit
2. Client-side validation (HTML5)
3. EmailJS API called with form data
4. EmailJS processes template
5. Gmail SMTP delivers email
6. Success/error feedback to user

### Build-Time Project Fetch
1. `npm run build` triggered
2. `fetchGithubProjects.js` executes
3. GitHub API fetched for repos
4. Data filtered and processed
5. `githubProjects.js` generated
6. Vite bundles application
7. `dist/` folder ready for deployment

---

## Deployment Architecture

### CI/CD Pipeline
```
Developer           GitHub              Netlify             Production
    │                 │                   │                    │
    │  git push       │                   │                    │
    ├────────────────►│                   │                    │
    │                 │  webhook          │                    │
    │                 ├──────────────────►│                    │
    │                 │                   │  clone repo        │
    │                 │                   │  npm install       │
    │                 │                   │  npm run build     │
    │                 │                   │  deploy dist/      │
    │                 │                   ├───────────────────►│
    │                 │                   │                    │
    │                 │  deploy success   │                    │
    │◄────────────────┴───────────────────┤                    │
    │                                     │                    │
```

---

## Security Architecture

### Client-Side Security
- **Environment Variables**: Only `VITE_APP_*` exposed
- **EmailJS Public Key**: Safe for client-side
- **No Secrets**: No sensitive data in bundle
- **HTTPS Only**: All traffic encrypted

### Server-Side Security (EmailJS)
- **Rate Limiting**: 5 emails/second limit
- **Domain Whitelist**: Configured in dashboard
- **OAuth**: Gmail authentication
- **Template Locking**: Client can't modify template

### Network Security (Netlify)
- **SSL/TLS**: Automatic Let's Encrypt
- **HSTS**: Strict Transport Security
- **CSP**: Content Security Policy headers
- **DDoS Protection**: Netlify edge network

---

## Performance Architecture

### Code Splitting Strategy
```
main.js          ~50 KB    - Core app logic
three.js         ~580 KB   - 3D engine (lazy loaded)
react-vendor.js  ~150 KB   - React libraries
motion.js        ~100 KB   - Animations
index.css        ~15 KB    - Styles
```

### Caching Strategy
- **Browser Cache**: Assets cached with hash filenames
- **CDN Cache**: Netlify edge caching
- **Service Worker**: Future enhancement

### Loading Strategy
- **Critical Path**: HTML + CSS + main.js
- **Lazy Load**: 3D canvases with Suspense
- **Prefetch**: Next section assets
- **Preload**: Critical fonts and images

---

## Scalability Considerations

### Current Limits
- **Netlify**: 100 GB bandwidth/month (free tier)
- **EmailJS**: 200 emails/month (free tier)
- **GitHub API**: 60 requests/hour (unauthenticated)

### Scaling Options
1. **Higher Traffic**: Upgrade Netlify plan
2. **More Emails**: Upgrade EmailJS or switch to backend
3. **API Limits**: Add GitHub token for 5000 requests/hour
4. **Performance**: Add CDN for large assets

---

## Monitoring & Observability

### Available Metrics
- **Netlify Analytics**: Page views, bandwidth
- **Browser DevTools**: Performance profiling
- **Lighthouse**: Core Web Vitals

### Future Enhancements
- **Google Analytics**: User behavior tracking
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Pingdom**: Uptime monitoring

---

## Next: Dive Deeper

- [Low-Level Design (LLD)](./LLD.md) - Detailed component architecture
- [Component Architecture](./COMPONENTS.md) - React component structure
- [Build Process](./BUILD.md) - Build pipeline details
