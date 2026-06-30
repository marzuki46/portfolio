"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock, ArrowLeft, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";

interface BlogPostData {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string | null;
  image: string;
  tags: string;
  category: string;
  author: string;
  readTime: string;
  published: boolean;
  publishedAt: string;
  featured: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  ogImage: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function BlogDetailClient({ post, slug }: { post: BlogPostData; slug: string }) {
  const params = useParams();
  const tags: string[] = (() => {
    try {
      return JSON.parse(post.tags || "[]");
    } catch {
      return [];
    }
  })();

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Blog
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.author}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Category & Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
              {post.category}
            </span>
            {tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-accent text-accent-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Image Placeholder */}
          <div className="w-full h-64 md:h-80 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10 flex items-center justify-center mb-10">
            <span className="text-6xl opacity-40">
              {post.category === "Web" ? "📝" : post.category === "Programming" ? "💻" : post.category === "Design" ? "🎨" : post.category === "Animation" ? "✨" : "📖"}
            </span>
          </div>

          {/* Content */}
          <Card className="mb-10">
            <CardContent className="p-6 md:p-8">
              <div className="prose prose-sm md:prose-base max-w-none">
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                {post.content ? (
                  <div 
                    className="prose prose-sm md:prose-base max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-a:underline prose-strong:text-foreground prose-code:bg-accent prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-accent prose-pre:border prose-pre:border-border prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-img:rounded-xl prose-li:text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mt-8 mb-4">Pendahuluan</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Dalam era digital yang terus berkembang, penting bagi developer untuk selalu update dengan teknologi terbaru. 
                      Artikel ini akan membahas secara mendalam tentang topik yang relevan dengan perkembangan teknologi saat ini.
                    </p>
                    <h2 className="text-2xl font-bold mt-8 mb-4">Kesimpulan</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Teruslah belajar dan jangan ragu untuk mengeksplorasi teknologi baru.
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.article>
      </div>
    </div>
  );
}