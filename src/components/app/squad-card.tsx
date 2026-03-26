import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Squad } from '@/lib/data';

interface SquadCardProps {
  squad: Squad;
  membrosCount: number;
}

export function SquadCard({ squad, membrosCount }: SquadCardProps) {
  return (
    <Link href={`/squads/${squad.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle className="text-lg">{squad.nome}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {squad.descricao}
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            {squad.stack.slice(0, 3).map((tech, i) => (
              <span 
                key={i}
                className="px-2 py-0.5 bg-secondary rounded-md text-xs"
              >
                {tech}
              </span>
            ))}
            {squad.stack.length > 3 && (
              <span className="px-2 py-0.5 text-xs text-muted-foreground">
                +{squad.stack.length - 3}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            {membrosCount} membro{membrosCount !== 1 ? 's' : ''}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}