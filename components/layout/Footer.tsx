import { ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* 브랜드 */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold tracking-tight">EXBT</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              서울시 공공데이터를 활용한
              <br />
              문화·예술 행사 통합 플랫폼
            </p>
          </div>

          {/* 데이터 출처 */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              데이터 출처
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href="https://data.seoul.go.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  서울 열린데이터광장
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <span className="text-muted-foreground/70">
                  culturalEventInfo · culturalSpaceInfo · ListPublicReservationCulture
                </span>
              </li>
            </ul>
          </div>

          {/* 링크 */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              링크
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href="https://github.com/ldhbenecia/exbt-seoul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  GitHub Repository
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} EXBT. 서울시 공공데이터를 활용하며, 서울특별시와는
            무관합니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
