import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { FragmentCard } from "~/components/fragmentCard";

const Result: NextPage = () => {
    // have results in as dynamic parameters?
    const router = useRouter();
    const { level, mode } = router.query;

    return (<>
        <Head>
            <title>{ mode }</title>
            <meta name="description" content="Level name here" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex grow flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <h1 className="mb-10 py-3 text-center text-8xl font-extrabold tracking-tight text-white ">
                { level }
            </h1>
            <div className="container mx-auto flex  flex-col items-center justify-center rounded-2xl border-4 border-white ">
                {/* Title */ }
                <div className="mb-4 flex w-full justify-around ">
                    <h2 className="grow rounded-l-xl border-4 border-white py-3 text-center text-3xl font-extrabold tracking-tight text-white ">
                        Luisteren
                    </h2>
                    <h2 className="grow border-4 border-white bg-gray-400 py-3 text-center text-3xl font-extrabold tracking-tight text-white ">
                        Spelen
                    </h2>
                    <h2 className="grow rounded-r-xl border-4 border-white bg-gray-400 py-3 text-center text-3xl font-extrabold text-white">
                        Uitdaging
                    </h2>
                </div>
                <h3 className="pt-4 text-center text-2xl font-extrabold tracking-tight text-white">
                    Kijk en luister
                </h3>
                <div className="flex flex-col justify-center space-y-8">
                    {/* show results here */ }
                    <div className="flex justify-around space-x-24">
                        {/* Good component */ }
                        <div className="flex flex-col space-y-5 ">
                            <h2 className="text-center text-2xl font-extrabold text-white">
                                Percentage goed
                            </h2>
                            <h2 className="rounded-2xl border-4 p-32 text-center text-2xl font-extrabold text-white">
                                70%
                            </h2>
                        </div>
                        <div className="flex flex-col space-y-5">
                            <h2 className="text-center text-2xl font-extrabold text-white">
                                Tijd gespeeld
                            </h2>
                            <h2 className="rounded-2xl border-4 p-32 text-center text-2xl font-extrabold text-white">
                                06:23
                            </h2>
                        </div>
                    </div>
                    <h2 className="text-center font-extrabold text-white">
                        FELICITATIES! je hebt genoeg goede antwoorden gegeven.
                    </h2>

                </div>
                <Link
                    className="my-5 min-w-[30vh] rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
                    href="/modeSelect/1"
                >
                    <h3 className="text-center text-2xl font-bold">Terug</h3>
                </Link>
            </div>
        </main>
    </>)
};

export default Result;
