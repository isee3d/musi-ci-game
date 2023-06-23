// 'use client'

import { ReactNode, useRef } from 'react'
import dynamic from 'next/dynamic'
import NavMenu from '~/components/navbar'
import Footer from '~/components/footer'
import Link from 'next/link'
import { cn } from '~/lib/utils'
import { buttonVariants } from '~/components/ui/button'
import { MainNav } from '~/components/mainNav'
import { NavItem } from '~/components/mobileNav'
const Scene = dynamic(() => import('~/components/3D/canvas/Scene'), { ssr: false })

type LayoutProps = {
  children: ReactNode
}

const mainNavItems: NavItem[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About',
    href: '/about',
  },
]

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const ref = useRef(null)

  return (
    <div ref={ref} className="relative h-full w-full overflow-auto" style={{ touchAction: 'auto' }}>
      <div className=" flex min-h-screen flex-col overflow-y-hidden">
        <header className="container z-40 rounded-b-xl bg-background/60 backdrop-blur-md">
          <div className="flex h-20 items-center justify-between py-6">
            <MainNav items={mainNavItems} />
            <nav>
              <Link
                href="/login"
                className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'px-4')}
              >
                Login
              </Link>
            </nav>
          </div>
        </header>

        {/* <NavMenu /> */}
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
