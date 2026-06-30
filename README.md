# Portfolio — Marzuki

Personal portfolio website built with **Next.js 15**, featuring projects, blog, and a full-featured admin panel with content management system, AI integration, and SEO optimization.

## ✨ Key Features

### Frontend
- **Portfolio Showcase** — Project display with category filtering and detailed pages
- **Blog System** — Blog with categories, tags, and related articles
- **Modern Design** — Modern UI/UX with Framer Motion animations
- **Responsive** — Optimized for all devices
- **Dark Mode** — Light/dark theme support

### Admin Panel
- **Dashboard** — Stats overview and activity tracking
- **Project Management** — CRUD operations with image upload
- **Blog Management** — CRUD articles with SEO fields
- **Message Management** — View and manage visitor messages
- **SEO Settings** — Global SEO configuration, meta tags, sitemap
- **AI Content Generator** — Generate content using AI (OpenAI)

### Optimization
- **SEO** — Dynamic meta tags, Open Graph, sitemap.xml, robots.txt
- **Performance** — Server Components, dynamic imports, image optimization
- **Database** — Prisma ORM with SQLite (development) / PostgreSQL (production)
- **API** — REST API endpoints for blog, projects, and messages

## 🚀 Tech Stack

| Technology | Usage |
|-----------|-------|
| Next.js 15 | React Framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations |
| Prisma ORM | Database ORM |
| SQLite / PostgreSQL | Database |
| OpenAI API | AI content generation |
| Lucide React | Icon library |

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup Steps

```bash
# Clone repository
git clone https://github.com/marzuki/portfolio.git
cd portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Setup database
npx prisma migrate dev

# Seed initial data
npx prisma db seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Environment Variables
```env
DATABASE_URL="file:./dev.db"  # SQLite for development
# or
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"

OPENAI_API_KEY="sk-..."  # For AI content generator (optional)
```

### Initial Setup
1. Visit `http://localhost:3000/setup` for the installation wizard
2. Create an admin account
3. Configure website settings
4. Start adding projects and blog articles

## 📁 Project Structure

```
portfolio/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Database seeder
├── public/                # Static assets
├── src/
│   ├── app/
│   │   ├── admin/         # Admin panel pages
│   │   ├── api/           # REST API routes
│   │   ├── blog/          # Blog pages
│   │   ├── projects/      # Project pages
│   │   ├── setup/         # Installation wizard
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Homepage
│   ├── components/
│   │   ├── sections/      # Section components (Hero, Projects, etc.)
│   │   └── ui/            # UI components (Button, Card, etc.)
│   └── lib/
│       ├── data.ts        # Static data (fallback)
│       ├── prisma.ts      # Prisma client
│       └── utils.ts       # Utility functions
└── package.json
```

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/marzuki/portfolio)

1. Push repository to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy 🚀

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

## 📞 Contact

- Website: [https://marzuki.dev](https://marzuki.dev)
- Email: hello@marzuki.dev
- GitHub: [@marzuki](https://github.com/marzuki)
- LinkedIn: [in/marzuki](https://linkedin.com/in/marzuki)