import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { generateServerSideHelper } from "~/server/helpers/serverSideHelper";

const Level: NextPage<{ level: string }> = ({ level }) => {
    // const Level: NextPage = () => {
    // const router = useRouter();
    // const { level } = router.query;
    // get the rest of the level data here using trpc

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
                {/* List of buttons MAKE IT A COMPONENT, for now "spelen, luisteren and uitdaging" keep these dynamic from database */ }
                <div className="flex min-h-[60vh] min-w-[40vh] flex-col justify-center">
                    <Link
                        className="my-5 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
                        href="/level-1/luisteren"
                    >
                        <h3 className="text-center text-2xl font-bold">Luisteren</h3>
                    </Link>
                    <Link
                        className="my-5 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
                        href="/level-1/spelen"
                    >
                        <h3 className="text-center text-2xl font-bold">Spelen</h3>
                    </Link>
                    <Link
                        className="my-5  rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
                        href="/level-1/uitdaging"
                    >
                        <h3 className="text-center text-2xl font-bold">Uitdaging</h3>
                    </Link>
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
