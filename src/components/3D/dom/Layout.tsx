// 'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Footer from '~/components/footer'
import { testSound } from '~/components/fragmentPlayer/audio/AudioControls'
import { cn } from '~/lib/utils'
import { Button, buttonVariants } from '~/components/ui/button'
import { MainNav } from '~/components/mainNav'
import { NavItem } from '~/components/mobileNav'
import { ModeToggle } from '~/components/modeToggle'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Icons } from '~/components/icons'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'
const Scene = dynamic(() => import('~/components/3D/canvas/Scene'), { ssr: false })

type LayoutProps = {
  children: ReactNode
}

const navitemsTemplate: NavItem[] = [
  {
    title: 'Levels beheren',
    href: '/manage/levels',
  },
  {
    title: 'Sublevels beheren',
    href: '/manage/sublevels',
  },
  {
    title: 'Fragmenten beheren',
    href: '/manage/fragments',
  },
  {
    title: 'Spelers beheren',
    href: '/manage/users',
  },
  {
    title: 'Team beheren',
    href: '/manage/team',
  },
  {
    title: 'App instellingen',
    href: '/manage/appSettings',
  },
  {
    title: 'download data',
    href: '/download'
  },
  {
    title: 'Vragen',
    href: '/manage/questions',
  },
  {
    title: 'Fragment Groepen',
    href: '/manage/fragmentGroup',
  }
]

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mainNavItems, setMainNavItems] = useState<NavItem[]>(navitemsTemplate)
  const { data: sessionData } = useSession()
  const router = useRouter()
  const ref = useRef(null)

  const { mutate: setTutorialPreference } = api.user.setUserTutorialPreference.useMutation()

  useEffect(() => {
    if (sessionData?.user?.role === 'ADMIN') {
      setMainNavItems(navitemsTemplate)
    } else {
      setMainNavItems([])
    }
  }, [sessionData])

  async function runTestSound() {
    await testSound()
  }

  return (
    <div ref={ref} className="relative h-full w-full overflow-auto" style={{ touchAction: 'auto' }}>
      <div className=" flex min-h-screen flex-col overflow-y-hidden">
        <header className="container z-40 rounded-b-xl bg-background/60 backdrop-blur-md">
          <div className="flex h-20 items-center justify-between py-6">
            <MainNav items={mainNavItems} />
            <nav className="flex gap-1">
              <Button
                onClick={sessionData ? () => void signOut() : async () => await signIn()}
                className={cn(buttonVariants({ variant: 'secondary' }), 'px-2')}
              >
                {sessionData ? 'Uitloggen' : 'Inloggen'}
              </Button>
              {sessionData?.user && (
                <Button
                  onClick={() => {
                    setTutorialPreference({
                      id: sessionData.user.id,
                      preferSkipTutorial: false,
                    })
                    router.push('/tutorial')
                  }}
                  className={cn(buttonVariants({ variant: 'secondary' }), 'px-2')}
                >
                  Tutorial
                </Button>
              )}
              <Button
                onClick={() => runTestSound()}
                className={cn(buttonVariants({ variant: 'ghost' }))}
              >
                <Icons.music />
              </Button>
              <ModeToggle />
            </nav>
          </div>
        </header>

        {children}
        <Footer />
        <Scene
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
          }}
          eventSource={ref}
          eventPrefix="client"
        />
      </div>
    </div>
  )
}

export { Layout }
