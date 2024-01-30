import { Team, User } from '@prisma/client'
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
import { z } from 'zod'
import { toast } from 'sonner'
import { Textarea } from '~/components/ui/textarea'
import { teamFormSchema, userFormSchema } from 'types/FormSchema'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'

interface BaseStaticModalProps {
  setmodal: React.Dispatch<React.SetStateAction<boolean>>
  user: User
}

const userRoles = ['USER', 'ADMIN', 'RESEARCHER'] as const

const UpdateUsersModal: React.FC<BaseStaticModalProps> = ({ setmodal, user }) => {
  const ctx = api.useContext()

  const { mutate: updateUser } = api.user.updateUserData.useMutation({
    onSuccess: () => {
      toast.success('Speler updated!')
      ctx.user.getAllUsers.invalidate()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const form = useForm<z.infer<typeof userFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      userId: user.id,
      name: user.name ?? '',
      participantId: user.participantId ?? '',
      isAllowedToPlay: user.isAllowedToPlay ?? true,
      role: user.role ?? 'USER',
    },
  })

  function onSubmit(data: z.infer<typeof userFormSchema>) {
    updateUser(data)
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
              <FormLabel>Speler naam</FormLabel>
              <FormControl>
                <Input placeholder="speler naam..." {...field} />
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
                <Input placeholder="bijv... 12345" {...field} />
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
              <FormLabel>wachtwoord</FormLabel>
              <FormControl>
                <Input placeholder="Nieuwe wachtwoord" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Speler role</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>selecteer de rol van de speler</SelectLabel>
                      {userRoles.map((role, index) => (
                        <SelectItem key={index} value={role}>{role}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isAllowedToPlay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mag spelen</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    const booleanValue = value === 'true'
                    field.onChange(booleanValue)
                  }}
                  defaultValue={field.value.toString()}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Bepaal of speler mag spelen</SelectLabel>
                      <SelectItem value={'true'}>Mag wel spelen</SelectItem>
                      <SelectItem value={'false'}>Mag niet spelen</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sla geupdate speler op</Button>
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

export default UpdateUsersModal
