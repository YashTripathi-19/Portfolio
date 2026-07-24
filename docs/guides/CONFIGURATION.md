# ⚙️ Configuration Guide

Complete guide to configuring your portfolio.

---

## EmailJS Setup

EmailJS provides serverless email delivery for the contact form.

### Step 1: Create Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up with your email
3. Verify your email address

### Step 2: Add Email Service

1. Dashboard → **Email Services** → **Add New Service**
2. Select **Gmail**
3. Click **Connect Account**
4. Sign in with your Gmail
5. Grant permissions: **"Send emails on your behalf"**
6. Copy the **Service ID** (e.g., `service_jyfq8sh`)

### Step 3: Create Email Template

1. Dashboard → **Email Templates** → **Create New Template**
2. Set template content:

```
Subject: Portfolio Contact: {{name}}

From: {{name}}
Email: {{email}}

Message:
{{message}}

---
Sent from Portfolio Website
```

3. **Important**: Template variables must be:
   - `{{name}}`
   - `{{email}}`
   - `{{message}}`

4. Copy the **Template ID** (e.g., `template_5rkq342`)

### Step 4: Get Public Key

1. Dashboard → **Account** → **General**
2. Copy your **Public Key** (e.g., `1ALCa5hAgf4qO-UQy`)

### Step 5: Add to Environment

Create `.env` file in project root:

```env
VITE_APP_EMAILJS_SERVICE_ID=service_jyfq8sh
VITE_APP_EMAILJS_TEMPLATE_ID=template_5rkq342
VITE_APP_EMAILJS_PUBLIC_KEY=1ALCa5hAgf4qO-UQy
```



---

## GitHub Projects Configuration

The portfolio automatically fetches your latest projects during build.

### Configure Username

Edit `scripts/fetchGithubProjects.js`:

```javascript
const GITHUB_USERNAME = 'YourUsername'; // Change this

const FEATURED_PROJECTS = [
  'Portfolio',
  'YourProject1',
  'YourProject2',
  'YourProject3'
];
```

### How It Works

1. **Build Time**: Script runs during `npm run build`
2. **API Call**: Fetches repos from GitHub API
3. **Filtering**: Removes forks and archived repos
4. **Sorting**: Prioritizes featured projects
5. **Generation**: Creates `src/constants/githubProjects.js`
6. **Fallback**: Uses manual data if API fails

### Manual Project Data

If you prefer manual control, edit `src/constants/index.js`:

```javascript
export const projects = [
  {
    name: "Project Name",
    description: "Project description...",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "tailwind", color: "green-text-gradient" },
    ],
    image: "project-image.png",  // Place in src/assets/
    source_code_link: "https://github.com/...",
    website_link: "https://yourproject.com",
    button_text: "Visit Website"  // or "Visit Repo"
  },
  // Add more projects...
];
```

---

## Customizing Content

### Personal Information

Edit `src/constants/index.js`:

```javascript
// Navigation Links
export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "contact", title: "Contact" },
];

// Services/Specializations
export const services = [
  {
    title: "Backend Developer",
    icon: backend,
  },
  // Add more...
];
```

### Hero Section

Edit `src/components/Hero.jsx`:

```jsx
<h1>Hi, I'm <span>YourName</span></h1>
<p>
  Your tagline here <br />
  Second line here
</p>
```

### Work Experience

Edit `src/constants/index.js`:

```javascript
export const experiences = [
  {
    title: "Your Role",
    company_name: "Company Name",
    icon: companyLogo,  // Import from assets
    iconBg: "#383E56",
    date: "Jan 2024 - Present",
    points: [
      "Achievement 1",
      "Achievement 2",
      "Achievement 3",
    ],
  },
];
```

### Technology Stack

```javascript
export const technologies = [
  {
    name: "JavaScript",
    icon: javascript,  // Import from assets
  },
  // Add more...
];
```

### Testimonials

```javascript
export const testimonials = [
  {
    testimonial: "Quote here",
    name: "Client Name",
    designation: "CEO",
    company: "Company Name",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];
```

---

## Logo & Branding

### Favicon

Replace `public/favicon.svg` with your own logo.

### Header Logo

Replace `src/assets/logo.svg` with your branding.

### Company Logos

Add company logos to `src/assets/company/` and import in `index.js`.

---

## Styling Customization

### Colors

Edit `tailwind.config.cjs`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#050816",      // Background
        secondary: "#aaa6c3",    // Text
        tertiary: "#151030",     // Cards
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
    },
  },
};
```

### Fonts

Edit `src/index.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");
```

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_APP_EMAILJS_SERVICE_ID` | EmailJS service identifier | `service_jyfq8sh` |
| `VITE_APP_EMAILJS_TEMPLATE_ID` | EmailJS template identifier | `template_5rkq342` |
| `VITE_APP_EMAILJS_PUBLIC_KEY` | EmailJS public key | `1ALCa5hAgf4qO-UQy` |

**Important**: All Vite env vars must start with `VITE_APP_` prefix to be accessible in client-side code.

---

## Next Steps

- ✅ Configuration complete
- 🎨 Test locally with `npm run dev`
- 🚀 [Deploy to production](./DEPLOYMENT.md)
