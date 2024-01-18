import Head from 'next/head'
import { type NextPage } from 'next'
import { api } from '~/utils/api'
import { useState } from 'react'
import UpdateUsersModal from '~/components/manage/updateUsersModal'
import { User } from '@prisma/client'
import { Button, buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { useRequireAuth } from '~/hooks/useRequireAuth'
import { useRequireAdminRole } from '~/hooks/useRequireAdminRole'
import { Label } from '~/components/ui/label'
import ManageBaseModal from '~/components/manage/manageBaseModal'
import CreateNewUserModal from '~/components/manage/createNewUserModal'

const ManageUsersPage: NextPage = () => {
  useRequireAuth()
  useRequireAdminRole()

  const ctx = api.useContext()
  const [createModal, setCreateModal] = useState(false)
  const usersQuery = api.user.getAllUsers.useQuery()
  const { mutate: deleteUser } = api.user.deleteUser.useMutation({
    onSuccess: () => {
      ctx.user.getAllUsers.invalidate()
    },
  })
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="flex grow flex-col items-center justify-center">
        <h2 className="mb-10 py-3 text-center text-4xl font-extrabold tracking-tight ">
          Gebruikers beheren
        </h2>
        <div className="container mx-auto flex min-h-fit w-1/2 flex-col items-center gap-y-4 rounded border-2 border-primary p-4 shadow">
          <Button onClick={() => setCreateModal(true)} variant="default">
            Creeër een nieuwe speler
          </Button>
          {createModal && (
            <ManageBaseModal title="Nieuwe speler aanmaken">
              <CreateNewUserModal setmodal={setCreateModal} />
            </ManageBaseModal>
          )}
          <Label className="text-center text-3xl font-bold">Bestaande gebruikers</Label>
          {usersQuery.data?.map((user) => {
            return (
              <div
                key={user.id}
                className="flex w-full min-w-fit flex-col items-center justify-around gap-4 rounded-md border-2 border-primary bg-primary/40 p-4 text-center lg:flex-row"
              >
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <h2 className="text-xl">{user.role}</h2>
                <p className="text-xl">{user.participantId}</p>
                <div className="flex flex-col gap-3 md:flex-row">
                  <Button
                    onClick={() => deleteUser({ id: user.id })}
                    className={cn(buttonVariants({ variant: 'destructive', size: 'lg' }), 'px-4')}
                  >
                    verwijderen
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedUser(user)
                      setShowModal(true)
                    }}
                    className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'px-4')}
                  >
                    Aanpassen
                  </Button>
                </div>
                {showModal && selectedUser?.id === user.id && (
                  <ManageBaseModal title="Speler updaten">
                     <UpdateUsersModal setmodal={setShowModal} user={selectedUser} />
                  </ManageBaseModal>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default ManageUsersPage
