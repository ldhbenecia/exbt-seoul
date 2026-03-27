'use client';

import { useState, useMemo, useRef, useEffect } from 'react';

import { FilterBar, CodenameTab } from '@/components/FilterBar';

import { Button } from '@/components/ui/button';
import { useEvents } from '@/hooks/useEvents';
import { CulturalEvent } from '@/lib/types/culturalEvent';
import { CulturalEventDetail } from '@/components/CulturalEventDetail';
import { CulturalEventCard } from '@/components/CulturalEventCard';

export default function Home() {
  const [codename, setCodename] = useState<CodenameTab>('전시/미술');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCulturalEvent, setSelectedCulturalEvent] = useState<CulturalEvent | null>(null);

  const {
    items: culturalEvents,
    isLoading,
    error,
    total,
    hasMore,
    loadNext,
    reset,
  } = useEvents(1, 20, codename, /* title */ '', /* date */ '');

  const heroRef = useRef<HTMLDivElement>(null);
  const [showFixedHeader, setShowFixedHeader] = useState(false);

  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowFixedHeader(entry.intersectionRatio < 0.5),
      { threshold: [0, 0.5] }
    );
    observer.observe(heroRef.current);
    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  const filteredEvents = useMemo(() => {
    const list = culturalEvents || [];
    const q = (searchQuery || '').toLowerCase().trim();
    if (!q) return list;
    return list.filter((event) => {
      const title = (event.title || '').toLowerCase();
      const actorOrOrg = ((event.player || '') + ' ' + (event.orgName || '')).toLowerCase();
      const venue = (event.place || '').toLowerCase();
      return title.includes(q) || actorOrOrg.includes(q) || venue.includes(q);
    });
  }, [culturalEvents, searchQuery]); //

  const scrollToEvents = () => {
    document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' }); // 👈 id 변경
  };

  return (
    <div className="min-h-screen bg-background dark">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="container mx-auto max-w-4xl text-center space-y-6 sm:space-y-8">
          <div className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              EXBT
              <br className="hidden sm:block" />
              <span className="text-primary"> Seoul Cultural Events</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              서울의 문화·예술 행사를 한 곳에서
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Button
              onClick={scrollToEvents}
              className="sm:w-auto px-8 py-5 text-sm font-medium rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all border-0"
            >
              행사 둘러보기
            </Button>
          </div>
        </div>
      </section>

      {/* List */}
      <main
        id="events-section"
        className="container mx-auto px-4 sm:max-w-2xl lg:max-w-5xl py-16 md:py-20 lg:py-24 transition-all duration-300"
      >
        {showFixedHeader && (
          <h1 className="fixed top-0 left-1/2 -translate-x-1/2 text-2xl md:text-3xl lg:text-4xl font-bold z-50 animate-in fade-in duration-500 text-foreground bg-background w-full py-3 md:py-4 px-4 text-center max-h-20">
            EXBT
          </h1>
        )}

        {/* CODENAME 기반 필터 */}
        <div className="mb-8 lg:mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {/* FilterBar가 codename 버전이어야 합니다. 기존 CategoryType 버전이면 교체 필요 */}
          <FilterBar
            codename={codename}
            onCodenameChange={(c) => {
              setCodename(c);
              reset();
            }}
            searchQuery={searchQuery}
            onSearchChange={(q) => setSearchQuery(q)}
          />
        </div>

        {!isLoading && !error && filteredEvents.length > 0 && (
          <div className="mb-4 ml-1 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <p className="text-sm lg:text-base text-muted-foreground">
              <span className="font-medium text-foreground">{filteredEvents.length}개</span> / 총{' '}
              {total}개
            </p>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-24 sm:py-32">
            <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-4 border-muted border-t-primary"></div>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base">정보를 불러오는 중...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-24 sm:py-32">
            <p className="text-destructive text-base sm:text-lg font-medium">
              정보를 불러오는데 실패했습니다
            </p>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">{error}</p>
          </div>
        )}

        {!isLoading && !error && filteredEvents.length === 0 && (
          <div className="text-center py-24 sm:py-32">
            <p className="text-muted-foreground text-base sm:text-lg">검색 결과가 없습니다</p>
            <p className="text-muted-foreground/70 mt-2 text-sm">
              다른 검색어나 분류를 시도해보세요
            </p>
          </div>
        )}

        {!isLoading && !error && filteredEvents.length > 0 && (
          <>
            <div className="columns-2 lg:columns-3 gap-4">
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="animate-in fade-in slide-in-from-bottom-6 duration-700"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CulturalEventCard
                    culturalEvent={event}
                    onClick={() => setSelectedCulturalEvent(event)}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <Button onClick={loadNext} disabled={!hasMore || isLoading} variant="outline">
                {hasMore ? '더 보기' : '더 이상 결과가 없습니다'}
              </Button>
            </div>
          </>
        )}
      </main>

      <CulturalEventDetail
        culturalEvent={selectedCulturalEvent}
        open={!!selectedCulturalEvent}
        onClose={() => setSelectedCulturalEvent(null)}
      />
    </div>
  );
}
