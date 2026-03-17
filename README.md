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

### Pre-deploy (verificar)

```bash
npm run build
```

### Vercel

1. Conectar repo con GitHub
2. Importar proyecto en [vercel.com](https://vercel.com)
3. Variables de entorno: `ADMIN_EMAIL`, `ADMIN_PASSWORD`
4. Dominio: grupogscol.com

### CLI

```bash
npm i -g vercel
vercel login
vercel
vercel --prod
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
