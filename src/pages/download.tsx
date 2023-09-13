import { type NextPage } from 'next'
import Head from 'next/head'
import { api } from '~/utils/api'
import { Parser } from 'json2csv'
import { Button } from '~/components/ui/button'
import { useRequireAuth } from '~/hooks/useRequireAuth'
import { Workbook } from 'exceljs'

function flattenObject(obj: any, prefix = ''): { [key: string]: any } {
  return Object.keys(obj).reduce<{ [key: string]: any }>((acc, k) => {
    const pre = prefix.length ? prefix + '_' : ''
    if (typeof obj[k] === 'object' && obj[k] !== null && !(obj[k] instanceof Date)) {
      Object.assign(acc, flattenObject(obj[k], pre + k))
    } else {
      acc[pre + k] = obj[k]
    }
    return acc
  }, {})
}

const DownloadPage: NextPage = () => {
  useRequireAuth()

  const downloadQuery = api.download.getAll.useQuery()

  const downloadExcel = async () => {
    const data = downloadQuery.data

    if (!data) return

    const workbook = new Workbook()

     for (const [sheetName, sheetData] of Object.entries(data)) {
       const worksheet = workbook.addWorksheet(sheetName)

       // Assuming the data is an array of objects, where each object is a row
       // and the keys are the column headers
       if (sheetData.length > 0) {
         const headers = Object.keys(sheetData[0])
         worksheet.addRow(headers)

         for (const row of sheetData) {
           worksheet.addRow(Object.values(row))
         }
       }
     }

    // Generate Excel and trigger download
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'data.xlsx'
    link.click()
  }

  const downloadJSON = async () => {
    const data = downloadQuery.data

    if (!data) return

    // Stringify the data to convert it to JSON format
    const jsonData = JSON.stringify(data, null, 2) // The "2" here formats the JSON with 2-space indentation

    // Create a blob from the JSON string
    const blob = new Blob([jsonData], {
      type: 'application/json',
    })

    // Create a link element, set its href to the blob, and trigger a click to start the download
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'data.json'
    link.click()
  }


  return (
    <>
      <Head>
        <title>Welkom Musi-CI</title>
        <meta name="description" content="Voortgang levels" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className=" relative flex grow flex-col items-center justify-center bg-cover bg-no-repeat">
        <div className="container mx-auto flex flex-col items-center justify-center space-y-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">Download CSV</h1>
          <h3 className="text-xl font-extrabold">TEST Download</h3>
          <Button onClick={downloadExcel} size={'lg'}>
            <h3>Download naar csv</h3>
          </Button>
          <Button onClick={downloadJSON} size={'lg'}>
            <h3>Download naar JSON</h3>
          </Button>
        </div>
      </section>
    </>
  )
}

export default DownloadPage
