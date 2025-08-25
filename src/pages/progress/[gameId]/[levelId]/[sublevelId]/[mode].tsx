import { createActorContext } from '@xstate/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { SessionProvider } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo } from 'react'
import ContentContainer from '~/components/contentContainer'
import { luisterenMachine } from '~/components/gameModes/luisteren/LuisterenMachine'
import Luisteren from '~/components/gameModes/luisteren/luisteren'
import Spelen from '~/components/gameModes/spelen/spelen'
import { spelenMachine } from '~/components/gameModes/spelen/spelenMachine'
import Test from '~/components/gameModes/testMode/test'
import { testModeMachine } from '~/components/gameModes/testMode/testMachine'
import Uitdaging from '~/components/gameModes/uitdaging/uitdaging'
import { uitdagingMachine } from '~/components/gameModes/uitdaging/uitdagingMachine'
import { Button } from '~/components/ui/button'
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

type ModeProps = {
  mode: string
  sublevelQuery: { data: any }
  fragmentsToShow: number
  fragments: any[]
  levelId: string
  sublevelId: string
  modeQuery: { data: any }
  gameId: string
  playTime?: number | null
  fragmentGroupsQuery: { data: any }
}

const Modes: React.FC<ModeProps> = ({
  mode,
  levelId,
  fragmentsToShow,
  fragments,
  sublevelId,
  modeQuery,
  gameId,
  playTime,
  fragmentGroupsQuery,
  sublevelQuery,
}) => {
  return (
    <>
      {mode === 'Luisteren' && (
        <LuisterenMachineContext.Provider>
          <Luisteren
            fragmentsToShow={sublevelQuery.data?.fragmentToShowLuisteren ?? fragmentsToShow}
            fragments={fragments}
            levelId={levelId}
            sublevelId={sublevelId}
            mode={modeQuery?.data}
          />
        </LuisterenMachineContext.Provider>
      )}
      {mode === 'Spelen' && (
        <SpelenMachineContext.Provider>
          <Spelen
            fragmentsToShow={sublevelQuery.data?.fragmentToShowSpelen ?? fragmentsToShow}
            fragments={fragments}
            levelId={levelId}
            sublevelId={sublevelId}
            gameId={gameId}
            mode={modeQuery?.data}
          />
        </SpelenMachineContext.Provider>
      )}
      {mode === 'Uitdaging' && (
        <UitdagingMachineContext.Provider>
          <Uitdaging
            gameId={gameId}
            fragmentsToShow={sublevelQuery.data?.fragmentToShowUitdaging ?? fragmentsToShow}
            fragments={fragments}
            levelId={levelId}
            playTime={playTime}
            sublevelId={sublevelId}
            mode={modeQuery?.data}
          />
        </UitdagingMachineContext.Provider>
      )}
      {mode === 'Test' && (
        <TestModeMachineContext.Provider>
          <Test
            gameId={gameId}
            levelId={levelId}
            sublevelId={sublevelId}
            fragments={fragments}
            mode={modeQuery?.data}
            sublevelName={sublevelQuery?.data?.name}
            // fragmentsToShow={fragmentsToShow}
            // playTime={playTime}
            // fragmentGroups={fragmentGroupsQuery?.data?.fragmentGroups ?? []}
          />
        </TestModeMachineContext.Provider>
      )}
    </>
  )
}

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

  useEffect(() => {
    // if (!audioContext && env.NEXT_PUBLIC_ENABLE_AUDIO) {
    //   router.push(routePaths.sublevelSelectPage(gameId, parseInt(levelId)))
    // }
    // setIsPlaying(false)
    // return () => setIsPlaying(false)
  }, [
    sublevelQuery.data,
    fragmentsToShow,
    fragments,
    levelId,
    sublevelId,
    modeQuery.data,
    gameId,
    playTime,
    fragmentGroupsQuery.data,
  ])

  return (
    <ContentContainer
      title={sublevelQuery?.data?.name ?? 'Naam ophalen...'}
      classNameParent="border-x-4 border-b-4 border-primary rounded-b-2xl"
      shouldRenderBackButton={false}
      instrumentURL={mode !== 'Test' ? level?.instrument : undefined}
    >
      <SessionProvider>
        <div className="flex w-full">
          {gameModesOfSublevelQuery?.data
            ?.filter(
              (gameMode) =>
                gameMode.name !== 'Test' && sublevelQuery?.data?.name !== 'TEST introductie',
            )
            .map((gameMode) => (
              <Button
                key={gameMode.id}
                className={cn(
                  'h-12 min-w-0 flex-auto overflow-hidden rounded-none text-xl',
                  mode !== gameMode.name
                    ? 'bg-background text-accent-foreground hover:bg-primary/20'
                    : '',
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
                  <h2 className="text-base md:text-xl">{gameMode.name}</h2>
                </Link>
              </Button>
            ))}
        </div>
        <div className="relative flex w-full flex-col items-center justify-center gap-y-4 py-8 md:gap-y-8">
          <Modes
            mode={mode}
            levelId={levelId}
            fragmentGroupsQuery={fragmentGroupsQuery}
            fragments={fragments}
            fragmentsToShow={fragmentsToShow}
            gameId={gameId}
            sublevelQuery={sublevelQuery}
            sublevelId={sublevelId}
            modeQuery={modeQuery}
          />
          {/* {renderGameMode(mode)} */}
        </div>
      </SessionProvider>
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
