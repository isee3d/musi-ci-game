import Head from 'next/head'
import { type NextPage } from 'next'
import { AppSettings, GameMode } from '@prisma/client'
import { api } from '~/utils/api'
import { useState } from 'react'
import { Button, buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import ManageBaseModal from '~/components/manage/manageBaseModal'
import { useRequireAuth } from '~/hooks/useRequireAuth'
import { useRequireAdminRole } from '~/hooks/useRequireAdminRole'
import UpdateGameModeModal from '~/components/manage/updateGameModeModal'
import UpdateAppSettingsModal from '~/components/manage/updateAppSettingsModal'

const ManageAppSettingsPage: NextPage = () => {
  useRequireAuth()
  useRequireAdminRole()

  const ctx = api.useContext()

  const gameModesQuery = api.gameMode.getAllGameModes.useQuery()
  const appSettingsQuery = api.appSettings.getAllSettings.useQuery()

  const [showModal, setShowModal] = useState(false)
  const [showAppSettingsModal, setShowAppSettingsModal] = useState(false)
  const [selectedGameMode, setSelectedGameMode] = useState<GameMode | null>(null)
  const [selectedAppSettings, setSelectedAppSettings] = useState<AppSettings | null>(null)

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="manage app settings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="flex grow flex-col items-center justify-center">
        <h2 className="mb-10 py-3 text-center text-4xl font-extrabold tracking-tight">
          App instellingen beheren
        </h2>

        <div className="container mx-auto flex w-1/2 flex-col items-center rounded border-2 p-4 shadow">
          <h2 className="py-3 text-center text-2xl font-extrabold tracking-tight ">
            Alle Game modes
          </h2>
          <div className="flex w-full flex-col gap-y-4">
            {gameModesQuery.data?.map((gameMode) => {
              return (
                <div
                  key={gameMode.id}
                  className="flex flex-col items-center gap-4 rounded-md border-2 border-primary bg-primary/40 p-4 text-center"
                >
                  <h2 className="text-2xl font-bold">{gameMode.name}</h2>
                  {gameMode.amountOfScenes && (
                    <h2>Amount of scenes to play: {gameMode.amountOfScenes}</h2>
                  )}
                  {gameMode.one && <h2>One: {gameMode.one} millisecondes</h2>}
                  {gameMode.two && <h2>Two: {gameMode.two} millisecondes</h2>}
                  {gameMode.three && <h2>Three: {gameMode.three} millisecondes</h2>}
                  {gameMode.go && <h2>Go: {gameMode.go} millisecondes</h2>}
                  <Button
                    onClick={() => {
                      setSelectedGameMode(gameMode)
                      setShowModal(true)
                    }}
                    className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'px-4')}
                  >
                    Aanpassen
                  </Button>
                  {showModal && selectedGameMode?.id === gameMode.id && (
                    <ManageBaseModal title="GameMode aanpassen">
                      <UpdateGameModeModal setmodal={setShowModal} gameMode={gameMode} />
                    </ManageBaseModal>
                  )}
                </div>
              )
            })}
          </div>

          <h2 className="py-3 text-center text-2xl font-extrabold tracking-tight ">
            Fragment speler instellingen
          </h2>
          <div className="flex w-full flex-col gap-y-4">
            <div className="flex  flex-col items-center gap-4 rounded-md border-2 border-primary bg-primary/40 p-4 text-center">
              <h2>
                Fragment speler bolletje kleur:{' '}
                {appSettingsQuery?.data?.fragmentDotColor ?? undefined} Hex
              </h2>
              <h2>
                fragment speler lijntje kleur :{' '}
                {appSettingsQuery?.data?.fragmentDotLineColor ?? undefined} Hex
              </h2>
              <Button
                onClick={() => {
                  setSelectedAppSettings(appSettingsQuery?.data ?? null)
                  setShowAppSettingsModal(true)
                }}
                className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'px-4')}
              >
                Aanpassen
              </Button>
              {showAppSettingsModal && selectedAppSettings?.id === appSettingsQuery?.data?.id && (
                <ManageBaseModal title="App instellingen aanpassen">
                  <UpdateAppSettingsModal
                    setmodal={setShowAppSettingsModal}
                    appSettings={appSettingsQuery?.data}
                  />
                </ManageBaseModal>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ManageAppSettingsPage
