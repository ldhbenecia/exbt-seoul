import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://exbt-seoul.vercel.app'),
  title: 'EXBT - Seoul Cultural Events',
  description: '서울의 전시, 공연, 축제, 문화공간, 예약 프로그램 정보를 한 곳에서',
  openGraph: {
    title: 'EXBT - Seoul Cultural Events',
    description: '서울의 전시, 공연, 축제, 문화공간, 예약 프로그램 정보를 한 곳에서',
    locale: 'ko_KR',
    type: 'website',
    siteName: 'EXBT',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EXBT - Seoul Cultural Events',
    description: '서울의 전시, 공연, 축제, 문화공간, 예약 프로그램 정보를 한 곳에서',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'EXBT - Seoul Cultural Events',
              url: 'https://exbt-seoul.vercel.app',
              description: '서울의 전시, 공연, 축제, 문화공간, 예약 프로그램 정보를 한 곳에서',
            }),
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          <main className="flex-1 pt-14">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
