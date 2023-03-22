import { NextPage } from "next";
import Head from "next/head";
import NoteCreator from "~/components/creators/noteCreator";
import ExistingNote from "~/components/existingNote";
import { api } from "~/utils/api";

const manageFragments: NextPage = () => {
    const notes = api.fragmentNote.getAllNotes.useQuery();

    return (
        <>
            <Head>
                <title>Manage fragments</title>
                <meta name="description" content="Level name here" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex grow flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <h1 className="mb-10 py-3 text-center text-4xl font-extrabold tracking-tight text-white ">
                    Fragmenten beheren
                </h1>
                <div className="container mx-auto flex flex-col items-center justify-center rounded-2xl border-4 border-white ">
                    {/* list of created fragments */ }

                    {/* Fragment creator and inside it a way to add notes */ }
                    <div className=" flex w-full justify-start p-4">
                        <div className="flex shrink-0 grow items-center justify-start space-x-4">
                            <label className="text-center font-bold text-white">Tempo (BPM)</label>
                            <input type="text" className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="120"></input>
                        </div>
                        <p className="flex items-center font-bold text-white">Pulsen per kwartnoot = 120</p>
                    </div>
                    <div className="grid w-full gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" id="first_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="bijv: gelijk: twee gelijke noten" required />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Luister fragment</label>
                            <button className="rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 ">
                                Luister naar fragment
                            </button>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Omschrijving</label>
                            <textarea className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="Vul hier een omschrijving in" required />
                        </div>
                    </div>
                    {/* get all notes... */ }
                    { notes.data?.map((note) => (
                        <ExistingNote
                            key={ note.id }
                            note={ note.note }
                            velocity={ note.velocity }
                            time={ note.time }
                            dur={ note.dur } />
                    )) }
                    {/* Noten toevoegen */ }
                    <div className="mt-4 flex flex-col space-y-3 border-4 pt-1 shadow-xl shadow-fuchsia-500">
                        <h3 className="text-2xl text-white">
                            Noten toevoegen of verwijderen
                        </h3>
                        <NoteCreator />
                        <button className="m-4 w-40 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 ">
                            Toevoegen
                        </button>
                    </div>
                    <button
                        className="m-2 min-w-[50vh] rounded-xl bg-white/10 text-white hover:bg-white/20 "
                    >
                        <h3 className="text-center text-2xl font-bold">Fragment opslaan</h3>
                    </button>
                </div>
            </main>
        </>
    );
};

export default manageFragments;
