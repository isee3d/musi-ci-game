import { Team } from '@prisma/client'
import { TeamOptionalDefaultsSchema } from 'prisma/generated/zod'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '~/utils/api'
import toast from 'react-hot-toast'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'

interface BaseStaticModalProps {
  setmodal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateTeamModal: React.FC<BaseStaticModalProps> = ({ setmodal }) => {
  const ctx = api.useContext()
  const teamQuery = api.team.getAllTeams.useQuery()

  const { mutate: addTeam } = api.team.createTeam.useMutation({
    onSuccess: () => {
      ctx.game.getAllGames.invalidate()
    },
  })

  const form = useForm<z.infer<typeof TeamOptionalDefaultsSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(TeamOptionalDefaultsSchema),
    defaultValues: {
      name: '',
    },
  })

  function onSubmit(data: z.infer<typeof TeamOptionalDefaultsSchema>) {
    const exists = teamQuery.data?.find((team) => team.name === data.name)
    const toastMessage = exists ? 'Team already exists!' : 'team created!'
    exists ? toast.error(toastMessage) : (addTeam(data), toast.success(toastMessage))
    form.reset()
    setmodal(false)
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="relative mx-auto my-6 w-1/3 max-w-7xl border-8">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg  bg-white p-4 shadow-lg">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-3xl font-semibold">Update team</h3>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team naam</FormLabel>
                      <FormControl>
                        <Input placeholder="Team 1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beschrijving</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Beschrijving"
                          value={field.value || ''}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Sla nieuwe team op</Button>
                <Button
                  onClick={() => {
                    form.reset()
                    setmodal(false)
                  }}
                  type="button"
                  className="mx-3"
                >
                  Annuleren
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  )
}

export default CreateTeamModal
