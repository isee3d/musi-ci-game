import { FragmentGroup } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import toast from 'react-hot-toast'
import CreateFragmentGroupModal from '~/components/manage/createFragmentGroupModal'
import ManageBaseModal from '~/components/manage/manageBaseModal'
import UpdateFragmentGroupModal from '~/components/manage/updateFragmentGroupModal'
import { Button, buttonVariants } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'
import { generateServerSideHelper } from '~/server/helpers/serverSideHelper'
import { api } from '~/utils/api'
import { getSSRAuthRedirectOnAdminRole } from '~/utils/authUtils'

const ManageFragmentGroupPage = () => {
  const ctx = api.useContext()
  const fragmentGroupQuery = api.fragmentNote.getAllFragmentGroups.useQuery()

  const { mutate: deleteFragmentGroup } = api.fragmentNote.deleteFragmentGroup.useMutation({
    onSuccess: () => {
      toast.success('Fragment groep verwijderd')
      ctx.fragmentNote.getAllFragmentGroups.invalidate()
    }
  })

  const [showModal, setShowModal] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [selectedFragmentGroup, setSelectedFragmentGroup] = useState<FragmentGroup | null>(null)

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="manage fragment groups" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="flex grow flex-col items-center justify-center">
        <h2 className="mb-10 py-3 text-center text-4xl font-extrabold tracking-tight">
          Fragmment groepen beheren
        </h2>

        <div className="container mx-auto flex w-1/2 flex-col items-center rounded border-2 p-4 shadow">
          <Button onClick={() => setCreateModal(true)} variant="outline">
            Maak nieuwe fragment groep
          </Button>
          {createModal && (
            <ManageBaseModal title="Nieuwe fragment groep maken">
              <CreateFragmentGroupModal setmodal={setCreateModal} />
            </ManageBaseModal>
          )}

          <Label className="text-center text-3xl font-bold">Bestaande Fragment groepen</Label>
          <div className="flex w-full flex-col items-center justify-center gap-2">
            {fragmentGroupQuery.data?.map((fragmentGroup) => {
              return (
                <div
                  key={fragmentGroup.id}
                  className="flex w-full min-w-fit flex-col items-center justify-around gap-4 rounded-md border-2 border-primary bg-primary/40 p-4 text-center md:flex-row"
                >
                  <h2 className="text-2xl font-bold">{fragmentGroup.name}</h2>
                  <h2 className="text-xl">{fragmentGroup.description}</h2>
                  <div className="flex flex-col gap-3 md:flex-row">
                    <Button
                      onClick={() => deleteFragmentGroup({ id: fragmentGroup.id })}
                      className={cn(buttonVariants({ variant: 'destructive', size: 'lg' }), 'px-4')}
                    >
                      verwijderen
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedFragmentGroup(fragmentGroup)
                        setShowModal(true)
                      }}
                      className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'px-4')}
                    >
                      Aanpassen
                    </Button>
                  </div>
                  {showModal && selectedFragmentGroup?.id === fragmentGroup.id && (
                    <ManageBaseModal title="Fragment groep aanpassen">
                      <UpdateFragmentGroupModal setmodal={setShowModal} fragmentGroup={fragmentGroup} />
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

export default ManageFragmentGroupPage


export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const auth = await getSSRAuthRedirectOnAdminRole(ctx)
  if (auth.props?.session) {
    const helpers = generateServerSideHelper(auth.props.session)
    await helpers.fragmentNote.getAllFragmentGroups.prefetch()

    return {
      props: {
        session: auth.props.session,
        trpcState: helpers.dehydrate(),
      },
    }
  }

  return {
    props: {
      session: null,
    },
  }
}
