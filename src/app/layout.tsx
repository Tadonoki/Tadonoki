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
  title: "Luthfi | My Portfolio",
  description: "Portfolio of Kgs M Luthfi Khailani, a Data Analyst passionate about uncovering patterns, data cleaning, dashboarding, and business intelligence.",
  keywords: ["Data Analyst", "Power BI", "SQL", "Looker Studio", "Python", "Business Intelligence", "Portfolio"],
  authors: [{ name: "Kgs M Luthfi Khailani" }],
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
