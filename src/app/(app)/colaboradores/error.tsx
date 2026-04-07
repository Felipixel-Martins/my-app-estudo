'use client';

import { useEffect } from 'react';
import { ErrorState } from '@/components/app/error-state';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ColaboradoresErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log do erro para serviço de monitoramento
    console.error('Erro na página de colaboradores:', error);
  }, [error]);

  return (
    <ErrorState 
      title="Erro na página"
      message={error.message || 'Algo deu errado ao carregar a página.'}
      onRetry={reset}
    />
  );
}