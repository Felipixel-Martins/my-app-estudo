'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Pencil, MapPin, Briefcase, Code, Mail, FolderGit2 } from 'lucide-react';
import Link from 'next/link';
import { getColaboradorById, type ColaboradorDetail } from '@/lib/api';
import { GitHubProfileCard } from '@/components/app/github-profile-card';
import { fetchGitHubDataForClient } from '@/lib/github/github-api';
import { GitHubUser, GitHubRepo } from '@/lib/github/types';
import { squads } from '@/lib/data';

export default function DetalheColaboradorPage() {
  const params = useParams();
  const id = params.id as string;

  const [colaborador, setColaborador] = useState<ColaboradorDetail | null>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'not-found'>('loading');
  
  // Estados específicos do GitHub
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubError, setGithubError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setStatus('loading');
      setGithubUser(null);
      setGithubRepos([]);
      setGithubError(null);
      setGithubLoading(false);

      try {
        // Simula delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data = await getColaboradorById(id);
        
        if (!data) {
          setStatus('not-found');
          return;
        }
        
        setColaborador(data);
        setStatus('success');

        // Se tiver GitHub username, busca os dados
        if (data.githubUsername) {
          setGithubLoading(true);
          setGithubError(null);
          
          try {
            const githubData = await fetchGitHubDataForClient(data.githubUsername);

            if ('user' in githubData && 'repos' in githubData) {
              setGithubUser(githubData.user);
              setGithubRepos(githubData.repos);
            }
          } catch (err) {
            setGithubError(err instanceof Error ? err.message : 'Erro ao buscar dados do GitHub');
          } finally {
            setGithubLoading(false);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar colaborador:', error);
        setStatus('error');
      }
    };

    fetchData();
  }, [id]);

  // Estados de loading, error, not-found (igual antes)
  if (status === 'loading') {
    return <DetalheColaboradorSkeleton />;
  }

  if (status === 'not-found') {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Colaborador não encontrado</AlertTitle>
        <AlertDescription>
          Não foi possível encontrar o colaborador solicitado.
        </AlertDescription>
      </Alert>
    );
  }

  if (status === 'error') {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erro ao carregar</AlertTitle>
        <AlertDescription>
          Houve um problema ao carregar os dados do colaborador.
        </AlertDescription>
      </Alert>
    );
  }

  if (!colaborador) return null;

  const squadName =
    squads.find((squad) => squad.id === colaborador.squadId)?.nome ?? 'Nao alocado';

  return (
    <div className="space-y-6">
      {/* Cabeçalho com botão de editar */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={colaborador.avatarUrl} alt={colaborador.nome} />
            <AvatarFallback className="text-2xl">
              {colaborador.nome.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{colaborador.nome}</h1>
            <p className="text-muted-foreground text-lg">{colaborador.cargo}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant={colaborador.status === 'Ativo' ? 'default' : 'secondary'}>
                {colaborador.status}
              </Badge>
              <Badge variant="outline">{colaborador.senioridade}</Badge>
            </div>
          </div>
        </div>
        <Link href={`/colaboradores/${id}/editar`}>
          <Button variant="outline">
            <Pencil className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna da esquerda - Informações principais */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          {colaborador.bio && (
            <Card>
              <CardHeader>
                <CardTitle>Sobre</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{colaborador.bio}</p>
              </CardContent>
            </Card>
          )}

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Skills Técnicas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {colaborador.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna da direita - Informações de contato e GitHub */}
        <div className="space-y-6">
          {/* Informações de contato */}
          <Card>
            <CardHeader>
              <CardTitle>Informações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {colaborador.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{colaborador.email}</span>
                </div>
              )}
              {colaborador.localizacao && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{colaborador.localizacao}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>Squad: {squadName}</span>
              </div>
            </CardContent>
          </Card>

          {/* GitHub Profile Card */}
          {colaborador.githubUsername && (
            <GitHubProfileCard
              username={colaborador.githubUsername}
              user={githubUser}
              repos={githubRepos}
              isLoading={githubLoading}
              error={githubError || undefined}
            />
          )}

          {/* Link para adicionar GitHub se não tiver */}
          {!colaborador.githubUsername && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 text-muted-foreground">
                  <FolderGit2 className="h-5 w-5 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">GitHub não conectado</h4>
                    <p className="text-sm">
                      Adicione um username do GitHub na edição do perfil para mostrar atividades.
                    </p>
                    <Link href={`/colaboradores/${id}/editar`}>
                      <Button variant="link" className="px-0 mt-2">
                        Adicionar GitHub
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// Componente de Skeleton para a página de detalhe
function DetalheColaboradorSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-32" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>
        <Skeleton className="h-10 w-24" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  );
}
