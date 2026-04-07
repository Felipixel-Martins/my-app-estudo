'use client';

import { useState, useMemo, useEffect } from 'react';
import { PageTitle } from '@/components/app/page-title';
import { SearchInput } from '@/components/app/search-input';
import { ProfileCard } from '@/components/app/profile-card';
import { EmptyState } from '@/components/app/empty-state';
import { ErrorState } from '@/components/app/error-state';
import { Filters } from '@/components/app/filters';
import { SkeletonProfileCard } from '@/components/app/skeleton-profile-card';
import { colaboradores } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

// Definindo os estados possíveis
type PageState = 'loading' | 'success' | 'empty' | 'error';

export default function ColaboradoresPage() {
  // Estados da página
  const [pageState, setPageState] = useState<PageState>('loading');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{
    status?: 'Ativo' | 'Ausente';
    senioridade?: 'Junior' | 'Pleno' | 'Senior';
  }>({});
  const [errorMessage, setErrorMessage] = useState('');

  // Simular carregamento de dados (como se fosse uma API)
  useEffect(() => {
    const loadData = async () => {
      try {
        setPageState('loading');
        
        // Simular delay de rede
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simular possível erro (descomente para testar)
        // throw new Error('Falha na conexão');
        
        setPageState('success');
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Erro desconhecido');
        setPageState('error');
      }
    };
    
    loadData();
  }, []);

  // Filtrar colaboradores
  const filteredColaboradores = useMemo(() => {
    return colaboradores.filter(colab => {
      const matchesSearch = 
        searchTerm === '' ||
        colab.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        colab.cargo.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = 
        !filters.status || colab.status === filters.status;

      const matchesSenioridade = 
        !filters.senioridade || colab.senioridade === filters.senioridade;

      return matchesSearch && matchesStatus && matchesSenioridade;
    });
  }, [searchTerm, filters]);

  // Verificar se o estado deve ser 'empty' baseado nos dados
  const effectiveState = pageState === 'success' && filteredColaboradores.length === 0 
    ? 'empty' 
    : pageState;

  // Handlers
  const handleFilterChange = (key: string, value: string | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const handleRetry = () => {
    window.location.reload(); // Simples, em produção seria mais refinado
  };

  // Renderização baseada no estado
  if (effectiveState === 'loading') {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonProfileCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (effectiveState === 'error') {
    return (
      <ErrorState 
        title="Erro ao carregar colaboradores"
        message={errorMessage}
        onRetry={handleRetry}
      />
    );
  }

  // Estado success (pode ser com dados ou vazio)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <PageTitle 
            title="Colaboradores" 
            description="Gerencie todos os colaboradores da empresa"
          />
          <p className="text-sm text-muted-foreground mt-1">
            {filteredColaboradores.length} colaborador{filteredColaboradores.length !== 1 ? 'es' : ''} encontrado{filteredColaboradores.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <SearchInput 
        onSearch={setSearchTerm} 
        placeholder="Buscar por nome ou cargo..."
      />

      <Filters 
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {filteredColaboradores.length === 0 ? (
        <EmptyState 
          type={searchTerm || Object.keys(filters).length ? 'search' : 'colaboradores'}
          onAction={handleClearFilters}
        />
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