import { CategoryType } from '../types/exhibition';
import { Input } from './ui/input';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Search } from 'lucide-react';

interface FilterBarProps {
  category: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function FilterBar({
  category,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="전시회, 작가, 장소 검색..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 h-12 md:h-14 bg-card border-border/40 rounded-xl text-base focus-visible:border-ring focus-visible:ring-ring/30 focus-visible:ring-2 transition-all"
        />
      </div>

      <Tabs value={category} onValueChange={(value) => onCategoryChange(value as CategoryType)}>
        <TabsList className="w-full justify-start overflow-x-auto scrollbar-hide flex-nowrap h-auto gap-2 bg-muted/50 p-1.5 rounded-xl">
          <TabsTrigger value="all" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">전체</TabsTrigger>
          <TabsTrigger value="contemporary" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">현대미술</TabsTrigger>
          <TabsTrigger value="photography" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">사진</TabsTrigger>
          <TabsTrigger value="sculpture" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">조각</TabsTrigger>
          <TabsTrigger value="digital" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">디지털아트</TabsTrigger>
          <TabsTrigger value="traditional" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">전통미술</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}