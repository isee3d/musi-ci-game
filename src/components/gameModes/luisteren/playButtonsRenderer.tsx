import React from 'react';

interface PlayButtonsRendererProps {
    setIsPlayingGameMode: (isPlaying: boolean) => void;
    shuffleNewFragments: () => void;
}

const PlayButtonsRenderer: React.FC<PlayButtonsRendererProps> = ({shuffleNewFragments, setIsPlayingGameMode}) => {
    return (
        <>
            <button
                onClick={ shuffleNewFragments }
                className=" rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            >
                <h3 className="text-center text-xl font-bold">Play knop</h3>
            </button>
            <button
                onClick={ () => setIsPlayingGameMode(false) }
                className="rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
            >
                <h3 className="text-center text-xl font-bold">Stop Luisteren</h3>
            </button>
        </>
    )
};

export default PlayButtonsRenderer;
