import { SeoulApiRawRow } from './seoul.types';

const KEY = process.env.SEOUL_OPEN_API_KEY!;
if (!KEY) throw new Error('Missing SEOUL_OPEN_API_KEY');

function buildUrl(
  start: number,
  end: number,
  filters: { codename?: string; title?: string; date?: string }
) {
  const base = `http://openapi.seoul.go.kr:8088/${KEY}/json/culturalEventInfo/${start}/${end}`;

  if (!filters.codename && !filters.title && !filters.date) {
    return base + '/';
  }

  const codename = filters.codename ? encodeURIComponent(filters.codename) : '%20';
  const title = filters.title ? encodeURIComponent(filters.title) : '%20';
  const date = filters.date ? encodeURIComponent(filters.date) : '%20';
  return `${base}/${codename}/${title}/${date}`;
}

export async function fetchSeoulRawEvents(filters: {
  codename?: string;
  title?: string;
  date?: string;
}): Promise<SeoulApiRawRow[]> {
  const url = buildUrl(1, 1000, filters);

  console.log('[SeoulClient:FETCH]', { filters, url });

  const res = await fetch(url, {
    next: {
      revalidate: 3600, // 1시간 캐시
      tags: ['seoul-events'], // 캐시 무효화를 위한 태그
    },
  });

  console.log('[SeoulClient:HTTP]', res.status);
  if (!res.ok) throw new Error(`Seoul OpenAPI HTTP ${res.status}`);

  const json = await res.json();
  const box = json?.culturalEventInfo;
  const result = box?.RESULT;
  const allRows: SeoulApiRawRow[] = Array.isArray(box?.row) ? box.row : [];
  const apiTotal: number = box?.list_total_count ?? allRows.length ?? 0;

  console.log('[SeoulClient:RESULT]', {
    code: result?.CODE,
    message: result?.MESSAGE,
    list_total_count: apiTotal,
  });
  console.log('[SeoulClient:ROWS-ALL]', { count: allRows.length, total: apiTotal });

  return allRows;
}
