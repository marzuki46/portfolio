import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marzuki | Full Stack Developer",
  description:
    "Portfolio of Marzuki - Full Stack Developer specializing in Next.js, React, TypeScript, and modern web technologies.",
  keywords: [
    "developer",
    "full stack",
    "next.js",
    "react",
    "typescript",
    "portfolio",
    "marzuki",
  ],
  authors: [{ name: "Marzuki" }],
  openGraph: {
    title: "Marzuki | Full Stack Developer",
    description:
      "Portfolio of Marzuki - Full Stack Developer specializing in Next.js, React, TypeScript, and modern web technologies.",
    type: "website",
    locale: "id_ID",
    siteName: "Marzuki Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <NavbarWrapper />
          <div className="flex-1">{children}</div>
          <FooterWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}