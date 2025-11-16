import { Exhibition } from '@/types/exhibition';

// 간단한 인메모리 캐시 (프로덕션에서는 Redis 등 사용 권장)
let exhibitionCache: Exhibition[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1시간

export function getCachedExhibitions(): Exhibition[] | null {
  const now = Date.now();
  if (exhibitionCache && now - cacheTimestamp < CACHE_DURATION) {
    return exhibitionCache;
  }
  return null;
}

export function setCachedExhibitions(exhibitions: Exhibition[]): void {
  exhibitionCache = exhibitions;
  cacheTimestamp = Date.now();
}

export function clearCache(): void {
  exhibitionCache = null;
  cacheTimestamp = 0;
}
