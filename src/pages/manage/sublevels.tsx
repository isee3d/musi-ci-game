import Head from 'next/head';
import { type NextPage } from 'next';
import { SubLevel } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { api } from '~/utils/api';
import { Button, buttonVariants } from '~/components/ui/button';
import { useState } from 'react';
import ManageBaseModal from '~/components/manage/manageBaseModal';
import { cn } from '~/lib/utils';
import CreateSublevelModal from '~/components/manage/createSublevelModal';

const ManageSublevels: NextPage = () => {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<SubLevel>({ mode: 'onBlur' });
    const { mutate: addSubLevel } = api.sublevel.createSubLevel.useMutation();
    const { mutate: deleteSubLevel } = api.sublevel.deleteSubLevel.useMutation();
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
                    <ManageBaseModal title="Fragment updaten">
                      <UpdateFragmentModal setmodal={setShowModal} fragment={sublevel} />
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
