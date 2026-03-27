'use client';

import { useSpaces } from '@/hooks/useSpaces';
import { SpaceCard } from '@/components/spaces/SpaceCard';
import { EventGrid } from '@/components/events/EventGrid';
import { EventCardSkeleton } from '@/components/events/EventCardSkeleton';
import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';

export function SpaceListSection() {
  const { items, isLoading, error, total, hasMore, loadNext } = useSpaces(1, 20);

  return (
    <div className="space-y-6">
      {!isLoading && !error && items.length > 0 && (
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{items.length}개</span> / 총 {total}개
        </p>
      )}

      {isLoading && (
        <EventGrid>
          {Array.from({ length: 8 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </EventGrid>
      )}

      {error && (
        <div className="text-center py-16">
          <p className="text-destructive font-medium">문화공간 정보를 불러오는데 실패했습니다</p>
          <p className="text-muted-foreground mt-2 text-sm">{error}</p>
        </div>
      )}

      {!isLoading && !error && items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <SearchX className="w-12 h-12 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">등록된 문화공간이 없습니다</p>
        </div>
      )}

      {!isLoading && !error && items.length > 0 && (
        <>
          <EventGrid>
            {items.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </EventGrid>

          <div className="flex justify-center pt-4">
            <Button onClick={loadNext} disabled={!hasMore || isLoading} variant="outline">
              {hasMore ? '더 보기' : '더 이상 결과가 없습니다'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
