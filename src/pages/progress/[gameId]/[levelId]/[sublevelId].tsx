import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import ContentContainer from '~/components/contentContainer'
import { buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { generateServerSideHelper } from '~/server/helpers/serverSideHelper'
import { api } from '~/utils/api'
import { getSSRAuth } from '~/utils/authUtils'

const Level = ({
  sublevelId,
  levelId,
  gameId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const gameModesQuery = api.sublevel.getGameModesOfSublevel.useQuery({ sublevelId: sublevelId })
  const sublevelQuery = api.sublevel.getSublevelById.useQuery({ id: sublevelId })

  return (
    <ContentContainer
      title={sublevelQuery?.data?.name ?? 'Naam ophalen...'}
      backPath={`/progress/${gameId}/${levelId}`}
    >
      {gameModesQuery.data?.map((gameMode) => (
        <Link
          key={gameMode.id}
          className={cn(buttonVariants({ size: 'lg' }), 'h-20 w-full rounded-xl')}
          href={`/progress/${gameId}/${levelId}/${sublevelId}/${gameMode.name}`}
        >
          <div className="flex w-full items-center justify-center">
            <div className="flex w-full justify-center space-x-4">
              {/* <div
                className="flex h-16 w-1/3 items-center justify-center rounded-lg border-4 text-center text-2xl font-bold"
                // style={{ borderColor: 'green' }}
              >
                {gameMode.id}
              </div> */}
              <div className=" flex h-16 w-full items-center justify-center text-2xl font-medium">
                {gameMode.name}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </ContentContainer>
  )
}

export default Level

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<{ gameId: string; levelId: string; sublevelId: string }>,
) => {
  const auth = await getSSRAuth(ctx)
  const helpers = generateServerSideHelper(auth.props.session)

  if (ctx.params?.sublevelId) {
    await helpers.sublevel.getGameModesOfSublevel.prefetch({ sublevelId: ctx.params?.sublevelId })
    await helpers.sublevel.getSublevelById.prefetch({ id: ctx.params?.sublevelId })
  }

  return {
    props: {
      session: auth.props.session,
      trpcState: helpers.dehydrate(),
      levelId: ctx.params?.levelId ?? '',
      gameId: ctx.params?.gameId ?? '',
      sublevelId: ctx.params?.sublevelId ?? '',
    },
  }
}
