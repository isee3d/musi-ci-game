// 'use client'

import { signIn, useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { ReactNode, useRef } from 'react'
import { MainNav } from '~/components/mainNav'
import { SiteFooter } from '~/components/siteFooter'
import { Button } from '~/components/ui/button'
import { UserAccountNav } from '~/components/userAccountNav'
import { navItemsPlayer } from '~/config/navigation'

const Scene = dynamic(() => import('~/components/3D/canvas/Scene'), { ssr: false })

type LayoutProps = {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession()
  const ref = useRef(null)

  return (
    <div ref={ref} className="relative h-full w-full overflow-auto" style={{ touchAction: 'auto' }}>
      <div className=" flex min-h-screen flex-col overflow-y-hidden">
        <header className="container z-40 rounded-b-xl  backdrop-blur-md">
          <div className="flex h-20 items-center justify-between py-6">
            <MainNav items={navItemsPlayer} />
            {session?.user.id ? (
              <UserAccountNav userName={session?.user.name ?? ''} />
            ) : (
              <Button onClick={() => signIn()}>Inloggen</Button>
            )}
          </div>
        </header>

        {children}
        <SiteFooter />
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

