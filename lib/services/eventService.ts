import { CulturalEvent } from '@/lib/types/culturalEvent';
import { getTodayDateString } from '@/lib/utils/dateUtils';
import { SeoulApiRawRow } from '@/lib/data/seoul/types/culturalEvent.types';
import { mapSeoulRowToEvent } from '@/lib/data/seoul/mappers/culturalEvent.mapper';
import { fetchSeoulRawEvents } from '@/lib/data/seoul/seoul.client';
import { FESTIVAL_PREFIX } from '@/lib/constants/codenames';

const FESTIVAL_MARKER = '__festival__';

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
  const isFestival = params.codename === FESTIVAL_MARKER;

  const { rows: allRows } = await fetchSeoulRawEvents();

  const today = dateFilter;
  const codename = isFestival ? '' : (params.codename ?? '');
  const title = (params.title ?? '').trim().toLowerCase();

  const filteredRows = allRows.filter((r: SeoulApiRawRow) => {
    const startDate = (r.STRTDATE ?? '').trim();
    const endDate = (r.END_DATE ?? '').trim();
    if (!startDate || !endDate) return false;
    if (!(startDate <= today && today <= endDate)) return false;

    if (codename && (r.CODENAME ?? '').trim() !== codename) return false;

    if (isFestival && !(r.CODENAME ?? '').trim().startsWith(FESTIVAL_PREFIX)) return false;

    if (title && !(r.TITLE ?? '').toLowerCase().includes(title)) return false;

    return true;
  });

  const correctTotal = filteredRows.length;

  const startIdx = (requestedPage - 1) * requestedPageSize;
  const endIdx = startIdx + requestedPageSize;
  const pagedRows = filteredRows.slice(startIdx, endIdx);

  const data: CulturalEvent[] = pagedRows
    .map((r: SeoulApiRawRow, idx: number) => mapSeoulRowToEvent(r, idx))
    .filter((x: CulturalEvent | null): x is CulturalEvent => !!x);

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
