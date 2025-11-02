# 서울 전시회 - Seoul Art Exhibitions

서울의 모든 전시회 정보를 한 곳에서 모아볼 수 있는 웹사이트입니다.

## 주요 기능

- 🎨 서울 지역 전시회 정보 수집 및 표시
- 🔍 전시회 검색 및 카테고리 필터링
- 📅 전시 기간, 운영 시간 정보 제공
- 🌐 웹 크롤링을 통한 자동 데이터 수집
- 💾 캐싱 시스템으로 빠른 로딩

## 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: Radix UI
- **크롤링**: Cheerio
- **배포**: Vercel (권장)

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 프로덕션 빌드

```bash
npm run build
npm start
```

## 데이터 수집

전시회 정보는 다음 소스에서 자동으로 수집됩니다:

1. **서울시 문화포털** - 공공 전시회 정보
2. **국립현대미술관** - 주요 미술관 전시 정보
3. **기타 서울 지역 미술관** - 각 미술관 웹사이트

### 크롤링 설정

`lib/scraper.ts` 파일에서 크롤링 로직을 수정할 수 있습니다. 실제 사이트의 HTML 구조에 맞게 선택자를 업데이트해야 합니다.

### 캐시 관리

- 캐시는 1시간 동안 유지됩니다
- `/api/refresh` 엔드포인트로 수동 새로고침 가능 (인증 필요)

## 환경 변수

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
REFRESH_TOKEN=your-secret-token-for-refresh-endpoint
```

## 배포

### Vercel 배포 (권장)

1. GitHub에 프로젝트 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 임포트
3. 자동 배포 완료

### 수동 배포

```bash
npm run build
```

빌드된 파일은 `.next` 디렉토리에 생성됩니다.

## 데이터베이스 연동 (선택사항)

프로덕션 환경에서는 다음을 권장합니다:

- **Redis**: 캐싱 시스템
- **PostgreSQL/MongoDB**: 전시회 데이터 저장
- **Cron Jobs**: 정기적인 데이터 업데이트 (Vercel Cron 또는 외부 서비스)

## 라이선스

MIT

## 기여

이슈와 PR을 환영합니다!
