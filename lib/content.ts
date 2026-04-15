import prisma from "./prisma";

// Todos los bloques de contenido con sus valores por defecto
export const CONTENT_DEFAULTS: Record<string, { label: string; page: string; multiline: boolean; value: string }> = {
  // HOME
  home_titulo:    { page: "home", label: "Título principal", multiline: false, value: "Buscar Propiedades" },
  home_subtitulo: { page: "home", label: "Subtítulo", multiline: false, value: "Encontrá la propiedad que estás buscando" },
  home_hero_img:  { page: "home", label: "Imagen destacada", multiline: false, value: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80" },

  // NOSOTROS
  nosotros_hero_titulo:      { page: "nosotros", label: "Hero — Título", multiline: false, value: "Nosotros" },
  nosotros_hero_subtitulo:   { page: "nosotros", label: "Hero — Subtítulo", multiline: false, value: "Más de 20 años construyendo confianza en el mercado inmobiliario de Santa Fe." },
  nosotros_hero_img:         { page: "nosotros", label: "Hero — Imagen", multiline: false, value: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80" },
  nosotros_empresa_titulo:   { page: "nosotros", label: "Empresa — Título", multiline: false, value: "Peñalva Inmobiliaria\nde P+P SRL" },
  nosotros_empresa_img:      { page: "nosotros", label: "Empresa — Imagen", multiline: false, value: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" },
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

  // EMAIL ALERTAS
  email_asunto:   { page: "email", label: "Asunto del email", multiline: false, value: "Nuevas propiedades que coinciden con tu búsqueda — Penalva Inmobiliaria" },
  email_saludo:   { page: "email", label: "Texto introductorio", multiline: false, value: "Ingresaron nuevas propiedades que coinciden con tu búsqueda:" },
  email_cierre:   { page: "email", label: "Texto de cierre", multiline: true, value: "Si tenés alguna consulta no dudes en contactarnos. Estamos para ayudarte." },

  // TASACIÓN
  tasacion_hero_titulo:      { page: "tasacion", label: "Hero — Título", multiline: false, value: "Tasación de Propiedades" },
  tasacion_hero_subtitulo:   { page: "tasacion", label: "Hero — Subtítulo", multiline: false, value: "Conocé el valor real de tu propiedad con un informe profesional respaldado por el mercado." },
  tasacion_hero_img:         { page: "tasacion", label: "Hero — Imagen", multiline: false, value: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80" },
  tasacion_intro_titulo:     { page: "tasacion", label: "Intro — Título", multiline: false, value: "¿Desea vender o alquilar su propiedad?" },
  tasacion_intro_p1:         { page: "tasacion", label: "Intro — Párrafo 1", multiline: true, value: "Contamos con un equipo altamente especializado y con amplio conocimiento del mercado inmobiliario, capacitado para realizar una real y exacta tasación de su inmueble." },
  tasacion_intro_p2:         { page: "tasacion", label: "Intro — Párrafo 2", multiline: true, value: "Nuestro interés es brindarle el mejor servicio para su mejor beneficio." },
  tasacion_intro_cta:        { page: "tasacion", label: "Intro — Llamada a la acción", multiline: false, value: "Complete el formulario y a la brevedad lo contactaremos personalmente." },
  tasacion_tipos_titulo:     { page: "tasacion", label: "Tipos — Título", multiline: false, value: "Qué tipos de propiedades tasamos" },
  tasacion_proceso_titulo:   { page: "tasacion", label: "Proceso — Título", multiline: false, value: "Cómo funciona" },
  tasacion_form_titulo:      { page: "tasacion", label: "Formulario — Título", multiline: false, value: "Tasá tu propiedad\nsin costo" },
  tasacion_form_subtitulo:   { page: "tasacion", label: "Formulario — Subtítulo", multiline: true, value: "Completá el formulario y uno de nuestros asesores se pondrá en contacto con vos dentro de las próximas 24 horas." },
  
  // ADMINISTRACIÓN DE CONSORCIOS
  consorcios_hero_titulo:    { page: "consorcios", label: "Hero — Título", multiline: false, value: "Administración de Consorcios" },
  consorcios_hero_subtitulo: { page: "consorcios", label: "Hero — Subtítulo", multiline: false, value: "Gestión integral, transparente y eficiente para su edificio o complejo." },
  consorcios_hero_img:       { page: "consorcios", label: "Hero — Imagen", multiline: false, value: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80" },
  consorcios_intro_titulo:   { page: "consorcios", label: "Intro — Título", multiline: false, value: "Expertos en Gestión de Propiedades" },
  consorcios_intro_p1:       { page: "consorcios", label: "Intro — Párrafo 1", multiline: true, value: "Contamos con una amplia experiencia en la organización y liquidación de expensas, garantizando orden y claridad en las cuentas de su consorcio." },
  consorcios_intro_p2:       { page: "consorcios", label: "Intro — Párrafo 2", multiline: true, value: "Nuestro equipo se encarga de todo: mantenimiento, recursos humanos, seguimiento de moras y asesoramiento legal permanente." },

  // PROYECTO Y OBRA
  obras_hero_titulo:         { page: "obras", label: "Hero — Título", multiline: false, value: "Proyecto y Ejecución de Obras" },
  obras_hero_subtitulo:      { page: "obras", label: "Hero — Subtítulo", multiline: false, value: "Hacemos realidad sus proyectos, desde la concepción hasta la entrega de llaves." },
  obras_hero_img:            { page: "obras", label: "Hero — Imagen", multiline: false, value: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&w=1600&q=80" },
  obras_intro_titulo:        { page: "obras", label: "Intro — Título", multiline: false, value: "Construimos calidad" },
  obras_intro_p1:            { page: "obras", label: "Intro — Párrafo 1", multiline: true, value: "Brindamos un servicio integral de arquitectura y construcción, priorizando la funcionalidad, el diseño y el uso eficiente de recursos." },
  obras_intro_p2:            { page: "obras", label: "Intro — Párrafo 2", multiline: true, value: "Nos especializamos en desarrollos residenciales y comerciales, con un seguimiento riguroso de cada etapa de la obra." },
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
