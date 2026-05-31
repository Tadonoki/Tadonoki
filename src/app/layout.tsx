import type { Metadata } from "next";
import "./globals.css";

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
      className="h-full scroll-smooth antialiased"
    >
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;850&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-navy-950 text-slate-100 min-h-full font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
