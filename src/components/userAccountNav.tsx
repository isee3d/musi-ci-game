'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { testSound } from '~/components/fragmentPlayer/audio/AudioControls'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { UserAvatar } from '~/components/userAvatar'
import { useUserActivity } from '~/hooks/useUserActivity'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { api } from '~/utils/api'
import { Icons } from '~/components/icons'

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  userName: string
}

export function UserAccountNav({ userName }: UserAccountNavProps) {
  const { data: session } = useSession()
  const { isPlaying } = useLuisterenStore()
  const router = useRouter()
  const { logSignOutActivity } = useUserActivity()

  async function runTestSound() {
    await testSound()
  }

  async function handleSignOut() {
    await logSignOutActivity()
    const signOutResponse = await signOut({ redirect: false, callbackUrl: '/login' })
    if (signOutResponse?.url) {
      router.push(signOutResponse.url)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={'rounded-full hover:bg-blue-200/20'}>
        <Icons.settings />
        {/* <UserAvatar user={{ name: userName || null, image: null }} className="h-12 w-12" /> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {userName && <p className="font-medium">{userName}</p>}
          </div>
        </div>
        <DropdownMenuSeparator />
        {session?.user.role !== 'USER' && (
          <DropdownMenuItem asChild>
            <Link href={'/settings'}>Instellingen</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem disabled={isPlaying} onClick={() => runTestSound()}>
          Test geluid
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isPlaying}
          className="cursor-pointer bg-purple-500"
          onSelect={(event) => {
            event.preventDefault()
            if (session) {
              handleSignOut()
            } else {
              signIn()
            }
          }}
        >
          {session ? 'Uitloggen' : 'Inloggen'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
