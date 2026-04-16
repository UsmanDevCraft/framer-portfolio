import type React from "react";
import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: "Usman Awan - Full Stack & Frontend Developer",
  description:
    "Usman Awan - Full Stack Developer & Creative Technologist. Building exceptional digital experiences with modern web technologies.",

  keywords: [
    "usman awan",
    "frontend developer",
    "full stack developer",
    "mern stack developer",
    "web developer",
    "react developer",
    "next.js developer",
    "typescript developer",
    "portfolio",
    "creative technologist",
    "ui ux developer",
    "software engineer",
    "web development",
    "javascript developer",
    "tailwind css",
    "modern web developer",
    "personal portfolio",
    "freelance developer",
  ],

  authors: [{ name: "Usman Awan" }],

  openGraph: {
    title: "Usman Awan - Full Stack & Frontend Developer",
    description:
      "Building exceptional digital experiences with modern web technologies.",
    type: "website",
    images: [
      {
        url: "/my_pic.jpg",
        width: 1200,
        height: 630,
        alt: "Usman Awan - Developer",
      },
    ],
  },

  generator: "senotron",
  applicationName: "Usman Awan Portfolio",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${inter.variable} ${sora.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
