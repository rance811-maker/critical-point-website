import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://meetcriticalpoint.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CRITICAL POINT | AI Product Strategy & Intelligent Workflows",
  description:
    "Critical Point turns complex business problems into focused AI opportunities, testable product directions, and intelligent systems built to run and evolve.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/critical-point-logo.jpg",
    shortcut: "/critical-point-logo.jpg",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "CRITICAL POINT",
    title: "CRITICAL POINT | AI Product Strategy & Build Studio",
    description: "What to build. What not to build. How to prove it.",
    images: [{ url: "/og.png", width: 1729, height: 910, alt: "CRITICAL POINT" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CRITICAL POINT | AI Product Strategy & Build Studio",
    description: "What to build. What not to build. How to prove it.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
