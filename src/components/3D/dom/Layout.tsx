'use client'

import { signIn, useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { ReactNode, useRef, useState } from 'react'
import { MainNav } from '~/components/mainNav'
import ManageBaseModal from '~/components/manage/manageBaseModal'
import QuestionModal from '~/components/questionModal'
import { SiteFooter } from '~/components/siteFooter'
import { Button } from '~/components/ui/button'
import { navItemsPlayer } from '~/config/navigation'
import { useUserActivity } from '~/hooks/useUserActivity'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { api } from '~/utils/api'

const Scene = dynamic(() => import('~/components/3D/canvas/Scene'), { ssr: false })

type LayoutProps = {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession()
  const { isPlaying } = useLuisterenStore()
  const { logSignOutActivity } = useUserActivity()
  const { data: questions } = api.question.getAllQuestions.useQuery(undefined, {enabled: session?.user.id !== undefined})

  const ref = useRef(null)
  const [questionModal, setQuestionModal] = useState(false)

  async function handleSignOut() {
    await logSignOutActivity()
    setQuestionModal(true)
  }

  return (
    <div ref={ref} className="relative h-full w-full overflow-auto" style={{ touchAction: 'auto' }}>
      <div className=" flex min-h-dvh flex-col overflow-y-hidden">
        <header className="container z-40 rounded-b-xl backdrop-blur-md">
          <div className="flex h-20 items-center justify-between py-6">
            <MainNav items={navItemsPlayer} />
            <Button
              disabled={isPlaying}
              variant={'highlight'}
              onClick={(event) => {
                event.preventDefault()
                session ? handleSignOut() : signIn()
              }}
            >
              {session ? 'Uitloggen' : 'Inloggen'}
            </Button>
          </div>
        </header>

        {questionModal && questions && (
          <ManageBaseModal title="Vragenlijst">
            <QuestionModal setModal={setQuestionModal} questions={questions} />
          </ManageBaseModal>
        )}

        {children}
        <SiteFooter className={''} />
        <Scene
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
          }}
          eventSource={ref}
          eventPrefix="client"
        />
      </div>
    </div>
  )
}

export { Layout }
