import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn) {
        return true;
      }
      return false;
    },
    async jwt({ user, trigger, session, token }: any) {
      if (user) {
        token.user = {
          id: user?.user?.id,
          name: user?.user?.name,
          email: user?.user?.email,
          type: user?.user?.type,
          avatar: user?.user?.avatar,
          phone: user?.user?.phone,
          accessToken: user.access_token,
          result: user.result,
          message: user.message,
        }
      }
      if (trigger === 'update' && session) {
        token.user = {
          ...token.user,
          email: session.user.email || null,
          name: session.user.name || null,
          phone: session.user.phone || null,
          lang: session.user.lang || 'en',
          translate: session.translate || null,
        }
      } else {

        token.lang = 'en'
      }
      return token
    },
    session: async ({ session, token }: any) => {
      if (token.user.result) {
        session.user = token.user
      } else {
        session.user = null
        session.message = token.user.message
      }
      return session
    },
  },
  providers: [], // Add providers with an empty array for now
  trustHost: true,
} satisfies NextAuthConfig;