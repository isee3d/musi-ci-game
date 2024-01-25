import { createActorContext } from '@xstate/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ContentContainer from '~/components/contentContainer'
import { luisterenMachine } from '~/components/gameModes/luisteren/LuisterenMachine'
import Luisteren from '~/components/gameModes/luisteren/luisteren'
import Spelen from '~/components/gameModes/spelen/spelen'
import { spelenMachine } from '~/components/gameModes/spelen/spelenMachine'
import Test from '~/components/gameModes/testMode/test'
import { testModeMachine } from '~/components/gameModes/testMode/testMachine'
import Uitdaging from '~/components/gameModes/uitdaging/uitdaging'
import { uitdagingMachine } from '~/components/gameModes/uitdaging/uitdagingMachine'
import { Button, buttonVariants } from '~/components/ui/button'
import { env } from '~/env.mjs'
import { cn } from '~/lib/utils'
import { generateServerSideHelper } from '~/server/helpers/serverSideHelper'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { useAudioServiceStore } from '~/stores/useAudioServiceStore'
import { api } from '~/utils/api'
import { getSSRAuthRedirectLogin } from '~/utils/authUtils'

export const SpelenMachineContext = createActorContext(spelenMachine, { devTools: true })
export const UitdagingMachineContext = createActorContext(uitdagingMachine, { devTools: true })
export const LuisterenMachineContext = createActorContext(luisterenMachine, { devTools: true })
export const TestModeMachineContext = createActorContext(testModeMachine, { devTools: true })

const ModePage = ({
  gameId,
  levelId,
  sublevelId,
  mode,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { audioContext, setBPM, reset } = useAudioServiceStore()
  const { isPlaying, setIsPlaying } = useLuisterenStore()

  const fragmentLevelQuery = api.sublevel.getFragmentsOfSublevel.useQuery({
    sublevelId: sublevelId,
  })

  const fragmentGroupsQuery = api.sublevel.getFragmentGroupsOfSublevel.useQuery({
    sublevelId: sublevelId,
  })

  const sublevelQuery = api.sublevel.getSublevelById.useQuery(
    { id: sublevelId },
    {
      onSuccess: (data) => {
        if (data.bpm) {
          setBPM(data.bpm)
        } else {
          reset()
        }
      },
    },
  )
  const gameModesOfSublevelQuery = api.sublevel.getGameModesOfSublevel.useQuery({
    sublevelId: sublevelId,
  })
  const modeQuery = api.gameMode.getGameMode.useQuery({ name: mode })
  const fragmentsToShow = fragmentLevelQuery?.data?.fragmentToShow ?? 0
  const fragments = fragmentLevelQuery?.data?.fragments ?? []
  const playTime = fragmentLevelQuery?.data?.playTime

  useEffect(() => {
    if (!audioContext && env.NEXT_PUBLIC_ENABLE_AUDIO) {
      router.push(`/progress/${gameId}/${levelId}`)
    }

    setIsPlaying(false)
  }, [])

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
              mode={modeQuery?.data}
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
              mode={modeQuery?.data}
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
              mode={modeQuery?.data}
            />
          </UitdagingMachineContext.Provider>
        )
      case 'Test':
        return (
          <TestModeMachineContext.Provider>
            <Test
              gameId={gameId}
              fragmentsToShow={fragmentsToShow}
              fragments={fragments}
              levelId={levelId}
              playTime={playTime}
              sublevelId={sublevelId}
              mode={modeQuery?.data}
              fragmentGroups={fragmentGroupsQuery?.data?.fragmentGroups ?? []}
            />
          </TestModeMachineContext.Provider>
        )
      default:
        return null
    }
  }

  return (
    <ContentContainer
      title={sublevelQuery?.data?.name ?? 'Naam ophalen...'}
      backPath={`/progress/${gameId}/${levelId}`}
      classNameParent="px-0 mt-0"
      shouldRenderBackButton={false}
    >
      <div className="flex w-full">
        {gameModesOfSublevelQuery?.data
          ?.filter((gameMode) => gameMode.name !== 'Test')
          .map((gameMode, index) => (
            <Button
              key={index}
              className={cn(
                buttonVariants({ size: 'lg' }),
                'flex-auto rounded-none border border-background p-0 text-xl',
                mode !== gameMode.name ? 'bg-background text-accent-foreground' : '',
                isPlaying ? 'cursor-not-allowed' : 'cursor-pointer',
              )}
              disabled={isPlaying}
              asChild
            >
              <Link
                href={`/progress/${gameId}/${levelId}/${sublevelId}/${gameMode.name}`}
              >
                {gameMode.name}
              </Link>
            </Button>
          ))}
      </div>
      <div className="relative flex w-5/6 flex-col items-center justify-center gap-y-8 pt-4">
        {renderGameMode(mode)}
      </div>
    </ContentContainer>
  )
}

export default ModePage

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<{
    gameId: string
    levelId: string
    sublevelId: string
    mode: string
  }>,
) => {
  const auth = await getSSRAuthRedirectLogin(ctx)
  if (auth.redirect) {
    return { redirect: auth.redirect }
  }
  const helpers = generateServerSideHelper(auth.props.session)

  if (ctx.params?.sublevelId && ctx.params?.mode) {
    await helpers.sublevel.getFragmentsOfSublevel.prefetch({ sublevelId: ctx.params.sublevelId })
    await helpers.sublevel.getSublevelById.prefetch({ id: ctx.params.sublevelId })
    await helpers.gameMode.getGameMode.prefetch({ name: ctx.params.mode })
    await helpers.sublevel.getGameModesOfSublevel.prefetch({ sublevelId: ctx.params.sublevelId })
    await helpers.sublevel.getFragmentGroupsOfSublevel.prefetch({
      sublevelId: ctx.params.sublevelId,
    })
  }

  return {
    props: {
      session: auth.props.session,
      trpcState: helpers.dehydrate(),
      levelId: ctx.params?.levelId ?? '',
      gameId: ctx.params?.gameId ?? '',
      sublevelId: ctx.params?.sublevelId ?? '',
      mode: ctx.params?.mode ?? '',
    },
  }
}
