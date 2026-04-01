'use client';

import { useState, useEffect, useRef } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { useDebounce } from '@/hooks/useDebounce';
import { CulturalEvent } from '@/lib/types/culturalEvent';
import { CodenameTab, CODENAME_TABS } from '@/lib/constants/codenames';
import { FilterBar } from '@/components/events/FilterBar';
import { EventCard } from '@/components/events/EventCard';
import { CardGrid } from '@/components/common/CardGrid';
import { CardSkeleton } from '@/components/common/CardSkeleton';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';
import { CulturalEventDetail } from '@/components/events/EventDetail';
import { Button } from '@/components/ui/button';

export function EventListSection() {
  const [codename, setCodename] = useState<CodenameTab>('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      const stored = sessionStorage.getItem('eventCodename');
      if (stored && CODENAME_TABS.some((t) => t === stored)) {
        setCodename(stored as CodenameTab);
      }
      return;
    }
    sessionStorage.setItem('eventCodename', codename);
  }, [codename]);

  const [selectedEvent, setSelectedEvent] = useState<CulturalEvent | null>(null);

  const debouncedSearch = useDebounce(searchQuery);

  const { items, initialLoading, error, total, hasMore, loadNext } = useEvents(
    1,
    20,
    codename,
    debouncedSearch
  );

  if (initialLoading) {
    return (
      <div className="space-y-6">
        <FilterBar
          codename={codename}
          onCodenameChange={setCodename}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <CardGrid>
          {Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </CardGrid>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FilterBar
        codename={codename}
        onCodenameChange={setCodename}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {!error && items.length > 0 && (
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{items.length}개</span> / 총 {total}개
        </p>
      )}

      {error && items.length === 0 && <ErrorState message={error} />}

      {!error && items.length === 0 && <EmptyState message="검색 결과가 없습니다" />}

      {items.length > 0 && (
        <>
          <CardGrid>
            {items.map((event) => (
              <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
            ))}
          </CardGrid>

          <div className="flex justify-center pt-4">
            <Button onClick={loadNext} disabled={!hasMore} variant="outline">
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
