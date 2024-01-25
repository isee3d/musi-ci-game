import { GetServerSidePropsContext } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NavItem } from '~/components/mobileNav'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { navItemsResearcher, navitemsTemplate } from '~/config/navigation'
import { cn } from '~/lib/utils'
import { getSSRAuthRedirectOnResearcherRole } from '~/utils/authUtils'

const SettingsPage = () => {
  const { data: session } = useSession()
  const [mainNavItems, setMainNavItems] = useState<NavItem[]>(navitemsTemplate)

  useEffect(() => {
    if (session?.user?.role === 'ADMIN') {
      setMainNavItems(navitemsTemplate)
    } else if (session?.user?.role === 'RESEARCHER') {
      setMainNavItems(navItemsResearcher)
    } else {
      setMainNavItems([])
    }
  }, [session])

  return (
    <>
      <Head>
        <title>Musi CI instellingen</title>
        <meta name="description" content="Instellingen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="relative flex grow flex-col items-center justify-center bg-cover bg-no-repeat">
        <Label className="p-4 text-5xl">Musi CI instellingen</Label>
        {session && mainNavItems?.length ? (
          <nav className="hidden flex-col gap-6 md:flex">
            {mainNavItems?.map((item) => (
              <Button asChild>
                <Link
                  key={item.href}
                  href={item.disabled ? '#' : item.href}
                  className={cn(
                    'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                    'text-foreground',
                    item.disabled && 'cursor-not-allowed opacity-80',
                  )}
                >
                  {item.title}
                </Link>
              </Button>
            ))}
          </nav>
        ) : null}
      </section>
    </>
  )
}

export default SettingsPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const auth = await getSSRAuthRedirectOnResearcherRole(ctx)

  if (auth.redirect) {
    return { redirect: auth.redirect }
  }

  return {
    props: {
      session: auth.props.session,
    },
  }
}
