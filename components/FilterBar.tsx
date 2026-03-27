import { Input } from './ui/input';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Search } from 'lucide-react';

const CODENAME_TABS = [
  '전시/미술',
  '클래식',
  '무용',
  '연극',
  '콘서트',
  '뮤지컬/오페라',
  '국악',
  '교육/체험',
  '영화',
  '축제-문화/예술',
  '축제-시민화합',
  '축제-자연/경관',
  '축제-전통/역사',
  '기타',
] as const;

export type CodenameTab = (typeof CODENAME_TABS)[number];

interface FilterBarProps {
  codename: CodenameTab;
  onCodenameChange: (codename: CodenameTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function FilterBar({
  codename,
  onCodenameChange,
  searchQuery,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="행사명/출연/장소 검색..."
          autoFocus
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8 h-10 bg-card rounded-none border-b text-sm focus-visible:ring-0"
        />
      </div>

      <Tabs value={codename} onValueChange={(value) => onCodenameChange(value as CodenameTab)}>
        <TabsList className="w-full justify-start overflow-x-auto scrollbar-hide flex-nowrap h-auto gap-1 bg-muted/50 p-1.5 rounded-xl">
          {CODENAME_TABS.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
