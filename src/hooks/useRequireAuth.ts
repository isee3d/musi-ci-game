import { useEffect } from 'react'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export const useRequireAuth = () => {
  const { status, data: sessionData } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Wait for loading to complete
    if (status === 'unauthenticated') router.push('/login')
    if(sessionData?.user?.isAllowedToPlay === false) router.push('/login')
    // if (!sessionData?.user?.participantId) router.push('/login')
  }, [status, router])

  return sessionData
}
