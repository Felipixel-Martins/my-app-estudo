'use client';

import { GitHubUser, GitHubRepo } from '@/lib/github/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink, Star, GitFork, Users, MapPin, Building, Calendar, FolderGit2 } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface GitHubProfileCardProps {
  username: string;
  user: GitHubUser | null;
  repos: GitHubRepo[];
  isLoading: boolean;
  error?: string;
}

export function GitHubProfileCard({ username, user, repos, isLoading, error }: GitHubProfileCardProps) {
  if (!username) {
    return null; // Não mostra nada se não tem username
  }

  if (isLoading) {
    return <GitHubProfileCardSkeleton />;
  }

  if (error) {
    return (
      <Card className="border-destructive/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4 text-destructive">
            <FolderGit2 className="h-5 w-5 mt-0.5" />
            <div>
              <h4 className="font-semibold">Erro ao carregar dados do GitHub</h4>
              <p className="text-sm text-muted-foreground">{error}</p>
              {user === null && (
                <p className="text-sm text-muted-foreground mt-2">
                  Verifique se o username &quot;{username}&quot; está correto.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4 text-muted-foreground">
            <FolderGit2 className="h-5 w-5 mt-0.5" />
            <div>
              <h4 className="font-semibold">GitHub não conectado</h4>
              <p className="text-sm">
                O username &quot;{username}&quot; não foi encontrado no GitHub.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar_url} alt={user.login} />
              <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="flex items-center gap-2">
                {user.name || user.login}
                <Link href={user.html_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </Link>
              </CardTitle>
              <CardDescription>@{user.login}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Bio */}
        {user.bio && (
          <p className="text-sm">{user.bio}</p>
        )}

        {/* Stats */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{user.followers} seguidores</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>{user.public_repos} repositórios</span>
          </div>
          {user.company && (
            <div className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              <span>{user.company}</span>
            </div>
          )}
          {user.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{user.location}</span>
            </div>
          )}
        </div>

        {/* Repositórios em destaque */}
        {repos.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Repositórios recentes</h4>
            <div className="space-y-2">
              {repos.map((repo) => (
                <div key={repo.id} className="flex items-center justify-between text-sm">
                  <Link 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline font-medium"
                  >
                    {repo.name}
                  </Link>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    {repo.language && (
                      <Badge variant="secondary" className="text-xs">
                        {repo.language}
                      </Badge>
                    )}
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      <span className="text-xs">{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      <span className="text-xs">{repo.forks_count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data de entrada */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2 border-t">
          <Calendar className="h-3 w-3" />
          <span>
            Membro desde {formatDistanceToNow(new Date(user.created_at), { 
              addSuffix: true,
              locale: ptBR 
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function GitHubProfileCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-16 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-24 w-full" />
      </CardContent>
    </Card>
  );
}
