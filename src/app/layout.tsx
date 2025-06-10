import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Som Palkar",
  description:
    "Personal website of Som Palkar - Developer building things on the internet",
  generator: "Next.js",
  applicationName: "Som Palkar Portfolio",
  keywords: [
    "Som Palkar",
    "frontend",
    "backend",
    "AI",
    "crypto",
    "developer",
    "portfolio",
  ],
  authors: [{ name: "Som Palkar" }],
  creator: "Som Palkar",
  publisher: "Som Palkar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Som Palkar",
    description: "Developer building things on the internet",
    url: "",
    siteName: "Som Palkar",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Som Palkar - Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Som Palkar",
    description: "Developer building things on the internet",
    creator: "@OpsTechie",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative">
          <div className="relative mx-auto max-w-screen-xl">
            <div className="absolute left-8 top-0 bottom-0 border-l border-dotted border-[var(--border)] border-opacity-40 h-full overflow-hidden"></div>

            <div className="absolute right-8 top-0 bottom-0 border-l border-dotted border-[var(--border)] border-opacity-40 h-full overflow-hidden"></div>

            <div className="px-[34px]">{children}</div> 
            <Analytics />
            <SpeedInsights/>
          </div>
        </div>
      </body>
    </html>
  );
}
