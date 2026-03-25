export default function DashboardPage() {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600">
          Bem-vindo ao diretório de colaboradores e squads.
        </p>
        <p className="text-gray-600 mt-2">
          Esta é a página inicial. Em breve teremos cards de resumo, 
          listas rápidas e atalhos de navegação.
        </p>
        
        {/* Placeholder para futuros cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Total de Colaboradores</h3>
            <p className="text-2xl font-bold mt-2">0</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Total de Squads</h3>
            <p className="text-2xl font-bold mt-2">0</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Status</h3>
            <p className="text-2xl font-bold mt-2 text-green-600">Ativo</p>
          </div>
        </div>
      </div>
    );
  }