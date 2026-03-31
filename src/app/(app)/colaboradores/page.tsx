'use client';

import { useState, useMemo } from 'react';
import { PageTitle } from '@/components/app/page-title';
import { SearchInput } from '@/components/app/search-input';
import { ProfileCard } from '@/components/app/profile-card';
import { EmptyState } from '@/components/app/empty-state';
import { Filters } from '@/components/app/filters';
import { colaboradores } from '@/lib/data';

export default function ColaboradoresPage() {
  // Estados para busca e filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{
    status?: 'Ativo' | 'Ausente';
    senioridade?: 'Junior' | 'Pleno' | 'Senior';
  }>({});

  // Função para atualizar um filtro específico
  const handleFilterChange = (key: string, value: string | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Função para limpar todos os filtros
  const handleClearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  // Filtrar colaboradores com base na busca e nos filtros
  const filteredColaboradores = useMemo(() => {
    return colaboradores.filter(colab => {
      // Filtro por busca (nome ou cargo)
      const matchesSearch = 
        searchTerm === '' ||
        colab.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        colab.cargo.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro por status
      const matchesStatus = 
        !filters.status || colab.status === filters.status;

      // Filtro por senioridade
      const matchesSenioridade = 
        !filters.senioridade || colab.senioridade === filters.senioridade;

      return matchesSearch && matchesStatus && matchesSenioridade;
    });
  }, [searchTerm, filters]);

  // Contagem de resultados
  const resultadosCount = filteredColaboradores.length;

  return (
    <div className="space-y-6">
      {/* Cabeçalho com título e contagem */}
      <div className="flex items-center justify-between">
        <div>
          <PageTitle 
            title="Colaboradores" 
            description="Gerencie todos os colaboradores da empresa"
          />
          <p className="text-sm text-muted-foreground mt-1">
            {resultadosCount} colaborador{resultadosCount !== 1 ? 'es' : ''} encontrado{resultadosCount !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Barra de busca */}
      <SearchInput 
        onSearch={setSearchTerm} 
        placeholder="Buscar por nome ou cargo..."
        value={searchTerm}
      />

      {/* Filtros */}
      <Filters 
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Listagem de colaboradores */}
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