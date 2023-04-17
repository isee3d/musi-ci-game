import { Fragment } from '@prisma/client';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import * as Tone from 'tone';
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer';
import { ToneJSService } from '~/components/fragmentPlayer/audioService/ToneJSService';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audioService/fragmentWithNotes';
import { FragmentCard } from '~/components/fragmentPlayer/fragmentCard';

const Dog = dynamic(() => import('~/components/3D/canvas/Examples').then((mod) => mod.Dog), { ssr: true })
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

const Ortho = dynamic(() => import('~/components/3D/canvas/View').then((mod) => mod.Ortho), { ssr: false })
const Lines = dynamic(() => import('~/components/3D/canvas/Examples').then((mod) => mod.Lines), { ssr: false })

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
            <Lines />
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
