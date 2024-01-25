import * as React from 'react'
import Link from 'next/link'
import { MobileNav, NavItem, PlayerNavItem } from '~/components/mobileNav'
import { cn } from '~/lib/utils'
import { Icons } from '~/components/icons'
import { useSession } from 'next-auth/react'
import { Button } from '~/components/ui/button'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'

interface MainNavProps {
  items?: PlayerNavItem[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  const { data: session } = useSession()
  const { isPlaying } = useLuisterenStore()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo />
        <span className="hidden font-bold sm:inline-block">Musi Ci</span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Button
              key={index}
              onClick={() => item.action && item.action()}
              disabled={(session?.user?.role === 'USER' && item.disabled) || isPlaying}
              variant={'link'}
              style={{
                display:
                  (session?.user?.role === 'USER' && item.disabled) ||
                  (!session && item.enableAfterLogin === true)
                    ? 'none'
                    : 'inline-flex',
              }}
              asChild={item.href !== undefined}
            >
              {item.href ? (
                <Link
                  className={cn(
                    'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                    'text-foreground',
                    session?.user.role === 'USER' &&
                      item.disabled &&
                      'cursor-not-allowed opacity-80',
                  )}
                  href={item.href === undefined ? '#' : item.href}
                >
                  {item.title}
                </Link>
              ) : (
                <div>{item.title}</div>
              )}
            </Button>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav setShowMobileNav={setShowMobileMenu} items={items}>
          {children}
        </MobileNav>
      )}
    </div>
  )
}
