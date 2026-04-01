'use client';

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardGrid } from '@/components/common/CardGrid';
import { CardSkeleton } from '@/components/common/CardSkeleton';

const EventListSection = lazy(() =>
  import('@/components/events/EventListSection').then((m) => ({ default: m.EventListSection }))
);
const SpaceListSection = lazy(() =>
  import('@/components/spaces/SpaceListSection').then((m) => ({ default: m.SpaceListSection }))
);
const ReservationListSection = lazy(() =>
  import('@/components/reservations/ReservationListSection').then((m) => ({
    default: m.ReservationListSection,
  }))
);

const MAIN_TABS = [
  { value: 'events', label: '문화행사' },
  { value: 'spaces', label: '문화공간' },
  { value: 'reservations', label: '예약 프로그램' },
] as const;

type MainTab = (typeof MAIN_TABS)[number]['value'];

function TabFallback() {
  return (
    <CardGrid>
      {Array.from({ length: 8 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </CardGrid>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<MainTab>('events');

  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      const stored = sessionStorage.getItem('activeTab');
      if (stored && MAIN_TABS.some((t) => t.value === stored)) {
        setActiveTab(stored as MainTab);
      }
      return;
    }
    sessionStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">서울 문화·예술</h2>
        <p className="text-muted-foreground mt-1">전시, 공연, 축제, 문화공간, 예약 프로그램 정보</p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as MainTab)}>
        <TabsList className="w-full justify-start h-auto gap-1 bg-muted/50 p-1.5 rounded-xl mb-6">
          {MAIN_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="min-h-10 px-4 data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Suspense fallback={<TabFallback />}>
        {activeTab === 'events' && <EventListSection />}
        {activeTab === 'spaces' && <SpaceListSection />}
        {activeTab === 'reservations' && <ReservationListSection />}
      </Suspense>
    </div>
  );
}
