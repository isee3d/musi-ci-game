import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from 'next'
import Link from 'next/link'
import ContentContainer from '~/components/contentContainer'
import { buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { generateServerSideHelper } from '~/server/helpers/serverSideHelper'
import { api } from '~/utils/api'
import { getSSRAuth } from '~/utils/authUtils'

const SublevelsPage = ({
  levelId,
  gameId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const subLevelsOfLevelQuery = api.level.getSubLevelsOfLevel.useQuery({ levelId })

  return (
    <ContentContainer title="Voortgang Musi-CI Sublevels" backPath={`/podium`}>
      {subLevelsOfLevelQuery.data?.map((sublevel) => (
        <Link
          key={sublevel.id}
          className={cn(buttonVariants({ size: 'lg' }), 'h-20 w-full rounded-xl')}
          href={`/progress/${gameId}/${levelId}/${sublevel.id}`}
        >
          <div className="flex  w-full items-center justify-between">
            <div className="flex w-full justify-start space-x-4">
              {/* <div
                className="flex h-16 w-1/3 items-center justify-center rounded-lg border-4 text-center text-2xl font-bold"
                style={{ borderColor: sublevel.color ?? 'bg-background' }}
              >
                {sublevel.id}
              </div> */}
              <div className="relative flex h-16 w-full items-center justify-center text-2xl font-medium">
                <h2>{sublevel.name}</h2>
                <div className="absolute right-3 top-3 h-12 w-12 rounded-full bg-primary-foreground" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </ContentContainer>
  )
}

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<{ gameId: string; levelId: string }>,
) => {
  const auth = await getSSRAuth(ctx)
  const helpers = generateServerSideHelper(auth.props.session)

  const gameId = ctx.params?.gameId
  const levelId = ctx.params?.levelId
  if (typeof gameId !== 'string' || typeof levelId !== 'string')
    throw new Error('invalid parameters')

  await helpers.level.getSubLevelsOfLevel.prefetch({ levelId: levelId })

  return {
    props: {
      session: auth.props.session,
      trpcState: helpers.dehydrate(),
      levelId,
      gameId,
    },
  }
}

export default SublevelsPage
