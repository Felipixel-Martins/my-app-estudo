import { Search, Users, FolderOpen, Filter, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface EmptyStateProps {
  type: 'search' | 'colaboradores' | 'squads' | 'filters';
  onAction?: () => void;
  actionLabel?: string;
}

const config = {
  search: {
    icon: Search,
    title: 'Nenhum resultado encontrado',
    description: 'Tente ajustar sua busca ou usar termos diferentes.',
    actionLabel: 'Limpar busca',
  },
  filters: {
    icon: Filter,
    title: 'Nenhum resultado com estes filtros',
    description: 'Tente remover alguns filtros para ver mais resultados.',
    actionLabel: 'Limpar filtros',
  },
  colaboradores: {
    icon: Users,
    title: 'Nenhum colaborador',
    description: 'Não há colaboradores cadastrados ainda.',
    actionLabel: 'Adicionar colaborador',
  },
  squads: {
    icon: FolderOpen,
    title: 'Nenhum squad',
    description: 'Não há squads cadastrados ainda.',
    actionLabel: 'Criar squad',
  },
};

export function EmptyState({ type, onAction, actionLabel }: EmptyStateProps) {
  const { icon: Icon, title, description } = config[type];
  const defaultActionLabel = config[type].actionLabel;

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-md">
        {description}
      </p>
      {(onAction || actionLabel) && (
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={onAction}
        >
          {actionLabel || defaultActionLabel}
        </Button>
      )}
    </div>
  );
}