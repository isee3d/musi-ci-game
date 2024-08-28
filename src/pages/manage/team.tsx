import { Team, User } from '@prisma/client'
import { GetServerSidePropsContext, type NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { toast } from 'sonner'
import CreateTeamModal from '~/components/manage/createTeamModal'
import ManageBaseModal from '~/components/manage/manageBaseModal'
import UpdateTeamModal from '~/components/manage/updateTeamModal'
import { Button, buttonVariants } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'
import { generateServerSideHelper } from '~/server/helpers/serverSideHelper'
import { api } from '~/utils/api'
import { getSSRAuthRedirectOnAdminRole } from '~/utils/authUtils'

const ManageTeamPage: NextPage = () => {
  const ctx = api.useContext()
  const teamQuery = api.team.getAllTeams.useQuery()
  const getUsersWithoutTeamQuery = api.user.getAllUsersWithoutTeam.useQuery()

  const { mutate: setUserToTeam } = api.user.setUserToTeam.useMutation({
    onSuccess: () => {
      toast.success('User added to team!')
      ctx.user.getAllUsersWithoutTeam.invalidate()
    },
  })

  const { mutate: deleteTeam } = api.team.deleteTeam.useMutation()

  const [showModal, setShowModal] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)

  const handleDeleteTeamClick = (teamId: number) => {
    const isConfirmed = window.confirm('Weet je zeker dat je dit team wilt verwijderen?')
    if (isConfirmed) {
      deleteTeam({ id: teamId })
    }
  }

  const usersWithoutTeamList = getUsersWithoutTeamQuery.data?.map((user: User) => {
    return (
      <li key={user.id} className="flex items-center justify-between">
        <label className="mb-2 block p-4 text-center text-sm font-medium text-gray-900 dark:text-white">
          {user.name}
        </label>
        <label className="mb-2 block p-4 text-center text-sm font-medium text-gray-900 dark:text-white">
          {user.id_Team ? user.id_Team : 'Geen team'}
        </label>
        <div className="relative w-full lg:max-w-sm">
          <select
            value={teamQuery.data?.[0]?.id}
            onChange={(e) => {
              setUserToTeam({ userId: user.id, teamId: parseInt(e.target.value) })
            }}
            className="w-full appearance-none rounded-md border bg-white p-2.5 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
          >
            {teamQuery.data?.map((team: Team) => {
              return (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              )
            })}
          </select>
        </div>
      </li>
    )
  })

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="manage team" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="flex grow flex-col items-center justify-center">
        <h2 className="mb-10 py-3 text-center text-4xl font-extrabold tracking-tight">
          Teams beheren
        </h2>

        <div className="container mx-auto flex w-1/2 flex-col items-center rounded border-2 p-4 shadow">
          <Button onClick={() => setCreateModal(true)} variant="outline">
            Maak nieuw Team
          </Button>
          {createModal && (
            <ManageBaseModal title="Nieuw Team maken">
              <CreateTeamModal setmodal={setCreateModal} />
            </ManageBaseModal>
          )}

          <h3 className="my-2 text-xl">User toevoegen aan team</h3>
          <ul>{usersWithoutTeamList}</ul>
          <Label className="text-center text-3xl font-bold">Bestaande Teams</Label>
          <div className="flex w-full flex-col items-center justify-center gap-2">
            {teamQuery.data?.map((team) => {
              return (
                <div
                  key={team.id}
                  className="flex w-full min-w-fit flex-col items-center justify-around gap-4 rounded-md border-2 border-primary bg-primary/40 p-4 text-center md:flex-row"
                >
                  <h2 className="text-2xl font-bold">{team.name}</h2>
                  <h2 className="text-xl">{team.description}</h2>
                  <div className="flex flex-col gap-3 md:flex-row">
                    <Button
                      onClick={() => handleDeleteTeamClick(team.id)}
                      className={cn(buttonVariants({ variant: 'destructive', size: 'lg' }), 'px-4')}
                    >
                      verwijderen
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedTeam(team)
                        setShowModal(true)
                      }}
                      className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'px-4')}
                    >
                      Aanpassen
                    </Button>
                  </div>
                  {showModal && selectedTeam?.id === team.id && (
                    <ManageBaseModal title="Team aanpassen">
                      <UpdateTeamModal setmodal={setShowModal} team={team} />
                    </ManageBaseModal>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default ManageTeamPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const auth = await getSSRAuthRedirectOnAdminRole(ctx)
  if (auth.redirect) {
    return { redirect: auth.redirect }
  }

  const helpers = generateServerSideHelper(auth.props.session)
  await helpers.team.getAllTeams.prefetch()

  return {
    props: {
      session: auth.props.session,
      trpcState: helpers.dehydrate(),
    },
  }
}
