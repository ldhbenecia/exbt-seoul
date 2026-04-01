---
paths:
  - '**/*.ts'
  - '**/*.tsx'
---

# 코드 컨벤션

## 네이밍

- **컴포넌트 파일**: PascalCase (`EventCard.tsx`)
- **훅 파일**: camelCase, `use` 접두사 (`useEvents.ts`)
- **유틸/서비스 파일**: camelCase (`dateUtils.ts`, `eventService.ts`)
- **타입 파일**: camelCase (`culturalEvent.ts`)
- **상수 변수**: UPPER_SNAKE_CASE (`CODENAME_TABS`)

## 언어

- **UI 텍스트 (사용자에게 보이는 것)**: 한국어
- **코드, 변수명, 주석**: 영어

## 커밋

Conventional Commits. 본문 한국어.

```
type(domain): 한국어 요약

상세 설명 (선택)
```

type: `feat`, `fix`, `refactor`, `perf`, `style`, `chore`, `docs`
domain: `ui`, `api`, `config` 등

예시:

- `feat(ui): 카테고리 탭 확장`
- `fix(api): Seoul API 필터 불완전 대응`
- `refactor(ui): 공용 컴포넌트 추출`

## 커밋 분리

한 번에 몰아서 커밋하지 않음. 논리적 단위로 쪼개서 커밋:

- 데이터 레이어 변경과 UI 변경 분리
- 리팩토링과 기능 추가 분리
- 설정 변경은 별도 커밋
- 각 커밋이 독립적으로 의미 있어야 함
