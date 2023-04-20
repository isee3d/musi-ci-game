// 'use client'

import { Circle, Plane, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Ref, useMemo, useRef, useState, useEffect } from 'react'
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import { NotePositionTime } from '~/components/fragmentPlayer/fragmentPlayer'

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
  // const [color, setColor] = useState("#000000");

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const newColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  //     setColor(newColor);
  //   }, 16);

  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <Line
      points={ props.points }
      color={ props.color as THREE.ColorRepresentation }
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
  totalTime: number;
  pointsList: NotePositionTime[];
  isAnimating: boolean;
  onStart?: () => void;
  onComplete?: () => void;
}

export function FragmentCircle(props: CircleProps) {
  const [circlePosition, setCirclePosition] = useState(new THREE.Vector3(-100, 0, 0));

  useEffect(() => {
    if (props.isAnimating && props.onStart) {
      props.onStart();
    }
  }, [props.isAnimating, props.onStart]);

  const material = new THREE.MeshBasicMaterial({
    color: props.color,
  });

  const lineLength = useRef(0);
  const normalizedTime = useRef(0);
  const newX = useRef(0);
  const currentY = useRef(0);

  useFrame(({ clock }) => {
    if (!props.isAnimating) return;

    const time = clock.getElapsedTime() * 1000;
    let elapsedTime = 0;
    let segmentIndex = 0;

    // Find the appropriate segment based on the elapsedTime and segmentDurations
    while (elapsedTime + props.pointsList[segmentIndex]!.time < time) {
      elapsedTime += props.pointsList[segmentIndex]!.time;
      segmentIndex = (segmentIndex + 1) % props.pointsList.length;
    }

    // Calculate the remaining time for the current segment
    const remainingTime = time - elapsedTime;

    const currentSegment = props.pointsList[segmentIndex]?.position;

    if (!currentSegment || currentSegment.length < 2) return;

    // Type assertion to ensure TypeScript recognizes the value as defined
    const startPoint = currentSegment[0] as { x: number; y: number };
    const endPoint = currentSegment[1] as { x: number; y: number };

    // Calculate the length of the line at segmentIndex
    lineLength.current = endPoint.x - startPoint.x;

    // Calculate the normalizedTime for the current line segment
    normalizedTime.current = remainingTime / props.pointsList[segmentIndex]!.time;

    // Calculate the new x position based on the line length and normalizedTime
    newX.current = startPoint.x + (normalizedTime.current * lineLength.current);

    // Fetch the y value from the pointsList array using the segmentIndex
    currentY.current = startPoint.y;

    // Set the circlePosition with the updated x and y values
    setCirclePosition(new THREE.Vector3(newX.current, currentY.current, 0));

    console.log("segmentIndex", segmentIndex, props.pointsList.length - 1, normalizedTime.current);
    if (segmentIndex === props.pointsList.length - 1 && newX.current >= endPoint.x) {
      if (props.onComplete) {
        props.onComplete();
      }
      return;
    }
  });

  return (
    <mesh position={ circlePosition.clone().add(props.position) }>
      { props.isAnimating &&
        <Circle args={ [props.radius, props.segments] } material={ material } />
      }
    </mesh>
  );
}
