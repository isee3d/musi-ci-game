import { GetServerSidePropsContext, InferGetServerSidePropsType, type NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '~/components/ui/button'
import { useUserActivity } from '~/hooks/useUserActivity'
import { getSSRAuth } from '~/utils/authUtils'
import { useSession } from 'next-auth/react'

const WelcomePage = () => {
  const { data: session } = useSession()
  useUserActivity(session)
  console.log(session)
  const getNextPageRoute = (): string => {
    if (!session?.user.id) {
      return '/login'
    }
    if (session?.user.preferSkipTutorial) {
      return '/podium'
    }
    return '/tutorial'
  }

  return (
    <>
      <Head>
        <title>Welkom Musi-CI</title>
        <meta name="description" content="welkom bij Musi CI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className=" flex grow flex-col items-center justify-center bg-cover bg-no-repeat">
        <Image src="/images/piano_img.jpg" fill className="-z-10" alt="Logo" priority />
        <div className="container mx-auto flex min-h-[50vh] w-5/6 flex-col items-center justify-center space-y-8 rounded-xl bg-background/80 backdrop-blur-md md:w-1/2">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">Welkom</h1>
          <p className=" max-w-xl  text-center leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Help Cinie haar orkest te redden door de muzieknoten te herkennen
          </p>
          <Button size={'lg'} asChild>
            <Link href={getNextPageRoute()}>
              <h2 className="text-xl">Aan de slag</h2>
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}

export default WelcomePage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return await getSSRAuth(ctx)
}
