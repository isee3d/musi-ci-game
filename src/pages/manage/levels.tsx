import { Level } from '@prisma/client'
import { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import CreateLevelModal from '~/components/manage/createLevelModal'
import ManageBaseModal from '~/components/manage/manageBaseModal'
import UpdateLevelModal from '~/components/manage/updateLevelModal'
import { Button, buttonVariants } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { useRequireAdminRole } from '~/hooks/useRequireAdminRole'
import { useRequireAuth } from '~/hooks/useRequireAuth'
import { cn } from '~/lib/utils'
import { api } from '~/utils/api'

const ManageLevels: NextPage = () => {
  useRequireAuth()
  useRequireAdminRole()

   const ctx = api.useContext()
  const { mutate: deleteLevel } = api.level.deleteLevel.useMutation({
    onSuccess: () => {
      ctx.level.getAllLevels.invalidate()
    },
  })
  const levelQuery = api.level.getAllLevels.useQuery()
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
          <Label className="text-3xl font-bold">Bestaande Levels</Label>
          {levelQuery.data?.map((level) => {
            return (
              <div
                key={level.id}
                className="grid min-w-full grid-cols-[1fr,auto,auto,auto,auto] items-center gap-4 rounded-md border-2 border-primary bg-primary/40 p-4"
              >
                <h2 className="text-2xl font-bold">{level.name}</h2>
                <h2 className="text-xl">{level.description}</h2>
                <h2 className="text-xl">Kleur: {level.color}</h2>
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
