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
import Image from 'next/image'

import { useEffect, useRef, useState } from 'react'
import { Button } from '~/components/ui/button'
import { routePaths } from '~/config/routing'
import { useUserActivity } from '~/hooks/useUserActivity'
import { getSSRAuthRedirectLogin } from '~/utils/authUtils'
import { api } from '~/utils/api'
import { useAudioServiceStore } from '~/stores/useAudioServiceStore'
import { imagesConfig } from '~/config/site'

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
         drums: new Audio('/media/sampler/Salamander/A0.mp3'),
         piano: new Audio('/media/sampler/Salamander/C4.mp3'),
         bass: new Audio('/media/sampler/Salamander/Ds4.mp3'),
         gitaar: new Audio('/media/sampler/Salamander/Fs2.mp3'),
         sax: new Audio('/media/sampler/Salamander/Fs5.mp3'),
         zangeres: new Audio('/media/sampler/Salamander/C8.mp3'),
         dwarsfluit: new Audio('/media/sampler/Salamander/C5.mp3'),
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

      <section className="relative  h-screen  items-center justify-center pt-24">
        {/* <PodiumSVG className="absolute top-0" width={'auto'} height={'100%'} />
        <CiniSVG
          className="absolute bottom-0 z-50 h-96 w-fit pb-36"
          width={'auto'}
          height={'auto'}
        /> */}
        <div className="relative  flex flex-col items-center justify-center gap-4">
          <div className="relative flex h-[50vh] w-[50vw] flex-col justify-center lg:h-[50vh]">
            <Image
              layout="fill"
              src={imagesConfig.podium}
              objectFit="fill"
              alt="Podium"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* <div className="relative z-10 flex flex-col ">
              <div className="flex h-5/6 w-full items-center justify-center">
                {!unlocked.drums ? (
                  <DrumsOffSVG width={'auto'} height={'auto'} />
                ) : (
                  <DrumsOnSVG
                    className="hover:cursor-pointer"
                    onClick={() => toggleMute('drums')}
                    width={'auto'}
                    height={'auto'}
                  />
                )}
                {!unlocked.piano ? (
                  <PianoOffSVG width={'auto'} height={'auto'} />
                ) : (
                  <PianoOnSVG
                    className="hover:cursor-pointer"
                    onClick={() => toggleMute('piano')}
                    width={'auto'}
                    height={'auto'}
                  />
                )}
                {!unlocked.bass ? (
                  <BassOffSVG width={'auto'} height={'auto'} />
                ) : (
                  <BassOnSVG
                    className="hover:cursor-pointer"
                    onClick={() => toggleMute('bass')}
                    width={'auto'}
                    height={'auto'}
                  />
                )}
                {!unlocked.gitaar ? (
                  <GitaarOffSVG width={'auto'} height={'auto'} />
                ) : (
                  <GitaarOnSVG
                    className="hover:cursor-pointer"
                    onClick={() => toggleMute('gitaar')}
                    width={'auto'}
                    height={'auto'}
                  />
                )}
              </div>
              <div className="flex h-5/6 w-full">
                {!unlocked.sax ? (
                  <SaxOffSVG width={'auto'} height={'auto'} />
                ) : (
                  <SaxOnSVG
                    className="hover:cursor-pointer"
                    onClick={() => toggleMute('sax')}
                    width={'auto'}
                    height={'auto'}
                  />
                )}
                {!unlocked.zangeres ? (
                  <ZangeresOffSVG width={'auto'} height={'auto'} />
                ) : (
                  <ZangeresOnSVG
                    className="hover:cursor-pointer"
                    onClick={() => toggleMute('zangeres')}
                    width={'auto'}
                    height={'auto'}
                  />
                )}
                {!unlocked.dwarsfluit ? (
                  <DwarsfluitOffSVG width={'auto'} height={'auto'} />
                ) : (
                  <DwarsfluitOnSVG
                    className="hover:cursor-pointer"
                    onClick={() => toggleMute('dwarsfluit')}
                    width={'auto'}
                    height={'auto'}
                  />
                )}
              </div>
            </div> */}
          </div>
          <Button className="z-50 my-4" asChild>
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
