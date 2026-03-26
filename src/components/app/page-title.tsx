import { ReactNode } from 'react';

interface PageTitleProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageTitle({ title, description, children }: PageTitleProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-sm mt-1">{description}</p>
        )}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}