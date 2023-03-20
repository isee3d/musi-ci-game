import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Image from 'next/image'

const Welcome: NextPage = () => {
  // const { data: session } = useSession();

  // if (!session) {
  //   // Handle unauthenticated state, e.g. render a SignIn component
  //   return <h2>Hello world! this is protected route now hehe</h2>;
  // }
  return (<>
    <Head>
      <title>Welkom Musi-CI</title>
      <meta name="description" content="Voortgang levels" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="bg-my_bg_image flex min-h-screen flex-col items-center justify-center">
      <div className="container mx-auto flex flex-col items-center justify-center space-y-8 rounded-t-md border-black">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] ">
          Welcome!
        </h1>
        {/* <Image
          src="/images/piano_img.jpg"
          alt="My Image"
          width={ 500 }
          height={ 500 }
        /> */}
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
