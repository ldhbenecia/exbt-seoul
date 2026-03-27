'use client';

import { useState } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { useDebounce } from '@/hooks/useDebounce';
import { CulturalEvent } from '@/lib/types/culturalEvent';
import { CodenameTab } from '@/lib/constants/codenames';
import { FilterBar } from '@/components/events/FilterBar';
import { EventCard } from '@/components/events/EventCard';
import { EventGrid } from '@/components/events/EventGrid';
import { EventCardSkeleton } from '@/components/events/EventCardSkeleton';
import { EventEmptyState } from '@/components/events/EventEmptyState';
import { CulturalEventDetail } from '@/components/events/EventDetail';
import { Button } from '@/components/ui/button';

export function EventListSection() {
  const [codename, setCodename] = useState<CodenameTab>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<CulturalEvent | null>(null);

  const debouncedSearch = useDebounce(searchQuery);

  const { items, isLoading, error, total, hasMore, loadNext, reset } = useEvents(
    1,
    20,
    codename === '전체' ? '' : codename,
    debouncedSearch
  );

  return (
    <div className="space-y-6">
      <FilterBar
        codename={codename}
        onCodenameChange={(c) => {
          setCodename(c);
          reset();
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

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
          <p className="text-destructive font-medium">정보를 불러오는데 실패했습니다</p>
          <p className="text-muted-foreground mt-2 text-sm">{error}</p>
        </div>
      )}

      {!isLoading && !error && items.length === 0 && <EventEmptyState />}

      {!isLoading && !error && items.length > 0 && (
        <>
          <EventGrid>
            {items.map((event) => (
              <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
            ))}
          </EventGrid>

          <div className="flex justify-center pt-4">
            <Button onClick={loadNext} disabled={!hasMore || isLoading} variant="outline">
              {hasMore ? '더 보기' : '더 이상 결과가 없습니다'}
            </Button>
          </div>
        </>
      )}

      <CulturalEventDetail
        culturalEvent={selectedEvent}
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}
