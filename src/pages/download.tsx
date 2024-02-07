import { addDays, format } from 'date-fns'
import { Cell, Fill, Workbook } from 'exceljs'
import { Calendar as CalendarIcon } from 'lucide-react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { MultiSelect } from '~/components/ui/multi-select'
import { RouterOutputs, api } from '~/utils/api'

import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
import { Label } from '~/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { cn } from '~/lib/utils'
import { getSSRAuthRedirectOnResearcherRole } from '~/utils/authUtils'
import { LoadingSpinner } from '~/components/loading'

const splitDataByUser = (data: ExcelRoute): SplitDataByUser => {
  const result: SplitDataByUser = {}

  // Process levelResults
  data.levelResults.forEach((levelResult) => {
    const participantId = levelResult.user?.participantId
    if (participantId) {
      if (!result[participantId]) {
        result[participantId] = {
          levelResults: [],
          questionAnswers: [],
          activities: [],
        }
      }
      result[participantId]?.levelResults.push(levelResult)
    }
  })

  data.questionAnswers.forEach((questionAnswer) => {
    const participantId = questionAnswer?.user?.participantId
    if (participantId && result[participantId]) {
      result[participantId]?.questionAnswers.push(questionAnswer)
    }
  })

  data.activities.forEach((activity) => {
    const participantId = activity?.user?.participantId
    if (participantId && result[participantId]) {
      result[participantId]?.activities.push(activity)
    }
  })

  return result
}

const DateRangeSchema = z.object({
  from: z.optional(z.date()),
  to: z.optional(z.date()),
})

export const DownloadSettingsSchema = z.object({
  selectedUsers: z.array(z.string()),
  selectedSublevels: z.array(z.string()),
  selectedGameModes: z.array(z.string()),
  date: z.optional(DateRangeSchema),
})

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

const worksheetNames = ['Speelresultaten', 'Vragen en antwoorden', 'Activiteiten'] as const
type WorksheetName = (typeof worksheetNames)[number]

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

const DownloadPage = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectedSublevels, setSelectedSublevels] = useState<string[]>([])
  const [selectedGameModes, setSelectedGameModes] = useState<string[]>([])
  const [date, setDate] = useState<DateRange | undefined>({
    from: getYesterdayDate(),
    to: addDays(getYesterdayDate(), 2),
  })

  const [shouldDownload, setShouldDownload] = useState(false)

  const usersQuery = api.download.getAllUsers.useQuery(undefined, {
    enabled: true,
  })
  const sublevelsQuery = api.download.getAllSublevels.useQuery(undefined, {
    enabled: true,
  })
  const gameModesQuery = api.download.getAllGameModes.useQuery(undefined, {
    enabled: true,
  })

  const {
    data: excelData,
    isLoading: isLoadingExceldata,
    isFetching,
  } = api.download.getFilteredExcelData.useQuery(
    {
      selectedUsers: selectedUsers,
      selectedSublevels: selectedSublevels,
      selectedGameModes: selectedGameModes,
      date: date,
    },
    {
      onSuccess(data: ExcelRoute) {
        const splitData = splitDataByUser(data)
        console.log(JSON.stringify(splitData))
        createExcelFilesPerUser(splitData)
      },
      enabled: shouldDownload === true,
    },
  )

  function getLoadingExcelDataState() {
    if (isLoadingExceldata && !isFetching) {
      return <h3>Klik hier om de download te starten, dit kan even duren</h3>
    }
    if (isLoadingExceldata && isFetching) {
      return <h2>De download is bezig...</h2>
    }
    if (!isLoadingExceldata && !isFetching) {
      return <h2>De download is gelukt, bekijk deze in de rechterbovenhoek</h2>
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

      //Data filling

      const formatDate = (date: Date | null) => (date ? new Date(date).toLocaleDateString() : '')

      const addRowToWorksheet = (worksheetName: string, rowData: any[]) => {
        workbook.getWorksheet(worksheetName)?.addRow(rowData)
      }

      userData.activities.forEach((data) => {
        if (data.user && data.activity) {
          const row = [data.activity, formatDate(data.activity_Date)]
          addRowToWorksheet('Activiteiten', row)
        }
      })

      userData.questionAnswers.forEach((data) => {
        if (!data.user) {
          const row = [data.question, data.answer, formatDate(data.answeredDate)]
          addRowToWorksheet('Vragen en antwoorden', row)
        }
      })

      userData.levelResults.forEach((data) => {
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
            scene.answeredCorrectly ? 1 : 0,
            scene.sceneFragments.find((f) => f?.fragment?.name === scene?.playedFragment?.name)
              ?.fragmentIndex,
            scene.sceneFragments.find((f) => f?.fragment?.name === scene?.chosenFragment?.name)
              ?.fragmentIndex,
          ]

          const commonDataLength = commonData.length

          if (scene.relistenFragments.length > 0) {
            scene.relistenFragments.forEach((relFrag, index) => {
              let row
              if (index === 0) {
                row = [...commonData, relFrag?.fragment?.name]
              } else {
                // Create an array of nulls to align the relisten fragment in the correct column
                row = Array(commonDataLength).fill(null)
                row.push(relFrag?.fragment?.name)
              }
              addRowToWorksheet('Speelresultaten', row)
            })
          } else {
            addRowToWorksheet('Speelresultaten', commonData)
          }
        })
      })

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

  useEffect(() => {
    if (shouldDownload) {
      setShouldDownload(false)
    }
  }, [shouldDownload])

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
          <MultiSelect
            options={
              usersQuery.data?.map((user) => ({
                value: user.id ?? '-1',
                label: user.participantId ?? '-1',
              })) ?? []
            }
            selected={selectedUsers}
            onChange={setSelectedUsers}
            className="w-[560px]"
          />

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
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          <Label className="mb-1">Selecteer hieronder de sublevels</Label>
          <MultiSelect
            options={
              sublevelsQuery.data?.map((sublevel) => ({
                value: sublevel.id.toString(),
                label: sublevel.name,
              })) ?? []
            }
            selected={selectedSublevels}
            onChange={setSelectedSublevels}
            className="w-[560px]"
          />

          <Label className="mb-1">Selecteer hieronder de game modussen</Label>
          <MultiSelect
            options={
              gameModesQuery.data?.map((gameMode) => ({
                value: gameMode.id.toString(),
                label: gameMode.name,
              })) ?? []
            }
            selected={selectedGameModes}
            onChange={setSelectedGameModes}
            className="w-[560px]"
          />

          <Button onClick={() => setShouldDownload(true)} size={'lg'}>
            {getLoadingExcelDataState()}
          </Button>

          {isLoadingExceldata && isFetching && <LoadingSpinner />}
        </div>
      </section>
    </>
  )
}

export default DownloadPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const auth = await getSSRAuthRedirectOnResearcherRole(ctx)

  if (auth.redirect) {
    return { redirect: auth.redirect }
  }

  return {
    props: {
      session: auth.props.session,
    },
  }
}
