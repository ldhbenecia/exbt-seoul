'use client';

import { useSpaces } from '@/hooks/useSpaces';
import { SpaceCard } from '@/components/spaces/SpaceCard';
import { CardGrid } from '@/components/common/CardGrid';
import { CardSkeleton } from '@/components/common/CardSkeleton';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/ui/button';

export function SpaceListSection() {
  const { items, initialLoading, error, total, hasMore, loadNext } = useSpaces(1, 20);

  if (initialLoading) {
    return (
      <CardGrid>
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </CardGrid>
    );
  }

  return (
    <div className="space-y-6">
      {!error && items.length > 0 && (
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{items.length}개</span> / 총 {total}개
        </p>
      )}

      {error && items.length === 0 && <ErrorState message={error} />}

      {!error && items.length === 0 && <EmptyState message="등록된 문화공간이 없습니다" />}

      {items.length > 0 && (
        <>
          <CardGrid>
            {items.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </CardGrid>

          <div className="flex justify-center pt-4">
            <Button onClick={loadNext} disabled={!hasMore} variant="outline">
              {hasMore ? '더 보기' : '더 이상 결과가 없습니다'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
