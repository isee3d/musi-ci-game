import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/legacy/image'
import Link from 'next/link'
import PodiumSVG from '~/components/podiumvisuals/podium'
import BassOffSVG from "~/components/podiumvisuals/bassOff";
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
import saxOnSVG from '~/components/podiumvisuals/saxOn'
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

      <section className="relative flex grow flex-col items-center justify-center bg-cover bg-no-repeat">
        <div className="container mx-auto flex flex-col items-center justify-center gap-4">
          <h2 className="text-5xl tracking-tight sm:text-[5rem] ">Het podium</h2>
          <div className="relative flex h-[20vh] w-[50vw] flex-col justify-center lg:h-[50vh]">
            <PodiumSVG />
            {/* <Image
              layout="fill"
              src={imagesConfig.podium}
              objectFit="fill"
              alt="Podium"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            /> */}
          </div>
          <Button asChild>
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
