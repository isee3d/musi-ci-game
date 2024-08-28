import { Question } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { toast } from 'sonner'
import { LoadingSpinner } from '~/components/loading'
import CreateQuestionModal from '~/components/manage/createQuestionModal'
import ManageBaseModal from '~/components/manage/manageBaseModal'
import { Button, buttonVariants } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'
import { generateServerSideHelper } from '~/server/helpers/serverSideHelper'
import { api } from '~/utils/api'
import { getSSRAuthRedirectOnAdminRole } from '~/utils/authUtils'

const ManageQuestionsPage = () => {
  const ctx = api.useUtils()
  const questionsQuery = api.question.getAllQuestions.useQuery()
  const { mutate: deleteQuestion, isLoading: isDeletingQuestion } =
    api.question.deleteQuestion.useMutation({
      onSuccess: () => {
        toast.success('vraag verwijderd!')
        ctx.question.getAllQuestions.invalidate()
      },
      onError: () => {
        toast.error('er is iets misgegaan')
      },
    })

  const handleDeleteQuestionClick = (questionId: number) => {
    const isConfirmed = window.confirm('Weet je zeker dat je deze vraag wilt verwijderen?')
    if (isConfirmed) {
      deleteQuestion({ id: questionId })
    }
  }

  const [createModal, setCreateModal] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)

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

          <Label className="py-4 text-center text-3xl font-bold">Bestaande vragen</Label>
          <div className="flex w-full flex-col items-center justify-center gap-2">
            {questionsQuery.data?.map((question) => {
              return (
                <div
                  key={question.id}
                  className="flex w-full min-w-fit flex-col items-center justify-around gap-4 rounded-md border-2 border-primary bg-primary/40 p-4 text-center md:flex-row"
                >
                  <h2 className="text-2xl font-bold">{question.question}</h2>
                  <div className="flex flex-col gap-3 md:flex-row">
                    {isDeletingQuestion && (
                      <div className="flex items-center justify-center">
                        <LoadingSpinner />
                      </div>
                    )}
                    <Button
                      onClick={() => handleDeleteQuestionClick(question.id)}
                      className={cn(buttonVariants({ variant: 'destructive', size: 'lg' }), 'px-4')}
                    >
                      verwijderen
                    </Button>
                    {/* <Button
                      onClick={() => {
                        setSelectedQuestion(question)
                        setCreateModal(true)
                      }}
                      className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'px-4')}
                    >
                      Aanpassen
                    </Button> */}
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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const auth = await getSSRAuthRedirectOnAdminRole(ctx)
  if (auth.redirect) {
    return { redirect: auth.redirect }
  }

  const helpers = generateServerSideHelper(auth.props.session)
  await helpers.question.getAllQuestions.prefetch()

  return {
    props: {
      session: auth.props.session,
      trpcState: helpers.dehydrate(),
    },
  }
}
