import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_USERNAME = 'YashTripathi-19';
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Featured projects to always show first (in order)
const FEATURED_PROJECTS = [
  'Portfolio',
  'CarbonSync',
  'Auberon-Pharmaceuticals',
  'Block-Chained-To-Do-List'
];

function getFallbackProjects() {
  console.log('📋 Using manual fallback projects');
  return [
    {
      name: "Portfolio",
      description: "Modern 3D portfolio website built with React, Three.js, and Framer Motion. Features interactive 3D models, smooth animations, responsive design, and EmailJS contact form integration.",
      language: "JavaScript",
      topics: ["react", "threejs", "tailwind"],
      homepage: "",
      html_url: "https://github.com/YashTripathi-19/Portfolio",
      stargazers_count: 0,
      updated_at: new Date().toISOString()
    },
    {
      name: "CarbonSync",
      description: "Emissions-tracking platform connecting companies, auditors, and regulators with Spring Boot REST API, role-based authentication, and CSV/JSON/PDF export for 100+ emission records.",
      language: "Java",
      topics: ["java", "springboot", "restapi"],
      homepage: "https://carbon-sync.netlify.app",
      html_url: "https://github.com/YashTripathi-19/CarbonSync",
      stargazers_count: 0,
      updated_at: new Date().toISOString()
    },
    {
      name: "Auberon-Pharmaceuticals",
      description: "Production-grade pharmaceutical platform with JWT authentication, OTP verification, automated stock management reducing write-offs by 40%, and admin dashboard.",
      language: "TypeScript",
      topics: ["nodejs", "typescript", "jwt"],
      homepage: "https://auberon-pharma.vercel.app",
      html_url: "https://github.com/YashTripathi-19/Auberon-Pharmaceuticals",
      stargazers_count: 0,
      updated_at: new Date().toISOString()
    },
    {
      name: "Block-Chained-To-Do-List",
      description: "Decentralized task-management DApp built on Ethereum with Solidity smart contracts as the backend logic layer, ensuring secure, immutable task storage.",
      language: "Solidity",
      topics: ["solidity", "ethereum", "web3js"],
      homepage: "",
      html_url: "https://github.com/YashTripathi-19/Block-Chained-To-Do-List",
      stargazers_count: 0,
      updated_at: new Date().toISOString()
    }
  ];
}

function processRepos(repos, totalCount) {
  // Separate featured and other repos
  const featuredRepos = [];
  const otherRepos = [];
  
  repos.forEach(repo => {
    if (FEATURED_PROJECTS.includes(repo.name)) {
      featuredRepos.push(repo);
    } else {
      otherRepos.push(repo);
    }
  });
  
  // Sort featured repos by the order in FEATURED_PROJECTS
  featuredRepos.sort((a, b) => {
    return FEATURED_PROJECTS.indexOf(a.name) - FEATURED_PROJECTS.indexOf(b.name);
  });
  
  // Take top 1 from other repos (by stars and recent updates)
  const topOtherRepos = otherRepos
    .sort((a, b) => {
      // Sort by stars first, then by updated date
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at) - new Date(a.updated_at);
    })
    .slice(0, 1);
  
  // Combine: featured first, then top others
  const selectedRepos = [...featuredRepos, ...topOtherRepos].slice(0, 5);
  
  // Generate project data
  const projects = selectedRepos.map(repo => {
    const topics = repo.topics || [];
    const description = repo.description || 'A project showcasing development skills and best practices.';
    
    // Determine tech tags from topics or language
    const tags = topics.slice(0, 3).map((topic, index) => ({
      name: topic,
      color: index === 0 ? 'blue-text-gradient' : index === 1 ? 'green-text-gradient' : 'pink-text-gradient'
    }));
    
    // If no topics, use language
    if (tags.length === 0 && repo.language) {
      tags.push({
        name: repo.language.toLowerCase(),
        color: 'blue-text-gradient'
      });
    }
    
    // Determine button text and links
    const hasWebsite = repo.homepage && repo.homepage.trim() !== '';
    const buttonText = hasWebsite ? 'Visit Website' : 'Visit Repo';
    const websiteLink = hasWebsite ? repo.homepage : repo.html_url;
    
    return {
      name: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
      description: description.length > 200 ? description.substring(0, 200) + '...' : description,
      tags,
      image: `${repo.name.toLowerCase().replace(/\s+/g, '-')}-project.png`,
      source_code_link: repo.html_url,
      website_link: websiteLink,
      button_text: buttonText,
      repo_name: repo.name
    };
  });
  
  // Add "Explore More Projects" card at the end
  projects.push({
    name: "Explore More Projects",
    description: `Visit my GitHub profile to explore ${totalCount}+ repositories including backend APIs, microservices, database projects, and more. Each project demonstrates production-ready code, clean architecture, and modern development practices.`,
    tags: [
      { name: `${totalCount}+ repos`, color: "blue-text-gradient" },
      { name: "opensource", color: "green-text-gradient" },
      { name: "backend", color: "pink-text-gradient" }
    ],
    image: "github-project.png",
    source_code_link: `https://github.com/${GITHUB_USERNAME}`,
    website_link: `https://github.com/${GITHUB_USERNAME}?tab=repositories`,
    button_text: "Visit GitHub",
    is_github_card: true
  });
  
  console.log(`📦 Generated ${projects.length} project cards (${selectedRepos.length} repos + 1 GitHub card)`);
  
  return projects;
}

async function fetchGithubRepos() {
  try {
    console.log('🔍 Fetching GitHub repositories...');
    
    const response = await fetch(`${GITHUB_API}?sort=updated&per_page=100`, {
      headers: {
        'User-Agent': 'Portfolio-Website',
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!response.ok) {
      console.warn(`⚠️  GitHub API returned ${response.status}. Using fallback projects...`);
      const fallbackRepos = getFallbackProjects();
      return processRepos(fallbackRepos, 4); // 4 fallback projects
    }
    
    const repos = await response.json();
    
    // Filter out forks and select active projects
    const validRepos = repos.filter(repo => 
      !repo.fork && 
      !repo.archived &&
      repo.name !== GITHUB_USERNAME
    );
    
    console.log(`✅ Found ${validRepos.length} repositories`);
    
    return processRepos(validRepos, validRepos.length);
    
  } catch (error) {
    console.error('❌ Error fetching GitHub repos:', error.message);
    const fallbackRepos = getFallbackProjects();
    return processRepos(fallbackRepos, 4);
  }
}

async function updateProjectsFile(projects) {
  try {
    const projectsFilePath = path.join(__dirname, '../src/constants/githubProjects.js');
    
    const fileContent = `// Auto-generated by fetchGithubProjects.js
// Last updated: ${new Date().toISOString()}

export const githubProjects = ${JSON.stringify(projects, null, 2)};
`;
    
    fs.writeFileSync(projectsFilePath, fileContent, 'utf8');
    console.log('✅ Updated githubProjects.js');
    
  } catch (error) {
    console.error('❌ Error writing projects file:', error.message);
    throw error;
  }
}

async function main() {
  try {
    console.log('🚀 Starting GitHub project fetch...\n');
    const projects = await fetchGithubRepos();
    await updateProjectsFile(projects);
    console.log('\n✨ GitHub projects updated successfully!');
    console.log('📝 Projects included:');
    projects.forEach((project, index) => {
      console.log(`   ${index + 1}. ${project.name}${project.is_github_card ? ' (GitHub Card)' : ''}`);
    });
  } catch (error) {
    console.error('\n💥 Failed to update GitHub projects');
    process.exit(1);
  }
}

main();
