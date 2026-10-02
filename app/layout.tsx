import type { Metadata } from "next";
import { Playfair_Display, Caveat, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
});

const title = "Akhil & Preethi | Wedding Invitation";
const description =
  "Join us as Akhil Sekhar and Preethi Chandran celebrate their wedding on November 15 in Vadakkencherry, Palakkad.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Akhil Sekhar",
    "Preethi Chandran",
    "wedding invitation",
    "Palakkad",
    "Vadakkencherry",
  ],
  authors: [{ name: "Akhil Sekhar & Preethi Chandran" }],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/toghether_1.jpg",
        width: 1440,
        height: 1919,
        alt: "Akhil Sekhar and Preethi Chandran",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/toghether_1.jpg"],
  },
  icons: { icon: "/ornaments/lotus.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${caveat.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink font-serif selection:bg-olive/20 custom-cursor">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
