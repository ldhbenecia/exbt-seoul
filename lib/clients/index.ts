import { Exhibition } from '@/types/exhibition';
import { fetchSeoulEventsPage } from './seoulCultureApi';

export async function fetchEventsPage(p?: {
  page?: number;
  pageSize?: number;
  codename?: string;
  title?: string;
  date?: string;
}) {
  const { data, meta } = await fetchSeoulEventsPage(p ?? {});
  const map = new Map<string, Exhibition>();
  for (const e of data) {
    const key = `${e.title ?? ''}|${e.startDate ?? ''}|${e.place ?? ''}`;
    if (!map.has(key)) map.set(key, e);
  }
  const dedup: Exhibition[] = Array.from(map.values());
  return { data: dedup, meta: { ...meta, count: dedup.length } };
}
