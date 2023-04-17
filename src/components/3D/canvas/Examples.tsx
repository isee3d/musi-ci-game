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

export function Lines() {
  const points: THREE.Vector3[] = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(96, 0, 0),
  ];

  const points2: THREE.Vector3[] = [
    new THREE.Vector3(104, 0, 0),
    new THREE.Vector3(200, 0, 0),
  ];

  const circleRef = useRef<THREE.Mesh>(null);

  const circleRadius = 25;
  const circleColor = 'red';
  const [circlePosition, setCirclePosition] = useState(new THREE.Vector3(-100, 0, 0));

  const material = new THREE.MeshBasicMaterial({
    color: circleColor,
  });

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const curve = new THREE.CatmullRomCurve3(points.concat(points2));
    const circlePoint = curve.getPointAt((time % 2) / 2); // Get a point on the curve based on time
    setCirclePosition(new THREE.Vector3(circlePoint.x - 100 + circleRadius, circlePoint.y, 0));
  });

  return (
    <>
      <Line points={ points } color="#00FF00" lineWidth={ 8 } position={ [-100, 0, 0] } />
      <Line points={ points2 } color="black" lineWidth={ 8 } position={ [-100, 0, 0] } />
      <mesh position={ circlePosition } ref={ circleRef }>
        <Circle args={ [circleRadius, 32] } material={ material } />
      </mesh>
    </>
  );
}
