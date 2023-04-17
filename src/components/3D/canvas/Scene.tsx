// 'use client'

import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor, Preload, Stats } from '@react-three/drei'
import { r3f } from '~/components/3D/helpers/global'
import { useState } from 'react'

export default function Scene({ ...props }) {

  const [dpr, setDpr] = useState(1.5)
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}>
      <PerformanceMonitor onIncline={ () => setDpr(2) } onDecline={ () => setDpr(1) } ></PerformanceMonitor>
      <r3f.Out />
      <Preload all />
      <Stats showPanel={ 0 } className="stats" { ...props } />
    </Canvas>
  )
}
