import { GetServerSidePropsContext } from 'next'
import { UserRole } from 'types/Role'
import { getServerAuthSession } from '~/server/auth'

export const getSSRAuthRedirectLogin = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx)
  if (!session?.user.id || !session?.user.isAllowedToPlay) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

export const getSSRAuth = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx)

  return {
    props: {
      session,
    },
  }
}

export const getSSRAuthRedirectOnAdminRole = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx)

  if (!session?.user.id || !session?.user.isAllowedToPlay) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      }
    }
  }

  const role = session?.user?.role as UserRole
  if (role !== UserRole.ADMIN) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      }
    }
  }

  return {
    props: {
      session,
    },
  }
}

export const getSSRAuthRedirectOnResearcherRole = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx)
  const role = session?.user?.role as UserRole

  if (!session?.user.id) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    }
  }

  if (role === UserRole.USER) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
