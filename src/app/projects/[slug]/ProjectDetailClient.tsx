"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Code2, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProjectData {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string | null;
  image: string;
  tags: string[];
  demoUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  category: string;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  ogImage: string | null;
  createdAt: string;
  updatedAt: string;
}

const categoryColors: Record<string, string> = {
  web: "bg-blue-500/10 text-blue-500",
  mobile: "bg-green-500/10 text-green-500",
  design: "bg-purple-500/10 text-purple-500",
  ai: "bg-orange-500/10 text-orange-500",
  other: "bg-gray-500/10 text-gray-500",
};

export default function ProjectDetailClient({ project }: { project: ProjectData; slug: string }) {
  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Projects
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span
            className={`inline-block px-3 py-1 text-xs rounded-full font-medium mb-4 ${
              categoryColors[project.category] || categoryColors.other
            }`}
          >
            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </span>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-accent text-accent-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="gradient" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </Button>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <Code2 className="w-4 h-4" />
                  Source Code
                </Button>
              </a>
            )}
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground ml-auto">
              <Calendar className="w-4 h-4" />
              {new Date(project.createdAt).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
              })}
            </span>
          </div>
        </motion.div>

        {/* Project Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="w-full h-64 md:h-96 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/15 to-primary/5 flex items-center justify-center border border-border/50">
            <span className="text-8xl opacity-30">
              {project.category === "web" ? "🌐" : project.category === "mobile" ? "📱" : project.category === "design" ? "🎨" : project.category === "ai" ? "🤖" : "💻"}
            </span>
          </div>
        </motion.div>

        {/* Project Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-12">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Tentang Project</h2>
              <div className="prose prose-sm md:prose-base max-w-none">
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>
                {project.longDescription && (
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {project.longDescription}
                  </p>
                )}
                <h3 className="text-xl font-bold mt-8 mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}