import { SubLevel } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { LoadingSpinner } from '~/components/loading'
import CreateSublevelModal from '~/components/manage/createSublevelModal'
import ManageBaseModal from '~/components/manage/manageBaseModal'
import UpdateSublevelModal from '~/components/manage/updateSublevelModal'
import { Button, buttonVariants } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'
import { generateServerSideHelper } from '~/server/helpers/serverSideHelper'
import { api } from '~/utils/api'
import { getSSRAuthRedirectOnAdminRole } from '~/utils/authUtils'

const ManageSublevels = () => {
  const ctx = api.useUtils()
  const { mutate: deleteSubLevel, isLoading: isDeletingSublevel } = api.sublevel.deleteSubLevel.useMutation({
    onSuccess: () => {
      toast.success('Sublevel verwijderd!')
      ctx.sublevel.getAllSubLevels.invalidate()
    },
  })
  const subLevelQuery = api.sublevel.getAllSubLevels.useQuery()

  const [createModal, setCreateModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedSubLevel, setSelectedSubLevel] = useState<SubLevel | null>(null)

   const handleDeleteSubLevelClick = (sublevelId: number) => {
     const isConfirmed = window.confirm('Weet je zeker dat je dit level wilt verwijderen?')
     if (isConfirmed) {
       deleteSubLevel({ id: sublevelId })
     }
   }

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="flex grow flex-col items-center justify-center">
        <h1 className="mb-10 py-3 text-center text-4xl font-extrabold tracking-tight ">
          Sublevel maken
        </h1>
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 rounded-2xl border-4">
          <Button onClick={() => setCreateModal(true)} variant="outline">
            Maak Een nieuw sublevel
          </Button>
          {createModal && (
            <ManageBaseModal title="Nieuw Sublevel maken">
              <CreateSublevelModal setmodal={setCreateModal} />
            </ManageBaseModal>
          )}
          <Label className="text-center text-3xl font-bold">Bestaande sublevels</Label>
          <div className="flex w-full flex-col items-center justify-center gap-2">
            {subLevelQuery.data?.map((sublevel) => {
              return (
                <div
                  key={sublevel.id}
                  className="flex w-full min-w-fit flex-col items-center justify-around gap-4 rounded-md border-2 border-primary bg-primary/40 p-4 text-center md:flex-row"
                >
                  <h2 className="text-2xl font-bold">{sublevel.name}</h2>
                  <h2 className="text-xl">{sublevel.description}</h2>
                  <h2 className="text-xl">Kleur: {sublevel.color}</h2>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    {isDeletingSublevel && (
                      <div className="flex items-center justify-center">
                        <LoadingSpinner />
                      </div>
                    )}
                    <Button
                      onClick={() => handleDeleteSubLevelClick(sublevel.id)}
                      className={cn(buttonVariants({ variant: 'destructive', size: 'lg' }), 'px-4')}
                    >
                      verwijderen
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedSubLevel(sublevel)
                        setShowModal(true)
                      }}
                      className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'px-4')}
                    >
                      Aanpassen
                    </Button>
                  </div>
                  {showModal && selectedSubLevel?.id === sublevel.id && (
                    <ManageBaseModal title="Sublevel updaten">
                      <UpdateSublevelModal setmodal={setShowModal} sublevel={sublevel} />
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

export default ManageSublevels

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const auth = await getSSRAuthRedirectOnAdminRole(ctx)

  if (auth.redirect) {
    return { redirect: auth.redirect }
  }

  const helpers = generateServerSideHelper(auth.props.session)
  await helpers.sublevel.getAllSubLevels.prefetch()

  return {
    props: {
      session: auth.props.session,
      trpcState: helpers.dehydrate(),
    },
  }
}
