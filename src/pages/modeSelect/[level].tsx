import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { generateServerSideHelper } from "~/server/helpers/serverSideHelper";
import { api } from "~/utils/api";

const Level: NextPage<{ level: string }> = ({ level }) => {
    const gameModesQuery = api.level.getGameModesOflevel.useQuery({ levelName: level })

    return (<>
        <Head>
            <title>{ level }</title>
            <meta name="description" content="Level name here" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex grow flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <div className="container mx-auto flex  flex-col items-center justify-center rounded-2xl border-4 border-white">
                {/* Title */ }
                <h1 className="w-full border-b-2 py-3 text-center text-3xl font-extrabold tracking-tight text-white ">
                    { level }
                </h1>
                <div className="flex min-h-[60vh] min-w-[40vh] flex-col justify-center">
                    { gameModesQuery.data?.map((gameMode) => (
                        <Link
                            key={ gameMode.id }
                            className="my-5 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
                            href={`/${level}/${gameMode.name}`}
                        >
                            <h3 className="text-center text-2xl font-bold">{gameMode.name}</h3>
                        </Link>
                    ))
                    }

                </div>
            </div>
        </main>
    </>)
};

export const getStaticProps: GetStaticProps = async (context) => {
    const ssg = generateServerSideHelper();
    const level = context.params?.level;

    if (typeof level !== "string") throw new Error("No Level");

    // await ssg.   Do the prefetch of the level data here
    return {
        props: {
            trpcState: ssg.dehydrate(),
            level,
        },
    };
};

export const getStaticPaths = () => {
    return { paths: [], fallback: "blocking" };
};

export default Level;
