import { GetStaticProps, type NextPage } from 'next'
import Link from 'next/link'
import ContentContainer from '~/components/contentContainer'
import { Button, buttonVariants } from '~/components/ui/button'
import { useRequireAuth } from '~/hooks/useRequireAuth'
import { cn } from '~/lib/utils'
import { generateServerSideHelper } from '~/server/helpers/serverSideHelper'
import { api } from '~/utils/api'

const Level: NextPage<{ sublevelId: string; levelId: string; gameId: string }> = ({
  sublevelId,
  levelId,
  gameId,
}) => {
  useRequireAuth()
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
          className={cn(buttonVariants({ size: 'lg' }), 'h-20 rounded-xl w-full')}
          href={`/progress/${gameId}/${levelId}/${sublevelId}/${gameMode.name}`}
        >
          <div className="flex w-full items-center justify-center">
            <div className="flex justify-center w-full space-x-4">
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

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateServerSideHelper()
  const sublevelId = context.params?.sublevelId
  const levelId = context.params?.levelId
  const gameId = context.params?.gameId
  if (typeof sublevelId !== 'string') throw new Error('No sublevel')
  if (typeof levelId !== 'string') throw new Error('No levelId')
  if (typeof gameId !== 'string') throw new Error('No gameId')

  // await ssg.sublevel.getGameModesOfSublevel.prefetch({ sublevelId: sublevelId })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      sublevelId: sublevelId,
      levelId: levelId,
      gameId: gameId,
    },
  }
}

export const getStaticPaths = () => {
  return { paths: [], fallback: 'blocking' }
}

export default Level
