import { createActorContext } from '@xstate/react'
import { GetStaticProps, type NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ContentContainer from '~/components/contentContainer'
import { luisterenMachine } from '~/components/gameModes/luisteren/LuisterenMachine'
import Luisteren from '~/components/gameModes/luisteren/luisteren'
import Spelen from '~/components/gameModes/spelen/spelen'
import { spelenMachine } from '~/components/gameModes/spelen/spelenMachine'
import Uitdaging from '~/components/gameModes/uitdaging/uitdaging'
import { uitdagingMachine } from '~/components/gameModes/uitdaging/uitdagingMachine'
import { Button } from '~/components/ui/button'
import { env } from '~/env.mjs'
import { useRequireAuth } from '~/hooks/useRequireAuth'
import { cn } from '~/lib/utils'
import { generateServerSideHelper } from '~/server/helpers/serverSideHelper'
import { useAudioServiceStore } from '~/stores/useAudioServiceStore'
import { api } from '~/utils/api'

export const SpelenMachineContext = createActorContext(spelenMachine, { devTools: true })
export const UitdagingMachineContext = createActorContext(uitdagingMachine, { devTools: true })
export const LuisterenMachineContext = createActorContext(luisterenMachine, { devTools: true })

const tabs = ['Luisteren', 'Spelen', 'Uitdaging']

const ModePage: NextPage<{ levelId: string; sublevelId: string; mode: string; gameId: string }> = ({
  gameId,
  levelId,
  sublevelId,
  mode,
}) => {
  useRequireAuth()

  const fragmentLevelQuery = api.sublevel.getFragmentsOfSublevel.useQuery({
    sublevelId: sublevelId,
  })
  const sublevelQuery = api.sublevel.getSublevelById.useQuery({ id: sublevelId })
  const modeQuery = api.gameMode.getGameMode.useQuery({ name: mode })
  const router = useRouter()
  const { audioContext } = useAudioServiceStore()
  const fragmentsToShow = fragmentLevelQuery?.data?.fragmentToShow ?? 0
  const fragments = fragmentLevelQuery?.data?.fragments ?? []
  const playTime = fragmentLevelQuery?.data?.playTime

  // useEffect(() => {
  //   if (!audioContext && env.NEXT_PUBLIC_ENABLE_AUDIO) {
  //     router.push(`/progress/${gameId}/${levelId}/${sublevelId}`)
  //   }
  // }, [])

  function renderGameMode(mode: string) {
    switch (mode) {
      case 'Luisteren':
        return (
          <LuisterenMachineContext.Provider>
            <Luisteren
              fragmentsToShow={fragmentsToShow}
              fragments={fragments}
              levelId={levelId}
              sublevelId={sublevelId}
              mode={modeQuery?.data?.id.toString()}
            />
          </LuisterenMachineContext.Provider>
        )
      case 'Spelen':
        return (
          <SpelenMachineContext.Provider>
            <Spelen
              fragmentsToShow={fragmentsToShow}
              fragments={fragments}
              levelId={levelId}
              sublevelId={sublevelId}
              gameId={gameId}
              mode={modeQuery?.data?.id.toString()}
            />
          </SpelenMachineContext.Provider>
        )
      case 'Uitdaging':
        return (
          <UitdagingMachineContext.Provider>
            <Uitdaging
              gameId={gameId}
              fragmentsToShow={fragmentsToShow}
              fragments={fragments}
              levelId={levelId}
              playTime={playTime}
              sublevelId={sublevelId}
              mode={modeQuery?.data?.id.toString()}
            />
          </UitdagingMachineContext.Provider>
        )
      default:
        return null
    }
  }

  return (
    <ContentContainer
      title={sublevelQuery?.data?.name ?? 'Naam ophalen...'}
      backPath={`/progress/${gameId}/${levelId}/${sublevelId}`}
      classNameParent="w-full px-0 mt-0 space-y-0"
    >
      <div className="flex w-full">
        {tabs.map((tab, index) => (
          <Button
            key={index}
            size={'lg'}
            className={cn(
              'h-16 w-1/3 rounded-none bg-gray-500 py-3 text-center text-3xl font-extrabold tracking-tight hover:bg-gray-800',
              mode === tab ? 'bg-background text-red-500 border-xl' : 'text-primary',
              // index === 0 && '',
              // index === tabs.length - 1 && ''
            )}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="relative flex w-1/2 flex-col justify-center gap-y-8 pt-4">
        {renderGameMode(mode)}
      </div>
    </ContentContainer>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateServerSideHelper()
  const mode = context.params?.mode
  const sublevelId = context.params?.sublevelId
  const levelId = context.params?.levelId
  const gameId = context.params?.gameId

  if (typeof mode !== 'string') throw new Error('No mode')
  if (typeof levelId !== 'string') throw new Error('No level')
  if (typeof sublevelId !== 'string') throw new Error('No sublevel')
  if (typeof gameId !== 'string') throw new Error('No game')

  await ssg.sublevel.getFragmentsOfSublevel.prefetch({ sublevelId: sublevelId })
  await ssg.sublevel.getSublevelById.prefetch({ id: sublevelId })
  await ssg.gameMode.getGameMode.prefetch({ name: mode })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      sublevelId,
      levelId,
      gameId,
      mode,
    },
  }
}

export const getStaticPaths = () => {
  return { paths: [], fallback: 'blocking' }
}

export default ModePage
