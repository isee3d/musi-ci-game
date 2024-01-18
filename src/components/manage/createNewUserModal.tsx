import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { userFormSchema } from 'types/FormSchema'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { api } from '~/utils/api'

const CreateNewUserModal: React.FC<{ setmodal: React.Dispatch<React.SetStateAction<boolean>> }> = ({
  setmodal,
}) => {
  const ctx = api.useContext()

  const { mutate: createUser } = api.user.createUserByCredentials.useMutation({
    onSuccess: () => {
      toast.success('Speler aangemaakt!')
      ctx.user.getAllUsers.invalidate()
    },
    onError: () => {
      toast.error('Something went wrong!')
    },
  })

  const form = useForm<z.infer<typeof userFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(userFormSchema),
  })

  function onSubmit(data: z.infer<typeof userFormSchema>) {
    createUser(data)
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
              <FormLabel>Naam van de speler</FormLabel>
              <FormControl>
                <Input placeholder="Bijv..  Joke Veltman" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="participantId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deelnemer nummer</FormLabel>
              <FormControl>
                <Input placeholder="Bijv..  12345" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wachtwoord</FormLabel>
              <FormControl>
                <Input placeholder="Vul hier het wachtwoord voor de speler in" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sla nieuwe speler op</Button>
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

export default CreateNewUserModal
