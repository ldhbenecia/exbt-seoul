import { CardGrid } from '@/components/common/CardGrid';
import { CardSkeleton } from '@/components/common/CardSkeleton';
import { Skeleton } from '@/components/common/Skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Skeleton className="h-8 w-48 mb-2" />
      <Skeleton className="h-5 w-72 mb-8" />
      <Skeleton className="h-12 w-full max-w-md mb-6 rounded-xl" />
      <CardGrid>
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </CardGrid>
    </div>
  );
}
