import { GetServerSidePropsContext } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from "next/legacy/image"
import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { routePaths } from '~/config/routing'
import { getSSRAuth } from '~/utils/authUtils'

const TutorialPage = () => {
  const { data: session } = useSession()
  const getNextPageRoute = () => (session?.user.id ? routePaths.levelsPage : routePaths.login)

  return (
    <>
      <Head>
        <title>Uitleg</title>
        <meta name="description" content="Voortgang levels" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className=" relative flex grow flex-col items-center justify-center bg-cover bg-no-repeat">
        <div className="container mx-auto flex min-h-[50vh] w-5/6 flex-col items-center justify-center space-y-8 rounded-xl bg-background/50 backdrop-blur-md md:w-1/2">
          <div className="container mx-auto flex flex-col items-center justify-center space-y-8">
            <h2 className="text-3xl">Uitleg. Cinie laat de Melody Game zien</h2>
            <h2>
              Cinie is een dirigent zonder band. Help haar! Speel het spel en verdien de
              instrumenten!
            </h2>
            <Button size={'lg'} asChild>
              <Link href={getNextPageRoute()}>
                <h3 className="text-xl">Ga door</h3>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default TutorialPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return await getSSRAuth(ctx)
}
