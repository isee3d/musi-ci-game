import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Welcome: NextPage = () => {
  return (<>
    <Head>
      <title>Welkom Musi-CI</title>
      <meta name="description" content="Voortgang levels" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container mx-auto flex flex-col items-center justify-center space-y-8 rounded-t-md border-black">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] ">
          Welcome!
        </h1>
        <h3 className="text-xl font-extrabold text-white">
          De subtitle hier
        </h3>
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
          href="/login"
        >
          <h3 className="text-2xl font-bold">Aan de slag</h3>
        </Link>
      </div>
    </main>
  </>)
};

export default Welcome;
