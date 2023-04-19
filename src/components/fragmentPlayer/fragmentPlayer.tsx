import { Fragment } from '@prisma/client';
import dynamic from 'next/dynamic';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three'
import * as Tone from 'tone';
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer';
import { ToneJSService } from '~/components/fragmentPlayer/audioService-legacy/ToneJSService';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import { FragmentCard } from '~/components/fragmentPlayer/fragmentCard';
import { getNotesPositions } from '~/components/fragmentPlayer/fragmentPlayerUtils';

const Ortho = dynamic(() => import('~/components/3D/canvas/View').then((mod) => mod.Ortho), { ssr: false })
const FragmentLine = dynamic(() => import('~/components/3D/canvas/Examples').then((mod) => mod.FragmentLine), { ssr: false })
const FragmentCircle = dynamic(() => import('~/components/3D/canvas/Examples').then((mod) => mod.FragmentCircle), { ssr: false })

const View = dynamic(() => import('~/components/3D/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})

const points: THREE.Vector3[] = [
  new THREE.Vector3(5, 150, 0),
  new THREE.Vector3(11, 0, 0),
];

const points2: THREE.Vector3[] = [
  new THREE.Vector3(104, -90, 0),
  new THREE.Vector3(200, -90, 0),
];

const points3: THREE.Vector3[] = [
  new THREE.Vector3(200, -10, 0),
  new THREE.Vector3(300, -10, 0),
];

const pointsArray = [points, points2, points3];

function findMinMaxX(pointsArray: THREE.Vector3[][]): [number, number] {
  let minX = Infinity;
  let maxX = -Infinity;

  for (const points of pointsArray) {
    for (const point of points) {
      minX = Math.min(minX, point.x);
      maxX = Math.max(maxX, point.x);
    }
  }

  return [minX, maxX];
}

interface FragmentPlayerProps {
  fragment: FragmentWithNotes;
  onClick?: (fragment: Fragment) => void;
}

const FragmentPlayer: React.FC<FragmentPlayerProps> = ({
  fragment,
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positionZeroPoint, setPositionZeroPoint] = useState<number>(0);
  const [notePositions, setNotePositions] = useState<THREE.Vector3[][]>([]);
  useEffect(() => {
    if (containerRef.current) {
      setNotePositions(getNotesPositions(fragment.notes,
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
        ))
        resizeWindow();
      window.addEventListener('resize', resizeWindow);
    }
    return () => {
      window.removeEventListener('resize', resizeWindow);
    };
  }, []);

  function resizeWindow(): void {
    // const minMax = findMinMaxX(notePositions);
    const minMax = findMinMaxX(pointsArray);
    setPositionZeroPoint((minMax[1] - minMax[0]) / 2 * -1);
  }

  return (
    <>
      <div onClick={ () => console.log(containerRef.current?.clientWidth) } ref={ containerRef } className='relative rounded-2xl bg-zinc-500'>
        <View useOrbit className=' h-full sm:h-48 sm:w-full'>
          <Suspense fallback={ null }>
            { notePositions.map((points, index) => (
              <FragmentLine
                key={ index }
                position={ new THREE.Vector3(positionZeroPoint, 0, 0) }
                lineWidth={ 8 }
                color={ "black" }
                points={ points }
              />
            )) }
            <FragmentCircle pointsList={ notePositions } segments={ 32 } position={ new THREE.Vector3(positionZeroPoint, 0, 0) } radius={ 10 } color={ "red" } isAnimating={ true } />
            <Ortho />
          </Suspense>
        </View>
      </div>








      {/* <FragmentCard color='right' onClick={async () => {
      ToneJSService.start(fragment)
      }}>
              <AnimationPlayer
                  fragment={ fragment }
                  width={ 200 }
                  height={ (window.innerHeight - 200) / 2 }
              />
    </FragmentCard> */}


    </>
  );
};

export default FragmentPlayer;
