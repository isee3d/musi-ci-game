import { createServerSideHelpers } from '@trpc/react-query/server'
import { appRouter } from '~/server/api/root'
import { prisma } from '~/server/db'
import superjson from 'superjson'
import { Session } from 'next-auth'

export const generateServerSideHelper = (session: Session | null) =>
  createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, session: session },
    transformer: superjson,
  })
