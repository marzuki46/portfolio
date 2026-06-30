export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: "web" | "mobile" | "design" | "ai" | "other";
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  tags: string[];
  category: "AI" | "Web" | "Tutorial" | "Programming" | "Design" | "CSS" | "Animation";
  author: string;
  readTime: string;
  publishedAt: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "design" | "tools" | "soft";
  icon: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  links: SocialLink[];
}

export const siteConfig: SiteConfig = {
  name: "Marzuki",
  title: "Marzuki — Full Stack Developer & UI Designer",
  description:
    "Portfolio pribadi Marzuki, Full Stack Developer dengan passion di JavaScript, React, dan desain UI/UX modern.",
  url: "https://js.org",
  ogImage: "/og.jpg",
  links: [
    { name: "GitHub", url: "https://github.com/marzuki", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/marzuki", icon: "linkedin" },
    { name: "Twitter", url: "https://twitter.com/marzuki", icon: "twitter" },
    { name: "Instagram", url: "https://instagram.com/marzuki", icon: "instagram" },
  ],
};

export const skills: Skill[] = [
  { name: "React / Next.js", level: 95, category: "frontend", icon: "⚛️" },
  { name: "TypeScript", level: 90, category: "frontend", icon: "📘" },
  { name: "Tailwind CSS", level: 92, category: "frontend", icon: "🎨" },
  { name: "JavaScript", level: 95, category: "frontend", icon: "🟨" },
  { name: "Vue.js / Nuxt", level: 80, category: "frontend", icon: "💚" },
  { name: "HTML / CSS", level: 95, category: "frontend", icon: "🌐" },
  { name: "Node.js", level: 88, category: "backend", icon: "🟢" },
  { name: "Express.js", level: 85, category: "backend", icon: "🚂" },
  { name: "PostgreSQL", level: 78, category: "backend", icon: "🐘" },
  { name: "MongoDB", level: 75, category: "backend", icon: "🍃" },
  { name: "Prisma ORM", level: 85, category: "backend", icon: "🔷" },
  { name: "REST / GraphQL", level: 82, category: "backend", icon: "🔗" },
  { name: "Figma", level: 85, category: "design", icon: "🖌️" },
  { name: "Adobe XD", level: 75, category: "design", icon: "✏️" },
  { name: "UI/UX Design", level: 82, category: "design", icon: "🎯" },
  { name: "Git", level: 90, category: "tools", icon: "🔀" },
  { name: "Docker", level: 72, category: "tools", icon: "🐳" },
  { name: "VS Code", level: 95, category: "tools", icon: "💻" },
  { name: "Figma", level: 85, category: "tools", icon: "🎨" },
  { name: "Komunikasi", level: 90, category: "soft", icon: "💬" },
  { name: "Problem Solving", level: 92, category: "soft", icon: "🧩" },
  { name: "Team Work", level: 88, category: "soft", icon: "🤝" },
];

export const projects: Project[] = [
  {
    id: "1",
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    description: "Platform e-commerce modern dengan Next.js, fitur real-time inventory, payment gateway, dan dashboard admin.",
    longDescription: "Platform e-commerce lengkap dengan fitur manajemen produk, keranjang belanja, checkout dengan Midtrans, dashboard real-time analytics, dan manajemen inventori.",
    image: "/projects/ecommerce.jpg",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind"],
    demoUrl: "https://ecommerce-demo.vercel.app",
    githubUrl: "https://github.com/marzuki/ecommerce",
    featured: true,
    category: "web",
    createdAt: "2025-12-01",
  },
  {
    id: "2",
    slug: "task-management-app",
    title: "Task Management App",
    description: "Aplikasi manajemen tugas kolaboratif dengan drag & drop, real-time updates, dan integrasi tim.",
    image: "/projects/taskapp.jpg",
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "DnD"],
    demoUrl: "https://taskapp-demo.vercel.app",
    githubUrl: "https://github.com/marzuki/taskapp",
    featured: true,
    category: "web",
    createdAt: "2025-09-15",
  },
  {
    id: "3",
    slug: "ai-content-generator",
    title: "AI Content Generator",
    description: "Generator konten berbasis AI dengan OpenAI API, support berbagai format dan template.",
    image: "/projects/ai.jpg",
    tags: ["Next.js", "OpenAI", "TypeScript", "Prisma"],
    demoUrl: "https://ai-content-demo.vercel.app",
    featured: true,
    category: "ai",
    createdAt: "2025-07-20",
  },
  {
    id: "4",
    slug: "portfolio-dashboard",
    title: "Portfolio Dashboard",
    description: "Dashboard interaktif untuk portfolio dengan CMS, analytics, dan manajemen konten.",
    image: "/projects/dashboard.jpg",
    tags: ["Next.js", "Recharts", "Tailwind", "Framer Motion"],
    githubUrl: "https://github.com/marzuki/portfolio",
    featured: true,
    category: "web",
    createdAt: "2025-06-10",
  },
  {
    id: "5",
    slug: "fitness-tracker-mobile",
    title: "Fitness Tracker Mobile",
    description: "Aplikasi fitness tracker dengan React Native, health APIs, dan progress visualization.",
    image: "/projects/fitness.jpg",
    tags: ["React Native", "Expo", "TypeScript", "Health Kit"],
    featured: false,
    category: "mobile",
    createdAt: "2025-04-05",
  },
  {
    id: "6",
    slug: "brand-identity-design",
    title: "Brand Identity Design",
    description: "Brand identity untuk startup tech, termasuk logo, color system, dan design guidelines.",
    image: "/projects/brand.jpg",
    tags: ["Figma", "Illustrator", "Branding"],
    featured: false,
    category: "design",
    createdAt: "2025-02-20",
  },
  {
    id: "7",
    slug: "real-time-chat-app",
    title: "Real-time Chat App",
    description: "Aplikasi chat real-time dengan fitur group chat, file sharing, dan video call.",
    image: "/projects/chat.jpg",
    tags: ["React", "Socket.io", "WebRTC", "Node.js"],
    demoUrl: "https://chat-demo.vercel.app",
    githubUrl: "https://github.com/marzuki/chat",
    featured: false,
    category: "web",
    createdAt: "2025-01-15",
  },
  {
    id: "8",
    slug: "weather-dashboard",
    title: "Weather Dashboard",
    description: "Dashboard cuaca interaktif dengan visualisasi data, forecast, dan multiple locations.",
    image: "/projects/weather.jpg",
    tags: ["React", "D3.js", "OpenWeather API"],
    demoUrl: "https://weather-demo.vercel.app",
    featured: false,
    category: "web",
    createdAt: "2024-12-01",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "membangun-aplikasi-modern-dengan-nextjs-15",
    title: "Membangun Aplikasi Modern dengan Next.js 15",
    excerpt: "Panduan lengkap membangun aplikasi web modern menggunakan Next.js 15 dengan App Router, Server Actions, dan fitur terbaru lainnya.",
    image: "/blog/nextjs.jpg",
    tags: ["Next.js", "React", "TypeScript", "Tutorial"],
    category: "Web",
    author: "Marzuki",
    readTime: "8 min read",
    publishedAt: "2025-11-20",
    featured: true,
  },
  {
    id: "2",
    slug: "tips-meningkatkan-performa-react-apps",
    title: "Tips Meningkatkan Performa React Apps",
    excerpt: "Pelajari teknik-teknik optimasi performa untuk aplikasi React, dari code splitting hingga memoization strategies.",
    image: "/blog/performance.jpg",
    tags: ["React", "Performance", "Optimization"],
    category: "Programming",
    author: "Marzuki",
    readTime: "6 min read",
    publishedAt: "2025-10-15",
    featured: true,
  },
  {
    id: "3",
    slug: "desain-uiux-untuk-developer",
    title: "Desain UI/UX untuk Developer",
    excerpt: "Panduan praktis untuk developer yang ingin meningkatkan skill desain UI/UX, dari prinsip dasar hingga tools terbaik.",
    image: "/blog/uiux.jpg",
    tags: ["UI/UX", "Design", "Figma"],
    category: "Design",
    author: "Marzuki",
    readTime: "10 min read",
    publishedAt: "2025-09-10",
    featured: true,
  },
  {
    id: "4",
    slug: "memahami-typescript-generics",
    title: "Memahami TypeScript Generics",
    excerpt: "Deep dive ke TypeScript Generics, dari konsep dasar hingga penggunaan advanced untuk type-safe code.",
    image: "/blog/typescript.jpg",
    tags: ["TypeScript", "JavaScript", "Programming"],
    category: "Programming",
    author: "Marzuki",
    readTime: "12 min read",
    publishedAt: "2025-08-05",
    featured: false,
  },
  {
    id: "5",
    slug: "animasi-web-dengan-framer-motion",
    title: "Animasi Web dengan Framer Motion",
    excerpt: "Tutorial lengkap membuat animasi web yang smooth dan engaging menggunakan Framer Motion di React.",
    image: "/blog/animations.jpg",
    tags: ["Framer Motion", "React", "Animation"],
    category: "Animation",
    author: "Marzuki",
    readTime: "7 min read",
    publishedAt: "2025-07-01",
    featured: false,
  },
  {
    id: "6",
    slug: "best-practices-css-modern",
    title: "Best Practices CSS Modern",
    excerpt: "Kumpulan best practices CSS modern untuk membangun layout yang responsive, maintainable, dan scalable.",
    image: "/blog/css.jpg",
    tags: ["CSS", "Tailwind", "Frontend"],
    category: "CSS",
    author: "Marzuki",
    readTime: "9 min read",
    publishedAt: "2025-06-15",
    featured: false,
  },
];

export const stats = {
  projectsCompleted: 50,
  happyClients: 25,
  githubStars: 120,
  yearsExperience: 5,
};

export const testimonials = [
  {
    name: "Andi Pratama",
    role: "CEO, TechStartup",
    content: "Bekerja dengan Marzuki sangat luar biasa! Kode yang bersih, komunikasi yang baik, dan hasil yang melebihi ekspektasi.",
    avatar: "/avatars/1.jpg",
  },
  {
    name: "Siti Rahmawati",
    role: "Product Manager, DigitalCrop",
    content: "Profesionalisme dan keahlian teknis yang dimiliki Marzuki benar-benar top notch. Sangat recommended!",
    avatar: "/avatars/2.jpg",
  },
  {
    name: "Budi Santoso",
    role: "Founder, WebStudio",
    content: "Kolaborasi dengan Marzuki selalu menyenangkan. Kemampuannya dalam memahami kebutuhan client sangat baik.",
    avatar: "/avatars/3.jpg",
  },
];