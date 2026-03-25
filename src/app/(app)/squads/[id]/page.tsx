// src/app/(app)/squads/[id]/page.tsx
import { squads, getColaboradoresBySquad, getLiderDoSquad } from '@/lib/data';

interface SquadDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SquadDetailPage({ params }: SquadDetailPageProps) {
  const { id } = await params;
  const squadId = parseInt(id);
  const squad = squads.find(s => s.id === squadId);
  
  if (!squad) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Squad não encontrado
        </h1>
        <p className="text-gray-600">
          Não encontramos um squad com o ID {id}.
        </p>
      </div>
    );
  }
  
  const membros = getColaboradoresBySquad(squad.id);
  const lider = getLiderDoSquad(squad.id);
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{squad.nome}</h1>
        <a href="/squads" className="text-blue-600 hover:text-blue-800">
          ← Voltar para listagem
        </a>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Descrição</h2>
          <p className="text-gray-700">{squad.descricao}</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Stack Principal</h2>
          <div className="flex flex-wrap gap-2">
            {squad.stack.map((tech, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {lider && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Liderança</h2>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <img 
                src={lider.avatarUrl} 
                alt={lider.nome}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{lider.nome}</p>
                <p className="text-sm text-gray-600">{lider.cargo}</p>
              </div>
            </div>
          </div>
        )}
        
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Membros ({membros.length})
          </h2>
          <div className="space-y-2">
            {membros.map(membro => (
              <div key={membro.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                <img 
                  src={membro.avatarUrl} 
                  alt={membro.nome}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-medium">{membro.nome}</p>
                  <p className="text-sm text-gray-600">{membro.cargo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}