# EXBT - Seoul Cultural Events

## 프로젝트 개요

서울시 공공데이터(Seoul Open API)를 활용한 문화·예술 행사 통합 웹앱.
Next.js 14 App Router + TypeScript + Tailwind CSS + Radix UI(shadcn/ui) 기반.

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + CSS Variables (globals.css)
- **UI**: Radix UI (shadcn/ui), Lucide React icons
- **Deploy**: Vercel (ICN1 region)
- **Data**: Seoul Open API (`openapi.seoul.go.kr:8088`)

## 디렉토리 구조

```
app/                         - Next.js App Router
  (home)/                    - 메인 페이지 라우트 그룹
  api/                       - API 라우트 (events, spaces, reservations)
components/
  layout/                    - Header, Footer
  events/                    - 문화행사 관련 컴포넌트
  spaces/                    - 문화공간 관련 컴포넌트
  reservations/              - 예약 프로그램 관련 컴포넌트
  common/                    - 공용 컴포넌트 (ImageWithFallback, Skeleton)
  ui/                        - shadcn/ui 기본 컴포넌트
hooks/                       - React 커스텀 훅
lib/
  constants/                 - 상수 (codenames 등)
  data/seoul/                - Seoul API 클라이언트, 타입, 매퍼
  services/                  - 비즈니스 로직
  types/                     - 도메인 타입
  utils/                     - 유틸리티 함수
```

## 컨벤션

### 네이밍

- **컴포넌트**: PascalCase (`EventCard.tsx`)
- **훅**: camelCase, `use` 접두사 (`useEvents.ts`)
- **유틸/서비스**: camelCase (`dateUtils.ts`, `eventService.ts`)
- **타입 파일**: camelCase (`culturalEvent.ts`)
- **상수**: UPPER_SNAKE_CASE (`CODENAME_TABS`)

### 언어

- **UI 텍스트**: 한국어
- **코드/변수/주석**: 영어
- **커밋 메시지**: Conventional Commits, 한국어 본문, `type(domain):` 형식 (예: `feat(ui):`, `fix(api):`)

### 스타일링

- Tailwind CSS 유틸리티 클래스 우선
- 디자인 토큰은 `globals.css` CSS 변수로 정의
- `cn()` 유틸리티로 클래스 병합 (`lib/utils`)

## 데이터 소스

Seoul Open API 공통 패턴:

```
http://openapi.seoul.go.kr:8088/{KEY}/json/{SERVICE_NAME}/{START}/{END}/
```

| 서비스                         | 데이터                      |
| ------------------------------ | --------------------------- |
| `culturalEventInfo`            | 문화행사 (전시, 공연, 축제) |
| `culturalSpaceInfo`            | 문화공간 (공연장, 갤러리)   |
| `ListPublicReservationCulture` | 공공예약 (문화 프로그램)    |

## 환경변수

```
SEOUL_OPEN_API_KEY=<서울 열린데이터광장 API 키>
```

https://data.seoul.go.kr/ 에서 발급.

## 주요 명령어

```bash
npm run dev          # 개발 서버
npm run build        # 프로덕션 빌드
npm run lint         # ESLint
npm run format       # Prettier
```

## CI/CD

- **Pre-commit**: husky + lint-staged (eslint --fix, prettier --write)
- **GitHub Actions**: push/PR to main → lint, typecheck, build
- **Deploy**: Vercel (자동 배포, `SEOUL_OPEN_API_KEY` 환경변수 필요)
