// 'use client'

import React, { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import { Three } from '~/components/3D/helpers/components/Three'
import { ColorRepresentation } from 'three';

interface CommonProps {
  color?: ColorRepresentation;
}

export const Common = ({ color }: CommonProps) => (
  <Suspense fallback={ null }>
    { color && <color attach='background' args={ [color] } /> }
    <ambientLight intensity={ 0.5 } />
    <pointLight position={ [20, 30, 10] } intensity={ 1 } />
    <pointLight position={ [-10, -10, -10] } color='blue' />
    <PerspectiveCamera makeDefault fov={ 40 } position={ [0, 0, 6] } />
  </Suspense>
)

const View = forwardRef(({ children, orbit, className, ...props }
  : { children: React.ReactNode, orbit: any, className: string },
   ref) => {
  const localRef: React.RefObject<any> | undefined = useRef(null)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <>
      <div ref={ localRef } className={ className } { ...props } />
      <Three>
        <ViewImpl track={ localRef }>
          { children }
          { orbit && <OrbitControls /> }
        </ViewImpl>
      </Three>
    </>
  )
})
View.displayName = 'View'

export { View }
