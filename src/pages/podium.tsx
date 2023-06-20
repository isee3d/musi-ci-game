import { type NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Button } from '~/components/ui/button'

const PodiumPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Welkom Musi-CI</title>
        <meta name="description" content="Voortgang levels" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="relative flex grow flex-col items-center justify-center bg-cover bg-no-repeat">
        <div className="container mx-auto flex flex-col items-center justify-center space-y-8 ">
          <h2 className="text-5xl  sm:text-[5rem]  tracking-tight ">Podium</h2>
          <h2 className="text-xl">Hier komt het podium</h2>
          <Button asChild>
            <Link href="/progress/games">
              <h3>Door naar game pagina</h3>
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}

export default PodiumPage
