import { CheckedState } from '@radix-ui/react-checkbox'
import { type NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'
import { useRequireAuth } from '~/hooks/useRequireAuth'
import { api } from '~/utils/api'
import { useEffect } from 'react'

const TutorialPage: NextPage = () => {
  const session = useRequireAuth()
  const router = useRouter()

  const { mutate: setTutorialPreference } = api.user.setUserTutorialPreference.useMutation()
  const { data: user } = api.user.getUserById.useQuery({ id: session?.user.id ?? '' })

  useEffect(() => {
    if (user?.preferSkipTutorial) {
      router.push('/podium')
    }
  }, [user])

  return (
    <>
      <Head>
        <title>Tutorial</title>
        <meta name="description" content="Voortgang levels" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className=" relative flex grow flex-col items-center justify-center bg-cover bg-no-repeat">
        <div className="container mx-auto flex flex-col items-center justify-center space-y-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] ">Tutorial</h1>
          <h3 className="text-7xl font-extrabold">Hier cinie uitleg</h3>
          <div className="flex gap-2">
            <Checkbox
              defaultChecked={user?.preferSkipTutorial ?? false}
              onCheckedChange={(checked: CheckedState) => {
                setTutorialPreference({
                  id: session?.user.id ?? '',
                  preferSkipTutorial: checked as boolean,
                })
              }}
              id="preferSkipTutorial"
            />
            <Label htmlFor="preferSkipTutorial">Ik wil de tutorial overslaan</Label>
          </div>
          <Button size={'lg'} asChild>
            <Link href="/podium">
              <h3>Ga door naar podium</h3>
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}

export default TutorialPage
