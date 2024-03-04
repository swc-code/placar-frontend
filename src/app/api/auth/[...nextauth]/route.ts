import { Api } from '@/lib/axios'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'text' },
      },

      async authorize(credentials, req) {
        const { data } = await Api.post('/auth', {
          emailDs: credentials?.email,
          passwordDs: credentials?.password,
        })

        return { ...data, accessToken: data.accessToken } || null
      },
    }),
  ],
  pages: {
    newUser: '/auth',
    signIn: '/auth',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },

    async session({ session, token }) {
      session.user = token as any

      return session
    },
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }
