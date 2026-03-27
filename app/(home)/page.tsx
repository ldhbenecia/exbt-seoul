'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { EventListSection } from '@/components/events/EventListSection';
import { SpaceListSection } from '@/components/spaces/SpaceListSection';
import { ReservationListSection } from '@/components/reservations/ReservationListSection';

const MAIN_TABS = [
  { value: 'events', label: '문화행사' },
  { value: 'spaces', label: '문화공간' },
  { value: 'reservations', label: '예약 프로그램' },
] as const;

type MainTab = (typeof MAIN_TABS)[number]['value'];

export default function Home() {
  const [activeTab, setActiveTab] = useState<MainTab>('events');

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

        <TabsContent value="events">
          <EventListSection />
        </TabsContent>
        <TabsContent value="spaces">
          <SpaceListSection />
        </TabsContent>
        <TabsContent value="reservations">
          <ReservationListSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
