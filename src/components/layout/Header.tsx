'use client';

import { usePathname } from 'next/navigation';
import { Menu, Bell } from 'lucide-react';

// Mapeamento de rotas para títulos
// Quando a URL corresponde à chave, mostra o valor correspondente
const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/colaboradores': 'Colaboradores',
  '/squads': 'Squads',
  '/configuracoes': 'Configurações',
  '/relatorios': 'Relatórios',
};

// Função para determinar o título baseado na URL atual
function getPageTitle(pathname: string): string {
  // Primeiro, verifica se é uma rota exata
  if (pageTitles[pathname]) {
    return pageTitles[pathname];
  }
  
  // Depois, verifica rotas dinâmicas usando regex
  if (pathname.match(/^\/colaboradores\/\d+$/)) {
    return 'Detalhes do Colaborador';
  }
  
  if (pathname.match(/^\/colaboradores\/\d+\/editar$/)) {
    return 'Editar Colaborador';
  }
  
  if (pathname.match(/^\/squads\/\d+$/)) {
    return 'Detalhes do Squad';
  }
  
  // Fallback padrão
  return 'Diretório';
}

// Interface para as props do componente
interface HeaderProps {
  onMenuClick?: () => void;  // Função opcional para abrir o menu mobile
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-3">
        
        {/* Lado esquerdo: botão mobile + título */}
        <div className="flex items-center gap-3">
          {/* Botão do menu mobile - só aparece em telas menores que lg (1024px) */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Título dinâmico da página */}
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>

        {/* Lado direito: ações do usuário */}
        <div className="flex items-center gap-2">
          {/* Botão de notificações com indicador */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-gray-600" />
            {/* Indicador de notificação não lida */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Botão do perfil do usuário */}
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
            {/* Avatar placeholder */}
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
              AD
            </div>
            {/* Nome do usuário - escondido em telas muito pequenas */}
            <span className="hidden md:inline text-sm text-gray-700">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}
