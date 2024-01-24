import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { useUserActivity } from '~/hooks/useUserActivity'
import { getSSRAuthRedirectLogin } from '~/utils/authUtils'

const PodiumPage = () => {
  useUserActivity()

  return (
    <>
      <Head>
        <title>Welkom Musi-CI</title>
        <meta name="description" content="Voortgang levels" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="relative flex grow flex-col items-center justify-center bg-cover bg-no-repeat">
        <div className="container mx-auto flex flex-col items-center justify-center gap-4">
          <h2 className="text-5xl tracking-tight sm:text-[5rem] ">Het podium</h2>
          <div className="relative flex h-[20vh] w-[50vw] flex-col justify-center lg:h-[50vh]">
            <Image
              src="/images/podium.webp"
              fill
              objectFit="contain"
              className="-z-20"
              alt="Podium"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <Button className="z-20 " asChild>
            {/* Previously /progress/games for the games page */}
            <Link href="/progress/1">
              <h3>Kies je level</h3>
            </Link>
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
    }
  }
}
