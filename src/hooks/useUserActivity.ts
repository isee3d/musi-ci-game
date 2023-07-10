import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useSettingsStore } from '~/stores/settings'
import { api } from '~/utils/api'

export function useUserActivity() {
  const { data: sessionData } = useSession()
  const { enteredWebsite, setEnteredWebsite, lastEnteredWebsite, setLastEnteredWebsite } =
    useSettingsStore()
  const { mutate: createActivity } = api.user.createUserActivity.useMutation()

  useEffect(() => {
    const now = Date.now()
    const differenceInMinutes = Math.abs(now - lastEnteredWebsite) / 1000 / 60

    if (sessionData?.user.id && !enteredWebsite && differenceInMinutes > 5) {
      setEnteredWebsite(true)
      setLastEnteredWebsite(Date.now())
      createActivity({ userId: sessionData.user.id, activity: 'EnterWebsiteMessage' })
    }
  }, [sessionData])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      if (!sessionData?.user.id) return
      createActivity({ userId: sessionData.user.id, activity: 'LeftWebsiteMessage' })
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return { sessionData }
}
