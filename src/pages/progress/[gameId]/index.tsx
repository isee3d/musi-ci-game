import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Image from 'next/legacy/image'
import Link from 'next/link'
import ContentContainer from '~/components/contentContainer'
import { Button } from '~/components/ui/button'
import { routePaths } from '~/config/routing'
import { titlesAndTexts } from '~/config/site'
import { cn } from '~/lib/utils'
import { generateServerSideHelper } from '~/server/helpers/serverSideHelper'
import { api } from '~/utils/api'
import { getSSRAuthRedirectLogin } from '~/utils/authUtils'

export const getServerSideProps = async (ctx: GetServerSidePropsContext<{ gameId: string }>) => {
  const auth = await getSSRAuthRedirectLogin(ctx)
  if (auth.redirect) {
    return { redirect: auth.redirect }
  }

  const helpers = generateServerSideHelper(auth.props.session)

  const gameId = ctx.params?.gameId

  if (gameId) await helpers.game.getLevelsOfGame.prefetch({ gameId: parseInt(gameId) })

  return {
    props: {
      session: auth.props.session,
      trpcState: helpers.dehydrate(),
      gameId: gameId ?? '1',
    },
  }
}

const UserLevelsPage = ({ gameId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: levelsOfGame, isLoading } = api.game.getLevelsOfGame.useQuery({
    gameId: parseInt(gameId),
  })

  return (
    <ContentContainer
      classNameParent="border-x-4 border-b-4 border-primary rounded-b-3xl"
      backPath={routePaths.podium}
      title={titlesAndTexts.levelTitle}
    >
      {levelsOfGame?.map((level, index) => (
        <Button
          key={level.id}
          className={cn(
            'h-20 w-full rounded-none border-t-4 border-gray-400',
            index === levelsOfGame.length - 1 && 'rounded-b-2xl',
          )}
          asChild
        >
          <Link href={routePaths.sublevelSelectPage(gameId, level.id)}>
            <div className="flex w-full items-center justify-center">
              <div className="flex w-full justify-start space-x-4">
                <div className="relative flex h-16 w-full items-center justify-start gap-x-24 text-center text-2xl font-medium">
                  <div className="relative size-14">
                    {level.instrument && (
                      <Image
                        layout="fill"
                        src={level.instrument ?? ''}
                        objectFit="fill"
                        className="rounded-full"
                        alt="instrument"
                      />
                    )}
                  </div>
                  <h2 className="text-xl" style={{ color: level.color ?? 'bg-background' }}>
                    {level.name}
                  </h2>
                </div>
              </div>
            </div>
          </Link>
        </Button>
      ))}
    </ContentContainer>
  )
}

export default UserLevelsPage

/*
EXAMPLE OF GETSTATICPROPS

Below is an example of how to use getStaticProps to generate a static page with tRPC data.
*/

// export const getStaticProps: GetStaticProps = async (context) => {
//   const ssg = generateServerSideHelper()
//   const gameId = context.params?.gameId

//   if (typeof gameId !== 'string') throw new Error('No gameId')

//   // await ssg.game.getLevelsOfGame.prefetch({ gameId: parseInt(gameId) })

//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       gameId,
//     },
//   }
// }

// export const getStaticPaths = () => {
//   return { paths: [], fallback: 'blocking' }
// }
