const BASE_URL = 'http://openapi.seoul.go.kr:8088';

function getApiKey(): string {
  const key = process.env.SEOUL_OPEN_API_KEY;
  if (!key) throw new Error('Missing SEOUL_OPEN_API_KEY');
  return key;
}

type SeoulApiResult<T> = {
  rows: T[];
  totalCount: number;
};

/**
 * Seoul Open API 제네릭 클라이언트
 * URL 패턴: {BASE}/{KEY}/json/{SERVICE}/{START}/{END}/{...filters}
 */
export async function fetchSeoulApi<T>(
  serviceName: string,
  start: number,
  end: number,
  filters: string[] = [],
  cacheTag?: string
): Promise<SeoulApiResult<T>> {
  const filterPath =
    filters.length > 0
      ? '/' + filters.map((f) => (f ? encodeURIComponent(f) : '%20')).join('/')
      : '/';

  const url = `${BASE_URL}/${getApiKey()}/json/${serviceName}/${start}/${end}${filterPath}`;

  const res = await fetch(url, {
    next: {
      revalidate: 3600,
      tags: cacheTag ? [cacheTag] : undefined,
    },
  });

  if (!res.ok) throw new Error(`Seoul OpenAPI HTTP ${res.status}: ${serviceName}`);

  const json = await res.json();
  const box = json?.[serviceName];

  if (!box) return { rows: [], totalCount: 0 };

  const rows: T[] = Array.isArray(box.row) ? box.row : [];
  const totalCount = box.list_total_count ?? rows.length;

  return { rows, totalCount };
}

// culturalEventInfo 전용 래퍼 — totalCount 기반 자동 페이지네이션
import { SeoulApiRawRow } from './types/culturalEvent.types';

const PAGE_SIZE = 1000;

async function fetchAllPages<T>(
  serviceName: string,
  filters: string[],
  cacheTag: string
): Promise<SeoulApiResult<T>> {
  const first = await fetchSeoulApi<T>(serviceName, 1, PAGE_SIZE, filters, cacheTag);

  if (first.totalCount <= PAGE_SIZE) return first;

  const allRows = [...first.rows];
  const remaining = Math.ceil((first.totalCount - PAGE_SIZE) / PAGE_SIZE);

  const pages = await Promise.all(
    Array.from({ length: remaining }, (_, i) => {
      const start = PAGE_SIZE * (i + 1) + 1;
      const end = start + PAGE_SIZE - 1;
      return fetchSeoulApi<T>(serviceName, start, end, filters, cacheTag);
    })
  );

  for (const page of pages) {
    allRows.push(...page.rows);
  }

  return { rows: allRows, totalCount: first.totalCount };
}

export async function fetchSeoulRawEvents(): Promise<SeoulApiResult<SeoulApiRawRow>> {
  // Seoul API의 codename/date 필터가 불완전하여 결과 누락 발생
  // 항상 전체 fetch 후 서버에서 codename + 날짜 필터링
  return fetchAllPages<SeoulApiRawRow>('culturalEventInfo', [], 'seoul-events');
}
