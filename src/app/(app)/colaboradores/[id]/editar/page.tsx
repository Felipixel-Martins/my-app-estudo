import { colaboradores } from '@/lib/data';

interface EditarColaboradorPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditarColaboradorPage({ params }: EditarColaboradorPageProps) {
  const { id } = await params;
  const colaboradorId = parseInt(id);
  const colaborador = colaboradores.find(c => c.id === colaboradorId);
  
  if (!colaborador) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Colaborador não encontrado
        </h1>
        <p className="text-gray-600">
          Não foi possível editar: colaborador com ID {id} não existe.
        </p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Editar Colaborador</h1>
        <a 
          href={`/colaboradores/${colaborador.id}`}
          className="text-blue-600 hover:text-blue-800"
        >
          ← Voltar para detalhes
        </a>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500 mb-4">
          Editando colaborador: <strong>{colaborador.nome}</strong> (ID: {colaborador.id})
        </p>
        
        {/* Placeholder para formulário de edição */}
        <div className="border-t pt-4">
          <p className="text-gray-400">
            Formulário de edição será implementado na Etapa 7.
          </p>
        </div>
      </div>
    </div>
  );
}