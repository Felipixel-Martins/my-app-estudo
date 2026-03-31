'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface FiltersProps {
  filters: {
    status?: 'Ativo' | 'Ausente';
    senioridade?: 'Junior' | 'Pleno' | 'Senior';
  };
  onFilterChange: (key: string, value: string | undefined) => void;
  onClearFilters: () => void;
}

export function Filters({ filters, onFilterChange, onClearFilters }: FiltersProps) {
  const hasFilters = filters.status !== undefined || filters.senioridade !== undefined;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {/* Filtro de Status */}
        <select
          className="px-3 py-1.5 text-sm border rounded-md bg-background"
          value={filters.status || ''}
          onChange={(e) => onFilterChange('status', e.target.value || undefined)}
        >
          <option value="">Todos os status</option>
          <option value="Ativo">Ativo</option>
          <option value="Ausente">Ausente</option>
        </select>

        {/* Filtro de Senioridade */}
        <select
          className="px-3 py-1.5 text-sm border rounded-md bg-background"
          value={filters.senioridade || ''}
          onChange={(e) => onFilterChange('senioridade', e.target.value || undefined)}
        >
          <option value="">Todas as senioridades</option>
          <option value="Junior">Junior</option>
          <option value="Pleno">Pleno</option>
          <option value="Senior">Senior</option>
        </select>

        {/* Botão limpar filtros */}
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="gap-1"
          >
            <X className="h-3 w-3" />
            Limpar
          </Button>
        )}
      </div>

      {/* Badges mostrando filtros ativos */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.status && (
            <Badge variant="secondary" className="gap-1">
              Status: {filters.status}
              <button
                onClick={() => onFilterChange('status', undefined)}
                className="ml-1 hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.senioridade && (
            <Badge variant="secondary" className="gap-1">
              Senioridade: {filters.senioridade}
              <button
                onClick={() => onFilterChange('senioridade', undefined)}
                className="ml-1 hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}