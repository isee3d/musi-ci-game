import Head from 'next/head'
import { type NextPage } from 'next'
import { api } from '~/utils/api'
import { useState } from 'react'
import { Button, buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import ManageBaseModal from '~/components/manage/manageBaseModal'
import { useRequireAuth } from '~/hooks/useRequireAuth'
import { useRequireAdminRole } from '~/hooks/useRequireAdminRole'
import { Label } from '~/components/ui/label'
import CreateQuestionModal from '~/components/manage/createQuestionModal'
import toast from 'react-hot-toast'

const ManageQuestionsPage: NextPage = () => {
  useRequireAuth()
  useRequireAdminRole()
  const ctx = api.useContext()
  const questionsQuery = api.question.getAllQuestions.useQuery()
  const { mutate: deleteQuestion } = api.question.deleteQuestion.useMutation({
    onSuccess: () => {
      toast.success('vraag verwijderd!')
      ctx.question.getAllQuestions.invalidate()
    },
    onError: () => {
      toast.error('er is iets misgegaan')
    },
  })

  const [createModal, setCreateModal] = useState(false)

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="manage team" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="flex grow flex-col items-center justify-center">
        <h2 className="mb-10 py-3 text-center text-4xl font-extrabold tracking-tight">
          Vragen beheren
        </h2>

        <div className="container mx-auto flex w-1/2 flex-col items-center rounded border-2 p-4 shadow">
          <Button onClick={() => setCreateModal(true)} variant="outline">
            Maak nieuwe vraag
          </Button>
          {createModal && (
            <ManageBaseModal title="Nieuwe vraag maken">
              <CreateQuestionModal setmodal={setCreateModal} />
            </ManageBaseModal>
          )}

          <Label className="text-center text-3xl py-4 font-bold">Bestaande vragen</Label>
          <div className="flex w-full flex-col items-center justify-center gap-2">
            {questionsQuery.data?.map((question) => {
              return (
                <div
                  key={question.id}
                  className="flex w-full min-w-fit flex-col items-center justify-around gap-4 rounded-md border-2 border-primary bg-primary/40 p-4 text-center md:flex-row"
                >
                  <h2 className="text-2xl font-bold">{question.question}</h2>
                  <div className="flex flex-col gap-3 md:flex-row">
                    <Button
                      onClick={() => deleteQuestion({ id: question.id })}
                      className={cn(buttonVariants({ variant: 'destructive', size: 'lg' }), 'px-4')}
                    >
                      verwijderen
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default ManageQuestionsPage
