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
        <div className="bg-rust/20 border-b border-rust/30 py-1.5 text-center">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-rust">
            Demo — Los pagos son simulados · Stripe en modo test
          </p>
        </div>
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-concrete py-8 text-center">
          <p className="text-sm text-smoke">RopaVintage — cada prenda tiene una historia</p>
          <p className="text-[10px] font-mono text-smoke/50 mt-3 tracking-wider">
            Next.js · TypeScript · Tailwind · Sanity · Stripe · Upstash Redis
          </p>
        </footer>
      </body>
    </html>
  );
}
