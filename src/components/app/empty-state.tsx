import { Search, Users, FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  type: 'search' | 'colaboradores' | 'squads';
}

const config = {
  search: {
    icon: Search,
    title: 'Nenhum resultado encontrado',
    description: 'Tente ajustar sua busca ou filtros.',
  },
  colaboradores: {
    icon: Users,
    title: 'Nenhum colaborador',
    description: 'Nenhum colaborador cadastrado ainda.',
  },
  squads: {
    icon: FolderOpen,
    title: 'Nenhum squad',
    description: 'Nenhum squad cadastrado ainda.',
  },
};

export function EmptyState({ type }: EmptyStateProps) {
  const { icon: Icon, title, description } = config[type];

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  );
}