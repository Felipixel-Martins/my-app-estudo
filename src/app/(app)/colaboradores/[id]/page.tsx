import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/app/status-badge';
import { SkillsList } from '@/components/app/skills-list';
import { InfoSection } from '@/components/app/info-section';
import { colaboradores, getSquadByColaborador } from '@/lib/data';
import { 
  ArrowLeft, 
  Edit, 
  Mail, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Users,
  Code2
} from 'lucide-react';

interface ColaboradorDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ColaboradorDetailPage({ params }: ColaboradorDetailPageProps) {
  const { id } = await params;
  const colaboradorId = parseInt(id);
  
  // Buscar colaborador
  const colaborador = colaboradores.find(c => c.id === colaboradorId);
  
  // Se não encontrar, mostrar página 404
  if (!colaborador) {
    notFound();
  }
  
  // Buscar squad relacionado
  const squad = getSquadByColaborador(colaborador.id);
  
  // Pegar iniciais para fallback do avatar
  const initials = colaborador.nome
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Botão voltar */}
      <Link 
        href="/colaboradores" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para colaboradores
      </Link>

      {/* Cabeçalho do perfil */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <Avatar className="h-24 w-24 md:h-32 md:w-32">
            <AvatarImage src={colaborador.avatarUrl} alt={colaborador.nome} />
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
          </Avatar>
          
          {/* Informações principais */}
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-bold">{colaborador.nome}</h1>
                  <StatusBadge status={colaborador.status} />
                </div>
                <p className="text-lg text-muted-foreground mt-1">{colaborador.cargo}</p>
                
                <div className="flex flex-wrap gap-3 mt-3">
                  {squad && (
                    <Link 
                      href={`/squads/${squad.id}`}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      <Users className="h-4 w-4" />
                      Squad: {squad.nome}
                    </Link>
                  )}
                  <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    {colaborador.senioridade}
                  </span>
                </div>
              </div>
              
              {/* Botão de edição */}
              <Link href={`/colaboradores/${colaborador.id}/editar`}>
                <Button variant="outline" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Editar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Abas para organizar informações */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="contact">Contato</TabsTrigger>
        </TabsList>
        
        {/* Aba: Visão Geral */}
        <TabsContent value="overview" className="space-y-4">
          <InfoSection 
            title="Sobre" 
            icon={<GraduationCap className="h-4 w-4" />}
          >
            <p className="text-muted-foreground leading-relaxed">
              {colaborador.bio}
            </p>
          </InfoSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoSection 
              title="Informações Profissionais" 
              icon={<Briefcase className="h-4 w-4" />}
            >
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Cargo</dt>
                  <dd className="text-sm mt-0.5">{colaborador.cargo}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Senioridade</dt>
                  <dd className="text-sm mt-0.5">{colaborador.senioridade}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Squad</dt>
                  <dd className="text-sm mt-0.5">
                    {squad ? (
                      <Link href={`/squads/${squad.id}`} className="text-primary hover:underline">
                        {squad.nome}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">Não alocado</span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                  <dd className="text-sm mt-0.5">
                    <StatusBadge status={colaborador.status} />
                  </dd>
                </div>
              </dl>
            </InfoSection>
            
            <InfoSection 
              title="Localização" 
              icon={<MapPin className="h-4 w-4" />}
            >
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Localização</dt>
                  <dd className="text-sm mt-0.5">
                    {colaborador.localizacao || 'Não informada'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Data de Admissão</dt>
                  <dd className="text-sm mt-0.5">
                    {colaborador.dataAdmissao || 'Não informada'}
                  </dd>
                </div>
              </dl>
            </InfoSection>
          </div>
        </TabsContent>
        
        {/* Aba: Skills */}
        <TabsContent value="skills">
          <InfoSection 
            title="Competências Técnicas" 
            icon={<Code2 className="h-4 w-4" />}
          >
            <SkillsList skills={colaborador.skills} />
          </InfoSection>
        </TabsContent>
        
        {/* Aba: Contato */}
        <TabsContent value="contact">
          <InfoSection 
            title="Informações de Contato" 
            icon={<Mail className="h-4 w-4" />}
          >
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">E-mail Corporativo</dt>
                <dd className="text-sm mt-0.5 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${colaborador.email}`} className="text-primary hover:underline">
                    {colaborador.email}
                  </a>
                </dd>
              </div>
              {colaborador.telefone && (
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Telefone</dt>
                  <dd className="text-sm mt-0.5">{colaborador.telefone}</dd>
                </div>
              )}
              {colaborador.githubUsername && (
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">GitHub</dt>
                  <dd className="text-sm mt-0.5">
                    <a 
                      href={`https://github.com/${colaborador.githubUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      @{colaborador.githubUsername}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </InfoSection>
        </TabsContent>
      </Tabs>
    </div>
  );
}
