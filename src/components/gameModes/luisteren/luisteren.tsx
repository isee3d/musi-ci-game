import React, { useRef, useState } from 'react';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes';
import { useAudioServiceStore } from '~/stores/useAudioServiceStore';
import BackToOverView from '~/components/gameModes/luisteren/backToOverView';
import PlayButtonsRenderer from '~/components/gameModes/luisteren/playButtonsRenderer';
import LuisterenFeedback from '~/components/gameModes/luisteren/luisterenFeedback';
import LuisterenfragmentPlayerRenderer from '~/components/gameModes/luisteren/luisterenfragmentPlayerRenderer';

interface LuisterenProps {
    fragmentsToShow: number;
    fragments: FragmentWithNotes[];
    levelName: string;
}

const Luisteren: React.FC<LuisterenProps> = ({ fragments, fragmentsToShow, levelName }) => {
    const { transposeFragments } = useAudioServiceStore();
    const [shownFragments, setShownFragments] = useState(fragments.slice(0, fragmentsToShow));
    const [isPlayingGameMode, setIsPlayingGameMode] = useState(true);
    const time = useRef(Date.now());


    function shuffleNewFragments() {
        const shuffledFragments = fragments.sort(() => Math.random() - 0.5);
        const selectedFragments = shuffledFragments.slice(0, fragmentsToShow);
        const randomTransposeDirection = Math.floor(Math.random() * 12 - 0.0001) - 6;
        const transposedFragments = transposeFragments(selectedFragments, randomTransposeDirection);
        setShownFragments(transposedFragments);
    }

    return (
        <>
            <h3 className="text-center text-4xl font-extrabold tracking-tight text-white">
                Kijk en luister
            </h3>
            { isPlayingGameMode && <LuisterenfragmentPlayerRenderer shownFragments={shownFragments} /> }
            { !isPlayingGameMode && <LuisterenFeedback time={ time } /> }
            <div className=" flex justify-center space-x-5">
                { !isPlayingGameMode && <BackToOverView levelName={ levelName } /> }
                { isPlayingGameMode && < PlayButtonsRenderer shuffleNewFragments={ shuffleNewFragments } setIsPlayingGameMode={ setIsPlayingGameMode } /> }
            </div>
        </>
    );
};

export default Luisteren;
