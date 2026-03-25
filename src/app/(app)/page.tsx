export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">Total de Colaboradores</p>
          <p className="text-3xl font-bold mt-2">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">Total de Squads</p>
          <p className="text-3xl font-bold mt-2">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">Status</p>
          <p className="text-3xl font-bold mt-2 text-green-600">Ativo</p>
        </div>
      </div>
    </div>
  );
}