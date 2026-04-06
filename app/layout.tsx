import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import TrackPageView from "@/components/TrackPageView";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Penalva Inmobiliaria — Santa Fe, Argentina",
  description:
    "Más de 20 años de trayectoria en compra, venta y alquiler de propiedades en Santa Fe, Argentina.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} antialiased`}>
        <TrackPageView />
        {children}
      </body>
    </html>
  );
}
