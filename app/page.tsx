import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  ArrowRight,
  Bed,
  Heart,
} from "lucide-react";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import Footer from "@/components/Footer";
import AccesoButton from "@/components/AccesoButton";
import SearchForm from "@/components/SearchForm";
import AnimateIn from "@/components/AnimateIn";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  address: string;
  lat: number | null;
  lng: number | null;
  imageUrl?: string | null;
  type: string;
  propertyType: string;
  bedrooms?: number | null;
}

async function getProperties(): Promise<Property[]> {
  try {
    return await prisma.property.findMany({ orderBy: { createdAt: "desc" } }) as any as Property[];
  } catch {
    return [];
  }
}

export default async function Home() {
  const [properties, operations, cities, propertyTypes, session] = await Promise.all([
    getProperties(),
    prisma.operationType.findMany({ orderBy: { order: "asc" } }),
    prisma.city.findMany({ orderBy: { order: "asc" } }),
    prisma.propertyType.findMany({ orderBy: { order: "asc" } }),
    getSession(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111]">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50">

        {/* Fila 1 — Top bar gris oscuro con teléfono */}
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

        {/* Fila 2 — Logo negro centrado */}
        <div className="bg-[#262522] py-5 flex justify-center items-center">
          <a href="/">
            <img
              src="/logo.png"
              alt="Penalva Inmobiliaria"
              className="h-16 md:h-20 w-auto object-contain"
            />
          </a>
        </div>

        {/* Fila 3 — Nav naranja centrada */}
        <div className="bg-brand-orange">
          <div className="px-4 h-12 flex items-center justify-center gap-2">
            <nav className="flex items-center text-[13px] font-medium text-white/70">
              <a href="#" className="px-5 py-3 hover:text-white transition-colors">Inicio</a>
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

      {/* ── HERO — split: buscador izq / imagen der ── */}
      <section className="flex h-[380px]">

        {/* Izquierda — buscador 65% */}
        <div className="w-full md:w-[65%] bg-[#f0efed] flex flex-col justify-center py-10">
          <div className="w-full px-8 md:px-12 lg:px-16">
            <AnimateIn from="left">
            <h1 className="text-3xl md:text-[32px] font-bold text-[#111] mb-2 leading-tight">
              Buscar Propiedades
            </h1>
            <p className="text-gray-500 text-[14px] mb-8">
              Encontrá la propiedad que estás buscando
            </p>

            {/* Buscador inline */}
            <SearchForm operations={operations} cities={cities} propertyTypes={propertyTypes} />
            </AnimateIn>

            {/* Contacto */}
            <div className="mt-10 space-y-2">
              <div className="flex items-center gap-2 text-[13px] text-gray-500">
                <MapPin size={13} className="text-brand-orange shrink-0" />
                <span>Eva Perón 2845 — Santa Fe, Argentina</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-gray-500">
                <Phone size={13} className="text-brand-orange shrink-0" />
                <span>+54 (342) 456-5000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Derecha — imagen 35% */}
        <div className="hidden md:block w-[35%] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
            alt="Propiedad"
            className="w-full h-full object-cover"
          />
        </div>
      </section>


      {/* ── FEATURED PROPERTIES ── */}
      <section id="propiedades" className="pt-10 pb-16 bg-[#f8f6f2]">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <AnimateIn from="left" className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-brand-orange text-[10px] uppercase tracking-[0.4em] font-semibold mb-3">Portafolio</p>
              <h2 className="text-3xl md:text-[32px] text-[#111] font-bold">
                Propiedades Destacadas
              </h2>
            </div>
            <a
              href="/propiedades"
              className="text-sm font-semibold text-[#333] hover:text-brand-orange transition-colors flex items-center gap-1.5 group"
            >
              Ver todas
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </AnimateIn>

          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.slice(0, 6).map((property, i) => (
                <AnimateIn key={property.id} delay={i * 80}>
                <a
                  key={property.id}
                  href={`/propiedad/${property.id}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer block"
                >
                  {/* Imagen */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={
                        property.imageUrl ||
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                      }
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Overlay + botón ver propiedad */}
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-white text-[#111] text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-sm">
                        Ver propiedad
                      </span>
                    </div>

                    {/* Badge tipo operación */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-brand-orange text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                        {property.type}
                      </span>
                    </div>

                    {/* Favoritos */}
                    <button className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow transition-all opacity-0 group-hover:opacity-100 hover:scale-110">
                      <Heart size={13} className="text-gray-500 hover:text-red-500 transition-colors" />
                    </button>
                  </div>

                  {/* Contenido */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-1.5">
                      <div className="text-brand-orange font-bold text-xl">
                        USD {property.price.toLocaleString("es-AR")}
                      </div>
                      <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                        {property.propertyType}
                      </span>
                    </div>
                    <h3 className="font-semibold text-[#111] text-[15px] mb-1.5 line-clamp-1">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <MapPin size={11} />
                      <span className="truncate">{property.city}, {property.address}</span>
                    </div>
                    {property.bedrooms && (
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-3 pt-3 border-t border-gray-100">
                        <Bed size={12} />
                        <span>{property.bedrooms} dormitorio{property.bedrooms !== 1 ? "s" : ""}</span>
                      </div>
                    )}
                  </div>
                </a>
                </AnimateIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-gray-200 rounded-xl">
              <p className="text-gray-300 text-sm">No hay propiedades disponibles en este momento.</p>
            </div>
          )}
        </div>
      </section>


      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
}
