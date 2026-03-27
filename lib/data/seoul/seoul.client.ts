const BASE_URL = 'http://openapi.seoul.go.kr:8088';

function getApiKey(): string {
  const key = process.env.SEOUL_OPEN_API_KEY;
  if (!key) throw new Error('Missing SEOUL_OPEN_API_KEY');
  return key;
}

/**
 * Seoul Open API 제네릭 클라이언트
 * 모든 서울시 공공데이터 API는 동일한 URL 패턴을 사용:
 * {BASE}/{KEY}/json/{SERVICE}/{START}/{END}/{...filters}
 */
export async function fetchSeoulApi<T>(
  serviceName: string,
  start: number,
  end: number,
  filters: string[] = [],
  cacheTag?: string
): Promise<T[]> {
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

  if (!box) return [];

  const rows: T[] = Array.isArray(box.row) ? box.row : [];
  return rows;
}

// culturalEventInfo 전용 래퍼 (기존 호환)
import { SeoulApiRawRow } from './types/culturalEvent.types';

export async function fetchSeoulRawEvents(filters: {
  codename?: string;
  title?: string;
  date?: string;
}): Promise<SeoulApiRawRow[]> {
  return fetchSeoulApi<SeoulApiRawRow>(
    'culturalEventInfo',
    1,
    1000,
    [filters.codename ?? '', filters.title ?? '', filters.date ?? ''],
    'seoul-events'
  );
}
