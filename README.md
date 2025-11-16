# EXBT - Seoul Cultural Events

<div align="center">
  <h3>서울의 문화·예술 행사를 한 곳에서</h3>
  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#architecture">Architecture</a>
  </p>
</div>

---

## Overview

EXBT는 서울시 공공데이터를 활용하여 전시, 공연, 축제 등 다양한 문화·예술 행사 정보를 통합 제공하는 웹 애플리케이션입니다. 실시간 데이터 동기화와 직관적인 UI를 통해 사용자가 원하는 문화 행사를 쉽게 탐색할 수 있습니다.

## Features

### Core Functionality

- **실시간 행사 정보** - 서울시 문화행사 API와 연동하여 최신 정보 제공
- **카테고리 분류** - 전시/미술, 클래식, 무용, 연극, 콘서트, 뮤지컬/오페라, 국악, 교육/체험, 영화, 축제 등
- **통합 검색** - 행사명, 출연진, 장소 기반 통합 검색 지원
- **스마트 필터링** - 진행 중인 행사 자동 필터링 및 카테고리별 카운트 표시
- **반응형 디자인** - 데스크톱, 태블릿, 모바일 최적화

### Technical Highlights

- **성능 최적화** - 서버 사이드 캐싱 (5분 TTL) 및 병렬 데이터 페칭
- **Progressive Loading** - 무한 스크롤 기반 점진적 데이터 로딩
- **타입 안정성** - TypeScript 기반 엔드투엔드 타입 체킹
- **SEO 최적화** - Next.js App Router 기반 서버 사이드 렌더링

## Tech Stack

### Frontend

- **Framework** - Next.js 14 (App Router)
- **Language** - TypeScript
- **Styling** - Tailwind CSS
- **UI Components** - Radix UI (shadcn/ui)
- **State Management** - React Hooks
- **Icons** - Lucide React

### Backend

- **API Routes** - Next.js API Routes (Server Components)
- **Data Source** - Seoul Open API (서울시 문화행사 정보)
- **Caching** - In-memory cache with TTL

### Development

- **Package Manager** - npm
- **Code Quality** - ESLint, Prettier
- **Version Control** - Git

## Getting Started

### Prerequisites

```bash
Node.js 18.x or higher
npm 9.x or higher
```

### Installation

```bash
# Clone the repository
git clone https://github.com/ldhbenecia/exbt-seoul.git
cd exbt-seoul

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
# Seoul Open API Key (Required)
SEOUL_API_KEY=your_api_key_here

# Optional: Custom API endpoint
SEOUL_API_ENDPOINT=http://openapi.seoul.go.kr:8088
```

> **서울 열린데이터광장**에서 API 키를 발급받을 수 있습니다:  
> https://data.seoul.go.kr/

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Architecture

### Data Flow

```
Seoul Open API
      ↓
[seoul.client.ts] - API 호출 및 Raw 데이터 수신
      ↓
[seoul.mapper.ts] - 데이터 정규화 및 변환
      ↓
[eventService.ts] - 비즈니스 로직 (필터링, 페이지네이션)
      ↓
[API Routes] - 서버 사이드 캐싱 및 응답
      ↓
[useEvents Hook] - 클라이언트 상태 관리
      ↓
[React Components] - UI 렌더링
```

## Deployment (Not yet)

1. GitHub 저장소와 연동
2. 환경 변수 설정 (`SEOUL_API_KEY`)
3. 자동 배포 완료

### Docker

```bash
# Build image
docker build -t exbt-seoul .

# Run container
docker run -p 3000:3000 -e SEOUL_API_KEY=your_key exbt-seoul
```

### Manual Deployment

```bash
npm run build
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">
  <p>Made with ❤️ for Seoul's Cultural Community</p>
  <p>
    <a href="https://github.com/ldhbenecia/exbt-seoul/issues">Report Bug</a> •
    <a href="https://github.com/ldhbenecia/exbt-seoul/issues">Request Feature</a>
  </p>
</div>