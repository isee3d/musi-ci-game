import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Image from 'next/image';
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Dog = dynamic(() => import('~/components/3D/canvas/Examples').then((mod) => mod.Dog), { ssr: true })
const Duck = dynamic(() => import('~/components/3D/canvas/Examples').then((mod) => mod.Duck), { ssr: false })
const View = dynamic(() => import('~/components/3D/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('~/components/3D/canvas/View').then((mod) => mod.Common), { ssr: false })

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

    <main className=" relative flex grow flex-col items-center justify-center bg-cover bg-no-repeat">
      <Image src="/images/piano_img.jpg" fill className="-z-50" alt="Logo" />
      <div className="container mx-auto flex flex-col items-center justify-center space-y-8 rounded-t-md border-black">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] ">
          Welcome!
        </h1>
        <div className='w-full text-center md:w-3/5'>
          <View orbit className='relative h-full sm:h-48 sm:w-full'>
            <Suspense fallback={ null }>
              <Dog scale={ 2 } position={ [0, -1.6, 0] } rotation={ [0.0, -0.3, 0] } />
              <Common/>
            </Suspense>
          </View>
        </div>
        <h3 className="text-xl font-extrabold text-white">
          De subtitle hier
        </h3>
        <Link
          className="flex max-w-xs flex-col gap-4 rounded bg-gray-600 p-4 hover:bg-gray-800 dark:text-white "
          href="/login"
        >
          <h3 className="text-2xl font-bold">Aan de slag</h3>
        </Link>
      </div>
    </main>
  </>)
};

export default Welcome;
