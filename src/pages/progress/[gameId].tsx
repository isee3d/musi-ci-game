import { GetStaticProps, type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ContentContainer from '~/components/contentContainer'
import { Button, buttonVariants } from '~/components/ui/button'
import { useRequireAuth } from '~/hooks/useRequireAuth'
import { cn } from '~/lib/utils'
import { generateServerSideHelper } from '~/server/helpers/serverSideHelper'
import { api } from '~/utils/api'

const UserLevelsPage: NextPage<{ gameId: string }> = ({ gameId }) => {
   const session = useRequireAuth()
  const levelsOfGameQuery = api.game.getLevelsOfGame.useQuery({ gameId: parseInt(gameId) })

  return (
    <ContentContainer backPath="/progress/games" title="Voortgang Musi-CI Levels">
      {levelsOfGameQuery.data?.map((level) => (
        <Link
          key={level.id}
          className={cn(buttonVariants({ size: 'lg' }), 'h-20 rounded-xl w-full')}
          href={`/progress/${gameId}/${level.id}`}
        >
          <div className="flex items-center w-full justify-center">
            <div className="flex justify-start w-full space-x-4">
              <div
                className="flex h-16 w-1/3 items-center justify-center rounded-lg border-4 text-center text-2xl font-bold"
                style={{ borderColor: level.color ?? 'bg-background' }}
              >
                {level.id}
              </div>
              <div className="flex h-16 w-5/6 items-center justify-center text-2xl font-medium">
                {level.name}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </ContentContainer>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateServerSideHelper()
  const gameId = context.params?.gameId

  if (typeof gameId !== 'string') throw new Error('No gameId')

  // await ssg.game.getLevelsOfGame.prefetch({ gameId: parseInt(gameId) })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      gameId,
    },
  }
}

export const getStaticPaths = () => {
  return { paths: [], fallback: 'blocking' }
}

export default UserLevelsPage
