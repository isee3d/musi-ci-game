import { TeamOptionalDefaultsSchema } from 'prisma/generated/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '~/utils/api'
import toast from 'react-hot-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { teamFormSchema } from 'types/FormSchema'

const CreateTeamModal: React.FC<{ setmodal: React.Dispatch<React.SetStateAction<boolean>> }> = ({
  setmodal,
}) => {
  const ctx = api.useContext()
  const teamQuery = api.team.getAllTeams.useQuery()

  const { mutate: addTeam } = api.team.createTeam.useMutation({
    onSuccess: () => {
      toast.success('Team created!')
      ctx.team.getAllTeams.invalidate()
    },
    onError: () => {
      toast.error('Something went wrong!')
    },
  })

  const form = useForm<z.infer<typeof teamFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(teamFormSchema),
    defaultValues: {
      name: '',
    },
  })

  function onSubmit(data: z.infer<typeof teamFormSchema>) {
    const exists = teamQuery.data?.find((team) => team.name === data.name)
    if (!exists) {
      addTeam(data)
      form.reset()
      setmodal(false)
    }
    else{
      toast.error('Team naam bestaat al!')
    }
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

export default CreateTeamModal
