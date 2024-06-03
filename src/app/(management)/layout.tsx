import '../globals.css'
import { Header } from '@/components/header/header'
import { nextAuthOptions } from '@/lib/auth-options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(nextAuthOptions)
  if (!session) {
    redirect('/auth')
  }

  return (
    <>
      <Header />
      {children}
    </>
  )
}
