import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import React, { Dispatch, SetStateAction } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { z } from 'zod'
import { NoteOptionalDefaultsSchema, NoteSchema } from 'prisma/generated/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { NoteCreate } from 'types/Note'
import { nanoid } from 'nanoid'

const NoteCreator: React.FC<{ newNotes: NoteCreate[], setNewNotes: Dispatch<SetStateAction<NoteCreate[]>> }> = ({
  setNewNotes, newNotes
}) => {

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    time: z.number().min(0),
    duration: z.number().min(0),
    speed: z.number().min(0),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      time: 0,
      duration: 0,
      speed: 0,
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    const newNote = {
      noteId: nanoid(),
      name: data.name,
      speed: 1,
      duration: 120,
      time: newNotes.length > 0 ? newNotes.length * 120 : 0,
    }
    setNewNotes((prev) => [...prev, newNote])
    toast.success('Note toegevoegd!')
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note naam</FormLabel>
              <FormControl>
                <Input placeholder="Bijv.. C4" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  onKeyDown={(evt) =>
                    ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                  }
                  placeholder="time"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value ?? 0))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="speed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Speed</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="speed"
                  onKeyDown={(evt) =>
                    ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                  }
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value ?? 0))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="duration"
                  onKeyDown={(evt) =>
                    ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                  }
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value ?? 0))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Button type="submit" className="mx-3">
          Voeg note toe
        </Button>
      </form>
    </Form>
  )
}

export default NoteCreator
