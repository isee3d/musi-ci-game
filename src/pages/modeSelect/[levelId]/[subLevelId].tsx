import { GetStaticProps, type NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Button, buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { generateServerSideHelper } from '~/server/helpers/serverSideHelper'
import { api } from '~/utils/api'

const Level: NextPage<{ subLevelId: string; levelId: string; sublevel: string }> = ({
  subLevelId,
  levelId,
  sublevel,
}) => {
  const gameModesQuery = api.sublevel.getGameModesOfSublevel.useQuery({ subLevelId: subLevelId })
  const sublevelQuery = api.sublevel.getSublevelById.useQuery({ id: subLevelId })

  return (
    <>
      <Head>
        <title>{sublevel}</title>
        <meta name="description" content="Level name here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className=" flex grow flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center rounded-2xl border-4 border-primary p-0">
          <h1 className="w-full  border-b-4 border-primary py-3 text-center text-3xl font-extrabold tracking-tight ">
            {sublevelQuery?.data?.name}
          </h1>
          <div className="flex min-h-[60vh] min-w-[40vh] flex-col justify-center gap-y-8">
            {gameModesQuery.data?.map((gameMode) => (
              <Button
                asChild
                key={gameMode.id}
                className={cn(buttonVariants({ size: 'lg' }), 'h-20 rounded-xl')}
              >
                <Link href={`/${levelId}/${subLevelId}/${gameMode.name}`}>
                  <h3 className="text-3xl">{gameMode.name}</h3>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateServerSideHelper()
  const subLevelId = context.params?.subLevelId
  const levelId = context.params?.levelId
  if (typeof subLevelId !== 'string') throw new Error('No subLevel')
  if (typeof levelId !== 'string') throw new Error('No levelId')

  await ssg.sublevel.getGameModesOfSublevel.prefetch({ subLevelId: subLevelId })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      subLevelId: subLevelId,
      levelId: levelId,
    },
  }
}

export const getStaticPaths = () => {
  return { paths: [], fallback: 'blocking' }
}

export default Level
