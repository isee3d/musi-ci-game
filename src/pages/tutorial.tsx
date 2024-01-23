import { CheckedState } from '@radix-ui/react-checkbox'
import { GetServerSidePropsContext } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'
import { getServerAuthSession } from '~/server/auth'
import { api } from '~/utils/api'
import Image from 'next/image'

const TutorialPage = () => {
  const { data: session } = useSession()
  const { data: user } = api.user.getUserById.useQuery({ id: session?.user.id ?? '' })
  const { mutate: setTutorialPreference } = api.user.setUserTutorialPreference.useMutation()

  const getNextPageRoute = () => {
    if (!session?.user.id) {
      return '/login'
    }
    return '/podium'
  }

  return (
    <>
      <Head>
        <title>Tutorial</title>
        <meta name="description" content="Voortgang levels" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className=" relative flex grow flex-col items-center justify-center bg-cover bg-no-repeat">
        <Image src="/images/podium.webp" fill className="-z-10" alt="Logo" />
        <div className="container mx-auto flex min-h-[50vh] w-5/6 flex-col items-center justify-center space-y-8 rounded-xl bg-background/50 backdrop-blur-md md:w-1/2">
          <div className="container mx-auto flex flex-col items-center justify-center space-y-8">
            <h2 className="text-3xl">Uitleg. Cinie laat de Melody Game zien</h2>
            <h2>
              Cinie is een dirigent zonder band. Help haar! Speel het spel en verdien de
              instrumenten!
            </h2>
            {session?.user.id && (
              <div className="flex gap-2">
                <Checkbox
                  defaultChecked={user?.preferSkipTutorial ?? false}
                  onCheckedChange={(checked: CheckedState) => {
                    setTutorialPreference({
                      id: session?.user?.id ?? '',
                      preferSkipTutorial: checked as boolean,
                    })
                  }}
                  id="preferSkipTutorial"
                />
                <Label htmlFor="preferSkipTutorial">Ik wil de tutorial altijd overslaan</Label>
              </div>
            )}
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
  const session = await getServerAuthSession(ctx)
  // if (!session?.user.id) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: true,
  //     },
  //   }
  // }

  if (session && session.user.preferSkipTutorial) {
    return {
      redirect: {
        destination: '/podium',
        permanent: true,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
