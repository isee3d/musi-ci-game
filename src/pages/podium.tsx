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

  const [isMuted, setIsMuted] = useState<MuteState>({
    drums: true,
    piano: true,
    bass: true,
    gitaar: true,
    sax: true,
    zangeres: true,
    dwarsfluit: true,
  })

  const audioRefs = useRef<{
    [key in keyof MuteState]: HTMLAudioElement
  }>({
    drums: new Audio('/media/sampler/Salamander/A0.mp3'),
    piano: new Audio('/media/sampler/Salamander/C4.mp3'),
    bass: new Audio('/media/sampler/Salamander/Ds4.mp3'),
    gitaar: new Audio('/media/sampler/Salamander/Fs2.mp3'),
    sax: new Audio('/media/sampler/Salamander/Fs5.mp3'),
    zangeres: new Audio('/media/sampler/Salamander/C8.mp3'),
    dwarsfluit: new Audio('/media/sampler/Salamander/C5.mp3'),
  })

  const toggleMute = (instrument: keyof MuteState) => {
    setIsMuted((prevMute) => {
      const newMuteState = !prevMute[instrument]
      // Toggle the muted state of the audio element
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
      Object.values(sounds).forEach((sound) => sound.play())
    })

    return () => {
      Object.values(sounds).forEach((sound) => {
        sound.pause()
        sound.currentTime = 0
      })
    }
  }, [])

  /*
  ToDo:
  - Add podium logic for enabling the people based on points per level
      - Make a trpc router for that that returns that
  - Position the people on the podium                                                                         CHECK
  - Add button to play sound, although start the separate instruments in the background in a useEffect        CHECK
  - Toggle sounds and visuals for the people on the podium                                                    CHECK
  */

  return (
    <>
      <Head>
        <title>Podium</title>
        <meta name="description" content="Het podium" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="relative items-center justify-center bg-[#756563] pt-24">
        <PodiumSVG className="absolute top-0" width={'auto'} height={'100%'} />
        <CiniSVG
          className="absolute bottom-0 z-50 h-96 w-fit pb-36"
          width={'auto'}
          height={'auto'}
        />
        <div className="relative  flex flex-col items-center justify-center gap-4">
          <div className="relative flex h-fit w-full justify-center px-12">
            <div className="relative z-10 flex flex-col ">
              <div className="flex h-5/6 w-full items-center justify-center">
                {isMuted.drums ? (
                  <DrumsOffSVG onClick={() => toggleMute('drums')} width={'auto'} height={'auto'} />
                ) : (
                  <DrumsOnSVG onClick={() => toggleMute('drums')} width={'auto'} height={'auto'} />
                )}
                {isMuted.piano ? (
                  <PianoOffSVG onClick={() => toggleMute('piano')} width={'auto'} height={'auto'} />
                ) : (
                  <PianoOnSVG onClick={() => toggleMute('piano')} width={'auto'} height={'auto'} />
                )}
                {isMuted.bass ? (
                  <BassOffSVG onClick={() => toggleMute('bass')} width={'auto'} height={'auto'} />
                ) : (
                  <BassOnSVG onClick={() => toggleMute('bass')} width={'auto'} height={'auto'} />
                )}
                {isMuted.gitaar ? (
                  <GitaarOffSVG
                    onClick={() => toggleMute('gitaar')}
                    width={'auto'}
                    height={'auto'}
                  />
                ) : (
                  <GitaarOnSVG
                    onClick={() => toggleMute('gitaar')}
                    width={'auto'}
                    height={'auto'}
                  />
                )}
              </div>
              <div className="flex h-5/6 w-full">
                {isMuted.sax ? (
                  <SaxOffSVG onClick={() => toggleMute('sax')} width={'auto'} height={'auto'} />
                ) : (
                  <SaxOnSVG onClick={() => toggleMute('sax')} width={'auto'} height={'auto'} />
                )}
                {isMuted.zangeres ? (
                  <ZangeresOffSVG
                    onClick={() => toggleMute('zangeres')}
                    width={'auto'}
                    height={'auto'}
                  />
                ) : (
                  <ZangeresOnSVG
                    onClick={() => toggleMute('zangeres')}
                    width={'auto'}
                    height={'auto'}
                  />
                )}
                {isMuted.dwarsfluit ? (
                  <DwarsfluitOffSVG
                    onClick={() => toggleMute('dwarsfluit')}
                    width={'auto'}
                    height={'auto'}
                  />
                ) : (
                  <DwarsfluitOnSVG
                    onClick={() => toggleMute('dwarsfluit')}
                    width={'auto'}
                    height={'auto'}
                  />
                )}
              </div>
            </div>
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
