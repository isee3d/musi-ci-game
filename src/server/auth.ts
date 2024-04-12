import { type GetServerSidePropsContext } from 'next'
import { getServerSession, type NextAuthOptions, type DefaultSession, DefaultUser } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { env } from '~/env.mjs'
import { prisma } from '~/server/db'
import bcrypt from 'bcrypt'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      // ...other properties
      role: string
      participantId: string | undefined
      id_Team: string | undefined
      isAllowedToPlay: boolean
      preferSkipTutorial: boolean
      // role: UserRole;
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    // ...other properties
    role: string | null
    participantId: string | null
    id_Team: number | null
    preferSkipTutorial: boolean | null
    isAllowedToPlay: boolean | null
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.participantId = user.participantId
        token.id_Team = user.id_Team
        token.preferSkipTutorial = user.preferSkipTutorial
        token.isAllowedToPlay = user.isAllowedToPlay
      }

      return token
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
        role: token.role as string,
        participantId: token.participantId as string,
        id_Team: token.id_Team as string,
        preferSkipTutorial: token.preferSkipTutorial as boolean,
        isAllowedToPlay: token.isAllowedToPlay as boolean,
      },
    }),
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    // GoogleProvider({
    //   clientId: env.GOOGLE_CLIENT_ID,
    //   clientSecret: env.GOOGLE_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        participantId: {
          label: 'Deelnemer nummer',
          type: 'text',
          placeholder: '12345',
        },
        password: { label: 'Wachtwoord', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.participantId || !credentials?.password) return null

        const user = await prisma.user.findFirst({
          where: {
            participantId: credentials.participantId,
          },
        })

        if (!user || !user.hashedPassword) return null

        const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

        if (!passwordsMatch) return null

        return user
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  // Custom signin page
  // pages: {
  //   signIn: '/auth/signin',
  // },
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}
