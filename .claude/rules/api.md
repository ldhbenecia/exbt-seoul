---
paths:
  - 'app/api/**/*.ts'
  - 'lib/services/**/*.ts'
  - 'lib/data/seoul/**/*.ts'
---

# Seoul Open API 데이터 레이어

## API 엔드포인트

```
http://openapi.seoul.go.kr:8088/{KEY}/json/{SERVICE}/{START}/{END}/{...filters}
```

| 서비스                         | 데이터   | 도메인 타입   |
| ------------------------------ | -------- | ------------- |
| `culturalEventInfo`            | 문화행사 | CulturalEvent |
| `culturalSpaceInfo`            | 문화공간 | CulturalSpace |
| `ListPublicReservationCulture` | 공공예약 | Reservation   |

## 핵심 규칙

- **Seoul API 필터 신뢰 금지**: codename/date 필터가 결과를 누락함. 항상 필터 없이 전체 fetch → 서버에서 필터링
- **자동 페이지네이션**: totalCount > 1000이면 fetchAllPages로 나머지 병렬 fetch
- **캐싱**: fetch에 `revalidate: 3600` 사용. `force-dynamic` 금지 (revalidate와 충돌)
- **API 라우트**: `export const revalidate = 120~300`. 에러 시 503 + Retry-After

## 데이터 흐름

```
Seoul API → seoul.client.ts (raw fetch + 페이지네이션)
         → mappers/ (raw → 도메인 타입 변환)
         → services/ (날짜/codename/제목 필터링 + 페이지네이션)
         → app/api/ (HTTP 응답)
         → hooks/ (클라이언트 상태 관리)
```

## 축제 카테고리

Seoul API에 '축제'라는 단일 codename은 없음. `축제-문화/예술`, `축제-시민화합` 등 prefix로 분류됨.
서비스에서 `FESTIVAL_PREFIX = '축제-'`로 startsWith 매칭.
