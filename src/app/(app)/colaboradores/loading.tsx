import { Skeleton } from '@/components/ui/skeleton';
import { SkeletonProfileCard } from '@/components/app/skeleton-profile-card';

export default function ColaboradoresLoadingPage() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64 mt-2" />
      </div>
      <Skeleton className="h-10 w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonProfileCard key={i} />
        ))}
      </div>
    </div>
  );
}