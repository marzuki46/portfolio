import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmailNotification } from "@/lib/email";

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

function sanitizeString(str: string): string {
  // Basic sanitization - trim and remove any HTML tags
  return str.trim().replace(/<[^>]*>/g, '').substring(0, 5000);
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Input validation
    if (!body.name || typeof body.name !== "string" || body.name.trim().length === 0) {
      return NextResponse.json({ error: "Nama harus diisi" }, { status: 400 });
    }
    if (!body.email || typeof body.email !== "string" || !validateEmail(body.email)) {
      return NextResponse.json({ error: "Email tidak valid" }, { status: 400 });
    }
    if (!body.message || typeof body.message !== "string" || body.message.trim().length === 0) {
      return NextResponse.json({ error: "Pesan harus diisi" }, { status: 400 });
    }

    const message = await prisma.message.create({
      data: {
        name: sanitizeString(body.name),
        email: sanitizeString(body.email),
        subject: body.subject ? sanitizeString(body.subject) : null,
        message: sanitizeString(body.message),
      },
    });

    // Send email notification asynchronously (don't block response)
    sendEmailNotification({
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
    }).catch((err) => console.error("Email notification error:", err));

    return NextResponse.json({ success: true, id: message.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json({ error: "Gagal mengirim pesan" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const existing = await prisma.message.findUnique({
      where: { id: body.id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    const message = await prisma.message.update({
      where: { id: body.id },
      data: {
        read: body.read ?? undefined,
        starred: body.starred ?? undefined,
      },
    });
    return NextResponse.json(message);
  } catch (error) {
    console.error("Error updating message:", error);
    return NextResponse.json({ error: "Failed to update message" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const existing = await prisma.message.findUnique({
      where: { id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    await prisma.message.delete({ where: { id } });
    return NextResponse.json({ message: "Message deleted" });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 400 });
  }
}