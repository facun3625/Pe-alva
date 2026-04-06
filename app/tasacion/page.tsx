import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  FileText,
  Home,
  BarChart2,
  Clock,
  ShieldCheck,
} from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getSession } from "@/lib/auth";

export const metadata = {
  title: "Tasación de Propiedades — Penalva Inmobiliaria",
  description:
    "Tasaciones profesionales y precisas para conocer el valor real de tu propiedad en Santa Fe, Argentina.",
};

const STEPS = [
  {
    number: "01",
    title: "Solicitá tu tasación",
    description:
      "Completá el formulario o comunicate con nosotros. Te contactamos en menos de 24 horas.",
  },
  {
    number: "02",
    title: "Visita al inmueble",
    description:
      "Un profesional visita la propiedad para relevar sus características, estado y entorno.",
  },
  {
    number: "03",
    title: "Análisis de mercado",
    description:
      "Comparamos con propiedades similares vendidas recientemente en la zona para determinar el valor real.",
  },
  {
    number: "04",
    title: "Informe detallado",
    description:
      "Recibís un informe completo con la valoración y los fundamentos que la respaldan.",
  },
];

const INCLUDES = [
  "Inspección presencial del inmueble",
  "Análisis comparativo de mercado (ACM)",
  "Evaluación del estado edilicio",
  "Consideración de ubicación y entorno",
  "Informe escrito con respaldo técnico",
  "Asesoramiento sobre precio de publicación",
  "Sin costo ni compromiso de venta",
];

const TYPES = [
  {
    icon: Home,
    title: "Viviendas",
    description: "Casas, departamentos, dúplex y PH en toda la región de Santa Fe.",
  },
  {
    icon: BarChart2,
    title: "Comerciales",
    description: "Locales, oficinas, depósitos y propiedades de uso mixto.",
  },
  {
    icon: FileText,
    title: "Terrenos",
    description: "Lotes urbanos, suburbanos y rurales con análisis de potencial constructivo.",
  },
  {
    icon: ShieldCheck,
    title: "Pericias judiciales",
    description: "Informes periciales para procesos sucesorios, divorcios o litigios.",
  },
];

export default async function TasacionPage() {
  const session = await getSession();
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111]">

      <Header active="/tasacion" isLoggedIn={!!session} />

      {/* ── HERO ── */}
      <section className="relative h-[320px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80"
          alt="Tasación de propiedades"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#262522]/90 via-[#262522]/65 to-transparent" />
        <div className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24">
          <div>
            <p className="text-brand-orange text-[10px] uppercase tracking-[0.4em] font-semibold mb-3">
              Servicios
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Tasación de<br />Propiedades
            </h1>
            <p className="mt-3 text-white/50 text-[14px] max-w-md leading-relaxed">
              Conocé el valor real de tu propiedad con un informe profesional respaldado por el mercado.
            </p>
          </div>
        </div>
      </section>

      {/* ── INTRO + QUÉ INCLUYE ── */}
      <section className="py-20 bg-[#f8f6f2]">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            <div>
              <p className="text-brand-orange text-[10px] uppercase tracking-[0.4em] font-semibold mb-3">
                Tasación profesional
              </p>
              <h2 className="text-3xl md:text-[32px] font-bold text-[#111] mb-6 leading-tight">
                ¿Desea vender o alquilar su propiedad?
              </h2>
              <div className="space-y-4 text-[15px] text-gray-600 leading-relaxed">
                <p>
                  Contamos con un equipo altamente especializado y con amplio conocimiento del mercado inmobiliario, capacitado para realizar una real y exacta tasación de su inmueble.
                </p>
                <p>
                  Nuestro interés es brindarle el mejor servicio para su mejor beneficio.
                </p>
                <p className="text-brand-orange font-semibold">
                  Complete el formulario y a la brevedad lo contactaremos personalmente.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3 text-[13px] text-gray-500">
                <Clock size={15} className="text-brand-orange shrink-0" />
                <span>Lo contactamos a la brevedad</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#111] text-[16px] mb-6">¿Qué incluye la tasación?</h3>
              <ul className="space-y-3.5">
                {INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-brand-orange shrink-0 mt-0.5" />
                    <span className="text-[14px] text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-[13px] text-gray-400 text-center">
                  La tasación es <strong className="text-brand-orange">gratuita y sin compromiso</strong>.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TIPOS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="text-center mb-14">
            <p className="text-brand-orange text-[10px] uppercase tracking-[0.4em] font-semibold mb-3">
              Coberturas
            </p>
            <h2 className="text-3xl md:text-[32px] font-bold text-[#111]">
              Qué tipos de propiedades tasamos
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.title}
                  className="group p-7 rounded-xl border border-gray-100 hover:border-brand-orange/30 hover:shadow-lg transition-all duration-300 bg-[#f8f6f2] hover:bg-white"
                >
                  <div className="w-11 h-11 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-brand-orange/15 transition-colors">
                    <Icon size={20} className="text-brand-orange" />
                  </div>
                  <h3 className="font-bold text-[#111] text-[15px] mb-2">{type.title}</h3>
                  <p className="text-gray-500 text-[13px] leading-relaxed">{type.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section className="py-20 bg-[#262522]">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="text-center mb-14">
            <p className="text-brand-orange text-[10px] uppercase tracking-[0.4em] font-semibold mb-3">
              El proceso
            </p>
            <h2 className="text-3xl md:text-[32px] font-bold text-white">
              Cómo funciona
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div key={step.number} className="relative">
                <div className="bg-white/5 rounded-xl p-7 h-full border border-white/[0.07] relative">
                  <div className="text-4xl font-bold text-brand-orange/30 mb-4 leading-none">{step.number}</div>
                  <h3 className="font-bold text-white text-[15px] mb-2">{step.title}</h3>
                  <p className="text-white/40 text-[13px] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULARIO CTA ── */}
      <section id="solicitar" className="py-20 bg-[#f8f6f2]">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div>
              <p className="text-brand-orange text-[10px] uppercase tracking-[0.4em] font-semibold mb-3">
                Solicitá ahora
              </p>
              <h2 className="text-3xl md:text-[32px] font-bold text-[#111] mb-4 leading-tight">
                Tasá tu propiedad<br />sin costo
              </h2>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
                Completá el formulario y uno de nuestros asesores se pondrá en contacto con vos dentro de las próximas 24 horas.
              </p>
              <div className="space-y-4 text-[14px] text-gray-500">
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-brand-orange shrink-0" />
                  <span>+54 (342) 456-5000</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={14} className="text-brand-orange shrink-0" />
                  <span>administracion@penalvainmobiliaria.com.ar</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="text-brand-orange shrink-0 mt-0.5" />
                  <span>Eva Perón 2845, Santa Fe<br />Lunes a Viernes 08:00 – 17:00 hs.</span>
                </div>
              </div>
            </div>

            <form className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Dirección de la propiedad</label>
                <input
                  type="text"
                  placeholder="Calle y número, ciudad"
                  className="w-full px-4 py-3 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Tipo de propiedad</label>
                <select className="w-full px-4 py-3 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange transition-colors appearance-none bg-white text-gray-600">
                  <option value="">Seleccionar</option>
                  <option>Casa</option>
                  <option>Departamento</option>
                  <option>Terreno</option>
                  <option>Local comercial</option>
                  <option>Otro</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Superficie aproximada (m²)</label>
                <input
                  type="number"
                  placeholder="Ej: 120"
                  className="w-full px-4 py-3 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Teléfono celular</label>
                  <input
                    type="tel"
                    placeholder="+54 342..."
                    className="w-full px-4 py-3 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Correo electrónico</label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange transition-colors"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-brand-orange text-white font-bold text-[13px] uppercase tracking-wider py-4 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Solicitar tasación gratuita
              </button>
            </form>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
