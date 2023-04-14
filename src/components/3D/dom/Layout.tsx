// 'use client'

import { ReactNode, useRef } from 'react'
import dynamic from 'next/dynamic'
import NavMenu from '~/components/navbar';
import Footer from '~/components/footer';
const Scene = dynamic(() => import('~/components/3D/canvas/Scene'), { ssr: false })

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const ref = useRef(null)

  return (
    <div
      ref={ ref }
      className="relative h-full w-full overflow-auto"
      style={ { touchAction: 'auto' } }
    >
      <div className=" flex min-h-screen flex-col overflow-y-hidden">
        <NavMenu />
        { children }
        <Footer />
        <Scene
          style={ {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
          } }
          eventSource={ ref }
          eventPrefix='client'
        />
      </div>
    </div>
  )
}

export { Layout }
