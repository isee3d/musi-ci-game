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
import { cn } from '~/lib/utils'
import NoteCreator from '~/components/creators/noteCreator'
import { ExistingNote } from '~/components/existingNote'
import { NoteCreate } from 'types/Note'
import { fragmentFormSchema } from 'types/FormSchema'
import { Checkbox } from '~/components/ui/checkbox'

const CreateFragmentModal: React.FC<{
  setmodal: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setmodal }) => {
  const [newNotes, setNewNotes] = useState<NoteCreate[]>([])
  const ctx = api.useContext()

  const FragmentQuery = api.fragmentNote.getAllFragments.useQuery()

  const { mutate: addFragment } = api.fragmentNote.createFragment.useMutation({
    onSuccess: () => {
      toast.success('Fragment created!')
      ctx.fragmentNote.getAllFragments.invalidate()
    },
    onError: () => {
      toast.error('Failed to upload new fragment! Please try again.')
    },
  })

  const form = useForm<z.infer<typeof fragmentFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(fragmentFormSchema),
    defaultValues: {
      name: '',
      useAlways: false,
    },
  })

  function onSubmit(data: z.infer<typeof fragmentFormSchema>) {
    const exists = FragmentQuery.data?.find((fragment) => fragment.name === data.name)
    if (!exists) {
      addFragment({ ...data, notes: newNotes })
      setNewNotes([])
      form.reset()
      setmodal(false)
    } else {
      toast.error('Fragment name already exists!')
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fragment naam</FormLabel>
                <FormControl>
                  <Input placeholder="Fragment 1" {...field} />
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
          <FormField
            control={form.control}
            name="useAlways"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="px-2">Altijd zichtbaar</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(event) => field.onChange(event as boolean)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {newNotes?.map((note, index) => (
            <ExistingNote key={index} props={note} setNewNotes={setNewNotes} />
          ))}

          <Button type="submit" className="mx-3" disabled={newNotes.length === 0}>
            Sla nieuw fragment op
          </Button>
          {/* <Button
            type="button"
            className={cn(buttonVariants({ variant: 'outline' }), 'mx-3 border-2 border-green-500')}
            onClick={() => setmodal(false)}
          >
            Luister Fragment
          </Button> */}
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
      <div className="mt-4 flex flex-col space-y-3 border-4 pt-1 shadow-xl shadow-fuchsia-500">
        <h3 className="text-2xl">Noten toevoegen of verwijderen</h3>
        <NoteCreator newNotes={newNotes} setNewNotes={setNewNotes} />
      </div>
    </>
  )
}

export default CreateFragmentModal
