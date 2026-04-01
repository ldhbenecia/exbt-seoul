---
paths:
  - 'components/**/*.tsx'
  - 'hooks/**/*.ts'
---

# 컴포넌트/훅 패턴

## 디렉토리 구분

- **common/**: 여러 도메인에서 공유하는 앱 레벨 컴포넌트 (CardGrid, ErrorState 등)
- **ui/**: shadcn/ui 디자인 프리미티브 (button, dialog 등). 비즈니스 로직 없음
- **events/, spaces/, reservations/**: 도메인별 컴포넌트

## 데이터 fetching 훅 패턴

```
initialLoading (boolean) — 최초 1회만 true→false. 이후 fetch에서는 변경 안 함
fetchIdRef (number) — race condition 방지. fetch마다 ++, 응답 시 id 불일치하면 무시
hasFetchedRef (boolean) — initialLoading을 1회만 꺼주기 위한 플래그
```

**금지**: `isLoading`을 매 fetch마다 토글하면 카테고리 전환 시 UI 깜빡임 발생

## 이미지

ImageWithFallback 사용:

- IntersectionObserver (rootMargin 200px) 으로 lazy load
- Image.decode()로 완전히 디코딩 후 표시 (progressive 렌더링 방지)
- /\_next/image 최적화 URL로 WebP 변환 + 리사이징

## sessionStorage 복원

hydration mismatch 방지를 위해 initializedRef 패턴 사용:

1. useState에는 기본값만 (서버/클라이언트 일치)
2. useEffect 첫 실행에서 sessionStorage 읽기
3. 이후 변경 시에만 sessionStorage 쓰기

## 카드 클릭 영역

이미지 영역과 텍스트 영역의 클릭 동작 분리.
전체 카드를 감싸는 `<a>` 금지 — 텍스트 내 개별 링크와 충돌.
