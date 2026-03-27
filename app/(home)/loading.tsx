import { Skeleton } from '@/components/common/Skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Skeleton className="h-8 w-48 mb-2" />
      <Skeleton className="h-5 w-72 mb-8" />
      <Skeleton className="h-12 w-full max-w-md mb-6 rounded-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-xl">
            <Skeleton className="aspect-[3/4]" />
            <div className="p-3 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
