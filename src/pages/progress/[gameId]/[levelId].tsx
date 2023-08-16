import { GetStaticProps, type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import ContentContainer from '~/components/contentContainer'
import { buttonVariants } from '~/components/ui/button'
import { useRequireAuth } from '~/hooks/useRequireAuth'
import { cn } from '~/lib/utils'
import { generateServerSideHelper } from '~/server/helpers/serverSideHelper'
import { api } from '~/utils/api'

const SublevelsPage: NextPage<{ levelId: string; gameId: string }> = ({ levelId, gameId }) => {
  const session = useRequireAuth()
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
              <div className="flex relative h-16 w-full items-center justify-center text-2xl font-medium">
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

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateServerSideHelper()
  const levelId = context.params?.levelId
  const gameId = context.params?.gameId

  if (typeof levelId !== 'string') throw new Error('No levelId')
  if (typeof gameId !== 'string') throw new Error('No gameId')

  // await ssg.level.getSubLevelsOfLevel.prefetch({ levelId: levelId })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      levelId: levelId,
      gameId: gameId,
    },
  }
}

export const getStaticPaths = () => {
  return { paths: [], fallback: 'blocking' }
}

export default SublevelsPage
