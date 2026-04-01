# EXBT - Seoul Cultural Events

서울시 공공데이터(Seoul Open API)를 활용한 문화·예술 행사 통합 웹앱.

## 기술 스택

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Radix UI (shadcn/ui) · Vercel

## 디렉토리 구조

```
app/
  (home)/                    - 메인 페이지 (탭: 문화행사, 문화공간, 예약 프로그램)
  api/                       - API 라우트 (events, spaces, reservations)
components/
  layout/                    - Header, Footer
  events/                    - 문화행사 (EventCard, FilterBar, EventDetail 등)
  spaces/                    - 문화공간 (SpaceCard)
  reservations/              - 예약 프로그램 (ReservationCard)
  common/                    - 공용 (CardGrid, CardSkeleton, ErrorState, EmptyState, ImageWithFallback)
  ui/                        - shadcn/ui 프리미티브 (button, tabs, dialog 등)
hooks/                       - 커스텀 훅 (useEvents, useSpaces, useReservations, useDebounce)
lib/
  constants/                 - 상수 (CODENAME_TABS, slug 매핑)
  data/seoul/                - Seoul API 클라이언트, raw 타입, 매퍼
  services/                  - 비즈니스 로직 (서버사이드 필터링/페이지네이션)
  types/                     - 도메인 타입
  utils/                     - 유틸리티
```

## 환경변수

```
SEOUL_OPEN_API_KEY=<서울 열린데이터광장 API 키>
```

## 명령어

```bash
npm run dev       # 개발 서버
npm run build     # 프로덕션 빌드
npm run lint      # ESLint
npm run format    # Prettier
```

## 규칙

세부 규칙은 `.claude/rules/`에 파일 경로별로 정의. 해당 파일 작업 시 자동 로드됨.

| 파일                   | 내용                                                |
| ---------------------- | --------------------------------------------------- |
| `rules/api.md`         | Seoul API 데이터 레이어, 필터링, 페이지네이션 패턴  |
| `rules/components.md`  | 컴포넌트/훅 패턴, initialLoading, ImageWithFallback |
| `rules/styling.md`     | Tailwind, CSS 변수, 애니메이션 규칙                 |
| `rules/conventions.md` | 네이밍, 언어, 커밋 컨벤션                           |

## CI/CD

husky + lint-staged → GitHub Actions (lint, typecheck, build) → Vercel 배포
