import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Keanu Dustin Kemala | Frontend Developer & UI/UX Designer',
  description: 'Portofolio profesional Keanu Dustin Kemala. Menampilkan proyek, pengalaman, dan keahlian dalam Frontend Development (React, Next.js) dan UI/UX Design.',
  keywords: [
    'Keanu Dustin Kemala',
    'Keanu',
    'Dustin',
    'Kemala',
    'Frontend Developer Indonesia',
    'UI/UX Designer',
    'React Developer',
    'Next.js Developer',
    'Web Developer',
    'Portofolio Web'
  ],
  authors: [{ name: 'Keanu Dustin Kemala' }],
  creator: 'Keanu Dustin Kemala',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://keanu-dustin-kemala.vercel.app/',
    title: 'Keanu Dustin Kemala | Frontend Developer',
    description: 'Jelajahi portofolio Keanu Dustin Kemala, seorang Frontend Developer & UI/UX Designer yang berfokus pada desain modern dan interaktif.',
    siteName: 'Keanu Dustin Kemala Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keanu Dustin Kemala | Frontend Developer',
    description: 'Portofolio profesional Keanu Dustin Kemala, seorang Frontend Developer & UI/UX Designer.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf9' },
    { media: '(prefers-color-scheme: dark)', color: '#1e1e1e' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const isDark = localStorage.getItem('theme') === 'dark' || 
                  (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) document.documentElement.classList.add('dark');
              } catch {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          {children}
          <Toaster theme="system" position="top-right" />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </Providers>
      </body>
    </html>
  )
}
