import React from "react";
import {
  Clock,
  Award,
  Users,
  Shield,
  Handshake,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getSession } from "@/lib/auth";
import { getSiteConfig } from "@/lib/config";
import { getContent } from "@/lib/content";

export const metadata = {
  title: "Nosotros — Penalva Inmobiliaria",
  description:
    "Más de 20 años de trayectoria en compra, venta y alquiler de propiedades en Santa Fe, Argentina.",
};

const VALUES = [
  {
    icon: Shield,
    title: "Responsabilidad",
    description:
      "Actuamos con plena responsabilidad en cada operación, protegiendo los intereses de nuestros clientes en todo momento.",
  },
  {
    icon: Handshake,
    title: "Honestidad",
    description:
      "La transparencia y la honestidad son la base de cada una de nuestras relaciones comerciales y personales.",
  },
  {
    icon: Award,
    title: "Cumplimiento",
    description:
      "Cumplimos nuestros compromisos con precisión y puntualidad, garantizando resultados concretos y verificables.",
  },
  {
    icon: TrendingUp,
    title: "Trayectoria",
    description:
      "Más de dos décadas en el mercado inmobiliario de Santa Fe nos avalan como referentes del sector.",
  },
];

const STATS = [
  { value: "20+", label: "Años de experiencia" },
  { value: "500+", label: "Propiedades gestionadas" },
  { value: "300+", label: "Clientes satisfechos" },
  { value: "3", label: "Ciudades atendidas" },
];

const MEMBERSHIPS = [
  { name: "FIRA", description: "Federación Inmobiliaria de la República Argentina" },
  { name: "CCI", description: "Cámara de Comercio e Industria de Santa Fe" },
  { name: "CECI", description: "Centro de Corredores Inmobiliarios" },
];

const TEAM = [
  {
    name: "Marcelo Penalva",
    role: "Director General",
    description: "Más de 20 años liderando el equipo y garantizando la excelencia en cada operación.",
  },
  {
    name: "Equipo Comercial",
    role: "Asesores de Ventas",
    description: "Profesionales especializados en compra y venta de propiedades residenciales y comerciales.",
  },
  {
    name: "Área Legal",
    role: "Asesoría Jurídica",
    description: "Respaldo legal completo en escrituraciones, contratos y trámites administrativos.",
  },
];

export default async function NosotrosPage() {
  const [session, siteConfig, heroTitulo, heroSubtitulo, empresaTitulo, empresaP1, empresaP2, empresaP3, empresaQuote, horario, valoresTitulo, equipoTitulo, contactoTexto] = await Promise.all([
    getSession(),
    getSiteConfig(),
    getContent("nosotros_hero_titulo"),
    getContent("nosotros_hero_subtitulo"),
    getContent("nosotros_empresa_titulo"),
    getContent("nosotros_empresa_p1"),
    getContent("nosotros_empresa_p2"),
    getContent("nosotros_empresa_p3"),
    getContent("nosotros_empresa_quote"),
    getContent("nosotros_horario"),
    getContent("nosotros_valores_titulo"),
    getContent("nosotros_equipo_titulo"),
    getContent("nosotros_contacto_texto"),
  ]);
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111]">

      <Header active="/nosotros" isLoggedIn={!!session} />

      {/* ── HERO ── */}
      <section className="relative h-[320px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
          alt="Oficina Penalva"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#262522]/85 via-[#262522]/60 to-transparent" />
        <div className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24">
          <div>
            <p className="text-brand-orange text-[10px] uppercase tracking-[0.4em] font-semibold mb-3">
              La Empresa
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {heroTitulo}
            </h1>
            <p className="mt-3 text-white/50 text-[14px] max-w-md leading-relaxed">
              {heroSubtitulo}
            </p>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-brand-orange">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 py-0">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-8 flex flex-col items-center text-center ${
                  i < STATS.length - 1 ? "border-r border-white/20" : ""
                }`}
              >
                <span className="text-3xl md:text-4xl font-bold text-white">{stat.value}</span>
                <span className="mt-1 text-[11px] font-medium uppercase tracking-widest text-white/60">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LA EMPRESA ── */}
      <section className="py-20 bg-[#f8f6f2]">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div>
              <p className="text-brand-orange text-[10px] uppercase tracking-[0.4em] font-semibold mb-3">
                Quiénes somos
              </p>
              <h2 className="text-3xl md:text-[32px] font-bold text-[#111] mb-6 leading-tight">
                {empresaTitulo.split("\n").map((line: string, i: number) => (
                  <span key={i}>{line}{i < empresaTitulo.split("\n").length - 1 && <br />}</span>
                ))}
              </h2>
              <div className="space-y-4 text-[15px] text-gray-600 leading-relaxed">
                <p>{empresaP1}</p>
                <p>{empresaP2}</p>
                <p>{empresaP3}</p>
                <p className="text-brand-orange font-semibold italic">{empresaQuote}</p>
              </div>

              <div className="mt-8 flex items-center gap-3 text-[13px] text-gray-500">
                <Clock size={15} className="text-brand-orange shrink-0" />
                <span>{horario}</span>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
                alt="Oficina Penalva"
                className="w-full h-[420px] object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-brand-orange text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">20+</div>
                <div className="text-[11px] uppercase tracking-widest text-white/70 mt-0.5">Años de experiencia</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── VALORES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="text-center mb-14">
            <p className="text-brand-orange text-[10px] uppercase tracking-[0.4em] font-semibold mb-3">
              Nuestros pilares
            </p>
            <h2 className="text-3xl md:text-[32px] font-bold text-[#111]">
              {valoresTitulo}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="group p-7 rounded-xl border border-gray-100 hover:border-brand-orange/30 hover:shadow-lg transition-all duration-300 bg-[#f8f6f2] hover:bg-white"
                >
                  <div className="w-11 h-11 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-brand-orange/15 transition-colors">
                    <Icon size={20} className="text-brand-orange" />
                  </div>
                  <h3 className="font-bold text-[#111] text-[15px] mb-2">{val.title}</h3>
                  <p className="text-gray-500 text-[13px] leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EQUIPO ── */}
      <section className="py-20 bg-[#f8f6f2]">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="mb-14">
            <p className="text-brand-orange text-[10px] uppercase tracking-[0.4em] font-semibold mb-3">
              Staff
            </p>
            <h2 className="text-3xl md:text-[32px] font-bold text-[#111]">
              {equipoTitulo}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <div className="w-14 h-14 bg-[#262522] rounded-full flex items-center justify-center mb-5">
                  <Users size={22} className="text-white/50" />
                </div>
                <h3 className="font-bold text-[#111] text-[16px] mb-0.5">{member.name}</h3>
                <p className="text-brand-orange text-[11px] font-semibold uppercase tracking-wider mb-3">{member.role}</p>
                <p className="text-gray-500 text-[13px] leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBRESÍAS ── */}
      <section className="py-16 bg-[#262522]">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <p className="text-center text-white/30 text-[10px] uppercase tracking-[0.4em] font-semibold mb-10">
            Somos miembros de
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            {MEMBERSHIPS.map((m) => (
              <div key={m.name} className="text-center">
                <div className="text-2xl font-bold text-white/80 tracking-widest mb-1">{m.name}</div>
                <div className="text-[11px] text-white/30 max-w-[180px] leading-snug">{m.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO CTA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <p className="text-brand-orange text-[10px] uppercase tracking-[0.4em] font-semibold mb-3">
            Contacto
          </p>
          <h2 className="text-3xl md:text-[32px] font-bold text-[#111] mb-4">
            ¿Hablamos?
          </h2>
          <p className="text-gray-500 text-[15px] leading-relaxed mb-10">
            {contactoTexto}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${(siteConfig.phone ?? "").replace(/[^0-9+]/g, "")}`}
              className="flex items-center gap-2.5 bg-brand-orange text-white font-bold text-[13px] uppercase tracking-wider px-8 py-4 rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Phone size={15} />
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2.5 bg-[#f0efed] text-[#111] font-bold text-[13px] uppercase tracking-wider px-8 py-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Mail size={15} />
              Enviar email
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-[13px] text-gray-400">
            <MapPin size={13} className="text-brand-orange" />
            <span>{siteConfig.address}</span>
          </div>
        </div>
      </section>

      <Footer siteConfig={siteConfig} />
    </div>
  );
}
