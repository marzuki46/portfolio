import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
    });
    const parsed = posts.map((p) => ({
      ...p,
      tags: JSON.parse(p.tags || "[]"),
    }));
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const post = await prisma.blogPost.create({
      data: {
        slug: body.slug || body.title.toLowerCase().replace(/\s+/g, "-"),
        title: body.title,
        excerpt: body.excerpt || "",
        content: body.content || null,
        image: body.image || "/placeholder.svg",
        tags: JSON.stringify(body.tags || []),
        category: body.category || "Web",
        author: body.author || "Marzuki",
        readTime: body.readTime || "5 min read",
        published: body.published ?? true,
        featured: body.featured ?? false,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
        metaTitle: body.metaTitle || null,
        metaDescription: body.metaDescription || null,
        metaKeywords: body.metaKeywords || null,
        ogImage: body.ogImage || null,
      },
    });
    return NextResponse.json({ ...post, tags: JSON.parse(post.tags || "[]") }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const existing = await prisma.blogPost.findUnique({
      where: { id: body.id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }
    const post = await prisma.blogPost.update({
      where: { id: body.id },
      data: {
        slug: body.slug ?? undefined,
        title: body.title ?? undefined,
        excerpt: body.excerpt ?? undefined,
        content: body.content ?? undefined,
        image: body.image ?? undefined,
        tags: body.tags ? JSON.stringify(body.tags) : undefined,
        category: body.category ?? undefined,
        author: body.author ?? undefined,
        readTime: body.readTime ?? undefined,
        published: body.published ?? undefined,
        featured: body.featured ?? undefined,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
        metaTitle: body.metaTitle ?? undefined,
        metaDescription: body.metaDescription ?? undefined,
        metaKeywords: body.metaKeywords ?? undefined,
        ogImage: body.ogImage ?? undefined,
      },
    });
    return NextResponse.json({ ...post, tags: JSON.parse(post.tags || "[]") });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const existing = await prisma.blogPost.findUnique({
      where: { id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }
    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ message: "Blog post deleted" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 400 });
  }
}