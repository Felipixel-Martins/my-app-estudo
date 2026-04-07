import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users, ArrowLeft } from 'lucide-react';

export default function ColaboradorNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Users className="h-12 w-12 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Colaborador não encontrado</h1>
      <p className="text-muted-foreground mb-6">
        Não encontramos um colaborador com este ID.
      </p>
      <div className="flex gap-3">
        <Link href="/colaboradores">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Ver todos os colaboradores
          </Button>
        </Link>
      </div>
    </div>
  );
}