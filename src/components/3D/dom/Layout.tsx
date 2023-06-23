// 'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Footer from '~/components/footer'
import Link from 'next/link'
import { cn } from '~/lib/utils'
import { buttonVariants } from '~/components/ui/button'
import { MainNav } from '~/components/mainNav'
import { NavItem } from '~/components/mobileNav'
import { ModeToggle } from '~/components/modeToggle'
import { useSession } from 'next-auth/react'
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
    href: '/manage/teams',
  },
]

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mainNavItems, setMainNavItems] = useState<NavItem[]>(navitemsTemplate)
  const { data: sessionData } = useSession()

useEffect(() => {
  if (sessionData?.user?.role === 'ADMIN') {
    setMainNavItems(navitemsTemplate)
  } else {
    setMainNavItems([])
  }
}, [sessionData])


  const ref = useRef(null)


  return (
    <div ref={ref} className="relative h-full w-full overflow-auto" style={{ touchAction: 'auto' }}>
      <div className=" flex min-h-screen flex-col overflow-y-hidden">
        <header className="container z-40 rounded-b-xl bg-background/60 backdrop-blur-md">
          <div className="flex h-20 items-center justify-between py-6">
            <MainNav items={mainNavItems} />
            <nav className="flex gap-2">
              <Link href="/login" className={cn(buttonVariants({ variant: 'secondary' }), 'px-4')}>
                Login
              </Link>
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
