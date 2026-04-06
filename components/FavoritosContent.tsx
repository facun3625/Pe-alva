"use client";

import { useEffect, useState } from "react";
import { Heart, MapPin, Bed, Trash2 } from "lucide-react";

interface Property {
  id: string;
  title: string;
  price: number;
  city: string;
  address: string;
  imageUrl?: string | null;
  type: string;
  propertyType: string;
  bedrooms?: number | null;
}

export default function FavoritosContent() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids: string[] = JSON.parse(localStorage.getItem("penalva_favs") || "[]");
    if (ids.length === 0) { setLoading(false); return; }
    fetch(`/api/properties?ids=${ids.join(",")}`)
      .then((r) => r.json())
      .then((data) => { setProperties(data); setLoading(false); });
  }, []);

  const remove = (id: string) => {
    const ids: string[] = JSON.parse(localStorage.getItem("penalva_favs") || "[]");
    const next = ids.filter((i) => i !== id);
    localStorage.setItem("penalva_favs", JSON.stringify(next));
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) return (
    <div className="text-center py-24 text-gray-400 text-sm">Cargando favoritos...</div>
  );

  if (properties.length === 0) return (
    <div className="text-center py-24">
      <Heart size={40} className="mx-auto mb-4 text-gray-200" />
      <p className="text-gray-400 text-sm mb-2">No tenés propiedades guardadas.</p>
      <a href="/propiedades" className="text-brand-orange text-sm hover:underline">Explorar propiedades</a>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property.id} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 relative">
          <button
            onClick={() => remove(property.id)}
            className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-red-50 p-2 rounded-full shadow transition-all"
            title="Quitar de favoritos"
          >
            <Trash2 size={13} className="text-red-400" />
          </button>
          <a href={`/propiedad/${property.id}`} className="block">
            <div className="relative h-48 overflow-hidden">
              <img
                src={property.imageUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"}
                alt={property.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-brand-orange text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                  {property.type}
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-1.5">
                <div className="text-brand-orange font-bold text-xl">
                  USD {property.price.toLocaleString("es-AR")}
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                  {property.propertyType}
                </span>
              </div>
              <h3 className="font-semibold text-[#111] text-[15px] mb-1.5 line-clamp-1">{property.title}</h3>
              <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                <MapPin size={11} />
                <span className="truncate">{property.city}, {property.address}</span>
              </div>
              {property.bedrooms != null && (
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-3 pt-3 border-t border-gray-100">
                  <Bed size={12} />
                  <span>{property.bedrooms} dormitorio{property.bedrooms !== 1 ? "s" : ""}</span>
                </div>
              )}
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
