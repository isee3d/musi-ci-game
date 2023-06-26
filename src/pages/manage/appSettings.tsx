import Head from 'next/head'
import { type NextPage } from 'next'
import { Team, User } from '@prisma/client'
import toast from 'react-hot-toast'
import { api } from '~/utils/api'
import { useState } from 'react'
import UpdateTeamModal from '~/components/manage/updateTeamModal'
import { Button, buttonVariants } from '~/components/ui/button'
import CreateTeamModal from '~/components/manage/createTeamModal'
import { cn } from '~/lib/utils'
import ManageBaseModal from '~/components/manage/manageBaseModal'
import { useRequireAuth } from '~/hooks/useRequireAuth'
import { useRequireAdminRole } from '~/hooks/useRequireAdminRole'

const ManageAppSettingsPage: NextPage = () => {
  useRequireAuth()
  useRequireAdminRole()

  const ctx = api.useContext()

  const [showModal, setShowModal] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="manage team" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="flex grow flex-col items-center justify-center">
        <h2 className="mb-10 py-3 text-center text-4xl font-extrabold tracking-tight">
          App instellingen beheren
        </h2>

        <div className="container mx-auto flex w-1/2 flex-col items-center rounded border-2 p-4 shadow">
          <Button onClick={() => setCreateModal(true)} variant="outline">
            Hier allerlei instellingen aanpassen.. geen idee wat nog precies
          </Button>
          {createModal && (
            <ManageBaseModal title="Nieuw Team maken">
              <CreateTeamModal setmodal={setCreateModal} />
            </ManageBaseModal>
          )}

            {/* maybe the colors for the fragmentplayers */}
            {/* maybe the timings in the game modes which are still hardcoded */}

        </div>
      </section>
    </>
  )
}

export default ManageAppSettingsPage
