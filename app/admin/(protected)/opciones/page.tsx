"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Trash2, Loader2, Pencil, Check, X } from "lucide-react";

function TagList({ title, endpoint }: { title: string; endpoint: string }) {
  const [items, setItems] = useState<{ id: string; name: string }[]>([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const editRef = useRef<HTMLInputElement>(null);

  const load = () => {
    setLoading(true);
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => { setItems(data); setLoading(false); });
  };

  useEffect(() => { load(); }, []);
  useEffect(() => { if (editingId) editRef.current?.focus(); }, [editingId]);

  const add = async () => {
    if (!newName.trim()) return;
    setSaving(true);
    await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: newName.trim() }) });
    setNewName(""); setSaving(false); load();
  };

  const confirmEdit = async (id: string) => {
    if (!editValue.trim()) { setEditingId(null); return; }
    await fetch(`${endpoint}/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: editValue.trim() }) });
    setEditingId(null); load();
  };

  const remove = async (id: string) => { await fetch(`${endpoint}/${id}`, { method: "DELETE" }); load(); };

  const f = "px-4 py-2.5 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange bg-white";

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-300 mb-5">{title}</h2>
      <div className="flex gap-2 mb-5">
        <input value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} placeholder="Nombre..." className={`flex-1 ${f}`} />
        <button onClick={add} disabled={saving} className="flex items-center gap-1.5 bg-brand-orange hover:bg-orange-700 disabled:bg-gray-300 text-white text-[13px] font-semibold px-4 py-2.5 rounded-lg transition-colors">
          {saving ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />} Agregar
        </button>
      </div>
      {loading ? <div className="flex justify-center py-6"><Loader2 size={18} className="animate-spin text-gray-300" /></div>
        : items.length === 0 ? <p className="text-[13px] text-gray-300 py-4 text-center">Sin elementos</p>
        : (
          <ul className="space-y-1.5">
            {items.map((item) => editingId === item.id ? (
              <li key={item.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-50 border border-brand-orange/20">
                <input ref={editRef} value={editValue} onChange={(e) => setEditValue(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") confirmEdit(item.id); if (e.key === "Escape") setEditingId(null); }} className="flex-1 text-[13px] bg-transparent focus:outline-none text-[#111]" />
                <button onClick={() => confirmEdit(item.id)} className="text-brand-orange hover:text-orange-700 transition-colors"><Check size={14} /></button>
                <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={14} /></button>
              </li>
            ) : (
              <li key={item.id} className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-gray-50 group">
                <span className="text-[13px] text-[#111]">{item.name}</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditingId(item.id); setEditValue(item.name); }} className="p-1.5 text-gray-400 hover:text-brand-orange transition-colors rounded"><Pencil size={12} /></button>
                  <button onClick={() => remove(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded"><Trash2 size={12} /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}

// ─── Lista especial para operaciones con campo WhatsApp ───────────────────────
function OperationList() {
  const [items, setItems] = useState<{ id: string; name: string; whatsapp?: string | null }[]>([]);
  const [newName, setNewName] = useState("");
  const [newWa, setNewWa] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editWa, setEditWa] = useState("");

  const load = () => {
    setLoading(true);
    fetch("/api/operations").then((r) => r.json()).then((data) => { setItems(data); setLoading(false); });
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!newName.trim()) return;
    setSaving(true);
    await fetch("/api/operations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: newName.trim(), whatsapp: newWa.trim() || null }) });
    setNewName(""); setNewWa(""); setSaving(false); load();
  };

  const startEdit = (item: typeof items[0]) => { setEditingId(item.id); setEditName(item.name); setEditWa(item.whatsapp ?? ""); };

  const confirmEdit = async (id: string) => {
    if (!editName.trim()) { setEditingId(null); return; }
    await fetch(`/api/operations/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: editName.trim(), whatsapp: editWa.trim() || null }) });
    setEditingId(null); load();
  };

  const remove = async (id: string) => { await fetch(`/api/operations/${id}`, { method: "DELETE" }); load(); };

  const f = "px-4 py-2.5 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange bg-white";

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-300 mb-5">Tipos de operación</h2>

      {/* Agregar nuevo */}
      <div className="flex flex-col gap-2 mb-5">
        <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Nombre (ej: Venta)" className={f} />
        <div className="flex gap-2">
          <input
            value={newWa}
            onChange={(e) => setNewWa(e.target.value)}
            placeholder="WhatsApp (ej: 5493425000000)"
            className={`flex-1 ${f}`}
          />
          <button onClick={add} disabled={saving} className="flex items-center gap-1.5 bg-brand-orange hover:bg-orange-700 disabled:bg-gray-300 text-white text-[13px] font-semibold px-4 py-2.5 rounded-lg transition-colors shrink-0">
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />} Agregar
          </button>
        </div>
        <p className="text-[11px] text-gray-400">El número de WhatsApp se usará en la ficha de cada propiedad de este tipo.</p>
      </div>

      {loading ? <div className="flex justify-center py-6"><Loader2 size={18} className="animate-spin text-gray-300" /></div>
        : items.length === 0 ? <p className="text-[13px] text-gray-300 py-4 text-center">Sin elementos</p>
        : (
          <ul className="space-y-2">
            {items.map((item) => editingId === item.id ? (
              <li key={item.id} className="flex flex-col gap-2 px-3 py-3 rounded-lg bg-orange-50 border border-brand-orange/20">
                <input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Nombre" className="text-[13px] px-3 py-2 border border-brand-orange/30 rounded-lg bg-white focus:outline-none" />
                <div className="flex gap-2">
                  <input value={editWa} onChange={(e) => setEditWa(e.target.value)} placeholder="WhatsApp" className="flex-1 text-[13px] px-3 py-2 border border-brand-orange/30 rounded-lg bg-white focus:outline-none" />
                  <button onClick={() => confirmEdit(item.id)} className="text-brand-orange hover:text-orange-700 transition-colors px-2"><Check size={16} /></button>
                  <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-600 transition-colors px-2"><X size={16} /></button>
                </div>
              </li>
            ) : (
              <li key={item.id} className="flex items-center justify-between px-4 py-3 rounded-lg bg-gray-50 group">
                <div>
                  <p className="text-[13px] font-medium text-[#111]">{item.name}</p>
                  {item.whatsapp
                    ? <p className="text-[11px] text-gray-400 mt-0.5">WA: {item.whatsapp}</p>
                    : <p className="text-[11px] text-gray-300 mt-0.5">Sin WhatsApp asignado</p>
                  }
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => startEdit(item)} className="p-1.5 text-gray-400 hover:text-brand-orange transition-colors rounded"><Pencil size={12} /></button>
                  <button onClick={() => remove(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded"><Trash2 size={12} /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}

export default function OpcionesPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#111]">Opciones</h1>
        <p className="text-gray-400 text-[13px] mt-1">Gestioná las operaciones, tipos y ciudades disponibles</p>
      </div>

      <div className="grid grid-cols-3 gap-5 items-start">
        <OperationList />
        <TagList title="Tipos de propiedad" endpoint="/api/property-types" />
        <TagList title="Ciudades" endpoint="/api/cities" />
      </div>
    </div>
  );
}
