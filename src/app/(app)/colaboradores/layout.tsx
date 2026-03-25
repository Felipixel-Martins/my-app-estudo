export default function ColaboradoresLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="space-y-4">
        {/* Banner de dica que aparece em todas as páginas de colaboradores */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          💡 Dica: Use os filtros para encontrar colaboradores rapidamente.
        </div>
        
        {/* Conteúdo da página atual (listagem ou detalhe) */}
        {children}
      </div>
    );
  }