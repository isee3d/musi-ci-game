import { inspect } from '@xstate/inspect'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'
import { Inter as FontSans, Poppins } from 'next/font/google'
import localFont from 'next/font/local'
import { Toaster } from 'react-hot-toast'

import { api } from '~/utils/api'
import NextNProgress from 'nextjs-progressbar'
import Head from 'next/head'

import { useEffect, useState } from 'react'
import { Layout } from '~/components/3D/dom/Layout'
import InitializeSoundModal from '~/components/initializeSoundModal'
import { TailwindIndicator } from '~/components/tailwindIndicator'
import { ThemeProvider } from '~/components/themeProvider'
import { env } from '~/env.mjs'
import { cn } from '~/lib/utils'
import '~/styles/globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-poppins',
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
  // const { init: initAudio } = useAudioServiceStore.getState()
  // const router = useRouter()

  useEffect(() => {
    // if (env.NEXT_PUBLIC_ENABLE_AUDIO === 'true') {
    //   initAudio()
    // }
    if (env.NEXT_PUBLIC_XSTATE_DEV_TOOLS === 'false') return

    if (typeof window !== 'undefined' && env.NEXT_PUBLIC_NODE_ENV === 'development') {
      inspect({
        url: 'https://statecharts.io/inspect', // (default)
        iframe: false,
      })
    }

    // const initializeSilentAudio = () => {
    //   console.log('in trigger mode')
    //   if (router.pathname.includes('Luisteren')) {
    //     setShowModal(true)
    //   }
    // }

    // window.addEventListener('focus', initializeSilentAudio)
    // window.addEventListener('blur', initializeSilentAudio)
    // router.events.on('routeChangeComplete', initializeSilentAudio)
    // document.addEventListener('visibilitychange', initializeSilentAudio)

    // return () => {
    //   window.removeEventListener('focus', initializeSilentAudio)
    //   window.removeEventListener('blur', initializeSilentAudio)
    //   router.events.off('routeChangeComplete', initializeSilentAudio)
    //   document.removeEventListener('visibilitychange', initializeSilentAudio)
    // }
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
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontHeading.variable,
          poppins.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Layout>
            {showModal && <InitializeSoundModal setmodal={setShowModal} />}
            <TailwindIndicator />
            <Toaster position="bottom-center" />
            <NextNProgress color="#3b82f6" options={{ easing: 'ease', speed: 500 }} />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </main>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
