import { GameMode } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { LoadingPage } from '~/components/loading'
import { generateServerSideHelper } from '~/server/helpers/serverSideHelper'
import { api } from '~/utils/api'
import { getSSRAuthRedirectOnAdminRole } from '~/utils/authUtils'

const validationRules = {
  name: { required: 'Note is required.' },
}

const ManageGameMode = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<GameMode>({ mode: 'onBlur' })

  const ctx = api.useUtils()
  const { mutate: addGameMode, isLoading: isAddingGameMode } =
    api.gameMode.createGameMode.useMutation({
      onSuccess: () => {
        ctx.gameMode.getAllGameModes.invalidate()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })

  const gameModeQuery = api.gameMode.getAllGameModes.useQuery()

  const onSubmit: SubmitHandler<GameMode> = (data) => {
    addGameMode(data)
    reset()
  }

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="manage gamemode" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isAddingGameMode && (
        <div className="flex items-center justify-center">
          <LoadingPage />
        </div>
      )}

      <main className="flex grow flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="mb-10 py-3 text-center text-4xl font-extrabold tracking-tight text-white ">
          GameModes beheren
        </h1>

        <div className="container mx-auto flex w-1/2 flex-col items-center rounded border-2 border-white p-4 shadow ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full gap-6 md:grid-cols-1">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Naam
                </label>
                <input
                  {...register('name', validationRules.name)}
                  type="text"
                  id="name"
                  autoComplete="off"
                  placeholder="bijv: Luisteren"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                />
                <p className="text-red-600">{errors.name?.message}</p>
              </div>
            </div>
            <button
              type="submit"
              disabled={!isValid}
              className={`mt-4 rounded-xl p-4 text-white ${
                isValid ? 'bg-green-500 hover:bg-green-600' : 'cursor-not-allowed bg-gray-400'
              }`}
            >
              <h3 className="text-center text-2xl font-bold">Nieuwe GameMode opslaan</h3>
            </button>
          </form>
        </div>
      </main>
    </>
  )
}

export default ManageGameMode

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const auth = await getSSRAuthRedirectOnAdminRole(ctx)
  if (auth.redirect) {
    return { redirect: auth.redirect }
  }
  const helpers = generateServerSideHelper(auth.props.session)
  await helpers.gameMode.getAllGameModes.prefetch()

  return {
    props: {
      session: auth.props.session,
      trpcState: helpers.dehydrate(),
    },
  }
}
