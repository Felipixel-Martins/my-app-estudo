import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getResumoEstatisticas } from '@/lib/data';
import { Users, Group, UserCheck, UserX } from 'lucide-react';

export default function DashboardPage() {
  const stats = getResumoEstatisticas();

  const cards = [
    {
      title: 'Total de Colaboradores',
      value: stats.totalColaboradores,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Total de Squads',
      value: stats.totalSquads,
      icon: Group,
      color: 'text-purple-600',
    },
    {
      title: 'Colaboradores Ativos',
      value: stats.colaboradoresAtivos,
      icon: UserCheck,
      color: 'text-green-600',
    },
    {
      title: 'Colaboradores Ausentes',
      value: stats.colaboradoresAusentes,
      icon: UserX,
      color: 'text-gray-600',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Senioridade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Junior</span>
                  <span>{stats.senioridade.junior}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(stats.senioridade.junior / stats.totalColaboradores) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Pleno</span>
                  <span>{stats.senioridade.pleno}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${(stats.senioridade.pleno / stats.totalColaboradores) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Sênior</span>
                  <span>{stats.senioridade.senior}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${(stats.senioridade.senior / stats.totalColaboradores) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}