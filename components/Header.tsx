"use client";

import { useState } from "react";
import { Phone, Mail, Facebook, Instagram, Menu, X, LayoutDashboard, Lock } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/tasacion", label: "Tasación" },
  { href: "/mapa", label: "Propiedades en Mapa" },
  { href: "#contacto", label: "Contacto" },
];

interface Props {
  active?: string;
  isLoggedIn?: boolean;
}

export default function Header({ active, isLoggedIn }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">

      {/* Top bar — hidden on mobile */}
      <div className="hidden md:flex bg-[#3a3a3a] px-4 h-9 items-center justify-end">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-end gap-6 text-[11px] text-white/55">
          <div className="flex items-center gap-1.5">
            <Mail size={11} className="text-white/60" />
            <span>administracion@penalvainmobiliaria.com.ar</span>
          </div>
          <a href="tel:+543424565000" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone size={11} className="text-white/60" />
            <span>+54 342 456-5000</span>
          </a>
          <div className="flex items-center gap-3 pl-3 border-l border-white/10">
            <a href="#" aria-label="Facebook" className="hover:text-white transition-colors"><Facebook size={12} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-white transition-colors"><Instagram size={12} /></a>
          </div>
        </div>
      </div>

      {/* Logo row */}
      <div className="bg-[#262522] py-4 md:py-5 flex justify-center items-center">
        <a href="/">
          <img src="/logo.png" alt="Penalva Inmobiliaria" className="h-12 md:h-16 lg:h-20 w-auto object-contain" />
        </a>
      </div>

      {/* Nav bar */}
      <div className="bg-brand-orange">
        <div className="px-4 h-12 flex items-center justify-between md:justify-center gap-2">

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center text-[13px] font-medium text-white/70">
            {NAV_LINKS.map((link, i) => (
              <span key={link.href} className="flex items-center">
                {i > 0 && <span className="w-px h-3.5 bg-white/25" />}
                <a
                  href={link.href}
                  className={`px-5 py-3 transition-colors hover:text-white ${active === link.href ? "text-white font-semibold" : ""}`}
                >
                  {link.label}
                </a>
              </span>
            ))}
          </nav>

          {/* Mobile: logo text + hamburger */}
          <span className="md:hidden text-white font-bold text-[13px] tracking-wide">Penalva</span>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-1"
            aria-label="Menú"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Desktop right buttons */}
          <div className="hidden md:flex items-center gap-2 md:absolute md:right-4">
            <a
              href="/favoritos"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-white/30 text-white/70 hover:text-white hover:border-white/60 transition-colors"
              title="Mis favoritos"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </a>
            {isLoggedIn ? (
              <a href="/admin" className="flex items-center gap-1.5 border border-white/40 text-white text-[12px] font-semibold px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors">
                <LayoutDashboard size={13} />
                Dashboard
              </a>
            ) : (
              <a href="/admin/login" className="flex items-center gap-1.5 border border-white/40 text-white text-[12px] font-semibold px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors">
                <Lock size={13} />
                Acceso
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden bg-[#262522] border-t border-white/10 absolute w-full left-0 z-50 shadow-xl">
          <nav className="flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-6 py-4 text-[14px] font-medium border-b border-white/5 transition-colors hover:bg-white/5 ${
                  active === link.href ? "text-brand-orange" : "text-white/80"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a href="/favoritos" onClick={() => setOpen(false)} className="px-6 py-4 text-[14px] font-medium text-white/80 hover:bg-white/5 border-b border-white/5 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              Mis favoritos
            </a>
            {isLoggedIn ? (
              <a href="/admin" onClick={() => setOpen(false)} className="px-6 py-4 text-[14px] font-medium text-brand-orange hover:bg-white/5 flex items-center gap-2">
                <LayoutDashboard size={14} />
                Dashboard
              </a>
            ) : (
              <a href="/admin/login" onClick={() => setOpen(false)} className="px-6 py-4 text-[14px] font-medium text-white/80 hover:bg-white/5 flex items-center gap-2">
                <Lock size={14} />
                Acceso
              </a>
            )}
          </nav>
        </div>
      )}

    </header>
  );
}
