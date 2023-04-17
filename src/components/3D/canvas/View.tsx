// 'use client'

import React, { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import { OrbitControls, OrthographicCamera, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
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

export const Ortho = ({ color }: CommonProps) => (
  <Suspense fallback={ null }>
    { color && <color attach='background' args={ [color] } /> }
    <ambientLight intensity={ 0.5 } />
    <pointLight position={ [20, 30, 10] } intensity={ 1 } />
    <pointLight position={ [-10, -10, -10] } color='blue' />
    <OrthographicCamera
      makeDefault
      // zoom={ 1 }
      // top={ 200 }
      // bottom={ -200 }
      // left={ -200 }
      // right={ 200 }
      // near={ 1 }
      // far={ 100 }
      position={ [0, 0, 10] }
    />
  </Suspense>
)


const View = forwardRef(({ children, useOrbit, className, ...props }
  : { children: React.ReactNode, useOrbit: boolean, className?: string },
  ref) => {
  const localRef: React.RefObject<any> | undefined = useRef(null)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <>
      <div ref={ localRef } className={ className } { ...props } />
      <Three>
        <ViewImpl track={ localRef }>
          { children }
          {/* { useOrbit && <OrbitControls /> } */ }
        </ViewImpl>
      </Three>
    </>
  )
})
View.displayName = 'View'

export { View }
