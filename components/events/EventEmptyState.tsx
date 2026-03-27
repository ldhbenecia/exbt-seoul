import { SearchX } from 'lucide-react';

export function EventEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <SearchX className="w-12 h-12 text-muted-foreground/50 mb-4" />
      <p className="text-muted-foreground">검색 결과가 없습니다</p>
      <p className="text-muted-foreground/70 mt-1 text-sm">다른 검색어나 분류를 시도해보세요</p>
    </div>
  );
}
