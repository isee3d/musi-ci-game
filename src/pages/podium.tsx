import { type NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { useRequireAuth } from '~/hooks/useRequireAuth'

const PodiumPage: NextPage = () => {
  useRequireAuth()

  return (
    <>
      <Head>
        <title>Welkom Musi-CI</title>
        <meta name="description" content="Voortgang levels" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="relative flex grow flex-col items-center justify-center bg-cover bg-no-repeat">
        <div className="container mx-auto flex flex-col items-center justify-center space-y-8 ">
          <h2 className="text-5xl tracking-tight sm:text-[5rem] ">Podium</h2>
          <h2 className="text-xl">Hier komt het podium</h2>
          <Button asChild>
            {/* Previously /progress/games for the games page */}
            <Link href="/progress/1">
              <h3>Door naar levels pagina</h3>
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}

export default PodiumPage
