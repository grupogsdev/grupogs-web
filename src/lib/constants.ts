/**
 * Constantes Grupo GS Servicios Empresariales SAS
 */

export const SITE = {
  name: "Grupo GS Servicios Empresariales SAS",
  shortName: "Grupo GS",
  slogan: "#LaSolucion",
  description:
    "Control de plagas y lavado de tanques. 14+ años. Caribe, Bogotá y Panamá. Atención 24/7.",
  domain: "grupogscol.com",
  url: "https://grupogscol.com",
  email: "gerencia@grupogscol.com",
  phone: "+57 310 648 8113",
  whatsapp: "573106488113",
  founded: 2011,
  founder: "Dr. Santiago Lozano",
} as const;

export const COLORS = {
  primary: "#00a651",
  primaryDark: "#008c44",
  secondary: "#fdd835",
  secondaryDark: "#f5c400",
  white: "#ffffff",
  black: "#1a1a1a",
} as const;

export const OFFICES = [
  { city: "Barranquilla", address: "Cll. 72 # 68-145 La Concepción", phone: "+57 310 648 8113" },
  { city: "Cartagena", address: "Kra. 102 # 36B-25 Los Campanos" },
  { city: "Santa Marta", address: "Cll. 22 # 17A-20 Los Alcázares" },
  { city: "Montería", address: "Cll. 22 # 5A-72 El Sabanal" },
  { city: "Valledupar", address: "Transv. 23 # 18-52 Los Fundadores" },
  { city: "Sucre", address: "Cra. 5 # 9-16 El Palito" },
  { city: "Guajira", address: "Predio Playa Rica, Cra. 4 y 5 Palomino" },
  { city: "Sincelejo", address: "Cobertura" },
  { city: "Bogotá", address: "Cobertura" },
  { city: "Panamá", address: "Cobertura" },
] as const;

export const SOCIAL = {
  facebook: "https://facebook.com/grupogscolombia",
  instagram: "https://instagram.com/grupogscolombia",
} as const;

export const TESTIMONIALS = [
  {
    name: "Carlos Mendoza",
    role: "Gerente, Avanza",
    avatar: "CM",
    rating: 5,
    text: "Excelente servicio de fumigación. Puntuales, profesionales y con resultados visibles desde la primera visita. Los recomendamos.",
  },
  {
    name: "María Fernanda López",
    role: "Administradora, Yesos y Caolines",
    avatar: "ML",
    rating: 5,
    text: "Hemos trabajado con Grupo GS por años. Control de plagas impecable y el lavado de tanques cumple con toda la normativa.",
  },
  {
    name: "Jorge Ramírez",
    role: "Director, CRA Atlántico",
    avatar: "JR",
    rating: 5,
    text: "Servicio de nebulización muy efectivo. Equipo capacitado y documentación MIP en orden. Totalmente confiables.",
  },
  {
    name: "Ana Patricia Gómez",
    role: "Coordinadora, Davivienda",
    avatar: "AG",
    rating: 5,
    text: "Contratamos el servicio de desinfección para nuestras oficinas. Resultados excelentes y atención 24/7 cuando lo necesitamos.",
  },
  {
    name: "Luis Eduardo Torres",
    role: "Supervisor, ICBF",
    avatar: "LT",
    rating: 5,
    text: "Grupo GS ha sido nuestro aliado en varias sedes. Profesionales, cumplidos y con precios competitivos. #LaSolucion.",
  },
] as const;

export const CLIENT_LOGOS = [
  { name: "Avanza", initials: "AV" },
  { name: "Yesos y Caolines", initials: "YC" },
  { name: "CRA Atlántico", initials: "CRA" },
  { name: "Davivienda", initials: "DV" },
  { name: "ICBF", initials: "IC" },
  { name: "IPS Montería", initials: "IPS" },
] as const;

export const SERVICES = [
  {
    slug: "control-de-plagas",
    title: "Control de Plagas",
    shortDesc:
      "Controlamos comején, cucarachas, roedores, palomas, zancudos y toda clase de insectos.",
    description:
      "Controlamos comején, cucarachas, roedores, palomas, zancudos y toda clase de insectos a través de diferentes técnicas: aspersión, nebulización, termonebulización, gel cucarachida y desratización. Plan de Manejo Integrado de Plagas (MIP) documentado.",
    techniques: ["Aspersión", "Nebulización", "Termonebulización", "Gel cucarachida", "Desratización", "Plan MIP"],
  },
  {
    slug: "lavado-tanques",
    title: "Lavado de Tanques",
    shortDesc: "Lavado y desinfección de tanques de agua potable. Decreto 1575/2007.",
    description:
      "Lavado y desinfección de tanques de agua potable subterráneos, elevados y pozos sépticos. Cumplimiento decreto 1575/2007 del Ministerio de Salud.",
    techniques: ["Tanques subterráneos y elevados", "Desinfección certificada", "Decreto 1575/2007", "Pozos sépticos"],
  },
] as const;
