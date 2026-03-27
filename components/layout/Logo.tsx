export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? 'w-7 h-7'}
    >
      <rect width="32" height="32" rx="8" className="fill-foreground" />
      <path
        d="M8 10.5h6.5M8 16h5M8 21.5h6.5M18 10.5h6M18 16h6M18 21.5h6"
        className="stroke-background"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
