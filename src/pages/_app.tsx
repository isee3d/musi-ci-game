import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { api } from "~/utils/api";

import Head from "next/head";

import "~/styles/globals.css";
import { ToneJSService } from "~/components/fragmentPlayer/audioService/ToneJSService";
import { useEffect } from "react";
import AudioService from "~/components/fragmentPlayer/audioService/AudioService";
import { Layout } from "~/components/3D/dom/Layout";
import { TailwindIndicator } from "~/components/tailwindIndicator";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useEffect(() => {
    ToneJSService.init();
    AudioService.init();
  }, []);

  return (
    <SessionProvider session={ session }>
      <Head>
        <title>Musi CI</title>
        <meta name="description" content="The Musi CI web game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <TailwindIndicator/>
        <Toaster position="bottom-center" />
        <Component { ...pageProps } />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
