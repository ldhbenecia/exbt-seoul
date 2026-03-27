export function Footer() {
  return (
    <footer className="border-t border-border/50 py-6 px-6 text-center text-xs text-muted-foreground">
      <p>
        데이터 출처:{' '}
        <a
          href="https://data.seoul.go.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground transition-colors"
        >
          서울 열린데이터광장
        </a>
      </p>
      <p className="mt-1">
        <a
          href="https://github.com/ldhbenecia/exbt-seoul"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground transition-colors"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
