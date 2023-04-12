import { Fragment } from '@prisma/client';
import React from 'react';
import * as Tone from 'tone';
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer';
import { ToneJSService } from '~/components/fragmentPlayer/audioService/ToneJSService';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audioService/fragmentWithNotes';
import { FragmentCard } from '~/components/fragmentPlayer/fragmentCard';

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
    <FragmentCard color='right' onClick={async () => {
      ToneJSService.start(fragment)
      }}>
              <AnimationPlayer
                  fragment={ fragment }
                  width={ 200 }
                  height={ (window.innerHeight - 200) / 2 }
              />
    </FragmentCard>
    </>
  );
};

export default fragmentPlayer;
