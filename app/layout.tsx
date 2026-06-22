import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QAZMURA",
  description: "Kazakh learning platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="kk" // Тілді қазақшаға ауыстырған дұрыс
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        {/* Мобильді құрылғылардың экран өлшемін дұрыс ұстау үшін */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden">
        <Providers>
          <Navbar />
          {/* main тегіне w-full және flex-grow қосу арқылы 
            беттің ортасы әрқашан экранға толық сыяды 
          */}
          <main className="flex-grow w-full">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}