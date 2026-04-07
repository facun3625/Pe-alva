import prisma from "./prisma";

// Todos los bloques de contenido con sus valores por defecto
export const CONTENT_DEFAULTS: Record<string, { label: string; page: string; multiline: boolean; value: string }> = {
  // HOME
  home_titulo:    { page: "home", label: "Título principal", multiline: false, value: "Buscar Propiedades" },
  home_subtitulo: { page: "home", label: "Subtítulo", multiline: false, value: "Encontrá la propiedad que estás buscando" },

  // NOSOTROS
  nosotros_hero_titulo:      { page: "nosotros", label: "Hero — Título", multiline: false, value: "Nosotros" },
  nosotros_hero_subtitulo:   { page: "nosotros", label: "Hero — Subtítulo", multiline: false, value: "Más de 20 años construyendo confianza en el mercado inmobiliario de Santa Fe." },
  nosotros_empresa_titulo:   { page: "nosotros", label: "Empresa — Título", multiline: false, value: "Peñalva Inmobiliaria\nde P+P SRL" },
  nosotros_empresa_p1:       { page: "nosotros", label: "Empresa — Párrafo 1", multiline: true, value: "La empresa Peñalva Inmobiliaria de P+P SRL, con más de veinte años de trayectoria en su actividad, justifica su permanencia en el mercado al brindar responsabilidad, honestidad y cumplimiento." },
  nosotros_empresa_p2:       { page: "nosotros", label: "Empresa — Párrafo 2", multiline: true, value: "Contamos para este fin con profesionales de reconocido prestigio y personal idóneo para asesorarlo en una buena defensa de su patrimonio." },
  nosotros_empresa_p3:       { page: "nosotros", label: "Empresa — Párrafo 3", multiline: true, value: "La trayectoria ha hecho de nuestro nombre un sinónimo de seriedad, confiabilidad y respeto por el cliente." },
  nosotros_empresa_quote:    { page: "nosotros", label: "Empresa — Frase destacada", multiline: false, value: '"Su consulta no es molestia, nos fortalece..."' },
  nosotros_horario:          { page: "nosotros", label: "Horario de atención", multiline: false, value: "Horario de atención: Lunes a Viernes, 08:00 a 17:00 hs." },
  nosotros_valores_titulo:   { page: "nosotros", label: "Valores — Título", multiline: false, value: "Lo que nos define" },
  nosotros_equipo_titulo:    { page: "nosotros", label: "Equipo — Título", multiline: false, value: "Nuestro equipo" },
  nosotros_contacto_texto:   { page: "nosotros", label: "Contacto — Texto", multiline: true, value: "Estamos disponibles de lunes a viernes para asesorarte en la compra, venta o alquiler de tu propiedad." },

  // FOOTER
  footer_tagline:       { page: "footer", label: "Tagline bajo el logo", multiline: false, value: "Más de 20 años de trayectoria en Santa Fe, garantizando seriedad, confianza y resultados reales." },
  footer_col2_titulo:   { page: "footer", label: "Columna 2 — Título", multiline: false, value: "¿Desea vender o alquilar?" },
  footer_col2_texto:    { page: "footer", label: "Columna 2 — Texto", multiline: true, value: "Contamos con un equipo altamente especializado y con amplio conocimiento del mercado inmobiliario capacitado para realizar una real y exacta tasación de su inmueble. Nuestro interés es brindarle el mejor servicio para su mejor beneficio." },
  footer_col2_cta:      { page: "footer", label: "Columna 2 — CTA", multiline: false, value: "Complete el formulario y a la brevedad lo contactaremos personalmente." },
  footer_cta_titulo:    { page: "footer", label: "Banda CTA — Título", multiline: false, value: "Hablemos hoy." },
  footer_cta_subtitulo: { page: "footer", label: "Banda CTA — Subtítulo", multiline: false, value: "¿Querés vender o alquilar?" },

  // TASACIÓN
  tasacion_hero_titulo:      { page: "tasacion", label: "Hero — Título", multiline: false, value: "Tasación de Propiedades" },
  tasacion_hero_subtitulo:   { page: "tasacion", label: "Hero — Subtítulo", multiline: false, value: "Conocé el valor real de tu propiedad con un informe profesional respaldado por el mercado." },
  tasacion_intro_titulo:     { page: "tasacion", label: "Intro — Título", multiline: false, value: "¿Desea vender o alquilar su propiedad?" },
  tasacion_intro_p1:         { page: "tasacion", label: "Intro — Párrafo 1", multiline: true, value: "Contamos con un equipo altamente especializado y con amplio conocimiento del mercado inmobiliario, capacitado para realizar una real y exacta tasación de su inmueble." },
  tasacion_intro_p2:         { page: "tasacion", label: "Intro — Párrafo 2", multiline: true, value: "Nuestro interés es brindarle el mejor servicio para su mejor beneficio." },
  tasacion_intro_cta:        { page: "tasacion", label: "Intro — Llamada a la acción", multiline: false, value: "Complete el formulario y a la brevedad lo contactaremos personalmente." },
  tasacion_tipos_titulo:     { page: "tasacion", label: "Tipos — Título", multiline: false, value: "Qué tipos de propiedades tasamos" },
  tasacion_proceso_titulo:   { page: "tasacion", label: "Proceso — Título", multiline: false, value: "Cómo funciona" },
  tasacion_form_titulo:      { page: "tasacion", label: "Formulario — Título", multiline: false, value: "Tasá tu propiedad\nsin costo" },
  tasacion_form_subtitulo:   { page: "tasacion", label: "Formulario — Subtítulo", multiline: true, value: "Completá el formulario y uno de nuestros asesores se pondrá en contacto con vos dentro de las próximas 24 horas." },
};

// Devuelve el valor de un bloque, tomando el default si no existe en la DB
export async function getContent(key: string, fallback?: string): Promise<string> {
  try {
    const block = await prisma.contentBlock.findUnique({ where: { key } });
    if (block) return block.value;
    return fallback ?? CONTENT_DEFAULTS[key]?.value ?? "";
  } catch {
    return fallback ?? CONTENT_DEFAULTS[key]?.value ?? "";
  }
}

// Devuelve todos los bloques (para el panel admin)
export async function getAllContent(): Promise<Record<string, string>> {
  try {
    const blocks = await prisma.contentBlock.findMany();
    const map: Record<string, string> = {};
    blocks.forEach((b) => { map[b.key] = b.value; });
    return map;
  } catch {
    return {};
  }
}
