'use client';

import { Reservation } from '@/lib/types/reservation';
import { useState, useEffect } from 'react';

type ReservationsResponse = {
  data: Reservation[];
  meta: { total: number; page: number; pageSize: number; count: number };
};

export function useReservations(initialPage = 1, initialPageSize = 20) {
  const [items, setItems] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [pageSize] = useState(initialPageSize);
  const [total, setTotal] = useState(0);

  const hasMore = items.length < total;

  useEffect(() => {
    let cancelled = false;
    async function fetchPage() {
      try {
        setIsLoading(true);
        setError(null);

        const qs = new URLSearchParams({
          page: String(page),
          pageSize: String(pageSize),
        });

        const res = await fetch(`/api/reservations?${qs.toString()}`);
        if (!res.ok) throw new Error('예약 프로그램 정보를 불러오는데 실패했습니다.');

        const { data, meta } = (await res.json()) as ReservationsResponse;
        if (cancelled) return;

        setItems((prev) => (page === initialPage ? data : [...prev, ...data]));
        setTotal(meta.total);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    fetchPage();
    return () => {
      cancelled = true;
    };
  }, [page, pageSize, initialPage]);

  return {
    items,
    isLoading,
    error,
    total,
    page,
    pageSize,
    hasMore,
    loadNext: () => {
      if (hasMore && !isLoading) setPage((p) => p + 1);
    },
    reset: () => {
      setPage(initialPage);
      setItems([]);
      setTotal(0);
    },
  };
}
