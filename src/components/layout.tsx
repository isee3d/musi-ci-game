import Head from "next/head";
import Link from "next/link";
import React, { ReactNode } from 'react';
import Footer from "~/components/footer";
import NavMenu from "~/components/navbar";

type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const isDev = process.env.NODE_ENV === 'development';
    const bodyClassName = isDev ? 'debug-screens' : '';

    return (
        <>
            <Head>
                <script
                    dangerouslySetInnerHTML={ {
                        __html: `
              document.documentElement.classList.remove('debug-screens');
              document.body.className = '${bodyClassName}';
            `,
                    } }
                />
            </Head>
            <div className=" flex min-h-screen flex-col overflow-y-hidden">
                <NavMenu />
                { children }
                <Footer />
            </div>
        </>
    );
};

export default Layout;
