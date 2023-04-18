import { Fragment } from '@prisma/client';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import * as THREE from 'three'
import * as Tone from 'tone';
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer';
import { ToneJSService } from '~/components/fragmentPlayer/audioService/ToneJSService';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audioService/fragmentWithNotes';
import { FragmentCard } from '~/components/fragmentPlayer/fragmentCard';

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
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(96, 0, 0),
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

const Ortho = dynamic(() => import('~/components/3D/canvas/View').then((mod) => mod.Ortho), { ssr: true })
const Lines = dynamic(() => import('~/components/3D/canvas/Examples').then((mod) => mod.Lines), { ssr: true })
const FragmentLine = dynamic(() => import('~/components/3D/canvas/Examples').then((mod) => mod.FragmentLine), { ssr: true })
const FragmentCircle = dynamic(() => import('~/components/3D/canvas/Examples').then((mod) => mod.FragmentCircle), { ssr: true })

interface FragmentPlayerProps {
  fragment: FragmentWithNotes;
  onClick?: (fragment: Fragment) => void;
}

const fragmentPlayer: React.FC<FragmentPlayerProps> = ({
  fragment,
  onClick,
}) => {
  return (
    <>
      <div className='rounded-2xl bg-zinc-500'>
        <View useOrbit className=' h-full sm:h-48 sm:w-full'>
          <Suspense fallback={ null }>
            {pointsArray.map((points, index) => (
              <FragmentLine key={ index } position={ new THREE.Vector3(-100, 0, 0)} lineWidth={8} color={"black"} points={ points } />
            ))}
            <FragmentCircle pointsList={pointsArray} segments={32} position={ new THREE.Vector3(-100, 0, 0)} radius={ 10 } color={"red"} />
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

export default fragmentPlayer;
