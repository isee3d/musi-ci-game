import * as React from 'react'
import Link from 'next/link'
import { MobileNav, NavItem, PlayerNavItem } from '~/components/mobileNav'
import { cn } from '~/lib/utils'
import { Icons } from '~/components/icons'
import { useSession } from 'next-auth/react'
import { Button } from '~/components/ui/button'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { navItemsTemplate } from '~/config/navigation'

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
        <span className="hidden font-bold sm:inline-block">Musi CI</span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => {
            // Define a hierarchy for roles.
            const roleHierarchy = {
              ADMIN: 3,
              RESEARCHER: 2,
              USER: 1,
              GUEST: 0, // Assuming a non-logged-in user has a 'GUEST' role.
            }

            // Determine the current user's role hierarchy. Default to 'GUEST' if not logged in.
            const currentUserRoleHierarchy = session?.user
            // @ts-ignore
              ? roleHierarchy[session.user.role]
              : roleHierarchy['GUEST']

            // Check if the item should be displayed based on the login status.
            const shouldDisplayBasedOnLogin =
              !item.enableAfterLogin || (!!session && item.enableAfterLogin)

            // Determine if the item should be displayed based on the user's role.
            // If 'role' is not defined for an item, it's visible to all (hence the default to 'GUEST').
            // Otherwise, check against the current user's role hierarchy.
            const shouldDisplayBasedOnRole =
              !item.role ||
              // @ts-ignore
              item.role.some((role) => currentUserRoleHierarchy >= roleHierarchy[role])

            // Combine the login and role conditions to decide if the item should be displayed.
            const shouldDisplay = shouldDisplayBasedOnLogin && shouldDisplayBasedOnRole

            return shouldDisplay ? (
              <Button
                key={index}
                onClick={() => item.action && item.action()}
                variant={'link'}
                asChild={item.href !== undefined}
              >
                {item.href ? (
                  <a
                    className="flex items-center text-lg font-medium text-foreground transition-colors hover:text-foreground/80 sm:text-sm"
                    href={item.href}
                  >
                    {item.title}
                  </a>
                ) : (
                  <div>{item.title}</div>
                )}
              </Button>
            ) : null
          })}
          {session?.user.role === 'ADMIN' && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button asChild variant={'link'}>
                  <Link href="#">Instellingen</Link>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {navItemsTemplate.map((item) => (
                  <DropdownMenuItem key={item.title} asChild>
                    <Link href={item.href}>{item.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
