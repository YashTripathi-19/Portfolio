# 🔧 Low-Level Design (LLD)

Detailed component implementation and data flows.

---

## Application Entry Point

```
main.jsx
   │
   ├─► ReactDOM.createRoot(document.getElementById('root'))
   │
   └─► Renders <App />
           │
           └─► <BrowserRouter>
                   │
                   ├─► <Navbar />
                   ├─► <Hero />
                   ├─► <About />
                   ├─► <Experience />
                   ├─► <Tech />
                   ├─► <Works />
                   ├─► <Feedbacks />
                   ├─► <Contact />
                   └─► <Footer />
```

---

## Component State Management

### Navbar Component
```javascript
States:
  • active: string (current section)
  • toggle: boolean (mobile menu)
  • scrolled: boolean (navbar transparency)

Effects:
  • window.addEventListener('scroll', handleScroll)
  
Cleanup:
  • removeEventListener on unmount
```

### Contact Component
```javascript
States:
  • form: { name, email, message }
  • loading: boolean

Refs:
  • formRef: useRef() for EmailJS

Effects:
  • emailjs.init(PUBLIC_KEY) on mount

Handlers:
  • handleChange(e) → Updates form state
  • handleSubmit(e) → EmailJS API call
```

### 3D Canvas Components
```javascript
Common Pattern:
  • useGLTF() → Load model
  • <Canvas> → WebGL context
  • <Suspense> → Loading fallback
  • <OrbitControls> → Interaction
  • useFrame() → Animation loop
```

---

## Component Hierarchy

```
App
├── Navbar
│   ├── Logo (SVG)
│   ├── Desktop Menu
│   │   └── navLinks.map() → Link
│   └── Mobile Menu
│       ├── Hamburger Icon
│       └── Dropdown
│           └── navLinks.map() → Link
│
├── Hero
│   ├── Introduction Text
│   │   ├── Heading with Name
│   │   └── Tagline
│   ├── ComputersCanvas
│   │   └── Computers (3D Model)
│   │       ├── PerspectiveCamera
│   │       ├── Lights (Hemisphere, Spot, Point)
│   │       ├── GLTF Model
│   │       └── OrbitControls
│   └── Scroll Indicator (Animated)
│
├── About (SectionWrapper HOC)
│   ├── Section Title
│   ├── Description
│   └── services.map() → ServiceCard
│       └── Tilt Component
│           ├── Icon
│           └── Title
│
├── Experience (SectionWrapper HOC)
│   └── VerticalTimeline
│       └── experiences.map() → TimelineElement
│           ├── Company Logo
│           ├── Role & Duration
│           └── Points (bullets)
│
├── Tech (SectionWrapper HOC)
│   └── technologies.map() → BallCanvas
│       └── Ball (3D Sphere)
│           ├── Decal (icon texture)
│           └── Float animation
│
├── Works (SectionWrapper HOC)
│   ├── Section Title
│   ├── Description
│   └── projects.map() → ProjectCard
│       ├── Tilt Component
│       ├── Project Image
│       ├── GitHub Icon Button
│       ├── Title & Description
│       ├── Tags (tech stack)
│       └── Action Button (Visit Website/Repo)
│
├── Feedbacks (SectionWrapper HOC)
│   ├── Section Title
│   └── testimonials.map() → FeedbackCard
│       ├── Quote Icon
│       ├── Testimonial Text
│       └── Client Info
│
├── Contact (SectionWrapper HOC)
│   ├── Form (Left Column)
│   │   ├── Name Input
│   │   ├── Email Input
│   │   ├── Message Textarea
│   │   └── Submit Button
│   └── EarthCanvas (Right Column)
│       └── Earth (3D Model)
│           └── Auto-rotation
│
└── Footer
    ├── Social Links
    │   ├── GitHub
    │   ├── LinkedIn
    │   └── Email
    └── Copyright
```

---

## Data Flow Patterns

### Static Data Flow
```
src/constants/index.js (static data)
    │
    ├─► navLinks → Navbar
    ├─► services → About
    ├─► technologies → Tech
    ├─► experiences → Experience
    ├─► testimonials → Feedbacks
    └─► projects → Works (if not using GitHub fetch)
```

### Dynamic Data Flow
```
npm run build triggers:
    │
    └─► scripts/fetchGithubProjects.js
            │
            ├─► GitHub API call
            ├─► Filter & process repos
            └─► Generate src/constants/githubProjects.js
                    │
                    └─► Imported by Works component
```

### Form Submission Flow
```
User fills form
    │
    ├─► handleChange() updates state
    │
    └─► handleSubmit()
            │
            ├─► Validate inputs
            ├─► setLoading(true)
            └─► emailjs.sendForm()
                    │
                    ├─── SUCCESS ──► Alert + Reset form
                    │
                    └─── ERROR ────► Alert + Keep form
```

---

## Animation Patterns

### Framer Motion Variants
```javascript
// Text Animation
textVariant(delay) {
  return {
    hidden: { y: -50, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", delay }
    }
  };
}

// Fade In Animation
fadeIn(direction, type, delay, duration) {
  return {
    hidden: {
      x: direction === "left" ? 100 : -100,
      y: direction === "up" ? 100 : -100,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { type, delay, duration }
    }
  };
}
```

### Usage
```jsx
<motion.div variants={fadeIn("up", "spring", 0.5, 0.75)}>
  <ProjectCard {...project} />
</motion.div>
```

---

## Higher-Order Component Pattern

### SectionWrapper HOC
```javascript
const SectionWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className='padding max-w-7xl mx-auto relative z-0'
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>
        <Component />
      </motion.section>
    );
  };

// Usage
export default SectionWrapper(Contact, "contact");
```

**Benefits**:
- Consistent section spacing
- Automatic scroll anchors
- Reusable animation triggers
- DRY principle

---

## 3D Rendering Pipeline Detail

### Model Loading
```javascript
// useGLTF hook
const { scene } = useGLTF('/desktop_pc/scene.gltf');

// Behind the scenes:
1. Fetch .gltf file (JSON scene graph)
2. Parse scene structure
3. Load .bin file (binary geometry data)
4. Fetch textures (PNG/JPEG)
5. Create Three.js meshes
6. Apply materials and textures
7. Add to scene graph
```

### Animation Loop
```javascript
useFrame((state, delta) => {
  // Called every frame (~60 FPS)
  
  // Rotate Earth model
  earthRef.current.rotation.y += delta * 0.5;
  
  // Update camera based on mouse
  camera.position.x = lerp(camera.position.x, mouseX, 0.05);
  
  // Update controls
  controls.update();
});
```

### Lighting Setup
```javascript
<hemisphereLight
  intensity={0.15}
  groundColor='black'
/>

<spotLight
  position={[-20, 50, 10]}
  angle={0.12}
  penumbra={1}
  intensity={1}
  castShadow
  shadow-mapSize={1024}
/>

<pointLight intensity={1} />
```

---

## EmailJS Integration Details

### Initialization
```javascript
useEffect(() => {
  emailjs.init(import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY);
}, []);
```

### API Call
```javascript
emailjs.sendForm(
  SERVICE_ID,    // 'service_jyfq8sh'
  TEMPLATE_ID,   // 'template_5rkq342'
  formRef.current // DOM reference to <form>
)
.then((result) => {
  // result.status === 200
  // result.text === 'OK'
})
.catch((error) => {
  // error.status
  // error.text
});
```

### Request Details
```
POST https://api.emailjs.com/api/v1.0/email/send-form

Headers:
  Content-Type: application/x-www-form-urlencoded

Body:
  service_id=service_jyfq8sh
  template_id=template_5rkq342
  user_id=1ALCa5hAgf4qO-UQy
  template_params[name]=...
  template_params[email]=...
  template_params[message]=...
```

---

## Routing Implementation

### Client-Side Routing
```javascript
// BrowserRouter provides routing context
<BrowserRouter>
  <App />
</BrowserRouter>

// React Router DOM used for:
// - Browser history management
// - URL state synchronization
// - Future multi-page support
```

### Smooth Scrolling
```javascript
// Navbar links use anchor scrolling
<a href='#about'>About</a>

// Implemented in CSS
html {
  scroll-behavior: smooth;
}
```

---

## Performance Optimizations

### Code Splitting (Vite)
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'react-vendor': ['react', 'react-dom'],
          'motion': ['framer-motion'],
        }
      }
    }
  }
});
```

### Lazy Loading
```jsx
<Suspense fallback={<CanvasLoader />}>
  <OrbitControls />
  <Computers />
</Suspense>
```

### Memoization Opportunities
```javascript
// Potential optimizations
const MemoizedProjectCard = React.memo(ProjectCard);
const cachedProjects = useMemo(() => processProjects(), []);
```

---

## Error Handling

### 3D Model Loading Errors
```javascript
try {
  const model = useGLTF('/model.gltf');
} catch (error) {
  console.error('Model loading failed:', error);
  // Fallback: Show static image
}
```

### EmailJS Errors
```javascript
.catch((error) => {
  console.error('EmailJS Error:', error);
  alert('Failed to send. Please try again.');
  // Keep form data for retry
});
```

### GitHub API Errors
```javascript
if (!response.ok) {
  console.warn('GitHub API failed, using fallback');
  return getFallbackProjects();
}
```

---

## Next: Architecture Deep Dive

- [Component Architecture](./COMPONENTS.md) - Detailed component specs
- [Build Process](./BUILD.md) - Build pipeline and optimization
