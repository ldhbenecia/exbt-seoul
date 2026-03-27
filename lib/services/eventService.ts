import { CulturalEvent } from '@/lib/types/culturalEvent';
import { getTodayDateString } from '@/lib/utils/dateUtils';
import { SeoulApiRawRow } from '@/lib/data/seoul/seoul.types';
import { mapSeoulRowToEvent } from '@/lib/data/seoul/seoul.mapper';
import { fetchSeoulRawEvents } from '@/lib/data/seoul/seoul.client';

export async function getPaginatedEvents(params: {
  page?: number;
  pageSize?: number;
  codename?: string;
  title?: string;
  date?: string;
}): Promise<{
  data: CulturalEvent[];
  meta: { total: number; page: number; pageSize: number; count: number };
}> {
  const requestedPage = Math.max(1, params.page ?? 1);
  const requestedPageSize = Math.min(100, Math.max(1, params.pageSize ?? 20));
  const dateFilter = params.date || getTodayDateString();

  const allRows = await fetchSeoulRawEvents({
    codename: params.codename ?? '',
    title: params.title ?? '',
    date: dateFilter,
  });

  const today = dateFilter;
  const filteredRows = allRows.filter((r: SeoulApiRawRow) => {
    const startDate = (r.STRTDATE ?? '').trim();
    const endDate = (r.END_DATE ?? '').trim();
    if (!startDate || !endDate) return false;
    return startDate <= today && today <= endDate;
  });

  const correctTotal = filteredRows.length;
  console.log('[EventService:FILTERED]', { apiCount: allRows.length, filteredCount: correctTotal });

  const startIdx = (requestedPage - 1) * requestedPageSize;
  const endIdx = startIdx + requestedPageSize;
  const pagedRows = filteredRows.slice(startIdx, endIdx);

  const data: CulturalEvent[] = pagedRows
    .map((r: SeoulApiRawRow, idx: number) => mapSeoulRowToEvent(r, idx))
    .filter((x: CulturalEvent | null): x is CulturalEvent => !!x);

  console.log('[EventService:PAGED]', { page: requestedPage, count: data.length });

  return {
    data,
    meta: {
      total: correctTotal,
      page: requestedPage,
      pageSize: requestedPageSize,
      count: data.length,
    },
  };
}
