import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import AnimationPlayer from "~/components/fragmentPlayer/animationPlayer";
import { FragmentCard } from "~/components/fragmentPlayer/fragmentCard";
import { generateServerSideHelper } from "~/server/helpers/serverSideHelper";
import { api } from "~/utils/api";

const Mode: NextPage<{ level: string, mode: string }> = ({ level, mode }) => {
    // get the fragments of the level.
    const fragmentsOfLevelQuery = api.level.getFragmentsOflevel.useQuery({ levelName: level});
    console.log("data: ", JSON.stringify(fragmentsOfLevelQuery.data));

    // const [isStarted, setIsStarted] = useState(false);
    // const [countdown, setCountdown] = useState(4);

    // useEffect(() => {
    //     let intervalId: NodeJS.Timeout | null = null;
    //     if (isStarted) {
    //         intervalId = setInterval(() => {
    //             setCountdown((prevCountdown) => {
    //                 const newCountdown = prevCountdown - 1;
    //                 if (newCountdown === 0) {
    //                     clearInterval(intervalId!);
    //                 }
    //                 return newCountdown;
    //             });
    //         }, 1000);
    //     }
    //     return () => {
    //         if (intervalId) {
    //             clearInterval(intervalId);
    //         }
    //     };
    // }, [isStarted]);

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
                        { mode }
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
                <div className="flex min-h-[60vh] min-w-[40vh] flex-col justify-center">
                    {/* { !isStarted && (
                        <button className="rounded border p-2 text-5xl font-extrabold text-white" onClick={ () => setIsStarted(true) }>start</button>
                    ) }
                    { isStarted && countdown > 1 && <div className="text-center text-5xl font-extrabold text-white">{ countdown - 1 }</div> }
                    { isStarted && countdown === 1 && <div className="text-center text-5xl font-extrabold text-white">GO!
                    </div> } */}
                    {/* { isStarted && countdown === 0 && ( */ }
                    { true && (
                        <div>
                            {/* Fragments here */ }
                            <FragmentCard onClick={ () => console.log('clicked') } color={ 'right' } >
                                <AnimationPlayer width={ 200 } height={ 100 } />
                            </FragmentCard>
                            {/* <FragmentCard onClick={ () => console.log('clicked') } color={ 'wrong' } > */ }
                            {/* Fragment content here */ }
                            {/* </FragmentCard> */ }
                            <div className="flex justify-around sm:flex sm:flex-col">
                                <Link
                                    className="my-5 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
                                    href="/login"
                                >
                                    <h3 className="text-center text-xl font-bold">Play knop</h3>
                                </Link>
                                <Link
                                    className="my-5  rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
                                    href="/result"
                                >
                                    <h3 className="text-center text-2xl font-bold">Stop knop</h3>
                                </Link>
                            </div>
                        </div>
                    ) }
                </div>
            </div>
        </main>
    </>)
};

export const getStaticProps: GetStaticProps = async (context) => {
    const ssg = generateServerSideHelper();
    const mode = context.params?.mode;
    const level = context.params?.level;

    if (typeof mode !== "string") throw new Error("No mode");
    if (typeof level !== "string") throw new Error("No level");

    // await ssg.   Do the prefetch of the level and data here

    return {
        props: {
            trpcState: ssg.dehydrate(),
            level,
            mode,
        },
    };
};

export const getStaticPaths = () => {
    return { paths: [], fallback: "blocking" };
};

export default Mode;

//  Create component for when user finished game percentage and time played
//  Create component or conditional rendering for start button, countdown
