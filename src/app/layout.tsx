import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://grupogscol.com"),
  title: {
    default: "Grupo GS | Control Plagas y Lavado Tanques | Barranquilla",
    template: "%s | Grupo GS",
  },
  description:
    "Control de plagas y lavado de tanques. 14+ años. Caribe, Bogotá y Panamá. Cotiza 24/7. #LaSolucion",
  keywords: ["fumigación Barranquilla", "control plagas Barranquilla", "lavado tanques Barranquilla"],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
