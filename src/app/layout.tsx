import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TanstackProvider } from '../components/providers/tanstack-provider'
import { NextUIProvider } from '../components/providers/nextui-provider'
import { SnackbarProvider } from '../components/providers/snackbar-provider'
import { NextAuthSessionProvider } from '@/components/providers/session-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SWC',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          <NextUIProvider>
            <SnackbarProvider>
              <NextAuthSessionProvider>
                <main className="h-screen w-full">{children}</main>
              </NextAuthSessionProvider>
            </SnackbarProvider>
          </NextUIProvider>
        </TanstackProvider>
      </body>
    </html>
  )
}
