import React from 'react';
import toast from 'react-hot-toast';
import { LuisterenMachineContext } from '~/pages/[levelId]/[subLevel]/[mode]';
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore';
import { api } from '~/utils/api';

const input = {
    id_User: "1",
    id_level: 1,
    id_subLevel: 1,
    id_gameMode: 2,
    answeredCorrectlyAmount: 10,
    answeredIncorrectlyAmount: 5,
    startTime: new Date("2023-06-08T10:00:00"),
    endTime: new Date("2023-06-08T11:00:00"),
    score: 80,
    Scenes: [
        {
            chosenFragmentLatency: 1000,
            sceneFragments: [
                {
                    fragmentIndex: 1,
                    isCorrectFragment: true,
                    isPlayedFragment: false,
                    groundTone: 1,
                },
                {
                    fragmentIndex: 2,
                    isCorrectFragment: false,
                    isPlayedFragment: true,
                    groundTone: 9,
                },
                // More sceneFragments if necessary
            ],
            relistenFragments: [
                {
                    id_fragment: 1,
                    relistenCount: 3,
                },
                {
                    id_fragment: 2,
                    relistenCount: 2,
                },
                // More relistenFragments if necessary
            ],
        },
        // More Scenes if necessary
    ],
};


const PlayButtonsRenderer: React.FC = () => {
    const { send } = LuisterenMachineContext.useActorRef();
    const { resetSceneRelatedData, setEndTime, sceneData, addScene } = useLuisterenStore();
    const { mutate: saveToDB } = api.levelResult.saveLevelResult.useMutation({
        onSuccess: () => {
            toast.success("levelResult created!");
        },
        onError: () => {
            toast.error("Failed to upload new levelresult!");
        }
    });



    return (
        <>
            <button
                onClick={ () => {
                    send("SHUFFLEFRAGMENTS")
                    addScene(sceneData);
                    resetSceneRelatedData();
                } }
                className=" rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            >
                <h3 className="text-center text-xl font-bold">Play knop</h3>
            </button>
            <button
                onClick={ () => {
                    send("FINISHEDLISTENING")
                    setEndTime(Date.now());
                    saveToDB(input)
                } }
                className="rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
            >
                <h3 className="text-center text-xl font-bold">Stop Luisteren</h3>
            </button>
        </>
    )
};

export default PlayButtonsRenderer;
