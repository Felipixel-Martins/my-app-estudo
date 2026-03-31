import { Card, CardContent } from '@/components/ui/card';

export function SkeletonCard() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
            <div className="h-3 bg-muted animate-pulse rounded w-1/3" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}