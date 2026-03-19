/**
 * Seed de 3 artículos SEO optimizados para Grupo GS
 * Ejecutar: node scripts/seed-blog-posts.mjs
 * Requiere: DATABASE_URL en .env.local o variable de entorno
 */
import { neon } from "@neondatabase/serverless";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");
if (existsSync(envPath)) {
  const env = readFileSync(envPath, "utf8");
  env.split("\n").forEach((line) => {
    const [key, ...val] = line.split("=");
    if (key && !key.startsWith("#")) {
      process.env[key.trim()] = val.join("=").trim().replace(/^["']|["']$/g, "");
    }
  });
}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL no configurada. Usa .env.local o export DATABASE_URL");
  process.exit(1);
}

const sql = neon(DATABASE_URL);

const POSTS = [
  {
    slug: "prevencion-control-plagas-hogar-empresa-barranquilla",
    title: "Prevención y Control de Plagas en Hogares y Empresas | Guía 2025",
    excerpt: "Guía completa de prevención y control de plagas en Barranquilla y el Caribe. Consejos de Grupo GS, 14+ años de experiencia. Fumigación, nebulización y Plan MIP.",
    content: `¿Buscas prevenir plagas en tu hogar o empresa? En Grupo GS te compartimos las mejores prácticas de control de plagas basadas en más de 14 años de experiencia en Barranquilla y el Caribe colombiano.

## ¿Por qué es importante el control de plagas?

Las plagas como cucarachas, roedores, comején y zancudos no solo son molestas: pueden transmitir enfermedades, contaminar alimentos y dañar estructuras. Un Plan de Manejo Integrado de Plagas (MIP) es la solución profesional que tu hogar o negocio necesita.

## 5 consejos para prevenir plagas

1. **Sellado de grietas y huecos**: Las cucarachas y roedores entran por espacios mínimos. Revisa ventanas, puertas y tuberías.

2. **Eliminación de fuentes de alimento**: Almacena alimentos en recipientes herméticos. Limpia derrames de inmediato.

3. **Control de humedad**: El comején y las cucarachas proliferan en ambientes húmedos. Repara fugas y mejora la ventilación.

4. **Fumigación periódica**: Contrata servicios profesionales de fumigación. En Grupo GS ofrecemos aspersión, nebulización y termonebulización.

5. **Documentación MIP**: Exige un Plan de Manejo Integrado de Plagas documentado para cumplir normativas en empresas.

## Servicios de control de plagas en Grupo GS

En Grupo GS Servicios Empresariales SAS manejamos:
- Fumigación residencial y comercial
- Nebulización para áreas amplias
- Desratización
- Control de comején
- Gel cucarachida (bajo impacto)

Cobertura: Barranquilla, Cartagena, Sincelejo, Valledupar. Atención 24/7.

¿Necesitas una cotización? Contáctanos por WhatsApp +57 321 8992537 o solicita tu cotización en nuestra web. #LaSolucion`,
    published: "published",
  },
  {
    slug: "lavado-tanques-agua-potable-decreto-1575-colombia",
    title: "Lavado de Tanques de Agua Potable: Decreto 1575 y Normativa en Colombia",
    excerpt: "Todo sobre el lavado y desinfección de tanques de agua. Cumplimiento del Decreto 1575/2007. Servicio certificado en Barranquilla y el Caribe por Grupo GS.",
    content: `El lavado y desinfección de tanques de agua potable es obligatorio para garantizar la calidad del agua que consumes. En Colombia, el Decreto 1575 de 2007 del Ministerio de Salud establece los requisitos. Grupo GS te explica qué debes saber.

## ¿Qué exige el Decreto 1575/2007?

El decreto reglamenta el Sistema de Información de la Calidad del Agua para consumo humano (SICAP). Entre sus disposiciones:

- Los tanques de almacenamiento deben limpiarse y desinfectarse periódicamente
- Se requiere personal capacitado y productos autorizados
- Debe existir registro del procedimiento

## Frecuencia recomendada del lavado de tanques

Para edificios, conjuntos residenciales, empresas e instituciones:
- **Mínimo**: Cada 6 meses
- **Recomendado**: Cada 3-4 meses en zonas de alta temperatura como el Caribe

En Barranquilla, Cartagena y Santa Marta el clima favorece la proliferación de bacterias y algas en tanques. Un lavado más frecuente previene problemas.

## Proceso de lavado de tanques Grupo GS

1. Vaciamos el tanque de forma controlada
2. Limpieza mecánica de paredes y fondo
3. Desinfección con productos autorizados
4. Enjuague y verificación
5. Llenado y cloración final
6. Entrega de certificado de servicio

Ofrecemos lavado de tanques subterráneos y elevados.

## ¿Por qué elegir Grupo GS para lavado de tanques?

- Más de 14 años de experiencia
- Cumplimiento total del Decreto 1575
- Cobertura en Caribe colombiano
- Atención 24/7
- Documentación y certificados

Solicita tu cotización de lavado de tanques. Garantizamos agua segura para tu familia o empresa.`,
    published: "published",
  },
  {
    slug: "fumigacion-barranquilla-control-plagas-caribe-profesional",
    title: "Fumigación en Barranquilla y el Caribe: Servicio Profesional de Control de Plagas",
    excerpt: "Fumigación profesional en Barranquilla, Cartagena, Santa Marta y el Caribe. Grupo GS, 14+ años. Cucarachas, roedores, comején. Cotiza 24/7.",
    content: `¿Problemas de plagas en Barranquilla, Cartagena o Santa Marta? El clima cálido del Caribe colombiano favorece la aparición de cucarachas, roedores, comején y zancudos. La fumigación profesional es la solución efectiva.

## Plagas más comunes en el Caribe colombiano

**Cucarachas**: Alemanas y americanas. Prefieren cocinas, baños y áreas con humedad. Nuestro gel cucarachida ofrece control prolongado.

**Roedores**: Ratas y ratones. Riesgo sanitario alto. Desratización con cebos y trampas profesionales.

**Comején**: Daña estructuras de madera. Requiere inspección y tratamiento especializado.

**Zancudos**: Dengue, zika y chikungunya. Nebulización y control de criaderos.

## Técnicas de fumigación que utilizamos

- **Aspersión**: Aplicación líquida para superficies
- **Nebulización**: Partículas finas para áreas amplias
- **Termonebulización**: Niebla caliente para penetración profunda
- **Gel cucarachida**: Bajo impacto, efectivo en grietas

Cada caso requiere una estrategia. Nuestro equipo evalúa y recomienda el mejor método.

## Cobertura de Grupo GS en el Caribe

Oficinas y cobertura en:
- Barranquilla (sede principal)
- Cartagena
- Santa Marta
- Montería
- Valledupar
- Sincelejo
- Sucre y Guajira
Atención 24/7. Más de 14 años como Grupo GS Servicios Empresariales SAS.

## Cotiza tu fumigación

No esperes a que la plaga se multiplique. Solicita tu cotización sin compromiso. Te respondemos en menos de 24 horas.

Teléfono y WhatsApp: +57 321 8992537

#LaSolucion para tu hogar y empresa.`,
    published: "published",
  },
];

async function seed() {
  console.log("Insertando artículos del blog...");
  for (const post of POSTS) {
    try {
      await sql`
        INSERT INTO posts (slug, title, excerpt, content, published)
        VALUES (${post.slug}, ${post.title}, ${post.excerpt}, ${post.content}, ${post.published})
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          excerpt = EXCLUDED.excerpt,
          content = EXCLUDED.content,
          published = EXCLUDED.published,
          updated_at = NOW()
      `;
      console.log("✓", post.title.substring(0, 50) + "...");
    } catch (e) {
      console.error("Error:", post.slug, e.message);
    }
  }
  console.log("Listo. 3 artículos SEO publicados.");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
