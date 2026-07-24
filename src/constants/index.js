import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  docker,
  carbonsync,
  auberon,
  ieee,
  ecell,
  carbonsyncProject,
  auberonProject,
  blockchainProject,
  portfolioProject,
  githubProject,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "REST API Architect",
    icon: web,
  },
  {
    title: "Spring Boot Engineer",
    icon: mobile,
  },
  {
    title: "System Designer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "docker",
    icon: docker,
  },
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
];

const experiences = [
  {
    title: "Backend Developer",
    company_name: "CarbonSync Project",
    icon: carbonsync,
    iconBg: "#383E56",
    date: "Jan 2026 - Present",
    points: [
      "Designed and built Spring Boot REST API backend with layered architecture across controllers, services, repositories, and DTOs.",
      "Implemented global exception handling and CORS/security configuration to harden API endpoints against malformed requests.",
      "Architected data layer and API contracts powering 3 role-based portals supporting 100+ emission records.",
      "Integrated CSV/JSON/PDF export functionality for real-time emissions tracking aligned with India's Net Zero 2070 mission.",
    ],
  },
  {
    title: "Backend Developer",
    company_name: "Auberon Pharmaceuticals",
    icon: auberon,
    iconBg: "#E6DEDD",
    date: "Apr 2026 - May 2026",
    points: [
      "Built JWT-based authentication with OTP verification, securing customer and admin access paths.",
      "Revamped stock management logic with automated order-expiry rules, decreasing stock write-offs by 40% monthly.",
      "Developed backend APIs for admin dashboard: order-lifecycle tracking, sales analytics, and automated email notifications.",
      "Designed product catalogue data model and ordering endpoints to handle concurrent orders without stock conflicts.",
    ],
  },
  {
    title: "Technical Team Member",
    company_name: "E-Cell PSIT",
    icon: ecell,
    iconBg: "#383E56",
    date: "Aug 2024 - Aug 2025",
    points: [
      "Led team to Top 10 finalists in Smart India Hackathon (SIH) Sept 2024 among 150+ competing teams.",
      "Contributed to technical projects and event organization for entrepreneurship initiatives.",
      "Collaborated with cross-functional teams on multiple technical and business-focused projects.",
      "Participated in organizing hackathons, workshops, and startup mentorship programs.",
    ],
  },
  {
    title: "Student Member",
    company_name: "IEEE Student Branch PSIT",
    icon: ieee,
    iconBg: "#E6DEDD",
    date: "Dec 2023 - Aug 2024",
    points: [
      "Won 1st place in CodingWars competition among 300+ participants (Feb 2024).",
      "Participated in technical workshops, seminars, and hackathons organized by IEEE.",
      "Contributed to student-led technical projects and collaborative learning initiatives.",
      "Earned HackerRank badges: Java (5★), Python (3★), and SQL (3★).",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Yash's backend architecture for CarbonSync is production-ready. His understanding of layered services and API design is exceptional.",
    name: "Project Mentor",
    designation: "Technical Advisor",
    company: "PSIT",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    testimonial:
      "Outstanding problem-solving skills. Yash consistently delivers clean, maintainable code with proper error handling.",
    name: "Team Lead",
    designation: "Senior Developer",
    company: "E-Cell PSIT",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    testimonial:
      "His work on Auberon Pharmaceuticals showed mature understanding of authentication, security, and database design. Impressive for a student.",
    name: "Code Reviewer",
    designation: "Backend Engineer",
    company: "Tech Community",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const projects = [
  {
    name: "Portfolio Website - Yash Tripathi",
    description:
      "Modern 3D portfolio website built with React, Three.js, and Framer Motion. Features interactive 3D models, smooth animations, responsive design, and EmailJS contact form integration. Showcases backend development projects and experience.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "threejs",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: portfolioProject,
    source_code_link: "https://github.com/YashTripathi-19/Portfolio",
    website_link: "https://github.com/YashTripathi-19/Portfolio",
    button_text: "Visit Repo",
  },
  {
    name: "CarbonSync - Carbon Compliance Platform",
    description:
      "Emissions-tracking platform connecting companies, auditors, and regulators with Spring Boot REST API, role-based authentication, and CSV/JSON/PDF export for 100+ emission records. Aligned with India's Net Zero 2070 mission.",
    tags: [
      {
        name: "java",
        color: "blue-text-gradient",
      },
      {
        name: "springboot",
        color: "green-text-gradient",
      },
      {
        name: "restapi",
        color: "pink-text-gradient",
      },
    ],
    image: carbonsyncProject,
    source_code_link: "https://github.com/YashTripathi-19/CarbonSync",
    website_link: "https://carbon-sync.netlify.app",
    button_text: "Visit Website",
  },
  {
    name: "Auberon Pharmaceuticals",
    description:
      "Production-grade pharmaceutical platform with JWT authentication, OTP verification, automated stock management reducing write-offs by 40%, and admin dashboard with order tracking and email notifications via Nodemailer.",
    tags: [
      {
        name: "nodejs",
        color: "blue-text-gradient",
      },
      {
        name: "typescript",
        color: "green-text-gradient",
      },
      {
        name: "jwt",
        color: "pink-text-gradient",
      },
    ],
    image: auberonProject,
    source_code_link: "https://github.com/YashTripathi-19/Auberon-Pharmaceuticals",
    website_link: "https://auberon-pharma.vercel.app",
    button_text: "Visit Website",
  },
  {
    name: "Block-Chained To-Do List",
    description:
      "Decentralized task-management DApp built on Ethereum with Solidity smart contracts as the backend logic layer, ensuring secure, immutable, and tamper-proof task storage on-chain with Web3.js integration.",
    tags: [
      {
        name: "solidity",
        color: "blue-text-gradient",
      },
      {
        name: "ethereum",
        color: "green-text-gradient",
      },
      {
        name: "web3js",
        color: "pink-text-gradient",
      },
    ],
    image: blockchainProject,
    source_code_link: "https://github.com/YashTripathi-19/Block-Chained-Todo-List",
    website_link: "https://github.com/YashTripathi-19/Block-Chained-Todo-List",
    button_text: "Visit Repo",
  },
  {
    name: "Explore More Projects",
    description:
      "Visit my GitHub profile to explore 15+ repositories including backend APIs, microservices, database projects, and more. Each project demonstrates production-ready code, clean architecture, and modern development practices.",
    tags: [
      {
        name: "15+ repos",
        color: "blue-text-gradient",
      },
      {
        name: "opensource",
        color: "green-text-gradient",
      },
      {
        name: "backend",
        color: "pink-text-gradient",
      },
    ],
    image: githubProject,
    source_code_link: "https://github.com/YashTripathi-19",
    website_link: "https://github.com/YashTripathi-19?tab=repositories",
    button_text: "Visit GitHub",
    is_github_card: true,
  },
];

export { services, technologies, experiences, testimonials, projects };
