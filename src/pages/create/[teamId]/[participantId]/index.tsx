import Head from 'next/head';
import { type NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { api } from '~/utils/api';
import Link from 'next/link';

const CreateAccountPage: NextPage<{ teamId: string, participantId: string }> = ({ teamId, participantId }) => {
  return (
    <>
      <Head>
        <title></title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className="flex grow flex-col items-center justify-center dark:bg-gray-900">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight dark:text-white sm:text-[5rem]">
            Musi-CI <span className="text-[hsl(280,100%,70%)]">Melody</span> Game
          </h1>
          <h5 className="text-5xl font-extrabold tracking-tight text-white">
            Trainen met verschillen tussen toonhoogtes en korte melodietjes
          </h5>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              Log hier in om te starten
            </p>
            <AuthShowcase teamId={ teamId } participantId={ participantId } />
            <Link
              className="mt-7 flex max-w-xs  flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/progress/games"
            >
              <h3 className="text-2xl font-bold">Ga naar levels pagina</h3>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreateAccountPage;

const AuthShowcase: React.FC<{ teamId: string, participantId: string }> = ({ teamId, participantId }) => {
  const { data: sessionData } = useSession();

  const { mutate: setUserToTeam } = api.user.setUserToTeam.useMutation();

  async function createAccountAndConnectTeamPlusParticipant() {
    await signIn();
    const userId = sessionData?.user?.id;
    if (!userId) throw new Error("No user id found");
    // Fix this to include participantId and teamId for DB
    setUserToTeam({ teamId: parseInt(teamId), userId });
  }
  // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined },
  // );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={ sessionData ? () => void signOut() : () => createAccountAndConnectTeamPlusParticipant() }
      >
        { sessionData ? "Sign out" : "Sign in" }
      </button>
    </div>
  );
};
