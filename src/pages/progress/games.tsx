import { GetServerSidePropsContext } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import ContentContainer from '~/components/contentContainer'
import { buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { generateServerSideHelper } from '~/server/helpers/serverSideHelper'
import { api } from '~/utils/api'
import { getSSRAuthRedirectLogin } from '~/utils/authUtils'

const UserGamesPage = () => {
  const { data: session } = useSession()
  const gamesOfUserQuery = api.user.getGamesOfUser.useQuery({ id: session?.user.id })

  return (
    <ContentContainer backPath="/podium" title="Voortgang Musi-CI Games">
      {gamesOfUserQuery.data?.map((game) => (
        <Link
          key={game.id}
          className={cn(buttonVariants({ size: 'lg' }), 'h-20 w-full rounded-xl')}
          href={`/progress/${game.id}`}
        >
          <div className="flex w-full items-center justify-center">
            <div className="flex w-full justify-start space-x-4">
              <div
                className="flex h-16 w-1/3 items-center justify-center rounded-lg border-4 text-center text-2xl font-bold"
                // style={{ borderColor: 'green' }}
              >
                {game.id}
              </div>
              <div className=" flex h-16 w-2/6 items-center justify-center text-2xl font-medium">
                {game.name}
              </div>
            </div>
            <div className=" flex h-16 w-4/6 items-center justify-center text-2xl font-medium">
              {game.description}
            </div>
          </div>
        </Link>
      ))}
    </ContentContainer>
  )
}

export default UserGamesPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const auth = await getSSRAuthRedirectLogin(ctx)
  if (auth.redirect) {
    return { redirect: auth.redirect }
  }

  const helpers = generateServerSideHelper(auth.props.session)
  await helpers.user.getGamesOfUser.prefetch({ id: auth.props.session?.user.id })

  return {
    props: {
      session: auth.props.session,
      trpcState: helpers.dehydrate(),
    },
  }
}
