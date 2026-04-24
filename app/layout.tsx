import type { Metadata, Viewport } from "next";
import "./globals.css";

/* 
  FONT SETUP
  -----------
  Current: Sora (via Google Fonts link)
  Available: Zen Dots (loaded, not active)
  
  Switch to Zen Dots: Change "Sora" to "Zen Dots" in globals.css
*/

export const metadata: Metadata = {
  title: "Zeneszerzés és alkalmazott zeneszerzés | BA diplomakoncert",
  description: "2026. május 3. 18:00 - Liszt Ferenc Zeneművészeti Egyetem",
  openGraph: {
    title: "Zeneszerzés és alkalmazott zeneszerzés",
    description: "2026. május 3. 18:00 - Zeneakadémia",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <head>
        {/* Performance: Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        
        {/* Preload critical fonts */}
        <link rel="preload" href="https://fonts.gstatic.com/s/sora/v12/xMQOuFFDK72Zl6Q9r3FxFJQ.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap" rel="stylesheet" />
        
        {/* Disable caching */}
        <meta httpEquiv="Cache-Control" content="no-store, no-cache, must-revalidate, proxy-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
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
      <body className="font-sans bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
