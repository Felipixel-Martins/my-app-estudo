// src/app/(app)/colaboradores/page.tsx
import Link from 'next/link';
import { colaboradores, getSquadByColaborador } from '@/lib/data';

export default function ColaboradoresPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Colaboradores</h1>
      <p className="text-gray-600 mb-6">
        Lista completa de colaboradores da empresa.
      </p>
      
      {/* Grid de cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colaboradores.map((colaborador) => {
          const squad = getSquadByColaborador(colaborador.id);
          
          return (
            <Link 
              key={colaborador.id}
              href={`/colaboradores/${colaborador.id}`}
              className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={colaborador.avatarUrl} 
                    alt={colaborador.nome}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{colaborador.nome}</h3>
                    <p className="text-gray-600 text-sm">{colaborador.cargo}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block w-2 h-2 rounded-full ${
                      colaborador.status === 'Ativo' ? 'bg-green-500' : 'bg-gray-500'
                    }`} />
                    <span>{colaborador.status}</span>
                    <span className="text-gray-400">•</span>
                    <span>{colaborador.senioridade}</span>
                  </div>
                  
                  {squad && (
                    <p className="text-gray-600">
                      Squad: {squad.nome}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {colaborador.skills.slice(0, 3).map((skill, i) => (
                      <span 
                        key={i}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {colaborador.skills.length > 3 && (
                      <span className="px-2 py-0.5 text-gray-500 text-xs">
                        +{colaborador.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}