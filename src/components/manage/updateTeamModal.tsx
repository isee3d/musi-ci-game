import { Team } from '@prisma/client'
import { useState } from 'react'
import { api } from '~/utils/api'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TeamOptionalDefaultsSchema, TeamSchema } from 'prisma/generated/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Textarea } from '~/components/ui/textarea'

interface BaseStaticModalProps {
  setmodal: React.Dispatch<React.SetStateAction<boolean>>
  team: Team
}

const UpdateTeamModal: React.FC<BaseStaticModalProps> = ({ setmodal, team }) => {
  const ctx = api.useContext()
  const teamQuery = api.team.getAllTeams.useQuery()
  // const [teamName, setTeamName] = useState(team.name);
  // const [teamDescription, setTeamDescription] = useState(team.description);
  const { mutate: updateTeam } = api.team.updateTeam.useMutation({
    onSuccess: () => {
      ctx.team.getAllTeams.invalidate()
    },
  })

  const form = useForm<z.infer<typeof TeamSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(TeamOptionalDefaultsSchema),
    defaultValues: {
      name: team.name,
      description: team.description,
    },
  })

  function onSubmit(data: z.infer<typeof TeamSchema>) {
    const exists = teamQuery.data?.find((team) => team.name === data.name)
    const toastMessage = exists ? 'Team already exists!' : 'team created!'
    exists
      ? toast.error(toastMessage)
      : (updateTeam({
          id: team.id,
          name: data.name,
          description: data.description,
        }),
        toast.success(toastMessage))
    form.reset()
    setmodal(false)
  }

  // function updateTeamValues() {
  //     updateTeam({
  //         id: team.id,
  //         name: teamName,
  //         description: teamDescription,
  //     });
  //     setmodal(false);
  // }

  return (
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
    // <>
    //     <div
    //         className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
    //     >
    //         <div className="relative mx-auto my-6 w-auto max-w-3xl">
    //             {/*content*/ }
    //             <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
    //                 {/*header*/ }
    //                 <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
    //                     <h3 className="text-3xl font-semibold">
    //                         Update team
    //                     </h3>
    //                 </div>
    //                 <div className="relative flex justify-center p-6">
    //                     <input
    //                         className="mr-2 border-2 border-gray-300 p-2"
    //                         placeholder="Team name"
    //                         value={ teamName ?? ''}
    //                         onChange={ (e) => setTeamName(e.target.value) }
    //                     />
    //                     <input
    //                         className="ml-2 border-2 border-gray-300 p-2"
    //                         placeholder="Description"
    //                         value={ teamDescription ?? '' }
    //                         onChange={ (e) => setTeamDescription(e.target.value) }
    //                     />
    //                 </div>
    //                 <div className="flex items-center justify-center rounded-b border-t border-solid border-slate-200 p-6">
    //                     <button
    //                         className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
    //                         type="button"
    //                         onClick={ updateTeamValues }
    //                     >
    //                         Update team
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //     <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    // </>
  )
}

export default UpdateTeamModal
