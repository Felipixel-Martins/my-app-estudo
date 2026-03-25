'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, LayoutDashboard, Users, Group, Settings } from 'lucide-react';

// Interface para as props do componente
interface MobileNavProps {
  isOpen: boolean;      // Controla se o menu está visível
  onClose: () => void;  // Função para fechar o menu
}

// Itens de navegação para o menu mobile
const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/colaboradores', label: 'Colaboradores', icon: Users },
  { href: '/squads', label: 'Squads', icon: Group },
  { href: '/configuracoes', label: 'Configurações', icon: Settings },
];

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  // Se o menu não está aberto, não renderiza nada
  if (!isOpen) return null;

  return (
    <>
      {/* Menu lateral que desliza da esquerda */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white z-50 lg:hidden">
        
        {/* Cabeçalho do menu com botão de fechar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <span className="font-bold text-lg">Menu</span>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Links de navegação */}
        <nav className="py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}  // Fecha o menu ao clicar no link
                className={`
                  flex items-center gap-3 px-4 py-3 mx-2 rounded-lg
                  transition-colors duration-200
                  ${isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}