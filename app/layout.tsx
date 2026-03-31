import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import { getMetadataBase, SITE_DESCRIPTION } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "Stridia",
    template: "%s | Stridia",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Stridia",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Stridia",
    title: "Stridia",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Stridia",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
