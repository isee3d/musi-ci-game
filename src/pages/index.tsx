import { GetServerSidePropsContext } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { api } from '~/utils/api'
import { getSSRAuth } from '~/utils/authUtils'

const WelcomePage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const tutorialMutation = api.user.setUserTutorialPreference.useMutation()

  async function setTutorialPreference({
    id,
    preferSkipTutorial,
  }: {
    id: string
    preferSkipTutorial: boolean
  }) {
    if (session?.user.id) {
      await tutorialMutation.mutateAsync({ id, preferSkipTutorial })
    }
    router.push('/tutorial')
  }

  const getNextPageRoute = () => {
    if (!session?.user.id) {
      return '/login'
    }
    return '/progress/1'
  }

  return (
    <>
      <Head>
        <title>Welkom Musi-CI</title>
        <meta name="description" content="welkom bij Musi CI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="relative flex grow flex-col items-center justify-center bg-cover bg-no-repeat">
        <Image src="/images/podium.webp" fill className="" alt="podium" priority />
        <div className="container mx-auto flex p-28 flex-col items-center justify-center gap-y-8 rounded-xl bg-background/50 backdrop-blur-md md:w-1/2">
          <h1 className="font-heading text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            WELKOM bij de Musi-CI Melody Game
          </h1>
          <h2>Verzamel muzikanten voor het orkest van Cinie.</h2>
          <div className="flex gap-x-4">
            <Button size={'lg'} asChild>
              <Link href={getNextPageRoute()}>
                <h2 className="text-xl">Neem een kijkje</h2>
              </Link>
            </Button>
            <Button
              variant="outline"
              size={'lg'}
              onClick={() => {
                setTutorialPreference({
                  id: session?.user.id ?? '',
                  preferSkipTutorial: false,
                })
              }}
            >
              <h2 className="text-xl">Bekijk uitleg</h2>
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
