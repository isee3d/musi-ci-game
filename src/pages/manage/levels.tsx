import { Fragment, Level, SubLevel } from '@prisma/client'
import { NextPage } from 'next'
import Head from 'next/head'
import { FragmentOptionalDefaultsWithRelations, FragmentWithRelations } from 'prisma/generated/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import NoteCreator from '~/components/creators/noteCreator'
import CreateLevelModal from '~/components/manage/createLevelModal'
import ManageBaseModal from '~/components/manage/manageBaseModal'
import UpdateLevelModal from '~/components/manage/updateLevelModal'
import { Button, buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { api } from '~/utils/api'

const validationRules = {
  name: { required: 'Note is required.' },
  description: { required: 'Description is required.' },
}

const ManageLevels: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Level>({ mode: 'onBlur' })
  const { mutate: addLevel } = api.level.createLevel.useMutation()
  const { mutate: deleteLevel } = api.level.deleteLevel.useMutation()
  const subLevelQuery = api.sublevel.getAllSubLevels.useQuery()
  const levelQuery = api.level.getAllLevels.useQuery()
  const [addedSubLevels, setAddedSubLevels] = useState<SubLevel[]>([])
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [createModal, setCreateModal] = useState(false)

  return (
    <>
      <Head>
        <title>Manage levels</title>
        <meta name="description" content="Level name here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="flex grow flex-col items-center justify-center">
        <h2 className="mb-10 py-3 text-center text-4xl font-extrabold tracking-tight">
          Levels beheren
        </h2>

        <div className="container mx-auto flex w-1/2 flex-col items-center gap-4 rounded border-2 p-4 shadow">
          <Button onClick={() => setCreateModal(true)} variant="outline">
            Maak nieuw Level
          </Button>
          {createModal && (
            <ManageBaseModal title="Nieuw Level maken">
              <CreateLevelModal setmodal={setCreateModal} />
            </ManageBaseModal>
          )}
          {levelQuery.data?.map((level) => {
            return (
              <div
                key={level.id}
                className="grid min-w-full grid-cols-[1fr,auto,auto,auto,auto] items-center gap-4 rounded-md border-2 border-primary bg-primary/40 p-4"
              >
                <h2 className="text-2xl font-bold">{level.name}</h2>
                <h2 className="text-xl">{level.description}</h2>
                <Button
                  onClick={() => deleteLevel({ id: level.id })}
                  className={cn(buttonVariants({ variant: 'destructive', size: 'lg' }), 'px-4')}
                >
                  verwijderen
                </Button>
                <Button
                  onClick={() => {
                    setSelectedLevel(level)
                    setShowModal(true)
                  }}
                  className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'px-4')}
                >
                  Aanpassen
                </Button>
                {showModal && selectedLevel?.id === level.id && (
                  <ManageBaseModal title="Level aanpassen">
                    <UpdateLevelModal setmodal={setShowModal} level={selectedLevel} />
                  </ManageBaseModal>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default ManageLevels
