import { ReactNode } from 'react';

interface InfoRowProps {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
}

export function InfoRow({ label, value, icon }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3 py-2 border-b last:border-0">
      {icon && <div className="text-muted-foreground mt-0.5">{icon}</div>}
      <div className="flex-1">
        <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
        <dd className="text-sm mt-0.5">{value}</dd>
      </div>
    </div>
  );
}