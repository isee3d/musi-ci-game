import Head from 'next/head'
import { type NextPage } from 'next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Game, GameMode, Kliniek, Team, User } from '@prisma/client'
import toast from 'react-hot-toast'
import { api } from '~/utils/api'
import { useState } from 'react'
import UpdateTeamModal from '~/components/manage/updateTeamModal'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog'
import { DialogFooter, DialogHeader } from '~/components/ui/dialog'
import { Button, buttonVariants } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import CreateTeamModal from '~/components/manage/createTeamModal'
import { cn } from '~/lib/utils'
import ManageBaseModal from '~/components/manage/manageBaseModal'

const validationRules = {
  name: { required: 'Field is required.' },
  description: { required: 'Field is required.' },
}

const ManageTeamPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Team>({ mode: 'onBlur' })

  const ctx = api.useContext()
  const teamQuery = api.team.getAllTeams.useQuery()
  const getUsersWithoutTeamQuery = api.user.getAllUsersWithoutTeam.useQuery()

  const { mutate: setUserToTeam } = api.user.setUserToTeam.useMutation({
    onSuccess: () => {
      toast.success('User added to team!')
      ctx.user.getAllUsersWithoutTeam.invalidate()
    },
  })
  // const { mutate: addTeam } = api.team.createTeam.useMutation({
  //   onSuccess: () => {
  //     ctx.game.getAllGames.invalidate()
  //   },
  // })

  const { mutate: deleteTeam } = api.team.deleteTeam.useMutation()

  const [showModal, setShowModal] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)

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
          <h2 className="py-3 text-center text-4xl font-extrabold tracking-tight ">Alle Teams</h2>
          <div className="flex flex-col gap-y-4">
            {teamQuery.data?.map((team) => {
              return (
                <div
                  key={team.id}
                  className="grid min-w-full grid-cols-[1fr,auto,auto,auto,auto] items-center gap-4 rounded-md border-2 border-primary bg-primary/40 p-4"
                >
                  <h2 className="text-2xl font-bold">{team.name}</h2>
                  <h2 className="text-xl">{team.description}</h2>
                  <Button
                    onClick={() => deleteTeam({ id: team.id })}
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
                  {showModal && selectedTeam?.id === team.id && (
                    <ManageBaseModal title='Team aanpassen'>
                      <UpdateTeamModal setmodal={setShowModal} team={team} />
                    </ManageBaseModal>
                  )}
                </div>
              )
            })}
          </div>

          {/* {teamQuery.data?.map((team) => {
            return (
              <div key={team.id} className="flex items-center justify-center space-x-4">
                <h3 className="text-2xl font-bold ">{team.name}</h3>
                <p className="text-xl">{team.description}</p>
                <button
                  onClick={() => deleteTeam({ id: team.id })}
                  className="rounded-xl bg-red-500 p-2 text-white hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setSelectedTeam(team)
                    setShowModal(true)
                  }}
                  className="rounded-xl bg-green-500 p-2 text-white hover:bg-green-600"
                >
                  Update
                </button>
                {showModal && selectedTeam?.id === team.id && (
                  <UpdateTeamModal setmodal={setShowModal} team={team} />
                )}
              </div>
            )
          })} */}
        </div>
      </section>
    </>
  )
}

export default ManageTeamPage
