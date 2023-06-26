import { Team } from '@prisma/client'
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
import { teamFormSchema } from 'types/FormSchema'

interface BaseStaticModalProps {
  setmodal: React.Dispatch<React.SetStateAction<boolean>>
  team: Team
}

const UpdateTeamModal: React.FC<BaseStaticModalProps> = ({ setmodal, team }) => {
  const ctx = api.useContext()
  const teamQuery = api.team.getAllTeams.useQuery()
  const { mutate: updateTeam } = api.team.updateTeam.useMutation({
    onSuccess: () => {
      ctx.team.getAllTeams.invalidate()
    },
  })

  const form = useForm<z.infer<typeof teamFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(teamFormSchema),
    defaultValues: {
      name: team.name,
      description: team.description,
    },
  })

  function onSubmit(data: z.infer<typeof teamFormSchema>) {
    const exists = teamQuery.data?.find((team) => team.name === data.name)
    const toastMessage = exists ? 'Team naam bestaat al!' : 'team verandert gelukt!'
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
  )
}

export default UpdateTeamModal
