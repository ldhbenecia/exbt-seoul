# EXBT - Seoul Cultural Events

서울시 공공데이터를 활용한 문화·예술 행사 통합 웹앱.
전시, 공연, 축제, 문화공간, 예약 프로그램 정보를 한 곳에서 탐색할 수 있습니다.

## 기능

- **문화행사** — 전시/미술, 클래식, 무용, 연극, 콘서트, 뮤지컬, 국악, 축제 등 카테고리별 필터링 및 검색
- **문화공간** — 공연장, 갤러리, 문화센터 위치/운영시간/요금 정보
- **예약 프로그램** — 접수 중인 공공예약 문화 프로그램 + 예약 링크
- **반응형 디자인** — 웹 메인, 모바일 대응

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **UI**: Radix UI (shadcn/ui), Lucide React
- **Deploy**: Vercel
- **CI**: GitHub Actions (lint → typecheck → build)
- **DX**: husky + lint-staged

## 로컬 개발

```bash
git clone https://github.com/ldhbenecia/exbt-seoul.git
cd exbt-seoul
npm install
```

`.env.local` 파일을 생성하고 API 키를 설정:

```
SEOUL_OPEN_API_KEY=<서울 열린데이터광장 API 키>
```

> https://data.seoul.go.kr/ 에서 발급

```bash
npm run dev    # http://localhost:3000
```

## 데이터 소스

[서울 열린데이터광장](https://data.seoul.go.kr/) Open API:

| API                            | 데이터          |
| ------------------------------ | --------------- |
| `culturalEventInfo`            | 문화행사        |
| `culturalSpaceInfo`            | 문화공간        |
| `ListPublicReservationCulture` | 공공예약 (문화) |

## 배포

Vercel에 연결하고 환경변수 `SEOUL_OPEN_API_KEY`를 설정하면 자동 배포됩니다.
