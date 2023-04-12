import { Fragment } from '@prisma/client';
import React from 'react';
import AnimationPlayer from '~/components/fragmentPlayer/animationPlayer';
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
    <FragmentCard color='right' onClick={() => {console.log("clicked")}}>
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
