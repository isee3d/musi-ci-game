// 'use client'

import { Circle, Plane, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Ref, useMemo, useRef, useState } from 'react'
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'

export const Blob = ({ route = '/', ...props }) => {
  const router = useRouter()
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  return (
    <mesh
      onClick={ () => router.push(route) }
      onPointerOver={ () => hover(true) }
      onPointerOut={ () => hover(false) }
      { ...props }>
      <sphereGeometry args={ [1, 64, 64] } />
      <MeshDistortMaterial roughness={ 0 } color={ hovered ? 'hotpink' : '#1fb2f5' } />
    </mesh>
  )
}

export const Logo = ({ route = '/blob', ...props }) => {
  const mesh: Ref<THREE.Group> | undefined = useRef(null)
  const router = useRouter()

  const [hovered, hover] = useState(false)
  const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), [])

  useCursor(hovered)
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    if (!mesh.current) return
    mesh.current.rotation.y = Math.sin(t) * (Math.PI / 8)
    mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
    mesh.current.rotation.z -= delta / 4
  })

  return (
    <group ref={ mesh } { ...props }>
      <Line worldUnits points={ points } color='#1fb2f5' lineWidth={ 0.15 } />
      <Line worldUnits points={ points } color='#1fb2f5' lineWidth={ 0.15 } rotation={ [0, 0, 1] } />
      <Line worldUnits points={ points } color='#1fb2f5' lineWidth={ 0.15 } rotation={ [0, 0, -1] } />
      <mesh
        onClick={ () => router.push(route) }
        onPointerOver={ () => hover(true) }
        onPointerOut={ () => hover(false) }
      >
        <sphereGeometry args={ [0.55, 64, 64] } />
        <meshPhysicalMaterial roughness={ 0 } color={ hovered ? 'hotpink' : '#1fb2f5' } />
      </mesh>
    </group>
  )
}

export function Duck(props: any) {
  const { scene } = useGLTF('/duck.glb')

  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={ scene } { ...props } />
}

export function Dog(props: any) {
  const { scene } = useGLTF('/dog.glb')

  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={ scene } { ...props } />
}

interface LineProps {
  points: THREE.Vector3[];
  color: THREE.ColorRepresentation;
  lineWidth: number;
  position: THREE.Vector3;
}

export function FragmentLine(props: LineProps) {
  return (
    <Line
      points={ props.points }
      color={ props.color }
      lineWidth={ props.lineWidth }
      position={ props.position }
    />
  )
}

interface CircleProps {
  radius: number;
  color: THREE.ColorRepresentation;
  position: THREE.Vector3;
  segments: number;
  pointsList: THREE.Vector3[][];
  isAnimating: boolean;
}

export function FragmentCircle(props: CircleProps) {
  const [circlePosition, setCirclePosition] = useState(new THREE.Vector3(-100, 0, 0));

  const material = new THREE.MeshBasicMaterial({
    color: props.color,
  });

  const totalTime = 10;

  useFrame(({ clock }) => {
    if (!props.isAnimating) return;
    const time = clock.getElapsedTime();
    const segmentTime = totalTime / props.pointsList.length;

    // Calculate the current index based on time and segmentTime
    const currentIndex = Math.floor(time % totalTime / segmentTime);

    // Calculate the length of the line at currentIndex
    const lineLength = props.pointsList[currentIndex][1].x - props.pointsList[currentIndex][0].x;

    // Calculate the normalizedTime for the current line segment
    const normalizedTime = (time % segmentTime) / segmentTime;

    // Calculate the new x position based on the line length and normalizedTime
    const newX = props.pointsList[currentIndex][0].x + (normalizedTime * lineLength);

    // Fetch the y value from the pointsList array using the currentIndex
    const currentY = props.pointsList[currentIndex][0].y;

    // Set the circlePosition with the updated x and y values
    setCirclePosition(new THREE.Vector3(newX, currentY, 0));
  });

  return (
      <mesh position={ circlePosition.clone().add(props.position) }>
        {props.isAnimating &&
        <Circle args={ [props.radius, props.segments] } material={ material } />
        }
      </mesh>
  );
}
