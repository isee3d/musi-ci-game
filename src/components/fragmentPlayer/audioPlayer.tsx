import React, { useEffect } from 'react';
import { start } from '~/components/fragmentPlayer/audio/AudioControls';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';

interface FragmentPlayerOptions {
    isMuted?: boolean;
    isLooping?: boolean;
    onStartedPlaying?: () => void;
    onFinishedPlaying?: () => void;
}

interface AudioPlayerProps {
    fragment?: FragmentWithNotes;
    isPlaying?: boolean;
    options?: FragmentPlayerOptions;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
    fragment,
    isPlaying,
    options
}) => {
    const playAudio = async () => {
        if(!fragment) return;
        start(fragment, {onStartPlaying: options?.onStartedPlaying, onFinishedPlaying: options?.onFinishedPlaying });
    };

    useEffect(() => {
        if (fragment) {
            playAudio();
        }
    }, [fragment]);

    return null;
};

export default AudioPlayer;
