import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import BassOffSVG from '~/components/podiumvisuals/bassOff'
import BassOnSVG from '~/components/podiumvisuals/bassOn'
import CiniSVG from '~/components/podiumvisuals/cini'
import DrumsOffSVG from '~/components/podiumvisuals/drumsOff'
import DrumsOnSVG from '~/components/podiumvisuals/drumsOn'
import DwarsfluitOffSVG from '~/components/podiumvisuals/dwarsfluitOff'
import DwarsfluitOnSVG from '~/components/podiumvisuals/dwarsfluitOn'
import GitaarOffSVG from '~/components/podiumvisuals/gitaarOff'
import GitaarOnSVG from '~/components/podiumvisuals/gitaarOn'
import PianoOffSVG from '~/components/podiumvisuals/pianoOff'
import PianoOnSVG from '~/components/podiumvisuals/pianoOn'
import PodiumSVG from '~/components/podiumvisuals/podium'
import SaxOffSVG from '~/components/podiumvisuals/saxOff'
import SaxOnSVG from '~/components/podiumvisuals/saxOn'
import ZangeresOffSVG from '~/components/podiumvisuals/zangeresOff'
import ZangeresOnSVG from '~/components/podiumvisuals/zangeresOn'

import { useEffect, useRef, useState } from 'react'
import { Button } from '~/components/ui/button'
import { routePaths } from '~/config/routing'
import { useUserActivity } from '~/hooks/useUserActivity'
import { getSSRAuthRedirectLogin } from '~/utils/authUtils'
import { api } from '~/utils/api'
import { useAudioServiceStore } from '~/stores/useAudioServiceStore'
import { cn } from '~/lib/utils'

interface MuteState {
  drums: boolean
  piano: boolean
  bass: boolean
  gitaar: boolean
  sax: boolean
  zangeres: boolean
  dwarsfluit: boolean
}

const PodiumPage = () => {
  useUserActivity()
  const { audioContext } = useAudioServiceStore()

  const { data: levelPoints } = api.level.getPointsPerLevel.useQuery(undefined, {
    onSuccess: (levelPoints) => {
      if (levelPoints) {
        const newUnlockedState = { ...unlocked }
        levelPoints.forEach((level) => {
          const instrumentNameMatch = level.instrument?.match(/\/images\/instruments\/(.+)\.png/)
          if (instrumentNameMatch) {
            const instrumentKey = {
              drumstel: 'drums',
              piano: 'piano',
              contrabas: 'bass',
              gitaar: 'gitaar',
              saxofoon: 'sax',
              fluit: 'dwarsfluit',
              zangeres: 'zangeres',
              //@ts-ignore
            }[instrumentNameMatch[1]]
            if (instrumentKey && level.points && level.score >= (level.points || 0)) {
              //@ts-ignore
              newUnlockedState[instrumentKey] = true
            }
          }
        })
        setUnlocked(newUnlockedState)
      }
    },
  })

  const [isMuted, setIsMuted] = useState<MuteState>({
    drums: true,
    piano: true,
    bass: true,
    gitaar: true,
    sax: true,
    zangeres: true,
    dwarsfluit: true,
  })

  const [unlocked, setUnlocked] = useState<MuteState>({
    drums: false,
    piano: false,
    bass: false,
    gitaar: false,
    sax: false,
    zangeres: false,
    dwarsfluit: false,
  })

  const audioRefs = useRef<{ [key in keyof MuteState]?: HTMLAudioElement }>({})

  const toggleMute = (instrument: keyof MuteState) => {
    setIsMuted((prevMute) => {
      const newMuteState = !prevMute[instrument]
      const audio = audioRefs.current[instrument]
      if (audio) {
        audio.muted = newMuteState
      }
      return {
        ...prevMute,
        [instrument]: newMuteState,
      }
    })
  }

  useEffect(() => {
    // This effect plays the audio after user interaction, as indicated by a change in audioContext
    if (audioContext !== undefined) {
      audioRefs.current = {
        drums: new Audio('/media/podium/sound-drums.mp3'),
        piano: new Audio('/media/podium/sound-piano.mp3'),
        bass: new Audio('/media/podium/sound-contrabas.mp3'),
        gitaar: new Audio('/media/podium/sound-gitaar.mp3'),
        sax: new Audio('/media/podium/sound-sax.mp3'),
        zangeres: new Audio('/media/podium/sound-zang.mp3'),
        dwarsfluit: new Audio('/media/podium/sound-fluit.mp3'),
      }

      console.log('Playing audio')
      const sounds = audioRefs.current

      Object.values(sounds).forEach((sound) => {
        sound.loop = true
        sound.muted = true
      })

      Promise.all(
        Object.values(sounds).map((sound) => {
          return new Promise((resolve) => {
            sound.oncanplaythrough = resolve
          })
        }),
      ).then(() => {
        Object.values(sounds).forEach((sound) =>
          sound.play().catch((e) => console.error('Error playing sound:', e)),
        )
      })

      return () => {
        Object.values(sounds).forEach((sound) => {
          sound.pause()
          sound.currentTime = 0
        })
      }
    }
  }, [audioContext?.state])

  return (
    <>
      <Head>
        <title>Podium</title>
        <meta name="description" content="Het podium" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="relative min-h-fit items-center justify-center pt-24">
        <div className="relative  flex flex-col items-center justify-center gap-12">
          <div className="relative flex  h-fit w-full justify-center overflow-hidden rounded-t-[5%] bg-gradient-to-t from-[#55474b] from-5% to-[#746465] pt-24 ">
            <PodiumSVG className="absolute top-0 h-full w-full translate-y-[15%]" />
            <CiniSVG className="pointer-events-none absolute bottom-0 left-0  h-1/3 w-fit sm:h-1/2 " />
            <div className="relative flex w-full flex-col px-[10%]">
              <div className="flex items-center justify-center">
                {!unlocked.drums ? (
                  <DrumsOffSVG width={'auto'} height={'auto'} />
                ) : (
                  <div
                    className={cn(
                      !isMuted.drums && 'border-b-2 border-primary',
                      'relative h-full w-full',
                    )}
                  >
                    <div
                      className="absolute left-1/4 top-1/4 z-50 mx-auto h-4/5 w-1/2 hover:cursor-pointer"
                      onClick={() => toggleMute('drums')}
                    ></div>
                    <DrumsOnSVG width={'auto'} height={'auto'} />
                  </div>
                )}
                {!unlocked.piano ? (
                  <PianoOffSVG width={'auto'} height={'auto'} />
                ) : (
                  <div
                    className={cn(
                      !isMuted.piano && 'border-b-2 border-primary',
                      'relative h-full w-full',
                    )}
                  >
                    <div
                      className="absolute left-1/4 top-1/4 z-50 mx-auto h-4/5 w-1/2  hover:cursor-pointer "
                      onClick={() => toggleMute('piano')}
                    ></div>
                    <PianoOnSVG width={'auto'} height={'auto'} />
                  </div>
                )}
                {!unlocked.bass ? (
                  <BassOffSVG width={'auto'} height={'auto'} />
                ) : (
                  <div
                    className={cn(
                      !isMuted.bass && 'border-b-2 border-primary',
                      'relative h-full w-full',
                    )}
                  >
                    <div
                      className="absolute left-1/4 top-1/4 z-50 mx-auto h-4/5  w-1/2 hover:cursor-pointer "
                      onClick={() => toggleMute('bass')}
                    ></div>
                    <BassOnSVG width={'auto'} height={'auto'} />
                  </div>
                )}
                {!unlocked.gitaar ? (
                  <GitaarOffSVG width={'auto'} height={'auto'} />
                ) : (
                  <div
                    className={cn(
                      !isMuted.gitaar && 'border-b-2 border-primary',
                      'relative h-full w-full',
                    )}
                  >
                    <div
                      className="absolute left-1/4 top-1/4 z-50 mx-auto h-4/5 w-1/2  hover:cursor-pointer"
                      onClick={() => toggleMute('gitaar')}
                    ></div>
                    <GitaarOnSVG width={'auto'} height={'auto'} />
                  </div>
                )}
              </div>
              <div className="flex -translate-y-[50%] px-[12.5%]">
                {!unlocked.sax ? (
                  <SaxOffSVG width={'auto'} height={'auto'} />
                ) : (
                  <div
                    className={cn(
                      !isMuted.sax && 'border-b-2 border-primary',
                      'relative h-full w-full',
                    )}
                  >
                    <div
                      className="absolute left-1/4 top-1/4  z-50 mx-auto h-4/5 w-1/2  hover:cursor-pointer"
                      onClick={() => toggleMute('sax')}
                    ></div>
                    <SaxOnSVG width={'auto'} height={'auto'} />
                  </div>
                )}
                {!unlocked.zangeres ? (
                  <ZangeresOffSVG width={'auto'} height={'auto'} />
                ) : (
                  <div
                    className={cn(
                      !isMuted.zangeres && 'border-b-2 border-primary',
                      'relative h-full w-full',
                    )}
                  >
                    <div
                      className="absolute left-1/4 top-1/4 z-50 mx-auto h-4/5 w-1/2  hover:cursor-pointer"
                      onClick={() => toggleMute('zangeres')}
                    ></div>
                    <ZangeresOnSVG width={'auto'} height={'auto'} />
                  </div>
                )}
                {!unlocked.dwarsfluit ? (
                  <DwarsfluitOffSVG width={'auto'} height={'auto'} />
                ) : (
                  <div
                    className={cn(
                      !isMuted.dwarsfluit && 'border-b-2 border-primary',
                      'relative h-full w-full',
                    )}
                  >
                    <div
                      className="absolute left-1/4 top-1/4 z-50 mx-auto h-4/5 w-1/2  hover:cursor-pointer "
                      onClick={() => toggleMute('dwarsfluit')}
                    ></div>
                    <DwarsfluitOnSVG width={'auto'} height={'auto'} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <Button className="relative border shadow-2xl shadow-primary-foreground" asChild>
            <Link href={routePaths.levelsPage}>Kies je level</Link>
          </Button>
        </div>
      </section>
    </>
  )
}

export default PodiumPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const auth = await getSSRAuthRedirectLogin(ctx)

  if (auth.redirect) {
    return { redirect: auth.redirect }
  }

  return {
    props: {
      session: auth.props.session,
    },
  }
}
