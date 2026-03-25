import Link from 'next/link'; // Importe o Link do Next.js
import { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Menu</h2>
        <nav className="space-y-2">
          <Link href="/" className="block hover:text-blue-400 transition-colors">
            Dashboard
          </Link>
          <Link href="/colaboradores" className="block hover:text-blue-400 transition-colors">
            Colaboradores
          </Link>
          <Link href="/squads" className="block hover:text-blue-400 transition-colors">
            Squads
          </Link>
          <Link href="/configuracoes" className="block hover:text-blue-400 transition-colors">
            Configurações
          </Link>
        </nav>
      </aside>

      {/* Área de conteúdo principal */}
      <main className="flex-1 overflow-auto bg-gray-100">
        <header className="bg-white shadow-sm p-4">
          <h1 className="text-xl font-semibold">Diretório de Colaboradores</h1>
        </header>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}