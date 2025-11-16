import { Input } from './ui/input';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Search } from 'lucide-react';

export type CodenameTab =
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
          <TabsTrigger
            value="전시/미술"
            className="data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            전시/미술
          </TabsTrigger>
          <TabsTrigger
            value="클래식"
            className="data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            클래식
          </TabsTrigger>
          <TabsTrigger
            value="무용"
            className="data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            무용
          </TabsTrigger>
          <TabsTrigger
            value="연극"
            className="data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            연극
          </TabsTrigger>
          <TabsTrigger
            value="콘서트"
            className="data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            콘서트
          </TabsTrigger>
          <TabsTrigger
            value="뮤지컬/오페라"
            className="data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            뮤지컬/오페라
          </TabsTrigger>
          <TabsTrigger
            value="국악"
            className="data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            국악
          </TabsTrigger>
          <TabsTrigger
            value="교육/체험"
            className="data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            교육/체험
          </TabsTrigger>
          <TabsTrigger
            value="영화"
            className="data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            영화
          </TabsTrigger>
          <TabsTrigger
            value="축제-문화/예술"
            className="data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            축제-문화/예술
          </TabsTrigger>
          <TabsTrigger
            value="축제-시민화합"
            className="data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            축제-시민화합
          </TabsTrigger>
          <TabsTrigger
            value="축제-자연/경관"
            className="data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            축제-자연/경관
          </TabsTrigger>
          <TabsTrigger
            value="축제-전통/역사"
            className="data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            축제-전통/역사
          </TabsTrigger>
          <TabsTrigger
            value="기타"
            className="data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            기타
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
