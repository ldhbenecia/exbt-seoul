'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Exhibition, CategoryType } from '@/types/exhibition';
import { ExhibitionCard } from '@/components/ExhibitionCard';
import { ExhibitionDetail } from '@/components/ExhibitionDetail';
import { FilterBar } from '@/components/FilterBar';
import { useExhibitions } from '@/hooks/useExhibitions';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { exhibitions, isLoading, error } = useExhibitions();
  const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null);
  const [category, setCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Hero section ref
  const heroRef = useRef<HTMLDivElement>(null);
  const [showFixedHeader, setShowFixedHeader] = useState(false);

  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFixedHeader(entry.intersectionRatio < 0.5);
      },
      { threshold: [0, 0.5] } // Hero가 화면에서 완전히 사라질 때
    );

    observer.observe(heroRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  const filteredExhibitions = useMemo(() => {
    if (!exhibitions) return [];

    return exhibitions.filter((exhibition) => {
      const matchesCategory = category === 'all' || exhibition.category === category;
      const matchesSearch =
        searchQuery === '' ||
        exhibition.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exhibition.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exhibition.venue.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [exhibitions, category, searchQuery]);

  const scrollToExhibitions = () => {
    document.getElementById('exhibitions-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background dark">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="container mx-auto max-w-4xl text-center space-y-6 sm:space-y-8">
          <div className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              EXBT
              <br className="hidden sm:block" />
              <span className="text-primary"> Seoul Art Exhibitions</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              서울의 모든 전시회 정보를 한 곳에서
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Button
              onClick={scrollToExhibitions}
              className="sm:w-auto px-8 py-5 text-sm font-medium rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all border-0"
            >
              전시회 둘러보기
            </Button>
          </div>
        </div>
      </section>

      {/* Exhibitions Section */}
      <main
        id="exhibitions-section"
        className="container mx-auto px-4 sm:max-w-2xl lg:max-w-5xl py-16 md:py-20 lg:py-24 trasition-all duration-300"
      >
        {/* Fixed Header */}
        {showFixedHeader && (
          <h1 className="fixed top-0 left-1/2 -translate-x-1/2 text-2xl md:text-3xl lg:text-4xl font-bold z-50 animate-in fade-in duration-500 text-foreground bg-background w-full py-3 md:py-4 px-4 text-center max-h-20">
            EXBT
          </h1>
        )}

        {/* Filter Section */}
        <div className="mb-8 lg:mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <FilterBar
            category={category}
            onCategoryChange={setCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Results Count */}
        {!isLoading && !error && filteredExhibitions.length > 0 && (
          <div className="mb-4 ml-1 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <p className="text-sm lg:text-base text-muted-foreground">
              <span className="font-medium text-foreground">{filteredExhibitions.length}개</span>의
              전시회를 찾았습니다
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-24 sm:py-32">
            <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-4 border-muted border-t-primary"></div>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base">
              전시회 정보를 불러오는 중...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-24 sm:py-32">
            <p className="text-destructive text-base sm:text-lg font-medium">
              전시회 정보를 불러오는데 실패했습니다
            </p>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredExhibitions.length === 0 && (
          <div className="text-center py-24 sm:py-32">
            <p className="text-muted-foreground text-base sm:text-lg">검색 결과가 없습니다</p>
            <p className="text-muted-foreground/70 mt-2 text-sm">
              다른 검색어나 카테고리를 시도해보세요
            </p>
          </div>
        )}

        {/* Exhibitions Grid */}
        {!isLoading && !error && filteredExhibitions.length > 0 && (
          <div
            className="columns-2 lg:columns-3 gap-4"
            // className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
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
        )}
      </main>

      {/* Detail Modal */}
      <ExhibitionDetail
        exhibition={selectedExhibition}
        open={!!selectedExhibition}
        onClose={() => setSelectedExhibition(null)}
      />

      {/* Footer */}
      <footer className="border-t border-border/40 mt-24 sm:mt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            © 2025 Seoul Art Exhibitions. 서울의 모든 전시회 정보를 한 곳에서.
          </p>
        </div>
      </footer>
    </div>
  );
}
