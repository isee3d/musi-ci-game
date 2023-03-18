import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Layout from '../components/layout';
import { Provider } from "jotai";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Provider>
      <Layout>
        <SessionProvider session={ session }>
          <Component { ...pageProps } />
        </SessionProvider>
      </Layout>
    </Provider>
  );
};

export default api.withTRPC(MyApp);
