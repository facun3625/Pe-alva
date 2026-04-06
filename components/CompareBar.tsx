"use client";

import { useEffect, useState } from "react";
import { X, GitCompare } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  propertyId?: string; // current property to highlight
}

export default function CompareBar({ propertyId }: Props) {
  const router = useRouter();
  const [ids, setIds] = useState<string[]>([]);
  const [properties, setProperties] = useState<Record<string, { title: string; imageUrl?: string | null }>>({});

  const load = () => {
    const stored: string[] = JSON.parse(localStorage.getItem("penalva_compare") || "[]");
    setIds(stored);
    if (stored.length > 0) {
      fetch(`/api/properties?ids=${stored.join(",")}`)
        .then((r) => r.json())
        .then((data: any[]) => {
          const map: Record<string, any> = {};
          data.forEach((p) => { map[p.id] = p; });
          setProperties(map);
        });
    } else {
      setProperties({});
    }
  };

  useEffect(() => {
    load();
    window.addEventListener("compare-update", load);
    return () => window.removeEventListener("compare-update", load);
  }, []);

  const remove = (id: string) => {
    const next = ids.filter((i) => i !== id);
    localStorage.setItem("penalva_compare", JSON.stringify(next));
    setIds(next);
  };

  const clear = () => {
    localStorage.setItem("penalva_compare", "[]");
    setIds([]);
  };

  if (ids.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#262522] border-t border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-2 md:py-3">
        {/* Mobile layout */}
        <div className="flex md:hidden items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <GitCompare size={13} className="text-brand-orange" />
            <span className="text-white text-[11px] font-semibold">{ids.length}/3 para comparar</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={clear} className="text-white/40 text-[11px]">Limpiar</button>
            {ids.length >= 2 && (
              <button
                onClick={() => router.push(`/comparar?ids=${ids.join(",")}`)}
                className="bg-brand-orange text-white text-[11px] font-bold uppercase px-3 py-1.5 rounded-lg"
              >
                Comparar
              </button>
            )}
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <GitCompare size={15} className="text-brand-orange" />
            <span className="text-white text-[12px] font-semibold uppercase tracking-wider">Comparar</span>
            <span className="text-white/40 text-[12px]">({ids.length}/3)</span>
          </div>
          <div className="flex items-center gap-3 flex-1 overflow-x-auto">
            {ids.map((id) => {
              const p = properties[id];
              return (
                <div key={id} className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5 shrink-0">
                  {p?.imageUrl && <img src={p.imageUrl} className="w-8 h-8 rounded object-cover" alt="" />}
                  <span className="text-white text-[12px] max-w-[140px] truncate">{p?.title ?? "Cargando..."}</span>
                  <button onClick={() => remove(id)} className="text-white/40 hover:text-white transition-colors ml-1"><X size={13} /></button>
                </div>
              );
            })}
            {ids.length < 3 && (
              <div className="flex items-center justify-center w-12 h-9 border border-dashed border-white/20 rounded-lg text-white/25 text-lg shrink-0">+</div>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button onClick={clear} className="text-white/40 hover:text-white text-[12px] transition-colors">Limpiar</button>
            {ids.length >= 2 && (
              <button
                onClick={() => router.push(`/comparar?ids=${ids.join(",")}`)}
                className="bg-brand-orange hover:bg-orange-700 text-white text-[12px] font-bold uppercase tracking-wider px-5 py-2 rounded-lg transition-colors"
              >
                Comparar ahora
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
