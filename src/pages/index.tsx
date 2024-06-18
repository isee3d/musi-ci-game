import { GetServerSidePropsContext } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { routePaths } from '~/config/routing'
import { imagesConfig } from '~/config/site'
import { cn } from '~/lib/utils'
import { getSSRAuth } from '~/utils/authUtils'

const WelcomePage = () => {
  const { data: session } = useSession()
  const getNextPageRoute = () => (session?.user.id ? routePaths.levelsPage : routePaths.login)

  return (
    <>
      <Head>
        <title>Musi CI melody Game</title>
        <meta name="description" content="welkom bij Musi CI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="relative flex grow flex-col items-center justify-center bg-cover bg-no-repeat">
        <Image
          src={imagesConfig.podium}
          objectFit="cover"
          layout="fill"
          className=""
          alt="podium"
          quality={30}
          priority
        />
        <div className="container mx-auto my-28 flex w-4/5 flex-col items-center justify-center gap-y-10 rounded-xl bg-background/50 p-8 backdrop-blur-md md:my-0 md:p-48">
          <div className="flex flex-col gap-4">
            <h1 className="text-center text-3xl font-extrabold md:text-5xl">
              WELKOM bij de Musi-CI Melody Game
            </h1>
            <h2 className="text-center text-xl font-bold">
              Verzamel muzikanten voor het orkest van Cinie.
            </h2>
          </div>
          <div className="flex gap-x-4">
            <Button className={cn('px-2 sm:px-8')} size={'lg'} asChild>
              <Link href={getNextPageRoute()}>
                <h2 className="text-center text-xs md:min-w-20 md:text-base">Log in</h2>
              </Link>
            </Button>
            <Button className={cn('px-2 sm:px-8')} asChild variant="outline" size={'lg'}>
              <Link href={routePaths.tutorial}>
                <h2 className="text-center text-xs md:min-w-20 md:text-base">Bekijk uitleg</h2>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default WelcomePage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return await getSSRAuth(ctx)
}
