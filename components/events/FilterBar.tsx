import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { CODENAME_TABS, CodenameTab } from '@/lib/constants/codenames';

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
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="행사명, 출연자, 장소 검색..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-10 bg-card text-sm rounded-lg"
        />
      </div>

      <div className="relative">
        <Tabs value={codename} onValueChange={(value) => onCodenameChange(value as CodenameTab)}>
          <TabsList className="w-full justify-start overflow-x-auto scrollbar-hide flex-nowrap h-auto gap-1 bg-muted/50 p-1.5 rounded-xl">
            {CODENAME_TABS.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="min-h-10 px-3 whitespace-nowrap data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none sm:hidden" />
      </div>
    </div>
  );
}
