import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import ContentContainer from '~/components/contentContainer'
import { Button } from '~/components/ui/button'
import { routePaths } from '~/config/routing'
import { titlesAndTexts } from '~/config/site'
import { cn } from '~/lib/utils'
import { generateServerSideHelper } from '~/server/helpers/serverSideHelper'
import { api } from '~/utils/api'
import { getSSRAuthRedirectLogin } from '~/utils/authUtils'

const SublevelsPage = ({
  levelId,
  gameId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: subLevelsOfLevelQuery, isLoading } = api.level.getSubLevelsOfLevel.useQuery({ levelId })
  const { data: level } = api.level.getLevelById.useQuery({ id: levelId })

  return (
    <ContentContainer
      instrumentURL={level?.instrument}
      title={titlesAndTexts.sublevelTitle}
      classNameParent="border-x-4 border-b-4 border-primary rounded-b-3xl"
      backPath={routePaths.levelSelectPage(gameId)}
    >
      {subLevelsOfLevelQuery?.map((sublevel, index) => (
        <Button
          key={sublevel.id}
          className={cn(
            'h-20 w-full rounded-none border-t-4 border-gray-400',
            index === subLevelsOfLevelQuery.length - 1 && 'rounded-b-2xl',
          )}
          asChild
        >
          <Link
            href={routePaths.gamePage(gameId, levelId, sublevel.id, sublevel?.gameModes[0]?.name)}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex w-full justify-start space-x-4">
                <div className="relative flex h-16 w-full items-center justify-center text-2xl font-medium">
                  <h2 style={{ color: sublevel.color ?? 'bg-background' }}>{sublevel.name}</h2>
                </div>
              </div>
            </div>
          </Link>
        </Button>
      ))}
    </ContentContainer>
  )
}

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<{ gameId: string; levelId: string }>,
) => {
  const auth = await getSSRAuthRedirectLogin(ctx)
  if (auth.redirect) {
    return { redirect: auth.redirect }
  }
  const helpers = generateServerSideHelper(auth.props.session)

  const gameId = ctx.params?.gameId
  const levelId = ctx.params?.levelId
  if (typeof gameId !== 'string' || typeof levelId !== 'string')
    throw new Error('invalid parameters')

  await helpers.level.getSubLevelsOfLevel.prefetch({ levelId: levelId })
  await helpers.level.getLevelById.prefetch({ id: levelId })

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
