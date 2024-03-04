import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      userId: string
      emailDs: string
      nameDs: string
      client: {
        clientDs: string
        nameDs: string
      }
      accessToken: string
    }
  }
}
