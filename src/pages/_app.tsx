import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { api } from "~/utils/api";
import Layout from '../components/layout';
import Head from "next/head";
import Header from '~/config'

import { ToneJSService } from "~/components/fragmentPlayer/audioService/ToneJSService";
import { useEffect, useRef } from "react";
import AudioService from "~/components/fragmentPlayer/audioService/AudioService";
import dynamic from "next/dynamic";
import { NextComponentType, NextPageContext } from "next";
import "~/styles/globals.css";

const Scene = dynamic(() => import("~/components/canvas/Scene"), { ssr: true });

type CustomComponentType = NextComponentType<NextPageContext, any, any> & {
  canvas?: (pageProps: any) => JSX.Element;
};

const MyApp: AppType<{ session: Session | null, title?: string }> = ({
  Component,
  pageProps: { session, title = "index", ...pageProps },
}) => {

  const ref = useRef(null);

  useEffect(() => {
    ToneJSService.init();
    AudioService.init();
  }, []);

  const CustomComponent = Component as CustomComponentType;

  return (
    <SessionProvider session={ session }>
      <Head>
        <title>Musi CI</title>
        <meta name="description" content="The Musi CI web game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Header title={ title } />
        <Toaster position="bottom-center" />
        <div
          ref={ ref }
          className="absolute left-0 top-0 z-10 h-screen w-screen overflow-hidden bg-zinc-900 text-gray-50">
          <Component { ...pageProps } />
          { CustomComponent?.canvas && (
            <Scene className="pointer-events-none" eventSource={ ref } eventPrefix="client">
              { CustomComponent.canvas(pageProps) }
            </Scene>
          ) }
        </div>
        {/* <Component { ...pageProps } /> */ }
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
