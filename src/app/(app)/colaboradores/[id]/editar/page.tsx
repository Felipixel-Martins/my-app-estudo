'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ColaboradorForm } from '@/components/app/colaborador-form';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getColaboradorById, updateColaborador } from '@/lib/api';
import { ColaboradorFormData } from '@/lib/schemas/colaborador-schema';

export default function EditarColaboradorPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const id = params.id as string;

  const [initialData, setInitialData] = useState<ColaboradorFormData | null>(null);
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error', 'not-found'
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchColaborador = async () => {
      try {
        // Simula delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data = await getColaboradorById(id);
        
        if (!data) {
          setStatus('not-found');
        } else {
          setInitialData(data);
          setStatus('success');
        }
      } catch (error) {
        console.error('Erro ao carregar colaborador:', error);
        setStatus('error');
      }
    };

    fetchColaborador();
  }, [id]);

  const handleSubmit = async (data: ColaboradorFormData) => {
    setIsSubmitting(true);
    try {
      // Simula salvamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      await updateColaborador(id, data);
      
      toast({
        title: "Sucesso!",
        description: "Dados do colaborador atualizados com sucesso.",
        variant: "default",
      });
      
      router.push(`/colaboradores/${id}`);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível atualizar os dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading
  if (status === 'loading') {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  // Not Found
  if (status === 'not-found') {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Colaborador não encontrado</AlertTitle>
        <AlertDescription>
          Não foi possível encontrar o colaborador que você está tentando editar.
        </AlertDescription>
      </Alert>
    );
  }

  // Error
  if (status === 'error') {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erro ao carregar</AlertTitle>
        <AlertDescription>
          Houve um problema ao carregar os dados do colaborador.
        </AlertDescription>
      </Alert>
    );
  }

  // Success - mostra o formulário
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar Colaborador</h1>
        <p className="text-muted-foreground mt-2">
          Atualize as informações do colaborador no diretório.
        </p>
      </div>
      
      <div className="max-w-3xl">
        <ColaboradorForm
          initialData={initialData!}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
