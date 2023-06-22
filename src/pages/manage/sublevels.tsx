import Head from 'next/head';
import { type NextPage } from 'next';
import { SubLevel } from '@prisma/client';
import { api } from '~/utils/api';
import { Button, buttonVariants } from '~/components/ui/button';
import { useState } from 'react';
import ManageBaseModal from '~/components/manage/manageBaseModal';
import { cn } from '~/lib/utils';
import CreateSublevelModal from '~/components/manage/createSublevelModal';
import UpdateSublevelModal from '~/components/manage/updateSublevelModal';
import toast from 'react-hot-toast';

const ManageSublevels: NextPage = () => {
  const ctx = api.useContext();
    const { mutate: deleteSubLevel } = api.sublevel.deleteSubLevel.useMutation({
        onSuccess: () => {
            toast.success('Sublevel verwijderd!');
            ctx.sublevel.getAllSubLevels.invalidate();
        }
    });
    const subLevelQuery = api.sublevel.getAllSubLevels.useQuery();

    const [createModal, setCreateModal] = useState(false)
    const [showModal, setShowModal] = useState(false)
     const [selectedSubLevel, setSelectedSubLevel] = useState<SubLevel | null>(null)

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
        <div className="container mx-auto flex flex-col items-center justify-center rounded-2xl border-4">
          <Button onClick={() => setCreateModal(true)} variant="outline">
            Maak Een nieuw sublevel
          </Button>
          {createModal && (
            <ManageBaseModal title="Nieuw Sublevel maken">
              <CreateSublevelModal setmodal={setCreateModal} />
            </ManageBaseModal>
          )}
          <div className="flex w-full flex-col gap-y-4 py-4">
            {subLevelQuery.data?.map((sublevel) => {
              return (
                <div
                  key={sublevel.id}
                  className="grid min-w-full grid-cols-[1fr,auto,auto,auto,auto] items-center gap-4 rounded-md border-2 border-primary bg-primary/40 p-4"
                >
                  <h2 className="text-2xl font-bold">{sublevel.name}</h2>
                  <h2 className="text-xl">{sublevel.description}</h2>
                  <Button
                    onClick={() => deleteSubLevel({ id: sublevel.id })}
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
};

export default ManageSublevels;
