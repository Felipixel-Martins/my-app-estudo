import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { InfoSection } from '@/components/app/info-section';
import { squads, getColaboradoresBySquad, getLiderDoSquad } from '@/lib/data';
import { 
  ArrowLeft, 
  Users, 
  Code2, 
  Trophy,
  Calendar,
  Mail
} from 'lucide-react';

interface SquadDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SquadDetailPage({ params }: SquadDetailPageProps) {
  const { id } = await params;
  const squadId = parseInt(id);
  
  // Buscar squad
  const squad = squads.find(s => s.id === squadId);
  
  // Se não encontrar, mostrar página 404
  if (!squad) {
    notFound();
  }
  
  // Buscar membros e líder
  const membros = getColaboradoresBySquad(squad.id);
  const lider = getLiderDoSquad(squad.id);

  return (
    <div className="space-y-6">
      {/* Botão voltar */}
      <Link 
        href="/squads" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para squads
      </Link>

      {/* Cabeçalho */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{squad.nome}</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              {squad.descricao}
            </p>
          </div>
          
          {/* Badge com contagem */}
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              {membros.length} membro{membros.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Grid de informações */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna principal - Stack e membros */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stack tecnológica */}
          <InfoSection title="Stack Tecnológica" icon={<Code2 className="h-4 w-4" />}>
            <div className="flex flex-wrap gap-2">
              {squad.stack.map((tech, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
          </InfoSection>

          {/* Lista de membros */}
          <InfoSection title="Membros do Squad" icon={<Users className="h-4 w-4" />}>
            {membros.length === 0 ? (
              <p className="text-muted-foreground">Nenhum membro alocado neste squad.</p>
            ) : (
              <div className="space-y-3">
                {membros.map(membro => (
                  <Link 
                    key={membro.id}
                    href={`/colaboradores/${membro.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-secondary/50 transition-colors"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={membro.avatarUrl} alt={membro.nome} />
                      <AvatarFallback>{membro.nome[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium truncate">{membro.nome}</p>
                        {lider?.id === membro.id && (
                          <Badge variant="outline" className="text-xs">Líder</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{membro.cargo}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      membro.status === 'Ativo' ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </Link>
                ))}
              </div>
            )}
          </InfoSection>
        </div>

        {/* Coluna lateral - Informações adicionais */}
        <div className="space-y-6">
          {/* Liderança */}
          {lider && (
            <InfoSection title="Liderança" icon={<Trophy className="h-4 w-4" />}>
              <Link 
                href={`/colaboradores/${lider.id}`}
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-secondary/50 transition-colors"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={lider.avatarUrl} alt={lider.nome} />
                  <AvatarFallback>{lider.nome[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{lider.nome}</p>
                  <p className="text-sm text-muted-foreground">{lider.cargo}</p>
                </div>
              </Link>
            </InfoSection>
          )}

          {/* Métricas rápidas */}
          <InfoSection title="Métricas" icon={<Calendar className="h-4 w-4" />}>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Total de membros</dt>
                <dd className="text-sm font-medium">{membros.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Membros ativos</dt>
                <dd className="text-sm font-medium">
                  {membros.filter(m => m.status === 'Ativo').length}
                </dd>
              </div>
              <Separator />
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Tecnologias</dt>
                <dd className="text-sm font-medium">{squad.stack.length}</dd>
              </div>
            </dl>
          </InfoSection>

          {/* Contato do squad (exemplo) */}
          {squad.email && (
            <InfoSection title="Contato" icon={<Mail className="h-4 w-4" />}>
              <a 
                href={`mailto:${squad.email}`}
                className="text-sm text-primary hover:underline flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                {squad.email}
              </a>
            </InfoSection>
          )}
        </div>
      </div>
    </div>
  );
}
