"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu } from "lucide-react";
import { useCartStore } from "@/store/cart";
import CartDrawer from "./CartDrawer";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const { itemCount, openCart } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="sticky top-0 z-30 border-b border-concrete bg-carbon/95 backdrop-blur"
        style={{ viewTransitionName: "persistent-nav" }}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold uppercase tracking-[0.2em] text-parchment hover:text-rust transition-colors"
          >
            RopaVintage
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/about"
              className="text-xs uppercase tracking-widest text-smoke hover:text-parchment transition-colors hidden sm:inline"
            >
              Nosotros
            </Link>
            <Link
              href="/products"
              className="text-xs uppercase tracking-widest text-smoke hover:text-parchment transition-colors hidden sm:inline"
            >
              Catálogo
            </Link>
            <Link
              href="/contact"
              className="text-xs uppercase tracking-widest text-smoke hover:text-parchment transition-colors hidden sm:inline"
            >
              Contacto
            </Link>
            <button
              onClick={openCart}
              className="relative text-smoke hover:text-parchment transition-colors"
              aria-label="Abrir carrito"
            >
              <ShoppingBag size={20} />
              {itemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-rust text-carbon text-[10px] font-bold w-4 h-4 flex items-center justify-center">
                  {itemCount()}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-smoke hover:text-parchment sm:hidden"
              aria-label="Abrir menú"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>
      <CartDrawer />
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
