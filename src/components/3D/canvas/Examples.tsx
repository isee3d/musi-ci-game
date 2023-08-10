// 'use client'

import { Circle } from '@react-three/drei'
import { useFrame, extend, Object3DNode, MaterialNode } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'
import { NotePositionTime } from '~/components/fragmentPlayer/animationPlayer'
import { MeshLineGeometry, MeshLineMaterial, raycast } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>
    meshLineMaterial: MaterialNode<MeshLineMaterial, typeof MeshLineMaterial>
  }
}

interface LineProps {
  points: THREE.Vector3[]
  color: THREE.ColorRepresentation
  lineWidth: number
  position: THREE.Vector3
}

export function FragmentLine(props: LineProps) {
  const circleRadius = useRef(4)

  const material = new THREE.MeshBasicMaterial({
    color: props.color,
  })

  return (
    <group position={props.position}>
      <mesh raycast={raycast}>
        <meshLineGeometry
          points={props.points.flatMap((vector) => [vector.x, vector.y, vector.z])}
        />
        <meshLineMaterial
          lineWidth={1 / props.lineWidth}
          color={props.color as THREE.ColorRepresentation}
        />
      </mesh>
      <mesh position={props.points[0]}>
        <Circle args={[circleRadius.current, 32]} material={material} />
      </mesh>
      <mesh position={props.points[props.points.length - 1]}>
        <Circle args={[circleRadius.current, 32]} material={material} />
      </mesh>
    </group>
  )
}

interface CircleProps {
  radius: number
  color: THREE.ColorRepresentation
  xCorrection: number
  segments: number
  pointsList: NotePositionTime[]
  isAnimating?: boolean
  loop?: boolean
  onComplete?: () => void
}

export function FragmentCircle(props: CircleProps) {
  const circle = useRef<THREE.Mesh>(null)
  const segmentIndex = useRef(0)
  const animationTimer = useRef(0)
  const segmentTimer = useRef(0)
  const currentSegment = useRef<NotePositionTime | undefined>(undefined)

  const material = new THREE.MeshBasicMaterial({
    color: props.color,
  })

  const totalAnimationDuration = props.pointsList.reduce((acc, curr) => acc + curr.time, 0)

  const isAnimating = (): boolean => {
    if (!props.isAnimating) {
      ;[animationTimer.current, segmentTimer.current, segmentIndex.current] = [0, 0, 0]
      return false
    }
    return true
  }

  const updateTimers = (delta: number): void => {
    animationTimer.current += delta * 1000
    segmentTimer.current += delta * 1000
  }

  const isAnimationComplete = (): boolean => {
    if (animationTimer.current >= totalAnimationDuration) {
      if (props.loop && props.loop === true) {
        animationTimer.current = 0
        segmentTimer.current = 0
        segmentIndex.current = 0
      } else {
        props.onComplete?.()
        return true
      }
    }
    return false
  }

  const updatePosition = (): void => {
    currentSegment.current = props.pointsList[segmentIndex.current]
    if (!currentSegment.current) return

    const startPoint = currentSegment.current.position[0] as { x: number; y: number }
    const endPoint = currentSegment.current.position[1] as { x: number; y: number }

    const noteLineLength = endPoint.x - startPoint.x
    const normalizedTime = segmentTimer.current / currentSegment.current.time

    const newX = startPoint.x + normalizedTime * noteLineLength
    const NewY = startPoint.y

    circle.current?.position.set(newX + props.xCorrection, NewY, 0)
  }

  const updateSegmentIndex = (): void => {
    if (!currentSegment.current) return
    if (segmentTimer.current > currentSegment.current.time) {
      segmentTimer.current = 0
      segmentIndex.current = (segmentIndex.current + 1) % props.pointsList.length
    }
  }

  useFrame((_, delta) => {
    if (!isAnimating()) return
    if (isAnimationComplete()) return
    updateTimers(delta)
    updatePosition()
    updateSegmentIndex()
  })

  return (
    <mesh position={circle.current?.position} ref={circle}>
      {props.isAnimating && <Circle args={[props.radius, props.segments]} material={material} />}
    </mesh>
  )
}
