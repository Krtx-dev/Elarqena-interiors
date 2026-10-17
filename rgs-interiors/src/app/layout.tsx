import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elarqena Interiors | Interior Designers in Coimbatore",
  description: "Elarqena Interiors offers custom modular kitchens, wardrobes, and full home interiors across Coimbatore, Mettupalayam, and Pollachi. Rated 4.9/5.",
  openGraph: {
    title: "Elarqena Interiors | Premium Interior Designers in Coimbatore",
    description: "Custom interiors, modular kitchens, and precision carpentry designed around your home, lifestyle, and budget.",
    url: "https://rgs-interiors-carpenters.localo.site/",
    siteName: "Elarqena Interiors",
    locale: "en_IN",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Elarqena Interiors",
  "image": "https://rgs-interiors-carpenters.localo.site/photos",
  "@id": "https://rgs-interiors-carpenters.localo.site/",
  "url": "https://rgs-interiors-carpenters.localo.site/",
  "telephone": "+919688836074",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "312, Singanallur, Nehru Park Road",
    "addressLocality": "Coimbatore",
    "postalCode": "641017",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 11.0018,
    "longitude": 77.0224
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#FAF9F6] text-[#1c1c1c] overflow-x-hidden`}
      >
        <CustomCursor />
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
