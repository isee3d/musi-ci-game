// 'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ReactNode, useRef } from 'react'
import { MainNav } from '~/components/mainNav'
import { SiteFooter } from '~/components/siteFooter'
import { Button } from '~/components/ui/button'
import { navItemsPlayer } from '~/config/navigation'
import { useUserActivity } from '~/hooks/useUserActivity'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'

const Scene = dynamic(() => import('~/components/3D/canvas/Scene'), { ssr: false })

type LayoutProps = {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession()
  const ref = useRef(null)
  const router = useRouter()
  const { isPlaying } = useLuisterenStore()
  const { logSignOutActivity } = useUserActivity()

  async function handleSignOut() {
    await logSignOutActivity()
    const signOutResponse = await signOut({ redirect: false, callbackUrl: '/login' })
    if (signOutResponse?.url) {
      router.push(signOutResponse.url)
    }
  }

  return (
    <div ref={ref} className="relative h-full w-full overflow-auto" style={{ touchAction: 'auto' }}>
      <div className=" flex min-h-screen flex-col overflow-y-hidden">
        <header className="container z-40 rounded-b-xl  backdrop-blur-md">
          <div className="flex h-20 items-center justify-between py-6">
            <MainNav items={navItemsPlayer} />
            {session?.user.id ? (
              <Button
                disabled={isPlaying}
                className="cursor-pointer bg-purple-500 text-white"
                onClick={(event) => {
                  event.preventDefault()
                  if (session) {
                    handleSignOut()
                  } else {
                    signIn()
                  }
                }}
              >
                {session ? 'Uitloggen' : 'Inloggen'}
              </Button>
            ) : (
              // <UserAccountNav userName={session?.user.name ?? ''} />
              <Button className="cursor-pointer bg-purple-500 text-white" onClick={() => signIn()}>
                Inloggen
              </Button>
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

