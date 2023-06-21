import { FragmentOptionalDefaultsSchema } from 'prisma/generated/zod'
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
import { Button, buttonVariants } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { useState } from 'react'
import { Note } from '@prisma/client'
import { cn } from '~/lib/utils'

const CreateTeamModal: React.FC<{ setmodal: React.Dispatch<React.SetStateAction<boolean>> }> = ({
  setmodal,
}) => {
  const [newNotes, setNewNotes] = useState<Note[]>([])
  const ctx = api.useContext()
  const { mutate: addFragment } = api.fragmentNote.createFragment.useMutation({
    onSuccess: () => {
      toast.success('Fragment created!')
      ctx.fragmentNote.getAllFragments.invalidate()
    },
    onError: () => {
      toast.error('Failed to upload new fragment! Please try again.')
    },
  })

  const form = useForm<z.infer<typeof FragmentOptionalDefaultsSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(FragmentOptionalDefaultsSchema),
    defaultValues: {
      name: '',
    },
  })

  function onSubmit(data: z.infer<typeof FragmentOptionalDefaultsSchema>) {
    addFragment({ ...data, notes: newNotes })
    setNewNotes([])
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
              <FormLabel>Fragment naam</FormLabel>
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
        <Button type="submit" className="mx-3">
          Sla nieuw fragment op
        </Button>
        <Button
          type="button"
          className={cn(buttonVariants({ variant: 'outline' }), 'mx-3 border-green-500 border-2')}
          onClick={() => setmodal(false)}
        >
          Luister Fragment
        </Button>
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
