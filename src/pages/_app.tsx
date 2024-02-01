import { inspect } from '@xstate/inspect'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'
import { Inter as FontSans, Poppins } from 'next/font/google'
import localFont from 'next/font/local'
import { Toaster } from '~/components/ui/sonner'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

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
import { useRouter } from 'next/router'
import { routeSoundIgnorePaths } from '~/config/routing'
import { useAudioServiceStore } from '~/stores/useAudioServiceStore'

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
  const router = useRouter()
  const { audioContext } = useAudioServiceStore.getState()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (env.NEXT_PUBLIC_XSTATE_DEV_TOOLS === 'false') return

    if (typeof window !== 'undefined' && env.NEXT_PUBLIC_NODE_ENV === 'development') {
      inspect({
        url: 'https://statecharts.io/inspect', // (default)
        iframe: false,
      })
    }
  }, [])

  useEffect(() => {
    if (!audioContext) setShowModal(!routeSoundIgnorePaths.includes(router.pathname))
  }, [router.pathname])

  useEffect(() => {
    console.log(
      '%c Made with ❤️ by ISee3D',
      'background: #3b82f6; color: #fff; padding: 0.5rem; border-radius: 0.5rem; font-size: 1rem;',
    )
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
            <SpeedInsights />
            <Analytics />
          </Layout>
        </ThemeProvider>
      </main>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
