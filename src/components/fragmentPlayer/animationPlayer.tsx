import dynamic from 'next/dynamic';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three'
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import { getNotesPositions } from '~/components/fragmentPlayer/fragmentPlayerUtils';
import { start } from '~/components/fragmentPlayer/audio/AudioControls';

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

function findMinMaxX(pointsArray: NotePositionTime[]): [number, number] {
  let minX = Infinity;
  let maxX = -Infinity;

  for (const points of pointsArray) {
    for (const point of points.position) {
      minX = Math.min(minX, point.x);
      maxX = Math.max(maxX, point.x);
    }
  }

  return [minX, maxX];
}

interface AnimationPlayerOptions {
  isClickable?: boolean;
  isLooping?: boolean;
  isAnimating: boolean;
  onAnimationClicked?: (fragment: FragmentWithNotes) => void;
  onAnimationComplete?: () => void;
}

interface AnimationPlayerProps {
  animationFragment: FragmentWithNotes;
  options?: AnimationPlayerOptions;
}

export interface NotePositionTime {
  position: THREE.Vector3[];
  time: number;
}

const AnimationPlayer: React.FC<AnimationPlayerProps> = ({
  animationFragment, options
}) => {
  const [positionZeroPoint, setPositionZeroPoint] = useState<number>(0);
  const [notePositions, setNotePositions] = useState<NotePositionTime[]>([]);
  const containerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      resizeWindow();
      window.addEventListener('resize', resizeWindow);
    }
    return () => {
      window.removeEventListener('resize', resizeWindow);
    };
  }, []);

  function resizeWindow(): void {
    if (containerRef.current) {
      const notePositions = getNotesPositions(
        animationFragment.notes,
        containerRef.current.clientWidth,
        containerRef.current.clientHeight,
        8
      );

      setNotePositions(latestNotePositions => {
        const minMax = findMinMaxX(latestNotePositions);
        setPositionZeroPoint((minMax[1] - minMax[0]) / 2 * -1);
        return notePositions;
      });
    }
  }

  function handleAnimationClicked() {
    if (options?.onAnimationClicked) {
      options.onAnimationClicked(animationFragment);
    }
  }

  function handleAnimationComplete() {
    if (options?.onAnimationComplete) {
      options.onAnimationComplete();
    }
  }
  console.log('options?.isAnimating', options?.isAnimating, options?.isClickable);
  return (
    <button
      disabled={ (!options?.isAnimating && !options?.isClickable) }
      onClick={ handleAnimationClicked }
      ref={ containerRef }
      className={ ` rounded-2xl bg-zinc-500 shadow shadow-slate-600  ${(!options?.isAnimating && options?.isClickable) ? 'cursor-pointer hover:bg-slate-200' : 'cursor-not-allowed bg-gray-400'}` }
    >
      <View useOrbit className='h-48 w-full'>
        <Suspense fallback={ null }>
          { notePositions.map((points, index) => (
            <FragmentLine
              key={ index }
              position={ new THREE.Vector3(positionZeroPoint, 0, 0) }
              lineWidth={ 8 }
              color={ "black" }
              points={ points.position }
            />
          )) }
          <FragmentCircle
            pointsList={ notePositions }
            segments={ 32 }
            xCorrection={ positionZeroPoint }
            radius={ 10 }
            color={ "red" }
            onComplete={ handleAnimationComplete }
            isAnimating={ options?.isAnimating  }
            loop={ options?.isLooping } />
          <Ortho />
        </Suspense>
      </View>
    </button>
  );
};

export default AnimationPlayer;
