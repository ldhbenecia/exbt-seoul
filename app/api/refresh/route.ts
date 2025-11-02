import { NextResponse } from 'next/server';
import { clearCache } from '@/lib/cache';

// 전시회 정보를 수동으로 새로고침하는 엔드포인트
// 크론 잡이나 수동 호출로 사용 가능
export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    // 간단한 인증 (프로덕션에서는 더 강력한 인증 사용)
    const expectedToken = process.env.REFRESH_TOKEN || 'your-secret-token';
    
    if (authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 캐시 클리어
    clearCache();
    
    return NextResponse.json({ 
      message: 'Cache cleared successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error refreshing cache:', error);
    return NextResponse.json(
      { error: 'Failed to refresh cache' },
      { status: 500 }
    );
  }
}

