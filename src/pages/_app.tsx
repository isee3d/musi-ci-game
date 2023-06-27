import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import { inspect } from '@xstate/inspect'
import { Inter as FontSans } from 'next/font/google'
import localFont from 'next/font/local'

import { api } from '~/utils/api'

import Head from 'next/head'

import '~/styles/globals.css'
import { useEffect, useState } from 'react'
import { Layout } from '~/components/3D/dom/Layout'
import { TailwindIndicator } from '~/components/tailwindIndicator'
import InitializeSoundModal from '~/components/initializeSoundModal'
import { useAudioServiceStore } from '~/stores/useAudioServiceStore'
import { env } from '~/env.mjs'
import SetTeamIdAndParticipantIdModal from '~/components/setTeamIdAndParticipantIdModal'
import { cn } from '~/lib/utils'
import { ThemeProvider } from '~/components/themeProvider'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [showModal, setShowModal] = useState(true)
  const { init: initAudio } = useAudioServiceStore.getState()

  useEffect(() => {
    if (env.NEXT_PUBLIC_ENABLE_AUDIO === 'true') {
      initAudio()
    }
    if (env.NEXT_PUBLIC_XSTATE_DEV_TOOLS === 'false') return
    if (typeof window !== 'undefined' && env.NODE_ENV === 'development') {
      inspect({
        url: 'https://statecharts.io/inspect', // (default)
        iframe: false,
      })
    }
  }, [])

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Musi CI</title>
        <meta name="description" content="The Musi CI web game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={cn(
          'min-h-screen font-sans antialiased',
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Layout>
            {showModal && <InitializeSoundModal showModal={showModal} setmodal={setShowModal} />}
            <SetTeamIdAndParticipantIdModal />
            <TailwindIndicator />
            <Toaster position="bottom-center" />

            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </main>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
