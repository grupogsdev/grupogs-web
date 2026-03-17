# Grupo GS - Web Corporativa

Sitio web corporativo para **Grupo GS Servicios Empresariales SAS** - Control de plagas y lavado de tanques.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **TypeScript**
- **Vercel** (deploy)
- **Neon** (PostgreSQL - opcional)
- **Vercel Blob** (imagenes - opcional)

## Desarrollo local

```bash
npm install
cp .env.example .env.local
# Editar .env.local con ADMIN_EMAIL y ADMIN_PASSWORD
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Admin

- URL: `/admin`
- Credenciales por defecto: ver `.env.example`
- Cambiar en produccion: `ADMIN_EMAIL` y `ADMIN_PASSWORD`

## Deploy

### Variables de entorno (Vercel)

Configuradas en Vercel Dashboard > Settings > Environment Variables:

| Variable | Descripción |
|----------|-------------|
| `ADMIN_EMAIL` | Email del admin |
| `ADMIN_PASSWORD` | Contraseña del admin |
| `DATABASE_URL` | Neon PostgreSQL (leads, bot config) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob (imágenes) |
| `OPENAI_API_KEY` | **Requerido para el chat bot** - agregar en Vercel |

### Pre-deploy (verificar)

```bash
npm run build
```

### Vercel CLI

```bash
vercel login
vercel --prod
```

### Migraciones (Neon)

```bash
DATABASE_URL="postgresql://..." npm run db:push
```

## Estructura

- `/` - Inicio
- `/nosotros` - Quienes somos
- `/servicios` - Control de plagas, Lavado de tanques
- `/contacto` - Formulario
- `/cotizacion` - Cotizacion
- `/clientes` - Clientes
- `/galeria` - Galeria
- `/blog` - Blog
- `/admin` - Panel administrador

## SEO

- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`
- Meta tags por pagina
- URLs amigables
