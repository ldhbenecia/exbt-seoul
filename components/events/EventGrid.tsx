interface EventGridProps {
  children: React.ReactNode;
  className?: string;
}

export function EventGrid({ children, className }: EventGridProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
