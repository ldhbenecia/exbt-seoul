import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
        <span className="text-destructive text-xl">!</span>
      </div>
      <p className="text-destructive font-medium">{message}</p>
      <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
        다시 시도
      </Button>
    </div>
  );
}
