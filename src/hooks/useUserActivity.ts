import { Session } from 'next-auth'
import { useEffect } from 'react'
import { useSettingsStore } from '~/stores/settings'
import { api } from '~/utils/api'

export function useUserActivity(session: Session | null) {
  if (!session) return

  const { enteredWebsite, setEnteredWebsite, lastEnteredWebsite, setLastEnteredWebsite } =
    useSettingsStore()
  const { mutate: createActivity } = api.user.createUserActivity.useMutation()

  useEffect(() => {
    const now = Date.now()
    const differenceInMinutes = Math.abs(now - lastEnteredWebsite) / 1000 / 60

    if (session?.user.id && !enteredWebsite && differenceInMinutes > 5) {
      setEnteredWebsite(true)
      setLastEnteredWebsite(Date.now())
      createActivity({ userId: session.user.id, activity: 'EnterWebsiteMessage' })
    }
  }, [session])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      if (!session?.user.id) return
      createActivity({ userId: session.user.id, activity: 'LeftWebsiteMessage' })
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return { sessionData: session }
}
