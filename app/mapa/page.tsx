import React from "react";
import { Phone, Mail, Facebook, Instagram } from "lucide-react";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import AccesoButton from "@/components/AccesoButton";
import MapaView from "@/components/MapaView";

interface Props {
  searchParams: Promise<{
    ciudad?: string;
    tipo?: string;
    operacion?: string;
    dormitorios?: string;
  }>;
}

export default async function MapaPage({ searchParams }: Props) {
  const { ciudad, tipo, operacion, dormitorios } = await searchParams;

  const where: any = { published: true };
  if (ciudad) where.city = ciudad;
  if (tipo) where.propertyType = tipo;
  if (operacion) where.type = operacion;
  if (dormitorios) {
    const n = parseInt(dormitorios);
    if (!isNaN(n)) where.bedrooms = n === 5 ? { gte: 5 } : n;
  }

  const [properties, operations, cities, propertyTypes, session] = await Promise.all([
    prisma.property.findMany({ where, orderBy: { createdAt: "desc" } }),
    prisma.operationType.findMany({ orderBy: { order: "asc" } }),
    prisma.city.findMany({ orderBy: { order: "asc" } }),
    prisma.propertyType.findMany({ orderBy: { order: "asc" } }),
    getSession(),
  ]);

  return (
    <div className="flex flex-col h-screen bg-[#262522] text-white overflow-hidden">

      {/* ── HEADER ── */}
      <header className="shrink-0 z-50">
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
              <a href="/#contacto" aria-label="Facebook" className="hover:text-white transition-colors"><Facebook size={12} /></a>
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
              <a href="/mapa" className="px-5 py-3 text-white font-semibold">Propiedades en Mapa</a>
              <span className="w-px h-3.5 bg-white/25" />
              <a href="#" className="px-5 py-3 hover:text-white transition-colors">Contacto</a>
            </nav>
            <AccesoButton isLoggedIn={!!session} />
          </div>
        </div>
      </header>

      {/* ── MAP + SEARCH (fills remaining height) ── */}
      <MapaView
        properties={properties as any}
        operations={operations}
        cities={cities}
        propertyTypes={propertyTypes}
        initial={{ ciudad, tipo, operacion, dormitorios }}
      />
    </div>
  );
}
