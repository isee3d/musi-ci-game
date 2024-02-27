import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/legacy/image'
import Link from 'next/link'
import PodiumSVG from '~/components/podiumvisuals/podium'
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
import SaxOffSVG from '~/components/podiumvisuals/saxOff'
import SaxOnSVG from '~/components/podiumvisuals/saxOn'
import ZangeresOffSVG from '~/components/podiumvisuals/zangeresOff'
import ZangeresOnSVG from '~/components/podiumvisuals/zangeresOn'

import { Button } from '~/components/ui/button'
import { routePaths } from '~/config/routing'
import { imagesConfig } from '~/config/site'
import { useUserActivity } from '~/hooks/useUserActivity'
import { getSSRAuthRedirectLogin } from '~/utils/authUtils'

const PodiumPage = () => {
  useUserActivity()

  /*
  ToDo:
  - Add podium logic for enabling the people based on points per level
      - Make a trpc router for that that returns that
  - Position the people on the podium
  - Add button to play sound, although start the separate instruments in the background in a useEffect
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
              className="absolute z-50 h-96 w-fit bottom-0 pb-36"
              width={'auto'}
              height={'auto'}
            />
        <div className="relative  flex flex-col items-center justify-center gap-4">
          <div className="relative flex h-fit w-full justify-center px-12">
            <div className="relative z-10 flex flex-col ">
              <div className="flex h-5/6 w-full items-center justify-center">
                <DrumsOnSVG width={'auto'} height={'auto'} />
                <PianoOnSVG width={'auto'} height={'auto'} />
                <BassOnSVG width={'auto'} height={'auto'} />
                <GitaarOnSVG width={'auto'} height={'auto'} />
              </div>

              <div className="flex h-5/6 w-full">
                <SaxOnSVG width={'auto'} height={'auto'} />
                <ZangeresOnSVG width={'auto'} height={'auto'} />
                <DwarsfluitOnSVG width={'auto'} height={'auto'} />
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
