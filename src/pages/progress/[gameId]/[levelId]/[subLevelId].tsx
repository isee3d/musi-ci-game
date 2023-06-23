import { GetStaticProps, type NextPage } from 'next'
import Link from 'next/link'
import ContentContainer from '~/components/contentContainer'
import { Button, buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { generateServerSideHelper } from '~/server/helpers/serverSideHelper'
import { api } from '~/utils/api'

const Level: NextPage<{ sublevelId: string; levelId: string; gameId: string }> = ({
  sublevelId,
  levelId,
  gameId,
}) => {
  const gameModesQuery = api.sublevel.getGameModesOfSublevel.useQuery({ sublevelId: sublevelId })
  const sublevelQuery = api.sublevel.getSublevelById.useQuery({ id: sublevelId })

  return (
    <ContentContainer title={sublevelQuery?.data?.name ?? 'Naam ophalen...'} backPath={`/progress/${gameId}/${levelId}`}>
           {gameModesQuery.data?.map((gameMode) => (
              <Button
                asChild
                key={gameMode.id}
                className={cn(buttonVariants({ size: 'lg' }), 'h-20 rounded-xl')}
              >
                <Link href={`/progress/${gameId}/${levelId}/${sublevelId}/${gameMode.name}`}>
                  <h3 className="text-3xl">{gameMode.name}</h3>
                </Link>
              </Button>
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

  await ssg.sublevel.getGameModesOfSublevel.prefetch({ sublevelId: sublevelId })

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
