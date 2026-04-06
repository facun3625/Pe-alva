"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/formatPrice";
import {
  Building2,
  Plus,
  TrendingUp,
  Clock,
  Eye,
  ArrowRight,
  MapPin,
  Loader2,
  Save,
  ChevronDown,
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/properties")
      .then((r) => r.json())
      .then((data) => { setProperties(data); setLoading(false); });
  }, []);

  const total = properties.length;
  const ventas = properties.filter((p) => p.type === "Venta").length;
  const alquileres = properties.filter((p) => p.type === "Alquiler").length;
  const recent = properties.slice(0, 5);

  return (
    <div className="p-8 max-w-5xl">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#111]">Dashboard</h1>
        <p className="text-gray-400 text-[13px] mt-1">Bienvenido al panel de Penalva Inmobiliaria</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total propiedades", value: total, icon: Building2, color: "text-brand-orange" },
          { label: "En venta", value: ventas, icon: TrendingUp, color: "text-blue-500" },
          { label: "En alquiler", value: alquileres, icon: Clock, color: "text-emerald-500" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[12px] text-gray-400 uppercase tracking-wider font-medium">{stat.label}</p>
                <Icon size={16} className={stat.color} />
              </div>
              <p className="text-3xl font-semibold text-[#111]">
                {loading ? <Loader2 size={20} className="animate-spin text-gray-300" /> : stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <a
          href="/admin/nueva"
          className="flex items-center gap-4 bg-brand-orange hover:bg-orange-700 text-white rounded-xl p-5 transition-colors group"
        >
          <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center shrink-0">
            <Plus size={20} />
          </div>
          <div>
            <p className="font-semibold text-[14px]">Nueva propiedad</p>
            <p className="text-white/60 text-[12px]">Publicar un nuevo inmueble</p>
          </div>
          <ArrowRight size={16} className="ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
        </a>
        <a
          href="/admin/propiedades"
          className="flex items-center gap-4 bg-white hover:bg-gray-50 text-[#111] rounded-xl p-5 border border-gray-100 shadow-sm transition-colors group"
        >
          <div className="w-10 h-10 bg-[#f4f4f5] rounded-lg flex items-center justify-center shrink-0">
            <Eye size={20} className="text-gray-500" />
          </div>
          <div>
            <p className="font-semibold text-[14px]">Ver propiedades</p>
            <p className="text-gray-400 text-[12px]">Gestionar el listado</p>
          </div>
          <ArrowRight size={16} className="ml-auto opacity-30 group-hover:opacity-70 group-hover:translate-x-0.5 transition-all" />
        </a>
      </div>

      {/* Recent properties */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-[14px] text-[#111]">Propiedades recientes</h2>
          <a href="/admin/propiedades" className="text-[12px] text-brand-orange hover:text-orange-700 transition-colors">
            Ver todas
          </a>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={20} className="animate-spin text-gray-300" />
          </div>
        ) : recent.length === 0 ? (
          <div className="py-12 text-center text-gray-300 text-[13px]">Sin propiedades aún</div>
        ) : (
          <ul>
            {recent.map((p, i) => (
              <li key={p.id} className={`flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors ${i < recent.length - 1 ? "border-b border-gray-100" : ""}`}>
                <div className="w-10 h-10 bg-[#f4f4f5] rounded-lg flex items-center justify-center shrink-0">
                  <Building2 size={15} className="text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-[#111] truncate">{p.title}</p>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <MapPin size={10} />
                    <span>{p.city}, {p.address}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[13px] font-semibold text-brand-orange">{formatPrice(p.price, p.currency, p.pricePerMonth)}</p>
                  <span className={`text-[10px] uppercase font-medium px-2 py-0.5 rounded ${p.type === "Venta" ? "bg-blue-50 text-blue-500" : "bg-emerald-50 text-emerald-500"}`}>
                    {p.type}
                  </span>
                </div>
                <a href={`/propiedad/${p.id}`} target="_blank" className="text-gray-300 hover:text-brand-orange transition-colors ml-2">
                  <Eye size={15} />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}
