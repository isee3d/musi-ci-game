import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "~/components/ui/button";

const TutorialPage: NextPage = () => {
    return (
    <>
        <Head>
            <title>Tutorial</title>
            <meta name="description" content="Voortgang levels" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <section className=" relative flex grow flex-col items-center justify-center bg-cover bg-no-repeat">
            <div className="container mx-auto flex flex-col items-center justify-center space-y-8 rounded-t-md border-black">
                <h1 className="text-5xl font-extrabold tracking-tight text-secondary-foreground sm:text-[5rem] ">
                    Tutorial
                </h1>
                <h3 className="text-7xl font-extrabold text-secondary-foreground">
                    Hier cinie uitleg
                </h3>
                <Button size={'lg'} asChild>
                    <Link href="/podium">
                        <h3 className="text-xl">Ga door naar podium</h3>
                    </Link>
                </Button>
            </div>
        </section>
    </>
    )
};

export default TutorialPage;
