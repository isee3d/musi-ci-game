import { NextPage } from "next";
import Head from "next/head";
import NoteCreator from "~/components/creators/noteCreator";

const manageLevels: NextPage = () => {
    return (
        <>
            <Head>
                <title>Manage fragments</title>
                <meta name="description" content="Level name here" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex grow flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <h1 className="mb-10 py-3 text-center text-4xl font-extrabold tracking-tight text-white ">
                    Levels beheren
                </h1>
                <div className="container mx-auto flex w-1/2 flex-col items-center rounded border-2 border-white p-4 shadow ">   
                    <form>
                        <div className="grid w-full gap-6 md:grid-cols-1">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Naam</label>
                                <input type="text" id="first_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="bijv: gelijk: twee gelijke noten" required />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Omschrijving</label>
                                <textarea className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="Vul hier een omschrijving in" required />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Tempo (BPM)</label>
                                <input type="text" id="first_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="bijv: 60" required />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Het aantal goede antwoord voor een level is gehaald</label>
                                <input type="text" id="first_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="bijv: 10" required />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Aantal Zichtbare fragmenten in Scene</label>
                                <input type="text" id="first_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="bijv: 2" required />
                            </div>
                        </div>

                        <h3 className="my-2 text-xl text-white">
                            Fragmenten
                        </h3>
                        {/* Show available fragments here... */}

                    </form>
                    <button
                        className="m-2 w-full rounded bg-white/10 p-3 text-white hover:bg-white/20 "
                    >
                        <h3 className="text-center text-2xl font-bold">Nieuw level opslaan</h3>
                    </button>
                </div>
            </main>
        </>
    );
};

export default manageLevels;
