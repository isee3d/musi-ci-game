// 'use client'

import { Circle, Plane, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Ref, useMemo, useRef, useState, useEffect } from 'react'
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import { NotePositionTime } from '~/components/fragmentPlayer/animationPlayer'

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
  xCorrection: number;
  segments: number;
  pointsList: NotePositionTime[];
  isAnimating?: boolean;
  loop?: boolean;
  onComplete?: () => void;
}

export function FragmentCircle(props: CircleProps) {
  const circle = useRef<THREE.Mesh>(null);
  const segmentIndex = useRef(0);
  const animationTimer = useRef(0);
  const segmentTimer = useRef(0);
  const currentSegment = useRef<NotePositionTime | undefined>(undefined);

  const material = new THREE.MeshBasicMaterial({
    color: props.color,
  });

  const totalAnimationDuration = props.pointsList.reduce((acc, curr) => acc + curr.time, 0);

  const isAnimating = (): boolean => {
    if (!props.isAnimating) {
      [animationTimer.current, segmentTimer.current, segmentIndex.current] = [0, 0, 0];
      return false;
    }
    return true;
  };

  const updateTimers = (delta: number): void => {
    animationTimer.current += delta * 1000;
    segmentTimer.current += delta * 1000;
  };

  const isAnimationComplete = (): boolean => {
    if (animationTimer.current >= totalAnimationDuration) {
      if (props.loop && props.loop === true) {
        animationTimer.current = 0;
        segmentTimer.current = 0;
        segmentIndex.current = 0;
      } else {
        props.onComplete?.();
        return true;
      }
    }
    return false;
  };

  const updatePosition = (): void => {
    currentSegment.current = props.pointsList[segmentIndex.current];
    if (!currentSegment.current) return;

    const startPoint = currentSegment.current.position[0] as { x: number; y: number };
    const endPoint = currentSegment.current.position[1] as { x: number; y: number };

    const noteLineLength = endPoint.x - startPoint.x;
    const normalizedTime = segmentTimer.current / currentSegment.current.time;

    const newX = startPoint.x + (normalizedTime * noteLineLength);
    const NewY = startPoint.y;

    circle.current?.position.set(newX + props.xCorrection, NewY, 0);
  };

  const updateSegmentIndex = (): void => {
    if (!currentSegment.current) return;
    if (segmentTimer.current > currentSegment.current.time) {
      segmentTimer.current = 0;
      segmentIndex.current = (segmentIndex.current + 1) % props.pointsList.length;
    }
  };

  useFrame((_, delta) => {
    if (!isAnimating()) return;
    if (isAnimationComplete()) return
    updateTimers(delta);
    updatePosition();
    updateSegmentIndex();
  });

  return (
    <mesh position={ circle.current?.position } ref={ circle }>
      { props.isAnimating &&
        <Circle args={ [props.radius, props.segments] } material={ material } />
      }
    </mesh>
  );
}
