// 'use client'

import { Canvas } from '@react-three/fiber'
import { Preload, Stats } from '@react-three/drei'
import { r3f } from '~/components/3D/helpers/global'

export default function Scene({ ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}>
      <r3f.Out />
      <Preload all />
      <Stats showPanel={ 0 } className="stats" { ...props } />
    </Canvas>
  )
}
