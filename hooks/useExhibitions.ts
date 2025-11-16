'use client';

import { useState, useEffect } from 'react';
import { Exhibition } from '@/types/exhibition';

export function useExhibitions() {
  const [exhibitions, setExhibitions] = useState<Exhibition[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExhibitions() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/exhibitions');

        if (!response.ok) {
          throw new Error('전시회 정보를 불러오는데 실패했습니다.');
        }

        const data = await response.json();
        setExhibitions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
        console.error('Error fetching exhibitions:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchExhibitions();
  }, []);

  return { exhibitions, isLoading, error };
}
