import Head from "next/head";
import React, { ReactNode } from 'react';

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
            { children }
        </>
    );
};

export default Layout;
