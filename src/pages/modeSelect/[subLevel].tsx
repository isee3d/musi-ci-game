import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { generateServerSideHelper } from "~/server/helpers/serverSideHelper";
import { api } from "~/utils/api";

const Level: NextPage<{ subLevel: string }> = ({ subLevel }) => {
    const gameModesQuery = api.sublevel.getGameModesOfSublevel.useQuery({ subLevelId: subLevel })

    return (<>
        <Head>
            <title>{ subLevel }</title>
            <meta name="description" content="Level name here" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex grow flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <div className="container mx-auto flex  flex-col items-center justify-center rounded-2xl border-4 border-white">
                {/* Title */ }
                <h1 className="w-full border-b-2 py-3 text-center text-3xl font-extrabold tracking-tight text-white ">
                    { subLevel }
                </h1>
                <div className="flex min-h-[60vh] min-w-[40vh] flex-col justify-center">
                    { gameModesQuery.data?.map((gameMode) => (
                        <Link
                            key={ gameMode.id }
                            className="my-5 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
                            href={ `/${subLevel}/${gameMode.name}` }
                        >
                            <h3 className="text-center text-2xl font-bold">{ gameMode.name }</h3>
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
    const subLevel = context.params?.subLevel;
    console.log("subLevel: " + subLevel)
    if (typeof subLevel !== "string") throw new Error("No subLevel");

    // await ssg.   Do the prefetch of the level data here
    return {
        props: {
            trpcState: ssg.dehydrate(),
            subLevel: subLevel,
        },
    };
};

export const getStaticPaths = () => {
    return { paths: [], fallback: "blocking" };
};

export default Level;
