'use client';

import { CulturalSpace } from '@/lib/types/culturalSpace';
import { useState, useEffect, useRef, useCallback } from 'react';

type SpacesResponse = {
  data: CulturalSpace[];
  meta: { total: number; page: number; pageSize: number; count: number };
};

export function useSpaces(initialPage = 1, initialPageSize = 20) {
  const [items, setItems] = useState<CulturalSpace[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const pageRef = useRef(initialPage);
  const fetchIdRef = useRef(0);
  const hasFetchedRef = useRef(false);

  const hasMore = items.length < total;

  const fetchData = useCallback(
    async (page: number, append: boolean) => {
      const id = ++fetchIdRef.current;
      setError(null);

      try {
        const qs = new URLSearchParams({
          page: String(page),
          pageSize: String(initialPageSize),
        });

        const res = await fetch(`/api/spaces?${qs.toString()}`);
        if (id !== fetchIdRef.current) return;

        if (!res.ok) throw new Error('문화공간 정보를 불러오는데 실패했습니다.');

        const { data, meta } = (await res.json()) as SpacesResponse;
        if (id !== fetchIdRef.current) return;

        setItems((prev) => (append ? [...prev, ...data] : data));
        setTotal(meta.total);
      } catch (err) {
        if (id !== fetchIdRef.current) return;
        setItems([]);
        setTotal(0);
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      } finally {
        if (id === fetchIdRef.current && !hasFetchedRef.current) {
          hasFetchedRef.current = true;
          setInitialLoading(false);
        }
      }
    },
    [initialPageSize]
  );

  useEffect(() => {
    pageRef.current = initialPage;
    fetchData(initialPage, false);
  }, [fetchData, initialPage]);

  return {
    items,
    initialLoading,
    error,
    total,
    hasMore,
    loadNext: () => {
      if (hasMore) {
        pageRef.current += 1;
        fetchData(pageRef.current, true);
      }
    },
  };
}
