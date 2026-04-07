import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "App - Gerenciar colaboradores",
  description: "Aplicação para gerenciar colaboradores e squads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="font-sans">
      <body className="antialiased">{children}</body>
    </html>
  );
}
