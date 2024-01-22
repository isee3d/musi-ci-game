import { User } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import CreateNewUserModal from '~/components/manage/createNewUserModal'
import ManageBaseModal from '~/components/manage/manageBaseModal'
import UpdateUsersModal from '~/components/manage/updateUsersModal'
import { Button, buttonVariants } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'
import { generateServerSideHelper } from '~/server/helpers/serverSideHelper'
import { api } from '~/utils/api'
import { getSSRAuthRedirectOnAdminRole } from '~/utils/authUtils'

const ManageUsersPage = () => {
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

  const handleDeleteUserClick = (userId: string) => {
    const isConfirmed = window.confirm('Weet je zeker dat je deze speler wilt verwijderen?')
    if (isConfirmed) {
      deleteUser({ id: userId })
    }
  }

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
                    onClick={() => handleDeleteUserClick(user.id)}
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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const auth = await getSSRAuthRedirectOnAdminRole(ctx)

  if (auth.redirect) {
    return { redirect: auth.redirect }
  }

  const helpers = generateServerSideHelper(auth.props.session)
  await helpers.user.getAllUsers.prefetch()

  return {
    props: {
      session: auth.props.session,
      trpcState: helpers.dehydrate(),
    },
  }
}
