import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useSettingsStore } from '~/stores/settings'
import { api } from '~/utils/api'

export function useUserActivity() {
  const { data: session } = useSession()
  const { enteredWebsite, setEnteredWebsite, lastEnteredWebsite, setLastEnteredWebsite } =
    useSettingsStore()
  const mutation = api.user.createUserActivity.useMutation()

  useEffect(() => {
    const userId = session?.user?.id
    const now = Date.now()
    const differenceInMinutes = Math.abs(now - lastEnteredWebsite) / 1000 / 60

    if (userId && !enteredWebsite && differenceInMinutes > 5) {
      setEnteredWebsite(true)
      setLastEnteredWebsite(Date.now())
      mutation.mutate({ userId: userId, activity: 'EnterWebsiteMessage' })
    }
  }, [session])

  const logSignOutActivity = async () => {
    const userId = session?.user?.id
    if (!userId) return
    await mutation.mutateAsync({ userId: userId, activity: 'SignOutMessage' })
  }

  return { logSignOutActivity }
}
