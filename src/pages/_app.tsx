import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { inspect } from '@xstate/inspect';

import { api } from "~/utils/api";

import Head from "next/head";

import "~/styles/globals.css";
import { useEffect, useState } from "react";
import { Layout } from "~/components/3D/dom/Layout";
import { TailwindIndicator } from "~/components/tailwindIndicator";
import InitializeSoundModal from "~/components/initializeSoundModal";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      inspect({
        url: 'https://statecharts.io/inspect', // (default)
        iframe: false
      });
    }
  }, []);

  return (
    <SessionProvider session={ session }>
      <Head>
        <title>Musi CI</title>
        <meta name="description" content="The Musi CI web game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        { showModal && <InitializeSoundModal showModal={ showModal } setmodal={ setShowModal } /> }
        <TailwindIndicator />
        <Toaster position="bottom-center" />
        <Component { ...pageProps } />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
