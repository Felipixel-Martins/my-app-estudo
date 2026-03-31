'use client';

import { useState, useMemo } from 'react';
import { PageTitle } from '@/components/app/page-title';
import { SearchInput } from '@/components/app/search-input';
import { SquadCard } from '@/components/app/squad-card';
import { EmptyState } from '@/components/app/empty-state';
import { squads, getColaboradoresBySquad } from '@/lib/data';

export default function SquadsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar squads com base na busca
  const filteredSquads = useMemo(() => {
    return squads.filter(squad =>
      squad.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      squad.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <PageTitle 
            title="Squads" 
            description="Conheça os times que fazem a empresa funcionar"
          />
          <p className="text-sm text-muted-foreground mt-1">
            {filteredSquads.length} squad{filteredSquads.length !== 1 ? 's' : ''} encontrado{filteredSquads.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Busca */}
      <SearchInput 
        onSearch={setSearchTerm} 
        placeholder="Buscar por nome ou descrição..."
      />

      {/* Listagem */}
      {filteredSquads.length === 0 ? (
        <EmptyState type="search" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSquads.map(squad => (
            <SquadCard 
              key={squad.id} 
              squad={squad}
              membrosCount={getColaboradoresBySquad(squad.id).length}
            />
          ))}
        </div>
      )}
    </div>
  );
}