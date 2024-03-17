import { NextAuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import { Api } from "./axios"

export const nextAuthOptions: NextAuthOptions = {
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

        console.log(req)

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