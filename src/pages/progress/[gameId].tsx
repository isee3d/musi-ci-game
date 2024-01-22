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

const UserLevelsPage = ({ gameId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const levelsOfGameQuery = api.game.getLevelsOfGame.useQuery({ gameId: parseInt(gameId) })

  return (
    <ContentContainer backPath="/progress/games" title="Voortgang Musi-CI Levels">
      {levelsOfGameQuery.data?.map((level) => (
        <Link
          key={level.id}
          className={cn(buttonVariants({ size: 'lg' }), 'h-20 w-full rounded-xl')}
          href={`/progress/${gameId}/${level.id}`}
        >
          <div className="flex w-full items-center justify-center">
            <div className="flex w-full justify-start space-x-4">
              {/* <div
                className="flex h-16 w-1/3 items-center justify-center rounded-lg border-4 text-center text-2xl font-bold"
                style={{ borderColor: level.color ?? 'bg-background' }}
              >
                {level.id}
              </div> */}
              <div className="relative flex h-16 w-full items-center justify-center text-2xl font-medium">
                <h2>{level.name}</h2>
                <div className="absolute right-3 top-3 h-12 w-12 rounded-full bg-primary-foreground" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </ContentContainer>
  )
}

export default UserLevelsPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext<{ gameId: string }>) => {
  const auth = await getSSRAuth(ctx)
  const helpers = generateServerSideHelper(auth.props.session)

  const gameId = ctx.params?.gameId
  if (typeof gameId !== 'string') throw new Error('No gameId')

  await helpers.game.getLevelsOfGame.prefetch({ gameId: parseInt(gameId) })

  return {
    props: {
      session: auth.props.session,
      trpcState: helpers.dehydrate(),
      gameId,
    },
  }
}

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
