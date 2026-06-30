import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    const parsed = projects.map((p) => ({
      ...p,
      tags: JSON.parse(p.tags || "[]"),
    }));
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const project = await prisma.project.create({
      data: {
        slug: body.slug || body.title.toLowerCase().replace(/\s+/g, "-"),
        title: body.title,
        description: body.description,
        longDescription: body.longDescription || null,
        image: body.image || "/placeholder.svg",
        tags: JSON.stringify(body.tags || []),
        demoUrl: body.demoUrl || null,
        githubUrl: body.githubUrl || null,
        featured: body.featured || false,
        category: body.category || "web",
        metaTitle: body.metaTitle || null,
        metaDescription: body.metaDescription || null,
        metaKeywords: body.metaKeywords || null,
        ogImage: body.ogImage || null,
      },
    });
    return NextResponse.json({ ...project, tags: JSON.parse(project.tags || "[]") }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const existing = await prisma.project.findUnique({
      where: { id: body.id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    const project = await prisma.project.update({
      where: { id: body.id },
      data: {
        slug: body.slug ?? undefined,
        title: body.title ?? undefined,
        description: body.description ?? undefined,
        longDescription: body.longDescription ?? undefined,
        image: body.image ?? undefined,
        tags: body.tags ? JSON.stringify(body.tags) : undefined,
        demoUrl: body.demoUrl ?? undefined,
        githubUrl: body.githubUrl ?? undefined,
        featured: body.featured ?? undefined,
        category: body.category ?? undefined,
        metaTitle: body.metaTitle ?? undefined,
        metaDescription: body.metaDescription ?? undefined,
        metaKeywords: body.metaKeywords ?? undefined,
        ogImage: body.ogImage ?? undefined,
      },
    });
    return NextResponse.json({ ...project, tags: JSON.parse(project.tags || "[]") });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const existing = await prisma.project.findUnique({
      where: { id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 400 });
  }
}