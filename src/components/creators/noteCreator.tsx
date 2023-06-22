import { useNoteStore } from '~/stores/useNotesStore'
import { api } from '~/utils/api'
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

// const validationRules = {
//   name: { required: 'Note is required.' },
//   time: {
//     required: 'StartTime is required.',
//     pattern: { value: /^[0-9]+$/, message: 'Duration must be a number.' },
//     min: { value: 0, message: 'Duration must be higher than 0' },
//     setValueAs: (value: any) => parseInt(value),
//   },
//   duration: {
//     required: 'Note length is required.',
//     pattern: { value: /^[0-9]+$/, message: 'Duration must be a number.' },
//     min: { value: 0, message: 'Duration must be higher than 0' },
//     setValueAs: (value: any) => parseInt(value),
//   },
//   speed: {
//     required: 'Volume is required.',
//     pattern: { value: /^[0-9]+$/, message: 'Volume must be a number.' },
//     min: { value: 0, message: 'Volume must be higher than 0' },
//     setValueAs: (value: any) => parseInt(value),
//   },
// };

const NoteCreator: React.FC<{ setNewNotes: Dispatch<SetStateAction<NoteCreate[]>> }> = ({
  setNewNotes,
}) => {
  // const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<Note>({
  //   mode: 'onBlur',
  // });

  // const onSubmit: SubmitHandler<Note> = (data) => {
  //   toast.success("Note created!")
  //   // addNewNote(data);
  //   setNewNotes((prev) => [...prev, data]);
  //   reset();
  // }

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
    console.log('my log' + data)
    setNewNotes((prev) => [...prev, data])
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
                <Input placeholder="C4" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
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
        />
        <FormField
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
        />
        <FormField
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
        />

        <Button type="submit" className="mx-3">
          Voeg note toe
        </Button>
      </form>
    </Form>
    // <form onSubmit={ handleSubmit(onSubmit) }
    //   className="m-2 flex w-full items-start space-x-4 rounded-lg shadow-md">
    //   <div>
    //     <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Noot</label>
    //     <input
    //       { ...register("name", validationRules.name) }
    //       placeholder="Bijv: C4"
    //       type='text'
    //       autoComplete='off'
    //       className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
    //     <p className='text-red-600'>{ errors.name?.message }</p>
    //   </div>

    //   <div>
    //     <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Starttijd</label>
    //     <input
    //       { ...register("time", validationRules.time) }
    //       placeholder="Bijv: 0"
    //       type='number'
    //       onKeyDown={ (evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault() }
    //       autoComplete='off'
    //       className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
    //     <p className='text-red-600'>{ errors.time?.message }</p>
    //   </div>

    //   <div>
    //     <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Duur</label>
    //     <input { ...register("duration", validationRules.duration) }
    //       type='number'
    //       placeholder="Bijv: 0"
    //       autoComplete='off'
    //       onKeyDown={ (evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault() }
    //       className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
    //     <p className='text-red-600'>{ errors.duration?.message }</p>
    //   </div>

    //   <div>
    //     <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Volume</label>
    //     <input
    //       { ...register("speed", validationRules.speed) }
    //       type='number'
    //       placeholder="Bijv: 0"
    //       autoComplete='off'
    //       onKeyDown={ (evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault() }
    //       className="block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
    //     <p className='text-red-600'>{ errors.speed?.message }</p>
    //   </div>

    //   <button
    //     type='button'
    //     disabled={ !isValid }
    //     className={ `mt-4 rounded-xl p-4 text-white ${isValid ? 'bg-green-500 hover:bg-green-600' : 'cursor-not-allowed bg-gray-400'}` }>
    //     Add to fragment
    //   </button>
    // </form>
  )
}

export default NoteCreator
