import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alkalmazott zeneszerzés BA diplomakoncert",
  description: "2026. május 3. 19:00 - Liszt Ferenc Zeneművészeti Egyetem",
  openGraph: {
    title: "Alkalmazott zeneszerzés BA diplomakoncert",
    description: "2026. május 3. 19:00 - Zeneakadémia",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <head>
        {/* Pretext for dynamic text rendering */}
        <script
          src="https://unpkg.com/pretext@0.1.0/pretext.js"
          type="module"
          defer
        />
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </head>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
