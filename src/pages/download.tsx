import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { Parser, parseAsync } from 'json2csv';
import { delimiter } from "path";


const DownloadPage: NextPage = () => {
    const downloadQuery = api.download.getAll.useQuery();

    const downloadCSV = async () => {
        const opts = { quote: "", delimiter: ";" };
        const json2csvParser = new Parser(opts);
        const csv = json2csvParser.parse(downloadQuery.data ?? []);

        const blob = new Blob([csv], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'data.csv';
        link.click();
    };


    return (<>
        <Head>
            <title>Welkom Musi-CI</title>
            <meta name="description" content="Voortgang levels" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className=" relative flex grow flex-col items-center justify-center bg-cover bg-no-repeat">
            <div className="container mx-auto flex flex-col items-center justify-center space-y-8 rounded-t-md border-black">
                <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] ">
                    Download CSV
                </h1>
                <h3 className="text-xl font-extrabold text-white">
                    TEST Download
                </h3>
                <button
                    onClick={ downloadCSV }
                    className="flex max-w-xs flex-col gap-4 rounded bg-gray-600 p-4 hover:bg-gray-800 dark:text-white "
                >
                    <h3 className="text-2xl font-bold">Start</h3>
                </button>
            </div>
        </main>
    </>)
};

export default DownloadPage;
