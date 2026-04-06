import React from "react";
import { Phone, Mail, Facebook, Instagram, Heart } from "lucide-react";
import { getSession } from "@/lib/auth";
import Footer from "@/components/Footer";
import AccesoButton from "@/components/AccesoButton";
import FavoritosContent from "@/components/FavoritosContent";
import CompareBar from "@/components/CompareBar";

export default async function FavoritosPage() {
  const session = await getSession();

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111]">

      {/* HEADER */}
      <header className="sticky top-0 z-50">
        <div className="bg-[#3a3a3a] px-4 h-9 flex items-center justify-end">
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
        <div className="bg-[#262522] py-5 flex justify-center items-center">
          <a href="/"><img src="/logo.png" alt="Penalva Inmobiliaria" className="h-16 md:h-20 w-auto object-contain" /></a>
        </div>
        <div className="bg-brand-orange">
          <div className="px-4 h-12 flex items-center justify-center gap-2">
            <nav className="flex items-center text-[13px] font-medium text-white/70">
              <a href="/" className="px-5 py-3 hover:text-white transition-colors">Inicio</a>
              <span className="w-px h-3.5 bg-white/25" />
              <a href="/nosotros" className="px-5 py-3 hover:text-white transition-colors">Nosotros</a>
              <span className="w-px h-3.5 bg-white/25" />
              <a href="/tasacion" className="px-5 py-3 hover:text-white transition-colors">Tasación</a>
              <span className="w-px h-3.5 bg-white/25" />
              <a href="/mapa" className="px-5 py-3 hover:text-white transition-colors">Propiedades en Mapa</a>
              <span className="w-px h-3.5 bg-white/25" />
              <a href="#contacto" className="px-5 py-3 hover:text-white transition-colors">Contacto</a>
            </nav>
            <AccesoButton isLoggedIn={!!session} />
          </div>
        </div>
      </header>

      {/* HERO */}
      <div className="bg-[#f8f6f2] border-b border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 flex items-center gap-4">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
            <Heart size={22} className="text-red-400 fill-red-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#111]">Mis Favoritos</h1>
            <p className="text-gray-400 text-[13px] mt-0.5">Propiedades que guardaste para revisar después</p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <section className="flex-1 py-12 bg-[#f8f6f2]">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <FavoritosContent />
        </div>
      </section>

      <Footer />
      <CompareBar />
    </div>
  );
}
