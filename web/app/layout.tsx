import type { Metadata } from "next";
import { EB_Garamond, Hanken_Grotesk, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { DbProvider } from "../components/provider/db-provider";
import { AuthProvider } from "../components/provider/auth-provider";
import { TopAppBar } from "../components/layout/top-app-bar";
import { Footer } from "../components/layout/footer";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif-4",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GreatGod | A Premium Editorial Christian Publication",
  description: "A Premium Editorial Christian Publication",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${hankenGrotesk.variable} ${sourceSerif4.variable} h-full antialiased light`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@400,0,0,24&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-body-md text-on-surface bg-background">
        <DbProvider>
          <AuthProvider>
            <TopAppBar />
            {/* pt-16 is to offset the fixed TopAppBar */}
            <main className="flex-grow pt-16 flex flex-col relative w-full">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </DbProvider>
      </body>
    </html>
  );
}
