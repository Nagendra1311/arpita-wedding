import type { Metadata, Viewport } from "next";
import "./globals.css";
import { weddingConfig } from "@/config/weddingConfig";

export const viewport: Viewport = {
  themeColor: "#4A0E2E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: `${weddingConfig.couple.fullName} | Wedding Invitation #${weddingConfig.couple.hashtag.replace("#", "")}`,
  description: `${weddingConfig.event.tagline}. Join us to celebrate the wedding of ${weddingConfig.couple.fullName} on ${weddingConfig.event.weddingDateFormatted}.`,
  openGraph: {
    title: `${weddingConfig.couple.fullName} | Wedding Invitation`,
    description: `Wedding celebration of ${weddingConfig.couple.fullName} on ${weddingConfig.event.weddingDate}.`,
    type: "website",
    images: [
      {
        url: "/card/card_cover.jpg",
        width: 1200,
        height: 630,
        alt: `${weddingConfig.couple.fullName} Wedding Invitation`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FFF9FB] text-[#2C061A] font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
