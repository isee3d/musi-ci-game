import { Level } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { LoadingSpinner } from '~/components/loading'
import CreateLevelModal from '~/components/manage/createLevelModal'
import ManageBaseModal from '~/components/manage/manageBaseModal'
import UpdateLevelModal from '~/components/manage/updateLevelModal'
import { Button, buttonVariants } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'
import { generateServerSideHelper } from '~/server/helpers/serverSideHelper'
import { api } from '~/utils/api'
import { getSSRAuthRedirectOnAdminRole } from '~/utils/authUtils'

const ManageLevels = () => {
  const ctx = api.useUtils()
  const { mutate: deleteLevel, isLoading: isDeletingLevel } = api.level.deleteLevel.useMutation({
    onSuccess: () => {
      ctx.level.getAllLevels.invalidate()
    },
  })
  const levelQuery = api.level.getAllLevels.useQuery()

  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [createModal, setCreateModal] = useState(false)

  const handleDeleteLevelClick = (levelId: number) => {
    const isConfirmed = window.confirm('Weet je zeker dat je dit level wilt verwijderen?')
    if (isConfirmed) {
      deleteLevel({ id: levelId })
    }
  }

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
          <Label className="text-center text-3xl font-bold">Bestaande Levels</Label>
          <div className="flex w-full flex-col items-center justify-center gap-2">
            {levelQuery.data?.map((level) => {
              return (
                <div
                  key={level.id}
                  className="flex w-full min-w-fit flex-col items-center justify-around gap-4 rounded-md border-2 border-primary bg-primary/40 p-4 text-center md:flex-row"
                >
                  <h2 className="text-2xl font-bold">{level.name}</h2>
                  <h2 className="text-xl">{level.description}</h2>
                  <h2 className="text-xl">{level.points}</h2>
                  <div className="flex justify-center gap-2">
                    <h2 className="flex flex-col justify-center  text-xl">Kleur: </h2>
                    <div
                      className="size-12 rounded-full"
                      style={{
                        backgroundColor: level.color ?? 'black',
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-3 md:flex-row">
                    {isDeletingLevel && (
                      <div className="flex items-center justify-center">
                        <LoadingSpinner />
                      </div>
                    )}
                    <Button
                      onClick={() => handleDeleteLevelClick(level.id)}
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
                  </div>

                  {showModal && selectedLevel?.id === level.id && (
                    <ManageBaseModal title="Level aanpassen">
                      <UpdateLevelModal setmodal={setShowModal} level={selectedLevel} />
                    </ManageBaseModal>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default ManageLevels

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const auth = await getSSRAuthRedirectOnAdminRole(ctx)
  if (auth.redirect) {
    return { redirect: auth.redirect }
  }

  const helpers = generateServerSideHelper(auth.props.session)
  await helpers.level.getAllLevels.prefetch()

  return {
    props: {
      session: auth.props.session,
      trpcState: helpers.dehydrate(),
    },
  }
}
