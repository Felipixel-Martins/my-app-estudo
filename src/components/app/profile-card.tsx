import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from './status-badge';
import { Colaborador } from '@/lib/data';

interface ProfileCardProps {
  colaborador: Colaborador;
}

export function ProfileCard({ colaborador }: ProfileCardProps) {
  // Pegar iniciais para fallback do avatar
  const initials = colaborador.nome
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link href={`/colaboradores/${colaborador.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={colaborador.avatarUrl} alt={colaborador.nome} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold truncate">{colaborador.nome}</h3>
                <StatusBadge status={colaborador.status} />
              </div>
              <p className="text-sm text-muted-foreground">{colaborador.cargo}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {colaborador.senioridade}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}