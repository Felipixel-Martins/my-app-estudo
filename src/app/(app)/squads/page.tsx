'use client';

import { useState } from 'react';
import { PageTitle } from '@/components/app/page-title';
import { SearchInput } from '@/components/app/search-input';
import { SquadCard } from '@/components/app/squad-card';
import { EmptyState } from '@/components/app/empty-state';
import { squads, getColaboradoresBySquad } from '@/lib/data';

export default function SquadsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSquads = squads.filter(squad =>
    squad.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <PageTitle 
        title="Squads" 
        description="Conheça os times que fazem a empresa funcionar"
      >
        <SearchInput 
          onSearch={setSearchTerm} 
          placeholder="Buscar squad..."
        />
      </PageTitle>

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