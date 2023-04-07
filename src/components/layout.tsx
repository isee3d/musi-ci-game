import Head from "next/head";
import Script from "next/script";
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
            <Script
                id="debug-screens"
                dangerouslySetInnerHTML={ {
                    __html: `
              document.documentElement.classList.remove('debug-screens');
              document.body.className = '${bodyClassName}';
            `,
                } }
            />
            <div className=" flex min-h-screen flex-col overflow-y-hidden">
                <NavMenu />
                { children }
                <Footer />
            </div>
        </>
    );
};

export default Layout;
