# Portfolio — Marzuki

Portfolio website pribadi yang dibangun dengan **Next.js 15**, menampilkan project, blog, dan fitur admin yang lengkap dengan sistem manajemen konten, integrasi AI, dan optimasi SEO.

## ✨ Fitur Utama

### Frontend
- **Halaman Portfolio** — Menampilkan project dengan filter kategori dan detail lengkap
- **Blog** — Sistem blog dengan kategori, tags, dan artikel terkait
- **Desain Modern** — UI/UX modern dengan animasi Framer Motion
- **Responsive** — Tampilan optimal di semua perangkat
- **Dark Mode** — Dukungan tema gelap/terang

### Admin Panel
- **Dashboard** — Overview statistik dan aktivitas
- **Manajemen Project** — CRUD project dengan upload gambar
- **Manajemen Blog** — CRUD artikel dengan SEO fields
- **Manajemen Pesan** — Lihat dan kelola pesan dari pengunjung
- **Pengaturan SEO** — Konfigurasi global SEO, meta tags, sitemap
- **AI Content Generator** — Generate konten dengan AI (OpenAI)

### Optimasi
- **SEO** — Meta tags dinamis, Open Graph, sitemap.xml, robots.txt
- **Performa** — Server Components, dynamic imports, image optimization
- **Database** — Prisma ORM dengan SQLite (development) / PostgreSQL (production)
- **API** — REST API endpoints untuk blog, project, dan messages

## 🚀 Tech Stack

| Teknologi | Penggunaan |
|-----------|-----------|
| Next.js 15 | Framework React dengan App Router |
| TypeScript | Type safety |
| Tailwind CSS | Styling utility-first |
| Framer Motion | Animasi |
| Prisma ORM | Database ORM |
| SQLite / PostgreSQL | Database |
| OpenAI API | AI content generation |
| Lucide React | Icon library |

## 📦 Instalasi

### Prerequisites
- Node.js 18+
- npm atau yarn

### Langkah Instalasi

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

# Seed data awal
npx prisma db seed

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 🔧 Konfigurasi

### Environment Variables
```env
DATABASE_URL="file:./dev.db"  # SQLite untuk development
# atau
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"

OPENAI_API_KEY="sk-..."  # Untuk AI content generator (opsional)
```

### Setup Awal
1. Buka `http://localhost:3000/setup` untuk wizard instalasi
2. Buat akun admin
3. Konfigurasi pengaturan website
4. Mulai menambahkan project dan artikel blog

## 📁 Struktur Project

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

### Deploy ke Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/marzuki/portfolio)

1. Push repository ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy 🚀

### Deploy Manual

```bash
# Build production
npm run build

# Start production server
npm start
```

## 📄 Lisensi

MIT License — lihat [LICENSE](LICENSE) untuk detail.

## 📞 Kontak

- Website: [https://marzuki.dev](https://marzuki.dev)
- Email: hello@marzuki.dev
- GitHub: [@marzuki](https://github.com/marzuki)
- LinkedIn: [in/marzuki](https://linkedin.com/in/marzuki)