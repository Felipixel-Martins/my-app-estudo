'use client';

import { useState } from 'react';
import { PageTitle } from '@/components/app/page-title';
import { SearchInput } from '@/components/app/search-input';
import { ProfileCard } from '@/components/app/profile-card';
import { EmptyState } from '@/components/app/empty-state';
import { colaboradores } from '@/lib/data';

export default function ColaboradoresPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredColaboradores = colaboradores.filter(colab =>
    colab.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    colab.cargo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <PageTitle 
        title="Colaboradores" 
        description="Gerencie todos os colaboradores da empresa"
      >
        <SearchInput 
          onSearch={setSearchTerm} 
          placeholder="Buscar por nome ou cargo..."
        />
      </PageTitle>

      {filteredColaboradores.length === 0 ? (
        <EmptyState type="search" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredColaboradores.map(colab => (
            <ProfileCard key={colab.id} colaborador={colab} />
          ))}
        </div>
      )}
    </div>
  );
}