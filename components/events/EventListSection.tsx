'use client';

import { useState, useEffect, useRef } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { useDebounce } from '@/hooks/useDebounce';
import { CulturalEvent } from '@/lib/types/culturalEvent';
import { CodenameTab, CODENAME_TABS } from '@/lib/constants/codenames';
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

  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      const stored = sessionStorage.getItem('eventCodename');
      if (stored && (CODENAME_TABS as readonly string[]).includes(stored)) {
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

  const filteredItems = items;

  if (initialLoading) {
    return (
      <div className="space-y-6">
        <FilterBar
          codename={codename}
          onCodenameChange={setCodename}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <EventGrid>
          {Array.from({ length: 8 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </EventGrid>
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

      {!error && filteredItems.length > 0 && (
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{filteredItems.length}개</span> / 총 {total}
          개
        </p>
      )}

      {error && filteredItems.length === 0 && (
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

      {!error && filteredItems.length === 0 && <EventEmptyState />}

      {filteredItems.length > 0 && (
        <>
          <EventGrid>
            {filteredItems.map((event) => (
              <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
            ))}
          </EventGrid>

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
