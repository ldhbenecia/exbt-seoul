import { Reservation } from '@/lib/types/reservation';
import { SeoulReservationRawRow } from '@/lib/data/seoul/types/reservation.types';
import { mapSeoulRowToReservation } from '@/lib/data/seoul/mappers/reservation.mapper';
import { fetchSeoulApi } from '@/lib/data/seoul/seoul.client';

export async function getPaginatedReservations(params: {
  page?: number;
  pageSize?: number;
}): Promise<{
  data: Reservation[];
  meta: { total: number; page: number; pageSize: number; count: number };
}> {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, params.pageSize ?? 20));

  const allRows = await fetchSeoulApi<SeoulReservationRawRow>(
    'ListPublicReservationCulture',
    1,
    1000,
    [],
    'seoul-reservations'
  );

  // 접수중인 항목만 필터
  const activeRows = allRows.filter((r) => {
    const status = (r.SVCSTATNM ?? '').trim();
    return status === '접수중' || status === '안내중';
  });

  const startIdx = (page - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const pagedRows = activeRows.slice(startIdx, endIdx);

  const data = pagedRows
    .map((r, idx) => mapSeoulRowToReservation(r, startIdx + idx))
    .filter((x): x is Reservation => x !== null);

  return {
    data,
    meta: { total: activeRows.length, page, pageSize, count: data.length },
  };
}
