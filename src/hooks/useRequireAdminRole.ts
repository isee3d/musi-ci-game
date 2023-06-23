import { useEffect } from 'react'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { UserRole } from 'types/Role'

export const useRequireAdminRole = () => {
  const { data: sessionData } = useSession()
  const router = useRouter()

  useEffect(() => {
    const userRole = sessionData?.user?.role || ''
    if (userRole !== UserRole.ADMIN) {
      router.push('/')
    }
  }, [sessionData?.user, router])

  return sessionData
}
