import { createActorContext } from "@xstate/react";
import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Luisteren from "~/components/gameModes/luisteren/luisteren";
import Spelen from "~/components/gameModes/spelen/spelen";
import { spelenMachine } from "~/components/gameModes/spelen/spelenMachine";
import Uitdaging from "~/components/gameModes/uitdaging/uitdaging";
import { uitdagingMachine } from "~/components/gameModes/uitdaging/uitdagingMachine";
import { generateServerSideHelper } from "~/server/helpers/serverSideHelper";
import { api } from "~/utils/api";

export const SpelenMachineContext = createActorContext(spelenMachine, { devTools: true });

export const UitdagingMachineContext = createActorContext(uitdagingMachine, { devTools: true });

const Mode: NextPage<{ level: string, mode: string }> = ({ level, mode }) => {
    const fragmentLevelQuery = api.level.getFragmentsOflevel.useQuery({ levelName: level });

    const fragmentsToShow = fragmentLevelQuery?.data?.fragmentToShow ?? 0;
    const fragments = fragmentLevelQuery?.data?.fragments ?? [];
    const playTime = fragmentLevelQuery?.data?.playTime;

    function renderGameMode(mode: string) {
        switch (mode) {
            case 'Luisteren':
                return <Luisteren fragmentsToShow={ fragmentsToShow } fragments={ fragments } levelName={ level } />;
            case 'Spelen':
                return (
                    <SpelenMachineContext.Provider>
                        <Spelen fragmentsToShow={ fragmentsToShow } fragments={ fragments } levelName={ level } />;
                    </SpelenMachineContext.Provider>
                )
            case 'Uitdaging':
                return(
                    <UitdagingMachineContext.Provider>
                    <Uitdaging
                        fragmentsToShow={ fragmentsToShow }
                        fragments={ fragments }
                        levelName={ level }
                        playTime={ playTime }
                    />;
                    </UitdagingMachineContext.Provider>
                )
            default:
                return null;
        }
    }

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
            <div className="container mx-auto flex flex-col items-center justify-center rounded-2xl border-4 border-white ">
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
                {/* <h3 className="pt-4 text-center text-2xl font-extrabold tracking-tight text-white">
                    Kijk en luister
                </h3> */}
                <div className="flex w-1/2 flex-col justify-center space-y-8 p-5">
                    { renderGameMode(mode) }
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

    await ssg.level.getFragmentsOflevel.prefetch({ levelName: level });

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
