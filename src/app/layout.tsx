import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lutfi-portofolio.vercel.app"),
  title: "Kgs M Luthfi Khailani | Data Analyst Portfolio",
  description: "Portfolio of Kgs M Luthfi Khailani, a Data Analyst passionate about data wrangling, analytics, business intelligence dashboards, and visual storytelling.",
  keywords: ["Data Analyst", "Power BI", "SQL", "Looker Studio", "Python", "Business Intelligence", "Portfolio", "Luthfi Khailani"],
  authors: [{ name: "Kgs M Luthfi Khailani" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kgs M Luthfi Khailani | Data Analyst Portfolio",
    description: "Portfolio of Kgs M Luthfi Khailani, a Data Analyst passionate about data wrangling, analytics, business intelligence dashboards, and visual storytelling.",
    url: "https://lutfi-portofolio.vercel.app",
    siteName: "Luthfi Khailani Portfolio",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Kgs M Luthfi Khailani Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Kgs M Luthfi Khailani | Data Analyst Portfolio",
    description: "Portfolio of Kgs M Luthfi Khailani, a Data Analyst passionate about data wrangling, analytics, business intelligence dashboards, and visual storytelling.",
    images: ["/icon.png"],
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
      </head>
      <body className="bg-navy-950 text-slate-100 min-h-full font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
