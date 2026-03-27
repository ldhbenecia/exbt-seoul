import { CulturalSpace } from '@/lib/types/culturalSpace';
import { SeoulSpaceRawRow } from '@/lib/data/seoul/types/culturalSpace.types';
import { mapSeoulRowToSpace } from '@/lib/data/seoul/mappers/culturalSpace.mapper';
import { fetchSeoulApi } from '@/lib/data/seoul/seoul.client';

export async function getPaginatedSpaces(params: { page?: number; pageSize?: number }): Promise<{
  data: CulturalSpace[];
  meta: { total: number; page: number; pageSize: number; count: number };
}> {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, params.pageSize ?? 20));

  const allRows = await fetchSeoulApi<SeoulSpaceRawRow>(
    'culturalSpaceInfo',
    1,
    1000,
    [],
    'seoul-spaces'
  );

  const startIdx = (page - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const pagedRows = allRows.slice(startIdx, endIdx);

  const data = pagedRows
    .map((r, idx) => mapSeoulRowToSpace(r, startIdx + idx))
    .filter((x): x is CulturalSpace => x !== null);

  return {
    data,
    meta: { total: allRows.length, page, pageSize, count: data.length },
  };
}
