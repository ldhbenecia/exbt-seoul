'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-24 max-w-7xl flex flex-col items-center text-center">
      <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
      <h2 className="text-lg font-semibold mb-2">오류가 발생했습니다</h2>
      <p className="text-muted-foreground text-sm mb-6">{error.message}</p>
      <Button onClick={reset} variant="outline">
        다시 시도
      </Button>
    </div>
  );
}
