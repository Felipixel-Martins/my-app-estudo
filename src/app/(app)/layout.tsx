'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';

// Este layout é aplicado a todas as rotas dentro do grupo (app)
// Ou seja: /, /colaboradores, /squads, /configuracoes, etc.
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Estado para controlar a abertura/fechamento do menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - visível apenas em desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Área de conteúdo principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header com botão para abrir menu mobile */}
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        
        {/* Conteúdo da página atual com rolagem independente */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>

      {/* Menu mobile - aparece apenas quando isMobileMenuOpen é true */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </div>
  );
}