import { SkeletonCard } from './skeleton-card';

interface LoadingStateProps {
  type?: 'cards' | 'list';
  count?: number;
}

export function LoadingState({ type = 'cards', count = 6 }: LoadingStateProps) {
  if (type === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
      ))}
    </div>
  );
}