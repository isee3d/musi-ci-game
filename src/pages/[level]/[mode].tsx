import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router'

const Mode: NextPage = () => {
    const router = useRouter();
    const { level, mode } = router.query;

    return (<>
        <Head>
            <title>{ mode }</title>
            <meta name="description" content="Level name here" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <h1 className="mb-10 py-3 text-center text-8xl font-extrabold tracking-tight text-white ">
                { level }
            </h1>
            <div className="container mx-auto flex  flex-col items-center justify-center rounded-2xl border-4 border-white">
                {/* Title */ }
                <h2 className="w-full border-b-2 py-3 text-center text-3xl font-extrabold tracking-tight text-white ">
                    { mode }
                </h2>
                <div className="flex min-h-[60vh] min-w-[40vh] flex-col justify-center">
                    <h3 className="text-center text-2xl font-extrabold tracking-tight text-white">
                        Kijk en luister
                    </h3>
                    {/* Place Fragment components dynamically here */ }
                    <div className="flex justify-around">
                        <Link
                            className="my-5  rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
                            href="/login"
                        >
                            <h3 className="text-center text-2xl font-bold">Play knop</h3>
                        </Link>
                        <Link
                            className="my-5  rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
                            href="/login"
                        >
                            <h3 className="text-center text-2xl font-bold">Stop knop</h3>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    </>)
};

export default Mode;

//  Create component for when user finished game percentage and time played
//  Create component or conditional rendering for start button, countdown
