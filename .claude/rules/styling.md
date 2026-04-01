---
paths:
  - 'app/globals.css'
  - 'tailwind.config.ts'
  - 'components/**/*.tsx'
---

# 스타일링 규칙

- Tailwind CSS 유틸리티 우선, cn()으로 클래스 병합
- 디자인 토큰은 globals.css CSS 변수로 정의
- 전역 transition은 `*`에 걸지 않음 (새 엘리먼트 마운트 시 깜빡임 유발)
- 스켈레톤 애니메이션은 animate-shimmer (opacity 기반, GPU 가속) 사용
- animate-pulse 사용 금지 (background-color 기반, 프레임 끊김)
