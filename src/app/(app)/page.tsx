import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getResumoEstatisticas, colaboradores } from '@/lib/data';
import { Users, Group, UserCheck, UserX } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const stats = getResumoEstatisticas();

  // Pegar últimos 3 colaboradores (usando id como proxy de recentes)
  const ultimosColaboradores = [...colaboradores].slice(-3).reverse();

  const cards = [
    {
      title: 'Total de Colaboradores',
      value: stats.totalColaboradores,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%',
    },
    {
      title: 'Total de Squads',
      value: stats.totalSquads,
      icon: Group,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+2',
    },
    {
      title: 'Colaboradores Ativos',
      value: stats.colaboradoresAtivos,
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8%',
    },
    {
      title: 'Colaboradores Ausentes',
      value: stats.colaboradoresAusentes,
      icon: UserX,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      change: '-2',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard - Visão Geral</h1>
        <p className="text-muted-foreground">
          Visão geral do diretório de colaboradores e squads
        </p>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => (
          <Card key={card.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`${card.bgColor} p-2 rounded-lg`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold">{card.value}</div>
                {card.change && (
                  <span className={`text-xs ${
                    card.change.startsWith('+') ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {card.change}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráfico de senioridade */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Senioridade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Junior</span>
                <span className="font-medium">{stats.senioridade.junior}</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${(stats.senioridade.junior / stats.totalColaboradores) * 100}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pleno</span>
                <span className="font-medium">{stats.senioridade.pleno}</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${(stats.senioridade.pleno / stats.totalColaboradores) * 100}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sênior</span>
                <span className="font-medium">{stats.senioridade.senior}</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full transition-all"
                  style={{ width: `${(stats.senioridade.senior / stats.totalColaboradores) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Últimos colaboradores e atalhos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Últimos colaboradores */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Últimos Colaboradores</CardTitle>
            <Link href="/colaboradores">
              <Button variant="ghost" size="sm">Ver todos →</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {ultimosColaboradores.map(colab => (
              <Link 
                key={colab.id} 
                href={`/colaboradores/${colab.id}`}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                  {colab.nome[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{colab.nome}</p>
                  <p className="text-sm text-muted-foreground truncate">{colab.cargo}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  colab.status === 'Ativo' ? 'bg-green-500' : 'bg-gray-400'
                }`} />
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Atalhos rápidos */}
        <Card>
          <CardHeader>
            <CardTitle>Atalhos Rápidos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/colaboradores">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Users className="h-4 w-4" />
                Ver todos os colaboradores
              </Button>
            </Link>
            <Link href="/squads">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Group className="h-4 w-4" />
                Explorar squads
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
