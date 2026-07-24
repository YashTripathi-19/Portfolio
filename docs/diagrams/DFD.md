# 📊 Data Flow Diagram (DFD)

Visual representation of data movement through the system.

---

## Level 0 - Context Diagram

```
                    ┌─────────────────┐
                    │                 │
                    │   End User      │
                    │   (Visitor)     │
                    │                 │
                    └────────┬────────┘
                             │
                  Request    │     Response
                  (HTTP)     │     (HTML/JS/CSS)
                             │
                    ┌────────▼────────┐
                    │                 │
                    │   Portfolio     │
                    │   Website       │
                    │   System        │
                    │                 │
                    └────────┬────────┘
                             │
                  Contact    │     Email
                  Form Data  │     Notification
                             │
                    ┌────────▼────────┐
                    │                 │
                    │   Portfolio     │
                    │   Owner         │
                    │   (Yash)        │
                    │                 │
                    └─────────────────┘
```

---

## Level 1 - Main Process Diagram

```
┌────────────┐                  ┌──────────────────────────────────┐
│            │   1. Page Load   │                                  │
│   User     │─────────────────>│  1.0 Render Portfolio            │
│            │                  │  - Load React components         │
│            │                  │  - Initialize 3D scenes          │
└────────────┘                  │  - Fetch constants data          │
      │                         └──────────────────────────────────┘
      │                                        │
      │ 2. Browse                              │ Assets Request
      │    Content                             ▼
      │                         ┌──────────────────────────────────┐
      │                         │  2.0 Load Static Assets          │
      │                         │  - 3D models (GLTF)              │
      │                         │  - Textures (PNG/JPEG)           │
      │                         │  - Images (project screenshots)  │
      │                         │  - Fonts                         │
      ▼                         └──────────────────────────────────┘
┌────────────┐                                 │
│            │   3. Navigate    ┌──────────────▼──────────────────┐
│  Interact  │─────────────────>│  3.0 Handle Navigation          │
│  with      │                  │  - Smooth scroll to sections    │
│  Sections  │                  │  - Update active nav item       │
│            │                  │  - Trigger section animations   │
└────────────┘                  └─────────────────────────────────┘
      │
      │ 4. Interact
      │    with 3D
      │                         ┌──────────────────────────────────┐
      └────────────────────────>│  4.0 Process 3D Interactions    │
                                │  - OrbitControls (mouse/touch)   │
                                │  - Camera updates                │
                                │  - Render loop (60 FPS)          │
                                │  - Tilt effects on cards         │
                                └──────────────────────────────────┘
                                               │
┌────────────┐                                │
│            │   5. Fill Form   ┌─────────────▼───────────────────┐
│  Submit    │─────────────────>│  5.0 Process Contact Form       │
│  Contact   │                  │  - Validate input fields        │
│  Form      │                  │  - Prepare form data            │
│            │                  └─────────────┬───────────────────┘
└────────────┘                                │
      │                                       │ 5.1 Send Email
      │                         ┌─────────────▼───────────────────┐
      │                         │  External Process: EmailJS      │
      │                         │  - Authenticate with public key │
      │                         │  - Use service & template ID    │
      │                         │  - Send via Gmail SMTP          │
      │ 6. Success              └─────────────┬───────────────────┘
      │    Alert                              │
      │                                       │ Email Delivery
      ◄───────────────────────────────────────┘
                                              │
                                    ┌─────────▼────────┐
                                    │                  │
                                    │  Owner Email     │
                                    │  Inbox           │
                                    │                  │
                                    └──────────────────┘
```

---

## Level 2 - Contact Form Submission (Detailed)

```
┌─────────────────────────────────────────────────────────────────┐
│  5.0 Process Contact Form                                       │
└───────────┬─────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│  5.1 Validate Form Data                                         │
│  Input: { name, email, message }                                │
│  Process:                                                       │
│    • Check all fields are filled                               │
│    • Validate email format (HTML5)                             │
│    • Trim whitespace                                           │
│  Output: Valid form data OR validation error                   │
└───────────┬─────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│  5.2 Call EmailJS API                                           │
│  Input: formRef, SERVICE_ID, TEMPLATE_ID                        │
│  Process:                                                       │
│    • Set loading = true                                         │
│    • emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef)        │
│    • API Request:                                               │
│        POST https://api.emailjs.com/api/v1.0/email/send-form   │
│        Headers: { Content-Type: application/x-www-form-url... }│
│        Body: { service_id, template_id, user_id, form_data }   │
│  Output: Promise (resolve/reject)                              │
└───────────┬─────────────────────────────────────────────────────┘
            │
            ├──── SUCCESS ────┐
            │                 │
            │                 ▼
            │     ┌─────────────────────────────────────────┐
            │     │  5.3 Handle Success                     │
            │     │  • Set loading = false                  │
            │     │  • Reset form fields                    │
            │     │  • Show success alert                   │
            │     │  • Log success to console               │
            │     └─────────────────────────────────────────┘
            │
            └──── ERROR ──────┐
                              │
                              ▼
                  ┌─────────────────────────────────────────┐
                  │  5.4 Handle Error                       │
                  │  • Set loading = false                  │
                  │  • Log error to console                 │
                  │  • Show error alert                     │
                  │  • Keep form data (user can retry)      │
                  └─────────────────────────────────────────┘
```

---

## Level 2 - Build Process Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  Developer: npm run build                                       │
└───────────┬─────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│  Step 1: Fetch GitHub Projects                                  │
│  node scripts/fetchGithubProjects.js                            │
│                                                                  │
│  Input: GITHUB_USERNAME                                         │
│  Process:                                                       │
│    1. GET https://api.github.com/users/USER/repos              │
│    2. Filter: !fork && !archived                               │
│    3. Sort: by stars + updated_at                              │
│    4. Select: 4 featured + 1 recent                            │
│  Output: src/constants/githubProjects.js                       │
│  Fallback: Use manual data if API fails                        │
└───────────┬─────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│  Step 2: Vite Build Process                                     │
│  vite build                                                      │
│                                                                  │
│  Input:                                                         │
│    • src/ (source code)                                        │
│    • public/ (static assets)                                   │
│    • vite.config.js (build config)                             │
│                                                                  │
│  Process:                                                       │
│    1. Parse entry point (index.html)                           │
│    2. Transpile JSX → JS (esbuild)                             │
│    3. Bundle dependencies                                       │
│    4. Process Tailwind CSS                                      │
│    5. Tree-shake unused code                                    │
│    6. Code splitting:                                           │
│       - main.js                                                 │
│       - three.js chunk                                          │
│       - react-vendor.js chunk                                   │
│       - motion.js chunk                                         │
│    7. Minify JS (Terser)                                       │
│    8. Minify CSS                                                │
│    9. Generate source maps                                      │
│   10. Copy public/ assets                                       │
│                                                                  │
│  Output: dist/ folder (production build)                       │
└───────────┬─────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│  Step 3: Deployment                                             │
│  Netlify processes dist/ folder                                 │
│                                                                  │
│  Process:                                                       │
│    1. Upload to CDN                                             │
│    2. Configure redirects                                       │
│    3. Enable SSL/TLS                                            │
│    4. Invalidate cache                                          │
│    5. Go live                                                   │
│                                                                  │
│  Output: Production site live                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

See also:
- [Three.js Rendering Pipeline](./THREEJS.md)
- [EmailJS Integration Flow](./EMAILJS.md)
