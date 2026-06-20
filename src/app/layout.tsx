import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "RopaVintage — Ropa con historia",
  description:
    "Prendas vintage seleccionadas a mano. Cada pieza tiene una historia que contar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300..800&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-carbon text-parchment">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-concrete py-8 text-center text-sm text-smoke">
          <p>RopaVintage — cada prenda tiene una historia</p>
        </footer>
      </body>
    </html>
  );
}
