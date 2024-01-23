import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useSettingsStore } from '~/stores/settings'
import { api } from '~/utils/api'

export function useUserActivity() {
  const { data: session } = useSession()
  const { enteredWebsite, setEnteredWebsite, lastEnteredWebsite, setLastEnteredWebsite } =
    useSettingsStore()
  const { mutate: createActivity } = api.user.createUserActivity.useMutation()

  useEffect(() => {
    const userId = session?.user?.id
    const now = Date.now()
    const differenceInMinutes = Math.abs(now - lastEnteredWebsite) / 1000 / 60

    if (userId && !enteredWebsite && differenceInMinutes > 5) {
      console.log(userId, enteredWebsite, differenceInMinutes, now, lastEnteredWebsite)
      setEnteredWebsite(true)
      setLastEnteredWebsite(Date.now())
      createActivity({ userId: userId, activity: 'EnterWebsiteMessage' })
    }
  }, [session])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const userId = session?.user?.id
      e.preventDefault()
      if (!userId) return
      console.log('left website')
      createActivity({ userId: userId, activity: 'LeftWebsiteMessage' })
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  const logSignOutActivity = () => {
    const userId = session?.user?.id
    if (!userId) return
    console.log('signing out')
    createActivity({ userId: userId, activity: 'SignOutMessage' })
  }

  return { logSignOutActivity }
}
