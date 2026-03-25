'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Group, 
  Settings,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react';

// Definindo os itens de navegação
// Cada item tem: href (URL), label (texto), icon (componente)
interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    href: '/',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />
  },
  {
    href: '/colaboradores',
    label: 'Colaboradores',
    icon: <Users className="w-5 h-5" />
  },
  {
    href: '/squads',
    label: 'Squads',
    icon: <Group className="w-5 h-5" />
  },
  {
    href: '/configuracoes',
    label: 'Configurações',
    icon: <Settings className="w-5 h-5" />
  },
  {
    href: '/relatorios',
    label: 'Relatórios',
    icon: <FileText className="w-5 h-5" />
  }
];

export function Sidebar() {
  // usePathname retorna a URL atual (ex: '/colaboradores')
  const pathname = usePathname();
  
  // Estado para controlar se a sidebar está colapsada
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={`
        bg-gray-900 text-white 
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      <div className="flex flex-col h-full">
        
        {/* Logo e botão de colapsar */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          {!isCollapsed && (
            <span className="font-bold text-lg">Menu</span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`
              p-1 hover:bg-gray-800 rounded-lg transition-colors
              ${isCollapsed ? 'mx-auto' : ''}
            `}
            aria-label={isCollapsed ? 'Expandir menu' : 'Colapsar menu'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navegação */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              // Verifica se o link atual está ativo
              const isActive = pathname === item.href;
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-2 mx-2 rounded-lg
                      transition-colors duration-200
                      ${isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                    title={isCollapsed ? item.label : undefined}
                  >
                    {item.icon}
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer da sidebar (versão do app) */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-800 text-xs text-gray-500">
            <p>Versão 1.0.0</p>
          </div>
        )}
      </div>
    </aside>
  );
}