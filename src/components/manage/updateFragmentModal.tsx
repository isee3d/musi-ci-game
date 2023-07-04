import { zodResolver } from '@hookform/resolvers/zod'
import { Fragment } from '@prisma/client'
import { FragmentOptionalDefaultsSchema } from 'prisma/generated/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { NoteCreate } from 'types/Note'
import { z } from 'zod'
import NoteCreator from '~/components/creators/noteCreator'
import { ExistingNote } from '~/components/existingNote'
import { api } from '~/utils/api'
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
import { cn } from '~/lib/utils'
import { fragmentFormSchema } from 'types/FormSchema'
import { Checkbox } from '~/components/ui/checkbox'

interface BaseStaticModalProps {
  setmodal: React.Dispatch<React.SetStateAction<boolean>>
  fragment: Fragment
}

const UpdateFragmentModal: React.FC<BaseStaticModalProps> = ({ setmodal, fragment }) => {
  const [newNotes, setNewNotes] = useState<NoteCreate[]>([])
  const ctx = api.useContext()

  const fragmentQuery = api.fragmentNote.getAllFragments.useQuery()

  const form = useForm<z.infer<typeof fragmentFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(fragmentFormSchema),
    defaultValues: {
      name: fragment.name,
      description: fragment.description,
      useAlways: fragment.useAlways ?? undefined,
    },
  })

  const { mutate: updateFragment } = api.fragmentNote.updateFragment.useMutation({
    onSuccess: () => {
      toast.success('Fragment updated!')
      ctx.fragmentNote.getAllFragments.invalidate()
    },
    onError: () => {
      toast.error('Failed to update fragment! Please try again.')
    },
  })
  const notesOfFragmentQuery = api.fragmentNote.getNotesOfFragment.useQuery(
    { id: fragment.id },
    { onSuccess: (data) => setNewNotes(data) }
  )

  function onSubmit(data: z.infer<typeof fragmentFormSchema>) {
    const exists = fragmentQuery.data?.find((f) => f.name === data.name && f.id !== fragment.id)
    if (!exists) {
      updateFragment({ ...data, notes: newNotes, id: fragment.id })
      setNewNotes([])
      form.reset()
      setmodal(false)
    }
    else{
      toast.error('Er is al een fragment met deze naam!')
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
                <FormLabel>Altijd zichtbaar</FormLabel>
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
            <ExistingNote key={index} {...note} />
          ))}

          <Button type="submit" className="mx-3" disabled={newNotes.length === 0}>
            Sla veranderingen op
          </Button>
          <Button
            type="button"
            className={cn(buttonVariants({ variant: 'outline' }), 'mx-3 border-2 border-green-500')}
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
      <div className="mt-4 flex flex-col space-y-3 border-4 pt-1 shadow-xl shadow-fuchsia-500">
        <h3 className="text-2xl">Noten toevoegen of verwijderen</h3>
        <NoteCreator setNewNotes={setNewNotes} />
      </div>
    </>
  )
}

export default UpdateFragmentModal
