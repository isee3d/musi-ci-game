import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Icons } from '~/components/icons'
import { Button } from '~/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { navItemsTemplate } from '~/config/navigation'
import { useLockBody } from '~/hooks/use-lock-body'
import { cn } from '~/lib/utils'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type PlayerNavItem = {
  title: string
  href?: string
  action?: () => void
  disabled?: boolean
  enableAfterLogin?: boolean
}

interface MobileNavProps {
  items: PlayerNavItem[]
  setShowMobileNav: React.Dispatch<React.SetStateAction<boolean>>
  children?: React.ReactNode
}

export function MobileNav({ items, setShowMobileNav, children }: MobileNavProps) {
  const { data: session } = useSession()
  const { isPlaying } = useLuisterenStore()
  useLockBody()

  return (
    <div
      className={cn(
        'fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden',
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link
          href="/"
          onClick={() => setShowMobileNav(false)}
          className="flex items-center space-x-2"
        >
          <Icons.logo />
          <span className="font-bold">Musi Ci</span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => (
            <Button
              key={index}
              disabled={(session?.user.role === 'USER' && item.disabled) || isPlaying}
              variant={'link'}
              style={{
                display:
                  (session?.user?.role === 'USER' && item.disabled) ||
                  (!session && item.enableAfterLogin === true)
                    ? 'none'
                    : 'inline-flex',
              }}
              asChild
            >
              <Link
                onClick={() => setShowMobileNav(false)}
                href={item.href === undefined ? '#' : item.href}
                className={cn(
                  'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
                  session?.user.role === 'USER' && item.disabled && 'cursor-not-allowed opacity-60',
                )}
              >
                {item.title}
              </Link>
            </Button>
          ))}
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
        {children}
      </div>
    </div>
  )
}
