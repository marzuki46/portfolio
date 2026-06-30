import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // Create default admin user
  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: "admin123",
      name: "Administrator",
      email: "admin@portfolio.com",
      role: "admin",
    },
  });

  console.log("Created admin user:", admin.username);

  // Seed projects
  const projects = [
    {
      slug: "ai-powered-ecommerce",
      title: "AI-Powered E-Commerce Platform",
      description: "Platform e-commerce modern dengan integrasi AI untuk rekomendasi produk dan chatbot customer service.",
      longDescription: "Platform e-commerce canggih yang memanfaatkan kecerdasan buatan untuk memberikan pengalaman belanja yang personal. Dilengkapi dengan sistem rekomendasi produk berbasis machine learning, chatbot customer service 24/7, dan analitik prediktif untuk manajemen inventaris.",
      tags: JSON.stringify(["Next.js", "Python", "TensorFlow", "PostgreSQL", "Docker"]),
      demoUrl: "https://demo-ecommerce.vercel.app",
      githubUrl: "https://github.com/marzuki46/ai-ecommerce",
      featured: true,
      category: "web",
      metaTitle: "AI-Powered E-Commerce Platform - Marzuki Portfolio",
      metaDescription: "Platform e-commerce modern dengan AI untuk rekomendasi produk, chatbot customer service, dan analitik prediktif.",
      metaKeywords: "e-commerce, AI, machine learning, chatbot, rekomendasi produk",
    },
    {
      slug: "rpa-automation-tool",
      title: "RPA Automation Tool",
      description: "Aplikasi Robotic Process Automation untuk automasi workflow bisnis dengan drag-and-drop interface.",
      longDescription: "Tool RPA yang memungkinkan perusahaan mengotomatiskan proses bisnis berulang tanpa coding. Dengan visual workflow builder, pengguna dapat membuat automasi kompleks hanya dengan drag-and-drop.",
      tags: JSON.stringify(["Python", "React", "Node.js", "Selenium", "Redis"]),
      demoUrl: null,
      githubUrl: "https://github.com/marzuki46/rpa-tool",
      featured: true,
      category: "web",
      metaTitle: "RPA Automation Tool - Marzuki Portfolio",
      metaDescription: "Aplikasi Robotic Process Automation dengan drag-and-drop interface untuk automasi workflow bisnis.",
      metaKeywords: "RPA, automation, robotic process automation, workflow, drag-drop",
    },
    {
      slug: "mobile-banking-app",
      title: "Mobile Banking App",
      description: "Aplikasi mobile banking dengan UI/UX modern, fitur keamanan biometrik, dan real-time notifications.",
      longDescription: "Aplikasi mobile banking yang dirancang dengan fokus pada keamanan dan kemudahan penggunaan. Dilengkapi dengan autentikasi biometrik (fingerprint & face ID), notifikasi real-time untuk transaksi, dan dashboard analitik keuangan pribadi.",
      tags: JSON.stringify(["React Native", "TypeScript", "Firebase", "Node.js"]),
      demoUrl: null,
      githubUrl: "https://github.com/marzuki46/mobile-banking",
      featured: true,
      category: "mobile",
      metaTitle: "Mobile Banking App - Marzuki Portfolio",
      metaDescription: "Aplikasi mobile banking dengan UI/UX modern, keamanan biometrik, dan notifikasi real-time.",
      metaKeywords: "mobile banking, fintech, biometric, react native, keamanan",
    },
    {
      slug: "design-system-library",
      title: "Design System Library",
      description: "Library komponen UI yang reusable dengan dokumentasi interaktif dan dark mode support.",
      longDescription: "Design system yang komprehensif berisi komponen UI yang dapat digunakan kembali, lengkap dengan dokumentasi interaktif menggunakan Storybook, theme customization, dan dukungan dark/light mode.",
      tags: JSON.stringify(["React", "TypeScript", "Tailwind CSS", "Storybook"]),
      demoUrl: "https://design-system-demo.vercel.app",
      githubUrl: "https://github.com/marzuki46/design-system",
      featured: false,
      category: "design",
      metaTitle: "Design System Library - Marzuki Portfolio",
      metaDescription: "Library komponen UI reusable dengan dokumentasi interaktif Storybook dan dark mode support.",
      metaKeywords: "design system, UI components, storybook, tailwindcss, react",
    },
    {
      slug: "ai-content-generator",
      title: "AI Content Generator",
      description: "Aplikasi generative AI untuk membuat konten blog, social media, dan marketing copy.",
      longDescription: "Generator konten berbasis AI yang dapat menghasilkan artikel blog, caption social media, email marketing, dan copy iklan. Didukung oleh GPT-4 dan model AI terkini untuk hasil yang natural dan berkualitas.",
      tags: JSON.stringify(["Python", "FastAPI", "OpenAI", "React", "MongoDB"]),
      demoUrl: "https://ai-content-gen.vercel.app",
      githubUrl: "https://github.com/marzuki46/ai-content-gen",
      featured: true,
      category: "ai",
      metaTitle: "AI Content Generator - Marzuki Portfolio",
      metaDescription: "Aplikasi generative AI untuk membuat konten blog, social media, dan marketing copy berkualitas.",
      metaKeywords: "AI, content generator, GPT-4, OpenAI, content marketing",
    },
    {
      slug: "analytics-dashboard",
      title: "Analytics Dashboard",
      description: "Dashboard analitik interaktif dengan real-time data visualization dan predictive analytics.",
      longDescription: "Dashboard analitik yang powerful dengan visualisasi data real-time, grafik interaktif, dan fitur predictive analytics menggunakan machine learning untuk forecasting tren.",
      tags: JSON.stringify(["Next.js", "D3.js", "Python", "PostgreSQL", "WebSocket"]),
      demoUrl: "https://analytics-dash.vercel.app",
      githubUrl: "https://github.com/marzuki46/analytics-dashboard",
      featured: false,
      category: "web",
      metaTitle: "Analytics Dashboard - Marzuki Portfolio",
      metaDescription: "Dashboard analitik interaktif dengan real-time data visualization dan predictive analytics berbasis ML.",
      metaKeywords: "analytics, dashboard, data visualization, D3.js, predictive analytics",
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }

  console.log(`Seeded ${projects.length} projects`);

  // Seed blog posts
  const blogPosts = [
    {
      slug: "masa-depan-ai-automasi-bisnis-2026",
      title: "Masa Depan AI dalam Automasi Bisnis 2026",
      excerpt: "Bagaimana AI dan RPA mengubah lanskap bisnis di era digital, dari chatbot hingga predictive analytics.",
      content: `# Masa Depan AI dalam Automasi Bisnis 2026

## Pendahuluan
Tahun 2026 menandai era baru dalam transformasi digital bisnis. Kecerdasan Buatan (AI) dan Robotic Process Automation (RPA) telah menjadi tulang punggung operasional perusahaan modern.

## Perkembangan AI dalam Bisnis
AI telah berevolusi dari sekadar alat bantu menjadi mitra strategis dalam pengambilan keputusan bisnis. Dengan kemampuan machine learning yang semakin canggih, AI kini mampu:

- Menganalisis pola konsumen dengan akurasi tinggi
- Mengoptimalkan rantai supply secara real-time
- Memprediksi tren pasar dengan presisi

## Implementasi RPA
RPA telah menjadi standar dalam automasi proses bisnis berulang. Perusahaan mengadopsi RPA untuk:

1. Automasi entri data dan dokumentasi
2. Manajemen inventaris otomatis
3. Proses payroll dan HR
4. Customer service chatbot

## Kesimpulan
Integrasi AI dan RPA akan terus mendorong efisiensi bisnis di masa depan. Perusahaan yang mengadopsi teknologi ini akan memiliki keunggulan kompetitif yang signifikan.`,
      tags: JSON.stringify(["AI", "Automasi", "Teknologi"]),
      category: "Teknologi",
      author: "Marzuki",
      readTime: "5 min",
      published: true,
      featured: true,
      metaTitle: "Masa Depan AI dalam Automasi Bisnis 2026 | Marzuki Blog",
      metaDescription: "Bagaimana AI dan RPA mengubah lanskap bisnis di era digital - dari chatbot hingga predictive analytics.",
      metaKeywords: "AI, automasi bisnis, RPA, masa depan teknologi, 2026",
      publishedAt: new Date("2026-01-15"),
    },
    {
      slug: "membangun-rpa-pipeline-python",
      title: "Membangun RPA Pipeline dengan Python",
      excerpt: "Tutorial lengkap membangun Robotic Process Automation pipeline menggunakan Python dan Selenium.",
      content: `# Membangun RPA Pipeline dengan Python

## Pendahuluan
Python telah menjadi bahasa pemrograman utama untuk RPA karena kesederhanaan dan ekosistem library yang kaya.

## Persiapan
Sebelum memulai, pastikan Anda memiliki:
- Python 3.11+
- Selenium WebDriver
- Chrome/Firefox browser
- IDE (VS Code direkomendasikan)

## Langkah-langkah
1. **Setup Environment** - Buat virtual environment dan install dependencies
2. **Web Scraping** - Gunakan Selenium untuk ekstraksi data
3. **Data Processing** - Olah data dengan Pandas
4. **Automasi** - Buat pipeline yang dapat dijadwalkan

## Kesimpulan
Dengan Python, membangun RPA pipeline menjadi lebih mudah dan efisien.`,
      tags: JSON.stringify(["Python", "RPA", "Tutorial"]),
      category: "Programming",
      author: "Marzuki",
      readTime: "8 min",
      published: true,
      featured: true,
      metaTitle: "Membangun RPA Pipeline dengan Python | Marzuki Blog",
      metaDescription: "Tutorial lengkap membangun RPA pipeline menggunakan Python dan Selenium untuk automasi proses bisnis.",
      metaKeywords: "Python, RPA, tutorial, Selenium, automasi, pipeline",
      publishedAt: new Date("2026-01-10"),
    },
    {
      slug: "nextjs-16-fitur-terbaru",
      title: "Next.js 16: Fitur Terbaru yang Wajib Dicoba",
      excerpt: "Eksplorasi fitur-fitur terbaru Next.js 16 termasuk Turbopack, server actions, dan partial prerendering.",
      content: `# Next.js 16: Fitur Terbaru

## Pendahuluan
Next.js 16 hadir dengan berbagai peningkatan performa dan fitur baru yang revolusioner.

## Fitur Utama

### Turbopack
Bundler baru yang 10x lebih cepat dari Webpack.

### Server Actions
Memungkinkan mutasi data langsung dari komponen server.

### Partial Prerendering
Kombinasi statis dan dinamis dalam satu halaman.

## Kesimpulan
Next.js 16 adalah lompatan besar dalam pengembangan web React.`,
      tags: JSON.stringify(["Next.js", "React", "Frontend"]),
      category: "Web",
      author: "Marzuki",
      readTime: "6 min",
      published: true,
      featured: true,
      metaTitle: "Next.js 16: Fitur Terbaru yang Wajib Dicoba | Marzuki Blog",
      metaDescription: "Eksplorasi fitur terbaru Next.js 16: Turbopack, Server Actions, Partial Prerendering, dan banyak lagi.",
      metaKeywords: "Next.js, React, frontend, Turbopack, Server Actions",
      publishedAt: new Date("2026-01-05"),
    },
    {
      slug: "optimasi-ai-model-production",
      title: "Optimasi AI Model untuk Production",
      excerpt: "Strategi dan best practices untuk mendeploy model machine learning ke production environment.",
      content: `# Optimasi AI Model untuk Production

## Pendahuluan
Mendeploy model ML ke production membutuhkan lebih dari sekadar akurasi tinggi.

## Strategi Optimasi
1. Model quantization untuk mengurangi ukuran
2. Containerization dengan Docker
3. Load balancing dan auto-scaling
4. Monitoring dan logging

## Best Practices
- Gunakan CI/CD untuk deployment
- Implement A/B testing
- Monitor model drift

## Kesimpulan
Production deployment yang sukses membutuhkan perencanaan matang dan tool yang tepat.`,
      tags: JSON.stringify(["AI", "MLOps", "Production"]),
      category: "Teknologi",
      author: "Marzuki",
      readTime: "7 min",
      published: true,
      featured: false,
      metaTitle: "Optimasi AI Model untuk Production | Marzuki Blog",
      metaDescription: "Strategi dan best practices untuk mendeploy dan mengoptimasi model ML di production environment.",
      metaKeywords: "AI, MLOps, production, deployment, machine learning",
      publishedAt: new Date("2025-12-20"),
    },
    {
      slug: "ui-ux-design-dengan-ai",
      title: "UI/UX Design dengan Bantuan AI",
      excerpt: "Memanfaatkan AI tools untuk mempercepat proses desain UI/UX tanpa mengorbankan kualitas.",
      content: `# UI/UX Design dengan AI

## Pendahuluan
AI telah menjadi asisten yang tak ternilai dalam proses desain UI/UX.

## AI Tools untuk Designer
- **Figma AI** - Generate layout otomatis
- **Midjourney** - Buat visual assets
- **Uizard** - Wireframe ke prototype

## Workflow Modern
Integrasi AI dalam workflow desain dapat mempercepat proses hingga 70%.

## Kesimpulan
AI bukan pengganti designer, tetapi alat yang memperkuat kreativitas.`,
      tags: JSON.stringify(["UI/UX", "AI", "Design"]),
      category: "Design",
      author: "Marzuki",
      readTime: "4 min",
      published: true,
      featured: false,
      metaTitle: "UI/UX Design dengan Bantuan AI | Marzuki Blog",
      metaDescription: "Manfaatkan AI tools untuk mempercepat proses desain UI/UX tanpa mengorbankan kualitas.",
      metaKeywords: "UI/UX, AI, design, Figma, Midjourney, Uizard",
      publishedAt: new Date("2025-12-10"),
    },
    {
      slug: "automasi-social-media-ai",
      title: "Automasi Social Media dengan AI Agents",
      excerpt: "Cara menggunakan AI agents untuk mengelola dan mengoptimalkan social media marketing secara otomatis.",
      content: `# Automasi Social Media dengan AI

## Pendahuluan
AI agents telah merevolusi cara kita mengelola social media.

## Fitur Automasi
- **Content Scheduling** - Jadwalkan posting otomatis
- **Analytics** - Analisis performa real-time
- **Engagement** - Balas komentar otomatis

## Tools yang Direkomendasikan
1. Hootsuite + AI
2. Buffer AI
3. Sprout Social

## Kesimpulan
Automasi social media dengan AI menghemat waktu dan meningkatkan engagement.`,
      tags: JSON.stringify(["AI", "Social Media", "Automasi"]),
      category: "Teknologi",
      author: "Marzuki",
      readTime: "6 min",
      published: false,
      featured: false,
      metaTitle: "Automasi Social Media dengan AI Agents | Marzuki Blog",
      metaDescription: "Cara menggunakan AI agents untuk mengelola social media marketing secara otomatis dan optimal.",
      metaKeywords: "AI, social media, automasi, marketing, agents",
      publishedAt: new Date("2025-12-01"),
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }

  console.log(`Seeded ${blogPosts.length} blog posts`);

  // Seed site settings
  const settings = [
    { key: "site_name", value: "Marzuki Portfolio" },
    { key: "site_description", value: "Full Stack Developer & UI Designer - Portfolio website showcasing projects, blog posts, and skills." },
    { key: "site_keywords", value: "portfolio, full stack developer, UI designer, web development, React, Next.js, TypeScript" },
    { key: "site_author", value: "Marzuki" },
    { key: "site_url", value: "https://marzuki.dev" },
    { key: "site_email", value: "hello@marzuki.dev" },
    { key: "site_location", value: "Jakarta, Indonesia" },
    { key: "site_theme", value: "system" },
    { key: "site_language", value: "id" },
    { key: "social_github", value: "https://github.com/marzuki46" },
    { key: "social_linkedin", value: "https://linkedin.com/in/marzuki" },
    { key: "social_twitter", value: "https://twitter.com/marzuki" },
    { key: "enable_notifications", value: "true" },
    { key: "public_profile", value: "true" },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log(`Seeded ${settings.length} site settings`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });