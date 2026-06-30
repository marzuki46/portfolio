import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { siteName, siteDescription, username, email, password } = await req.json();

    // Validate required fields
    if (!siteName || !username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if admin already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Admin user already exists. Setup has been completed." },
        { status: 400 }
      );
    }

    // Check if site settings already exist
    const existingSiteName = await prisma.siteSetting.findUnique({
      where: { key: "site_name" },
    });

    if (existingSiteName) {
      return NextResponse.json(
        { error: "Setup has already been completed." },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin user
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        name: siteName,
        role: "admin",
      },
    });

    // Save site settings
    await prisma.siteSetting.createMany({
      data: [
        { key: "site_name", value: siteName },
        { key: "site_description", value: siteDescription || "" },
        { key: "setup_completed", value: "true" },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: "Setup failed. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Check if setup is completed
    const setupCompleted = await prisma.siteSetting.findUnique({
      where: { key: "setup_completed" },
    });

    const existingUser = await prisma.user.findFirst();

    return NextResponse.json({
      completed: !!(setupCompleted?.value === "true" || existingUser),
    });
  } catch (error) {
    return NextResponse.json({ completed: false });
  }
}