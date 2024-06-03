import type { Metadata } from 'next'
import '../../globals.css'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { nextAuthOptions } from '@/lib/auth-options'

export const metadata: Metadata = {
  title: 'Login',
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(nextAuthOptions)
  if (session) {
    redirect('/')
  }

  return <>{children}</>
}
