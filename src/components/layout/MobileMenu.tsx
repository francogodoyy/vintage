"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-carbon/80 z-40 sm:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-charcoal border-r border-concrete z-50 transform transition-transform duration-300 sm:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-concrete">
          <span className="text-sm font-bold uppercase tracking-widest">
            Menú
          </span>
          <button onClick={onClose} className="text-smoke hover:text-parchment">
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            href="/products"
            onClick={onClose}
            className="block px-4 py-3 text-sm uppercase tracking-widest text-parchment hover:bg-concrete transition-colors"
          >
            Catálogo
          </Link>
          <Link
            href="/about"
            onClick={onClose}
            className="block px-4 py-3 text-sm uppercase tracking-widest text-parchment hover:bg-concrete transition-colors"
          >
            Nosotros
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className="block px-4 py-3 text-sm uppercase tracking-widest text-parchment hover:bg-concrete transition-colors"
          >
            Contacto
          </Link>
        </nav>
      </div>
    </>
  );
}
