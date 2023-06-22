import { zodResolver } from '@hookform/resolvers/zod'
import { Fragment, Note } from '@prisma/client'
import Head from 'next/head'
import { FragmentOptionalDefaultsSchema } from 'prisma/generated/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
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

interface BaseStaticModalProps {
  setmodal: React.Dispatch<React.SetStateAction<boolean>>
  fragment: Fragment
}

// const validationRules = {
//   name: { required: 'Note is required.' },
//   description: { required: 'Description is required.' },
// }

const UpdateFragmentModal: React.FC<BaseStaticModalProps> = ({ setmodal, fragment }) => {
  const [newNotes, setNewNotes] = useState<NoteCreate[]>([])
  const ctx = api.useContext()

  const form = useForm<z.infer<typeof FragmentOptionalDefaultsSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(FragmentOptionalDefaultsSchema),
    defaultValues: {
      name: fragment.name,
      description: fragment.description,
    },
  })

  const { mutate: updateFragment } = api.fragmentNote.updateFragment.useMutation({
    onSuccess: () => {
      toast.success('Fragment updated!')
      ctx.fragmentNote.getAllFragments.invalidate()
    },
  })
  const notesOfFragmentQuery = api.fragmentNote.getNotesOfFragment.useQuery(
    { id: fragment.id },
    { onSuccess: (data) => setNewNotes(data) }
  )

  function onSubmit(data: z.infer<typeof FragmentOptionalDefaultsSchema>) {
    updateFragment({ ...data, notes: newNotes, id: fragment.id })
    setNewNotes([])
    form.reset()
    setmodal(false)
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
          {newNotes?.map((note, index) => (
            <ExistingNote key={index} {...note} />
          ))}

          <Button type="submit" className="mx-3">
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
  //   const [newNotes, setNewNotes] = useState<Note[]>([])
  //   const {
  //     register,
  //     handleSubmit,
  //     reset,
  //     formState: { errors, isValid },
  //   } = useForm<Fragment>({ mode: 'onBlur' })

  //   const { mutate: updateFragment } = api.fragmentNote.updateFragment.useMutation()
  //   const notesOfFragmentQuery = api.fragmentNote.getNotesOfFragment.useQuery(
  //     { id: fragment.id },
  //     { onSuccess: (data) => setNewNotes(data) }
  //   )

  //   const onSubmit: SubmitHandler<Fragment> = (data) => {
  //     updateFragment({ ...data, notes: newNotes, id: fragment.id })
  //     setNewNotes([])
  //     reset()
  //     setmodal(false)
  //   }

  //   return (
  //     <>
  //       <Head>
  //         <title>Manage fragments</title>
  //         <meta name="description" content="Level name here" />
  //         <link rel="icon" href="/favicon.ico" />
  //       </Head>

  //       <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
  //         <div className="relative mx-auto my-6 w-auto max-w-3xl">
  //           {/*content*/}
  //           <div className="relative flex w-full flex-col rounded-lg border-0 bg-gray-400 shadow-lg outline-none focus:outline-none">
  //             {/*header*/}
  //             <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
  //               <h3 className="text-3xl font-semibold text-black">Update Fragment</h3>
  //             </div>
  //             <div className="relative flex flex-col justify-center p-6">
  //               <form onSubmit={handleSubmit(onSubmit)}>
  //                 <div className="grid w-full gap-6 md:grid-cols-2">
  //                   <div>
  //                     <label className="mb-2 block text-sm font-medium text-gray-900 ">Name</label>
  //                     <input
  //                       {...register('name', validationRules.name)}
  //                       type="text"
  //                       autoComplete="off"
  //                       id="first_name"
  //                       data-lpignore="true"
  //                       className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
  //                       placeholder="bijv: gelijk: twee gelijke noten"
  //                       value={fragment.name}
  //                       required
  //                     />
  //                     <p className="text-red-600">{errors.name?.message}</p>
  //                   </div>
  //                   <div>
  //                     <label className="mb-2 block text-sm font-medium text-gray-900 ">
  //                       Luister fragment
  //                     </label>
  //                     <button className="rounded-xl bg-blue-500 p-4  hover:bg-white/20 ">
  //                       Luister naar fragment
  //                     </button>
  //                   </div>
  //                   <div>
  //                     <label className="mb-2 block text-sm font-medium text-gray-900 ">
  //                       Omschrijving
  //                     </label>
  //                     <textarea
  //                       {...register('description', validationRules.description)}
  //                       placeholder="Vul hier een omschrijving in"
  //                       autoComplete="off"
  //                       value={fragment.description ?? ''}
  //                       className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
  //                       required
  //                     />
  //                     <p className="text-red-600">{errors.description?.message}</p>
  //                   </div>
  //                 </div>
  //                 {newNotes?.map((note) => (
  //                   <ExistingNote key={note.id + Math.random() * 58} {...note} />
  //                 ))}
  //                 <button
  //                   type="submit"
  //                   disabled={!isValid && newNotes.length > 0}
  //                   className={`m-2 min-w-[50vh] rounded-xl text-white  ${
  //                     isValid && newNotes.length > 0
  //                       ? 'bg-green-500 hover:bg-green-600'
  //                       : 'cursor-not-allowed bg-gray-400'
  //                   }`}
  //                 >
  //                   <h3 className="text-center text-2xl font-bold">Fragment wijzigingen opslaan</h3>
  //                 </button>
  //               </form>
  //               <div className="mt-4 flex flex-col space-y-3 border-4 pt-1 shadow-xl shadow-fuchsia-500">
  //                 <h3 className="text-2xl text-black">Noten toevoegen of verwijderen</h3>
  //                 <NoteCreator setNewNotes={setNewNotes} />
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
  //     </>
  //   )
}

export default UpdateFragmentModal
