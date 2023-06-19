import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from 'next/image';
import { Button } from "~/components/ui/button";


const WelcomePage: NextPage = () => {
  return (<>
    <Head>
      <title>Welkom Musi-CI</title>
      <meta name="description" content="welkom bij Musi CI" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <section className=" flex grow flex-col items-center justify-center bg-cover bg-no-repeat">
      <Image src="/images/piano_img.jpg" fill className="-z-10" alt="Logo" priority />
      <div className="container mx-auto flex flex-col items-center justify-center space-y-8 rounded-t-md border-black">
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Welkom
        </h1>
        <p className=" max-w-xl text-center leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          help Cinie haar orkest te redden door de muzieknoten te herkennen
        </p>
        <Button size={ 'lg' } asChild>
          <Link href="/login">
            <h3 className="text-xl">Aan de slag</h3>
          </Link>
        </Button>
      </div>
    </section>
  </>)
};

export default WelcomePage;
