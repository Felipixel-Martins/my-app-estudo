import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'Ativo' | 'Ausente';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      className={cn(
        status === 'Ativo' 
          ? 'bg-green-100 text-green-800 hover:bg-green-100' 
          : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
      )}
    >
      {status}
    </Badge>
  );
}