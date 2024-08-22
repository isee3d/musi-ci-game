import { addDays, format } from 'date-fns'
import { Workbook } from 'exceljs'
import { Calendar as CalendarIcon } from 'lucide-react'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { MultiSelect } from '~/components/ui/multi-select'
import { RouterOutputs, api } from '~/utils/api'
import { z } from 'zod'
import { LoadingPage, LoadingSpinner } from '~/components/loading'
import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
import { Label } from '~/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { cn } from '~/lib/utils'
import { getSSRAuthRedirectOnResearcherRole } from '~/utils/authUtils'
import { toast } from 'sonner'
import { generateServerSideHelper } from '~/server/helpers/serverSideHelper'

const splitDataByUser = (data: ExcelRoute): SplitDataByUser => {
  const result: SplitDataByUser = {}

  // Process levelResults
  data.levelResults?.forEach((levelResult) => {
    const participantId = levelResult.user?.participantId
    if (participantId) {
      if (!result[participantId]) {
        result[participantId] = {
          levelResults: [],
          questionAnswers: [],
          activities: [],
        }
      }
      result[participantId]?.levelResults?.push(levelResult)
    }
  })

  data.questionAnswers?.forEach((questionAnswer) => {
    const participantId = questionAnswer?.user?.participantId
    if (participantId && result[participantId]) {
      result[participantId]?.questionAnswers?.push(questionAnswer)
    }
  })

  data.activities?.forEach((activity) => {
    const participantId = activity?.user?.participantId
    if (participantId && result[participantId]) {
      result[participantId]?.activities?.push(activity)
    }
  })

  return result
}

const headers = [
  'deelnemer nummer',
  'datum van spelen',
  'sublevel',
  'Game modus',
  'Startijd sublevel scene',
  'Eindtijd sublevel scene',
  'Latency (ms)',
  'Gespeelde fragment',
  'grondtoon',
  'Gekozen fragment',
  'Goed beantwoord?',
  'Positie gespeeld fragment',
  'Positie gekozen fragment',
  'Teruggeluisterde fragmenten',
]
const questionsHeaders = ['Vraag', 'Antwoord', 'Datum']
const activitiesHeaders = ['Activiteit type', 'Datum']

const worksheetNames = ['Speelresultaten', 'Vragen en antwoorden', 'Activiteiten']

const getYesterdayDate = () => {
  const today = new Date()
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
}

type ExcelRoute = RouterOutputs['download']['getFilteredExcelData']
type SplitDataByUser = { [participantId: string]: ExcelRoute }
interface WorksheetInfo {
  name: string
  headers: string[]
}

export default function DownloadPage() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [currentUserIndex, setCurrentUserIndex] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedSublevels, setSelectedSublevels] = useState<string[]>([])
  const [selectedGameModes, setSelectedGameModes] = useState<string[]>([])
  const [workSheets, setWorkSheets] = useState<string[]>(worksheetNames)
  const [shouldDownload, setShouldDownload] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>({
    from: getYesterdayDate(),
    to: addDays(getYesterdayDate(), 2),
  })

  const usersQuery = api.download.getAllUsers.useQuery()
  const sublevelsQuery = api.download.getAllSublevels.useQuery()
  const gameModesQuery = api.download.getAllGameModes.useQuery()

  const {
    isLoading: isLoadingExceldata,
    isFetching,
    refetch,
  } = api.download.getFilteredExcelData.useQuery(
    {
      selectedUsers:
        currentUserIndex !== null ? ([selectedUsers[currentUserIndex]] as string[]) : [],
      selectedSublevels: selectedSublevels,
      selectedGameModes: selectedGameModes,
      worksheets: workSheets,
      date: date,
    },
    {
      onSuccess(data: ExcelRoute) {
        // console.log('Date:', date)
        // console.log('Data:', data)
        // console.log('Selected sublevels:', selectedSublevels)
        // console.log('Selected game modes:', selectedGameModes)
        // console.log('Selected users:', selectedUsers)
        if (data.activities && data.activities.length === 0) {
          // toast.info('Geen activities gevonden voor de geselecteerde filters')
        }
        if (data.levelResults && data.levelResults.length === 0) {
          // toast.info('Geen speelresultaten gevonden voor de geselecteerde filters')
        }
        if (data.questionAnswers && data.questionAnswers.length === 0) {
          // toast.info('Geen vragen en antwoorden gevonden voor de geselecteerde filters')
        }
        const splitData = splitDataByUser(data)
        // console.log(JSON.stringify(splitData))
        createExcelFilesPerUser(splitData)
        processNextUser()
      },
      onError() {
        toast.error('Er is iets fout gegaan bij het ophalen van de data')
        processNextUser()
      },
      enabled: false,
    },
  )

  function processNextUser() {
    if (currentUserIndex < selectedUsers.length - 1) {
      setCurrentUserIndex((prevIndex) => prevIndex + 1)
    } else {
      setIsProcessing(false)
    }
  }

  useEffect(() => {
    if (
      isProcessing &&
      currentUserIndex !== null &&
      currentUserIndex < selectedUsers.length &&
      selectedUsers.length > 0
    ) {
      refetch()
    }
  }, [isProcessing, currentUserIndex, selectedUsers])

  function getLoadingExcelDataState() {
    if (!isProcessing) {
      return (
        <h3>
          Klik hier om de download te starten
          {selectedUsers.length === 0 ? ', selecteer eerst de spelers' : ''}
        </h3>
      )
    }
    if (isLoadingExceldata && isFetching) {
      return (
        <h2>
          Bezig met verwerken van gebruiker {currentUserIndex! + 1} van {selectedUsers.length}...
        </h2>
      )
    }
    if (selectedUsers.length - 1 > currentUserIndex) {
      return (
        <h2>
          Verwerking voltooid voor gebruiker {currentUserIndex! + 1} van {selectedUsers.length}
        </h2>
      )
    }
  }

  const createExcelFilesPerUser = async (splitDataByUser: SplitDataByUser) => {
    for (const participantId in splitDataByUser) {
      const userData = splitDataByUser[participantId]
      if (userData === undefined) continue

      const workbook = new Workbook()
      const worksheetsInfo: WorksheetInfo[] = [
        { name: 'Speelresultaten', headers: headers },
        { name: 'Vragen en antwoorden', headers: questionsHeaders },
        { name: 'Activiteiten', headers: activitiesHeaders },
      ]

      const createAndSetupWorksheet = (name: string, headers: string[]) => {
        const worksheet = workbook.addWorksheet(name)
        worksheet.views = [{ state: 'frozen', ySplit: 1 }]

        const headerRow = worksheet.addRow(headers)
        headerRow.eachCell((cell) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFD9D9D9' },
          }
          cell.font = { bold: true }
        })

        return worksheet
      }

      worksheetsInfo.forEach(({ name, headers }) => createAndSetupWorksheet(name, headers))

      // Data filling

      const formatDate = (date: Date | null) => {
        if (!date) return ''

        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }

        return new Date(date).toLocaleString('nl-NL', options)
      }

      const addRowToWorksheet = (worksheetName: string, rowData: any[]) => {
        workbook.getWorksheet(worksheetName)?.addRow(rowData)
      }

      if (workSheets.includes('Activiteiten')) {
        userData.activities?.forEach((data) => {
          if (data.user && data.activity) {
            const row = [data.activity, formatDate(data.activity_Date)]
            addRowToWorksheet('Activiteiten', row)
          }
        })
      }

      if (workSheets.includes('Vragen en antwoorden')) {
        userData.questionAnswers?.forEach((data) => {
          const row = [data.question, data.answer, formatDate(data.answeredDate)]
          addRowToWorksheet('Vragen en antwoorden', row)
        })
      }

      if (workSheets.includes('Speelresultaten')) {
        userData.levelResults?.forEach((data) => {
          data.Scenes.forEach((scene) => {
            const commonData = [
              participantId,
              formatDate(data.startTime),
              data.subLevel?.name,
              data.gameMode?.name,
              formatDate(scene.startTime),
              formatDate(
                new Date((scene.startTime?.getTime() || 0) + (scene.chosenFragmentLatency || 0)),
              ),
              scene.chosenFragmentLatency,
              scene.playedFragment?.name,
              scene.sceneFragments.find((f) => f?.fragment?.name === scene?.playedFragment?.name)
                ?.groundTone,
              scene.chosenFragment?.name,
              scene.answeredCorrectly === null ? null : scene.answeredCorrectly ? 1 : 0,
              scene.sceneFragments.find((f) => f?.fragment?.name === scene?.playedFragment?.name)
                ?.fragmentIndex,
              scene.sceneFragments.find((f) => f?.fragment?.name === scene?.chosenFragment?.name)
                ?.fragmentIndex,
            ]

            let commonDataWritten = false

            if (scene.relistenFragments.length > 0) {
              scene.relistenFragments.forEach((relFrag) => {
                if (relFrag.relistenCount && relFrag.relistenCount > 0) {
                  for (let i = 0; i < relFrag.relistenCount; i++) {
                    if (!commonDataWritten) {
                      let row = [...commonData, relFrag?.fragment?.name]
                      addRowToWorksheet('Speelresultaten', row)
                      commonDataWritten = true
                    } else {
                      let row = Array(commonData.length).fill(null)
                      row.push(relFrag?.fragment?.name)
                      addRowToWorksheet('Speelresultaten', row)
                    }
                  }
                }
              })
            } else {
              addRowToWorksheet('Speelresultaten', commonData)
            }
          })
        })
      }

      // Column adjusting
      const adjustColumnWidths = (worksheetName: string) => {
        const worksheet = workbook.getWorksheet(worksheetName)
        worksheet?.columns.forEach((column) => {
          let maxColumnLength = 0
          // @ts-ignore
          column.eachCell({ includeEmpty: true }, (cell) => {
            const columnLength = cell.value?.toString().length || 0
            if (columnLength > maxColumnLength) {
              maxColumnLength = columnLength
            }
          })
          column.width = maxColumnLength + 4
        })
      }

      worksheetNames.forEach((name) => adjustColumnWidths(name))

      // Generate Excel and trigger download
      const buffer = await workbook.xlsx.writeBuffer()
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `data-${participantId}.xlsx`
      link.click()
    }
  }

  const handleDateSelect = (range: DateRange | undefined) => {
    // if(!range) return
    console.log('Range:', range)
    if (range) {
      if (range.from && range.to) {
        const adjustedRange = {
          ...range,
          to: new Date(range.to.setHours(23, 59, 59, 999)),
        }
        setDate(adjustedRange)
        return
      }
      setDate(range)
    }
    setDate(range)
  }

  const handleStartDownload = () => {
    setCurrentUserIndex(0)
    setIsProcessing(true)
  }

  if (usersQuery.isLoading || sublevelsQuery.isLoading || gameModesQuery.isLoading)
    return <LoadingPage />

  if (usersQuery.isError || sublevelsQuery.isError || gameModesQuery.isError) {
    return <h1>Er is iets fout gegaan bij het ophalen van de data</h1>
  }

  if (!usersQuery.data || !sublevelsQuery.data || !gameModesQuery.data) {
    return <h1>Er is geen data gevonden</h1>
  }

  return (
    <>
      <Head>
        <title>Download data</title>
        <meta name="description" content="Download data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className=" relative flex grow flex-col items-center justify-center bg-cover bg-no-repeat">
        <div className="container mx-auto flex flex-col items-center justify-center space-y-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">Download CSV</h1>
          <h2>Selecteer spelers</h2>
          {usersQuery.data && (
            <MultiSelect
              options={
                usersQuery.data.map((user) => ({
                  value: user.id ?? '-1',
                  label: user.participantId ?? '-1',
                })) ?? []
              }
              selected={selectedUsers}
              onChange={setSelectedUsers}
              className="w-[560px]"
            />
          )}

          <Label className="mb-1">Selecteer hieronder de begin- en einddatum</Label>
          <div className={cn('grid gap-2')}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={'outline'}
                  className={cn(
                    'w-[300px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={handleDateSelect}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          <Label className="mb-1">Selecteer hieronder de sublevels</Label>
          {sublevelsQuery.data && (
            <MultiSelect
              options={
                sublevelsQuery.data.map((sublevel) => ({
                  value: sublevel.id.toString(),
                  label: sublevel.name,
                })) ?? []
              }
              selected={selectedSublevels}
              onChange={setSelectedSublevels}
              className="w-[560px]"
            />
          )}

          <Label className="mb-1">Selecteer hieronder de game modussen</Label>
          {gameModesQuery.data && (
            <MultiSelect
              options={
                gameModesQuery.data.map((gameMode) => ({
                  value: gameMode.id.toString(),
                  label: gameMode.name,
                })) ?? []
              }
              selected={selectedGameModes}
              onChange={setSelectedGameModes}
              className="w-[560px]"
            />
          )}

          <Label className="mb-1">Selecteer de gegevens worksheets</Label>
          <MultiSelect
            options={worksheetNames.map((sheet) => ({
              value: sheet,
              label: sheet,
            }))}
            selected={workSheets}
            onChange={setWorkSheets}
            className="w-[560px]"
          />

          <Button onClick={handleStartDownload} size={'lg'}>
            <div className="flex justify-center items-center gap-4">
              {isProcessing && currentUserIndex !== null && <LoadingSpinner size={25} />}
              {getLoadingExcelDataState()}
            </div>
          </Button>
        </div>
      </section>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const auth = await getSSRAuthRedirectOnResearcherRole(ctx)

  if (auth.redirect) {
    return { redirect: auth.redirect }
  }

  const helpers = generateServerSideHelper(auth.props.session)
  helpers.download.getAllUsers.prefetch()
  helpers.download.getAllSublevels.prefetch()
  helpers.download.getAllGameModes.prefetch()

  return {
    props: {
      session: auth.props.session,
      trpcState: helpers.dehydrate(),
    },
  }
}
