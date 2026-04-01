'use client';

import { useSpaces } from '@/hooks/useSpaces';
import { SpaceCard } from '@/components/spaces/SpaceCard';
import { EventGrid } from '@/components/events/EventGrid';
import { EventCardSkeleton } from '@/components/events/EventCardSkeleton';
import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';

export function SpaceListSection() {
  const { items, initialLoading, error, total, hasMore, loadNext } = useSpaces(1, 20);

  if (initialLoading) {
    return (
      <EventGrid>
        {Array.from({ length: 8 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </EventGrid>
    );
  }

  return (
    <div className="space-y-6">
      {!error && items.length > 0 && (
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{items.length}개</span> / 총 {total}개
        </p>
      )}

      {error && items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <span className="text-destructive text-xl">!</span>
          </div>
          <p className="text-destructive font-medium">{error}</p>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            다시 시도
          </Button>
        </div>
      )}

      {!error && items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <SearchX className="w-12 h-12 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">등록된 문화공간이 없습니다</p>
        </div>
      )}

      {items.length > 0 && (
        <>
          <EventGrid>
            {items.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </EventGrid>

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
