import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProjectDetailClient from "./ProjectDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string) {
  try {
    const project = await prisma.project.findUnique({ where: { slug } });
    if (!project) return null;
    return {
      ...project,
      tags: JSON.parse(project.tags || "[]"),
    };
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const projects = await prisma.project.findMany({
      select: { slug: true },
    });
    return projects.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Project Not Found - Marzuki Portfolio" };
  }

  return {
    title: project.metaTitle || `${project.title} | Marzuki Portfolio`,
    description: project.metaDescription || project.description,
    keywords: project.metaKeywords || undefined,
    openGraph: {
      title: project.metaTitle || project.title,
      description: project.metaDescription || project.description,
      type: "website",
      images: project.ogImage ? [{ url: project.ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.metaTitle || project.title,
      description: project.metaDescription || project.description,
      images: project.ogImage ? [project.ogImage] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={JSON.parse(JSON.stringify(project))} slug={slug} />;
}