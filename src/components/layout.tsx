import Head from "next/head";
import Link from "next/link";
import React, { ReactNode } from 'react';
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
            <NavMenu />
            { children }
            <div className="relative bottom-0 w-full bg-gray-200 py-2 px-4 text-xs text-gray-600">
                <i className="relative left-0">v1.0.5</i>
                <Link href="https://www.musi-ci.nl/">Musi-CI Game ©2023 JokeVeltmanMuziek</Link>
            </div>
        </>
    );
};

export default Layout;
