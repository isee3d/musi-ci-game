import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { Fragment } from 'prisma/generated/zod'
import { useState } from 'react'
import { toast } from 'sonner'
import { LoadingSpinner } from '~/components/loading'
import CreateFragmentModal from '~/components/manage/createFragmentModal'
import ManageBaseModal from '~/components/manage/manageBaseModal'
import UpdateFragmentModal from '~/components/manage/updateFragmentModal'
import { Button, buttonVariants } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'
import { generateServerSideHelper } from '~/server/helpers/serverSideHelper'
import { api } from '~/utils/api'
import { getSSRAuthRedirectOnAdminRole } from '~/utils/authUtils'

const ManageFragments = () => {
  const ctx = api.useUtils()
  const fragmentQuery = api.fragmentNote.getAllFragments.useQuery()
  const { mutate: deleteFragment, isLoading: isDeletingFragment } = api.fragmentNote.deleteFragment.useMutation({
    onSuccess: () => {
      toast.success('Fragment verwijderd!')
      ctx.fragmentNote.getAllFragments.invalidate()
      ctx.fragmentNote.getAllFragmentGroups.invalidate()
      ctx.level.getAllLevels.invalidate()
    },
  })

  const [createModal, setCreateModal] = useState(false)
  const [selectedFragment, setSelectedFragment] = useState<Fragment | null>(null)
  const [showModal, setShowModal] = useState(false)

    const handleDeleteFragmentClick = (fragmentId: number) => {
      const isConfirmed = window.confirm('Weet je zeker dat je deze speler wilt verwijderen?')
      if (isConfirmed) {
        deleteFragment({ id: fragmentId })
      }
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
          Fragment beheren
        </h1>
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 rounded-2xl border-4">
          <Button onClick={() => setCreateModal(true)} variant="outline">
            Maak een nieuw fragment
          </Button>
          {createModal && (
            <ManageBaseModal title="Nieuw Fragment maken">
              <CreateFragmentModal setmodal={setCreateModal} />
            </ManageBaseModal>
          )}
          <Label className="text-center text-3xl font-bold">Bestaande fragmenten</Label>
          <div className="flex w-full flex-col justify-around gap-2">
            {fragmentQuery.data?.map((fragment) => {
              return (
                <div
                  key={fragment.id}
                  className="flex w-full min-w-fit flex-col items-center justify-around gap-4 rounded-md border-2 border-primary bg-primary/40 p-4 text-center md:flex-row"
                >
                  <h2 className="text-2xl font-bold">{fragment.name}</h2>
                  <h2 className="text-xl">{fragment.description}</h2>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    {isDeletingFragment && (
                      <div className="flex items-center justify-center">
                        <LoadingSpinner />
                      </div>
                    )}
                    <Button
                      onClick={() => handleDeleteFragmentClick(fragment.id)}
                      className={cn(buttonVariants({ variant: 'destructive', size: 'lg' }), 'px-4')}
                    >
                      verwijderen
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedFragment(fragment)
                        setShowModal(true)
                      }}
                      className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'px-4')}
                    >
                      Aanpassen
                    </Button>
                  </div>
                  {showModal && selectedFragment?.id === fragment.id && (
                    <ManageBaseModal title="Fragment updaten">
                      <UpdateFragmentModal setmodal={setShowModal} fragment={fragment} />
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

export default ManageFragments

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const auth = await getSSRAuthRedirectOnAdminRole(ctx)
  if (auth.redirect) {
    return { redirect: auth.redirect }
  }

  const helpers = generateServerSideHelper(auth.props.session)
  await helpers.fragmentNote.getAllFragments.prefetch()

  return {
    props: {
      session: auth.props.session,
      trpcState: helpers.dehydrate(),
    },
  }
}
