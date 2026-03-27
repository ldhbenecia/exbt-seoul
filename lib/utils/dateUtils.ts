export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** "2024-03-15" → "3.15" */
export function formatShortDate(dateString?: string): string {
  if (!dateString) return '-';
  const d = new Date(dateString);
  return isNaN(d.getTime()) ? '-' : `${d.getMonth() + 1}.${d.getDate()}`;
}

/** "2024-03-15" → "2024년 3월 15일" */
export function formatFullDate(dateString?: string): string {
  if (!dateString) return '정보 없음';
  const d = new Date(dateString);
  return isNaN(d.getTime())
    ? '정보 없음'
    : `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export function getCodenameLabel(codename?: string): string {
  return codename && codename.trim().length > 0 ? codename : '분류 없음';
}
