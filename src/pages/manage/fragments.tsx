// import { Fragment, Note } from '@prisma/client'
import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment, Note } from 'prisma/generated/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import NoteCreator from '~/components/creators/noteCreator'
import { ExistingNote } from '~/components/existingNote'
import CreateFragmentModal from '~/components/manage/createFragmentModal'
import ManageBaseModal from '~/components/manage/manageBaseModal'
import UpdateFragmentModal from '~/components/manage/updateFragmentModal'
import { Button } from '~/components/ui/button'
import { api } from '~/utils/api'

const validationRules = {
  name: { required: 'Note is required.' },
  description: { required: 'Description is required.' },
}

const ManageFragments: NextPage = () => {
  const [createModal, setCreateModal] = useState(false)
  const [newNotes, setNewNotes] = useState<Note[]>([])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Fragment>({ mode: 'onBlur' })

  const { mutate } = api.fragmentNote.createFragment.useMutation({
    onSuccess: () => {
      toast.success('Fragment created!')
    },
    onError: () => {
      toast.error('Failed to upload new fragment! Please try again.')
    },
  })

  const fragmentQuery = api.fragmentNote.getAllFragments.useQuery()
  const { mutate: deleteFragment } = api.fragmentNote.deleteFragment.useMutation()
  const [selectedFragment, setSelectedFragment] = useState<Fragment | null>(null)
  const [showModal, setShowModal] = useState(false)

  const onSubmit: SubmitHandler<Fragment> = (data) => {
    mutate({ ...data, notes: newNotes })
    setNewNotes([])
    reset()
  }

  return (
    <>
      <Head>
        <title>Manage fragments</title>
        <meta name="description" content="Level name here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="flex grow flex-col items-center justify-center">
        <h1 className="mb-10 py-3 text-center text-4xl font-extrabold tracking-tight ">
          Fragment maken
        </h1>
        <div className="container mx-auto flex flex-col items-center justify-center rounded-2xl border-4">
          <Button onClick={() => setCreateModal(true)} variant="outline">
            Maak Een nieuw fragment
          </Button>
          {createModal && (
            <ManageBaseModal title="Nieuw Fragment maken">
              <CreateFragmentModal setmodal={setCreateModal} />
            </ManageBaseModal>
          )}
          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Name
                </label>
                <input
                  {...register('name', validationRules.name)}
                  type="text"
                  autoComplete="off"
                  id="first_name"
                  data-lpignore="true"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="bijv: gelijk: twee gelijke noten"
                  required
                />
                <p className="text-red-600">{errors.name?.message}</p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Luister fragment
                </label>
                <button className="rounded-xl bg-white/10 p-4  hover:bg-white/20 ">
                  Luister naar fragment
                </button>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium ">
                  Omschrijving
                </label>
                <textarea
                  {...register('description', validationRules.description)}
                  placeholder="Vul hier een omschrijving in"
                  autoComplete="off"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                />
                <p className="text-red-600">{errors.description?.message}</p>
              </div>
            </div>
            {newNotes?.map((note) => (
              <ExistingNote key={note.id + Math.random() * 58} {...note} />
            ))}
            <button
              type="submit"
              disabled={!isValid && newNotes.length > 0}
              className={`m-2 min-w-[50vh] rounded-xl ${
                isValid && newNotes.length > 0
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'cursor-not-allowed bg-gray-400'
              }`}
            >
              <h3 className="text-center text-2xl font-bold">Fragment opslaan</h3>
            </button>
          </form> */}

          {/* Show all exisiting fragments with a delete button and a update button */}
          <div className="h-fit w-full border-4">
            {fragmentQuery.data?.map((fragment: Fragment) => (
              <div key={fragment.id} className="flex items-center justify-center space-x-4">
                <h3 className="text-2xl font-bold">{fragment.name}</h3>
                <p className="text-xl">{fragment.description}</p>
                <button
                  onClick={() => deleteFragment({ id: fragment.id })}
                  className="rounded-xl bg-red-500 p-2 hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setSelectedFragment(fragment)
                    setShowModal(true)
                  }}
                  className="rounded-xl bg-green-500 p-2 hover:bg-green-600"
                >
                  Update
                </button>
                {showModal && selectedFragment?.id === fragment.id && (
                  <UpdateFragmentModal setmodal={setShowModal} fragment={fragment} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ManageFragments
