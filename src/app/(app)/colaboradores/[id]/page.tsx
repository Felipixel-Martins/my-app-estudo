import { colaboradores, getSquadByColaborador } from '@/lib/data';

// Tipo correto para Next.js 16
interface ColaboradorDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ColaboradorDetailPage({ params }: ColaboradorDetailPageProps) {
  // No Next.js 15+, params é uma Promise - precisamos dar await
  const { id } = await params;
  
  // Converte id para número e busca o colaborador
  const colaboradorId = parseInt(id);
  const colaborador = colaboradores.find(c => c.id === colaboradorId);
  
  // Tratamento de caso não encontrado
  if (!colaborador) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Colaborador não encontrado
        </h1>
        <p className="text-gray-600">
          Não encontramos um colaborador com o ID {id}.
        </p>
      </div>
    );
  }
  
  const squad = getSquadByColaborador(colaborador.id);
  
  return (
    <div>
      {/* Cabeçalho com botão de voltar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Detalhes do Colaborador
        </h1>
        <a 
          href="/colaboradores" 
          className="text-blue-600 hover:text-blue-800"
        >
          ← Voltar para listagem
        </a>
      </div>
      
      {/* Card principal do colaborador */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <img 
              src={colaborador.avatarUrl} 
              alt={colaborador.nome}
              className="w-32 h-32 rounded-full object-cover"
            />
            
            {/* Informações básicas */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">{colaborador.nome}</h2>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  colaborador.status === 'Ativo' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {colaborador.status}
                </span>
              </div>
              
              <p className="text-gray-600 mb-2">{colaborador.cargo}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>📧 {colaborador.email}</span>
                <span>⭐ {colaborador.senioridade}</span>
                {squad && <span>👥 Squad: {squad.nome}</span>}
              </div>
              
              <div className="border-t pt-4 mt-2">
                <h3 className="font-semibold mb-2">Sobre</h3>
                <p className="text-gray-700">{colaborador.bio}</p>
              </div>
            </div>
          </div>
          
          {/* Skills */}
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {colaborador.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Botão de edição */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <a 
            href={`/colaboradores/${colaborador.id}/editar`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Editar Colaborador
          </a>
        </div>
      </div>
    </div>
  );
}