import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Villa Idro — Lakefront Holiday Apartments & Homes on Lake Idro, Italy",
  description:
    "Family-run villa 50 m from the beaches of Lake Idro. 8 apartments and 4 holiday homes with pool, BBQ and mountain views. Book directly with the owners — no fees.",
  metadataBase: new URL("https://villaidro.com"),
  openGraph: {
    title: "Villa Idro — your Italian lake summer",
    description:
      "Private family villa on Lake Idro: pool, beaches 50 m away, apartments for 4–5 and homes for 8. Direct booking with owners Valery & Vita.",
    images: ["/photos/villa-panorama-600.jpg"],
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
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f7f4ee] text-[#1c2a2e]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
