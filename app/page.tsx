'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Exhibition } from '@/types/exhibition';
import { ExhibitionCard } from '@/components/ExhibitionCard';
import { ExhibitionDetail } from '@/components/ExhibitionDetail';
import { FilterBar } from '@/components/FilterBar';

import { Button } from '@/components/ui/button';
import { useExhibitions } from '@/hooks/useExhibitions';

type CodenameTab =
  | '전시/미술'
  | '클래식'
  | '무용'
  | '연극'
  | '콘서트'
  | '뮤지컬/오페라'
  | '국악'
  | '교육/체험'
  | '영화'
  | '축제-문화/예술'
  | '축제-시민화합'
  | '축제-자연/경관'
  | '축제-전통/역사'
  | '기타';

export default function Home() {
  const [codename, setCodename] = useState<CodenameTab>('전시/미술');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null);

  const {
    items: exhibitions,
    isLoading,
    error,
    total,
    hasMore,
    loadNext,
    reset,
  } = useExhibitions(1, 20, codename, /* title */ '', /* date */ '');

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

  const filteredExhibitions = useMemo(() => {
    const list = exhibitions || [];
    const q = (searchQuery || '').toLowerCase().trim();
    if (!q) return list;
    return list.filter((ex) => {
      const title = (ex.title || '').toLowerCase();
      const actorOrOrg = ((ex.player || '') + ' ' + (ex.orgName || '')).toLowerCase();
      const venue = (ex.place || '').toLowerCase();
      return title.includes(q) || actorOrOrg.includes(q) || venue.includes(q);
    });
  }, [exhibitions, searchQuery]);

  const scrollToExhibitions = () => {
    document.getElementById('exhibitions-section')?.scrollIntoView({ behavior: 'smooth' });
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
              onClick={scrollToExhibitions}
              className="sm:w-auto px-8 py-5 text-sm font-medium rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all border-0"
            >
              행사 둘러보기
            </Button>
          </div>
        </div>
      </section>

      {/* List */}
      <main
        id="exhibitions-section"
        className="container mx-auto px-4 sm:max-w-2xl lg:max-w-5xl py-16 md:py-20 lg:py-24 trasition-all duration-300"
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

        {!isLoading && !error && filteredExhibitions.length > 0 && (
          <div className="mb-4 ml-1 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <p className="text-sm lg:text-base text-muted-foreground">
              <span className="font-medium text-foreground">{filteredExhibitions.length}개</span> /
              총 {total}개
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

        {!isLoading && !error && filteredExhibitions.length === 0 && (
          <div className="text-center py-24 sm:py-32">
            <p className="text-muted-foreground text-base sm:text-lg">검색 결과가 없습니다</p>
            <p className="text-muted-foreground/70 mt-2 text-sm">
              다른 검색어나 분류를 시도해보세요
            </p>
          </div>
        )}

        {!isLoading && !error && filteredExhibitions.length > 0 && (
          <>
            <div className="columns-2 lg:columns-3 gap-4">
              {filteredExhibitions.map((exhibition, index) => (
                <div
                  key={exhibition.id}
                  className="animate-in fade-in slide-in-from-bottom-6 duration-700"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ExhibitionCard
                    exhibition={exhibition}
                    onClick={() => setSelectedExhibition(exhibition)}
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

      <ExhibitionDetail
        exhibition={selectedExhibition}
        open={!!selectedExhibition}
        onClose={() => setSelectedExhibition(null)}
      />
    </div>
  );
}
