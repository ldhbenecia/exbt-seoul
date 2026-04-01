import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'EXBT';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
        }}
      >
        {/* icon.svg 확대 재현 */}
        <svg width="160" height="160" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#171717" />
          <path
            d="M8 10.5h6.5M8 16h5M8 21.5h6.5M18 10.5h6M18 16h6M18 21.5h6"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
