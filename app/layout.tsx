import type { Metadata, Viewport } from "next";
import { Golos_Text, Spectral } from "next/font/google";
import { CommandPalette } from "@/components/features/CommandPalette";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { Toaster } from "@/components/ui/Toast";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const spectral = Spectral({ variable: "--font-spectral", subsets: ["latin"], weight: ["400"] });
const golos = Golos_Text({ variable: "--font-golos", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Travelo · India & Germany", template: "%s · Travelo" },
  description: "Discover cities, heritage and landscapes across India and Germany, with guides, videos, galleries and maps.",
  metadataBase: new URL(SITE_URL),
  applicationName: "Travelo",
  openGraph: { type: "website", siteName: "Travelo", locale: "en_GB" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#1B2978" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spectral.variable} ${golos.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
          <CommandPalette />
        </Providers>
      </body>
    </html>
  );
}
