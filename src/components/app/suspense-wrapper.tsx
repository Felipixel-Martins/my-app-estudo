import { Suspense } from 'react';
import { SkeletonProfileCard } from './skeleton-profile-card';

interface SuspenseWrapperProps {
  children: React.ReactNode;
  fallbackCount?: number;
}

export function SuspenseWrapper({ children, fallbackCount = 6 }: SuspenseWrapperProps) {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: fallbackCount }).map((_, i) => (
            <SkeletonProfileCard key={i} />
          ))}
        </div>
      }
    >
      {children}
    </Suspense>
  );
}