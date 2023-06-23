import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'prisma/generated/zod'
import { useState } from 'react'
import toast from 'react-hot-toast'
import CreateFragmentModal from '~/components/manage/createFragmentModal'
import ManageBaseModal from '~/components/manage/manageBaseModal'
import UpdateFragmentModal from '~/components/manage/updateFragmentModal'
import { Button, buttonVariants } from '~/components/ui/button'
import { useRequireAuth } from '~/hooks/useRequireAuth'
import { cn } from '~/lib/utils'
import { api } from '~/utils/api'

const ManageFragments: NextPage = () => {
  const session = useRequireAuth()

  const ctx = api.useContext()
  const [createModal, setCreateModal] = useState(false)
  const fragmentQuery = api.fragmentNote.getAllFragments.useQuery()
  const { mutate: deleteFragment } = api.fragmentNote.deleteFragment.useMutation({
    onSuccess: () => {
      toast.success('Fragment verwijderd!')
      ctx.fragmentNote.getAllFragments.invalidate()
    },
  })
  const [selectedFragment, setSelectedFragment] = useState<Fragment | null>(null)
  const [showModal, setShowModal] = useState(false)

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
          <div className="flex w-full flex-col gap-y-4 py-4">
            {fragmentQuery.data?.map((fragment) => {
              return (
                <div
                  key={fragment.id}
                  className="grid min-w-full grid-cols-[1fr,auto,auto,auto,auto] items-center gap-4 rounded-md border-2 border-primary bg-primary/40 p-4"
                >
                  <h2 className="text-2xl font-bold">{fragment.name}</h2>
                  <h2 className="text-xl">{fragment.description}</h2>
                  <Button
                    onClick={() => deleteFragment({ id: fragment.id })}
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
