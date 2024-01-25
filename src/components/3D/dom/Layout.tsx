// 'use client'

import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { ReactNode, useEffect, useRef, useState } from 'react'
import Footer from '~/components/footer'
import { MainNav } from '~/components/mainNav'
import { NavItem } from '~/components/mobileNav'
import { UserAccountNav } from '~/components/userAccountNav'
import { navItemsPlayer, navItemsResearcher, navitemsTemplate } from '~/config/navigation'
const Scene = dynamic(() => import('~/components/3D/canvas/Scene'), { ssr: false })

type LayoutProps = {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // const [mainNavItems, setMainNavItems] = useState<NavItem[]>(navitemsTemplate)
  const { data: session } = useSession()
  const ref = useRef(null)

  // useEffect(() => {
  //   if (session?.user?.role === 'ADMIN') {
  //     setMainNavItems(navitemsTemplate)
  //   } else if (session?.user?.role === 'RESEARCHER') {
  //     setMainNavItems(navItemsResearcher)
  //   } else {
  //     setMainNavItems([])
  //   }
  // }, [session])

  return (
    <div ref={ref} className="relative h-full w-full overflow-auto" style={{ touchAction: 'auto' }}>
      <div className=" flex min-h-screen flex-col overflow-y-hidden">
        <header className="container z-40 rounded-b-xl  backdrop-blur-md">
          <div className="flex h-20 items-center justify-between py-6">
            <MainNav items={navItemsPlayer} />
            <UserAccountNav userName={session?.user.name ?? ''} />
            {/* <nav className="flex gap-1">
              <Button
                onClick={session ? () => void handleSignOut() : () => void signIn()}
                className={cn(buttonVariants({ variant: 'secondary' }), 'px-2')}
              >
                {session ? 'Uitloggen' : 'Inloggen'}
              </Button>
              {session?.user && (
                <Button
                  onClick={() => {
                    setTutorialPreference({
                      id: session.user.id,
                      preferSkipTutorial: false,
                    })
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
            </nav> */}
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
