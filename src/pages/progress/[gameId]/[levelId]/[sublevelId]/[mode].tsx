import { createActorContext } from '@xstate/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import ContentContainer from '~/components/contentContainer'
import { luisterenMachine } from '~/components/gameModes/luisteren/LuisterenMachine'
import Luisteren from '~/components/gameModes/luisteren/luisteren'
import Spelen from '~/components/gameModes/spelen/spelen'
import { spelenMachine } from '~/components/gameModes/spelen/spelenMachine'
import Test from '~/components/gameModes/testMode/test'
import { testModeMachine } from '~/components/gameModes/testMode/testMachine'
import Uitdaging from '~/components/gameModes/uitdaging/uitdaging'
import { uitdagingMachine } from '~/components/gameModes/uitdaging/uitdagingMachine'
import { LoadingSpinner } from '~/components/loading'
import { Button, buttonVariants } from '~/components/ui/button'
import { routePaths } from '~/config/routing'
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
  const { data: level } = api.level.getLevelById.useQuery({ id: levelId })
  const fragmentGroupsQuery = api.sublevel.getFragmentGroupsOfSublevel.useQuery({
    sublevelId: sublevelId,
  })
  const sublevelQuery = api.sublevel.getSublevelById.useQuery(
    { id: sublevelId },
    {
      onSuccess: (data) => {
        data.bpm ? setBPM(data.bpm) : reset()
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

  const renderGameMode = (mode: string) => {
    switch (mode) {
      case 'Luisteren':
        return (
          <LuisterenMachineContext.Provider>
            <Luisteren
              fragmentsToShow={
                sublevelQuery.data?.fragmentToShowLuisteren
                  ? sublevelQuery.data?.fragmentToShowLuisteren
                  : fragmentsToShow
              }
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
              fragmentsToShow={
                sublevelQuery.data?.fragmentToShowSpelen
                  ? sublevelQuery.data?.fragmentToShowSpelen
                  : fragmentsToShow
              }
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
              fragmentsToShow={
                sublevelQuery.data?.fragmentToShowUitdaging
                  ? sublevelQuery.data?.fragmentToShowUitdaging
                  : fragmentsToShow
              }
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

  useEffect(() => {
    if (!audioContext && env.NEXT_PUBLIC_ENABLE_AUDIO) {
      router.push(routePaths.sublevelSelectPage(gameId, parseInt(levelId)))
    }

    setIsPlaying(false)

    return () => setIsPlaying(false)
  }, [])

  const renderedGameMode = useMemo(() => renderGameMode(mode), [mode])

  return (
    <ContentContainer
      title={sublevelQuery?.data?.name ?? 'Naam ophalen...'}
      classNameParent="border-x-4 border-b-4 border-primary rounded-b-2xl"
      shouldRenderBackButton={false}
      instrumentURL={mode !== 'Test' ? level?.instrument : undefined}
    >
      <div className="flex w-full">
        {gameModesOfSublevelQuery?.isLoading && <LoadingSpinner />}
        {gameModesOfSublevelQuery?.data
          ?.filter((gameMode) => gameMode.name !== 'Test')
          .map((gameMode) => (
            <Button
              key={gameMode.id}
              className={cn(
                'h-12 flex-auto rounded-none text-xl',
                mode !== gameMode.name ? 'bg-background text-accent-foreground' : '',
              )}
              disabled={isPlaying}
              style={{
                pointerEvents: isPlaying ? 'none' : 'auto',
                opacity: isPlaying ? 0.5 : 1,
              }}
              asChild
            >
              <Link
                href={routePaths.gamePage(gameId, levelId, parseInt(sublevelId), gameMode.name)}
              >
                {gameMode.name}
              </Link>
            </Button>
          ))}
      </div>
      <div className="relative flex w-full flex-col items-center justify-center gap-y-8 py-8">
        {renderedGameMode}
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
    // await helpers.sublevel.getGameModesOfSublevel.prefetch({ sublevelId: ctx.params.sublevelId })
    await helpers.sublevel.getFragmentGroupsOfSublevel.prefetch({
      sublevelId: ctx.params.sublevelId,
    })
    await helpers.level.getLevelById.prefetch({ id: ctx.params.levelId })
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
