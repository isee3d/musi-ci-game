import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { inspect } from '@xstate/inspect';

import { api } from "~/utils/api";

import Head from "next/head";

import "~/styles/globals.css";
import { useEffect } from "react";
import { Layout } from "~/components/3D/dom/Layout";
import { TailwindIndicator } from "~/components/tailwindIndicator";
import { useAudioServiceStore } from "~/stores/useAudioServiceStore";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { init: initAudio, audioContext } = useAudioServiceStore.getState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      inspect({
        url: 'https://statecharts.io/inspect', // (default)
        iframe: false, // (default) You can change this to true if you want to use an iframe
      });
    }
    initAudio();
  }, []);


  function handleAudiocontextChange(e: AudioContextState) {
    if(e === "running") return
    // TODO:
    // display a modal to enable audio...
    // maybe in game page, but then with a redirect...
  }


  useEffect(() => {
    if(!audioContext) return;
    audioContext.onstatechange = () => {
        handleAudiocontextChange(audioContext.state)
    }
  },[])

  return (
    <SessionProvider session={ session }>
      <Head>
        <title>Musi CI</title>
        <meta name="description" content="The Musi CI web game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <TailwindIndicator />
        <Toaster position="bottom-center" />
        <Component { ...pageProps } />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
