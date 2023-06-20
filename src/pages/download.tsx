import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { Parser } from 'json2csv';
import { Button } from "~/components/ui/button";

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

        <section className=" relative flex grow flex-col items-center justify-center bg-cover bg-no-repeat">
            <div className="container mx-auto flex flex-col items-center justify-center space-y-8">
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                    Download CSV
                </h1>
                <h3 className="text-xl font-extrabold">
                    TEST Download
                </h3>
                <Button onClick={ downloadCSV } size={ "lg" }>
                    <h3>Download nu</h3>
                </Button>
            </div>
        </section>
    </>)
};

export default DownloadPage;
