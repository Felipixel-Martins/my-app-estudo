import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InfoSectionProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}

export function InfoSection({ title, children, icon }: InfoSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 pb-3">
        {icon && <div className="text-muted-foreground">{icon}</div>}
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}