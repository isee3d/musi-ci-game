import { useSession } from 'next-auth/react';
import React from 'react';
import toast from 'react-hot-toast';
import { LuisterenMachineContext } from '~/pages/[levelId]/[subLevel]/[mode]';
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore';
import { api } from '~/utils/api';

const PlayButtonsRenderer: React.FC = () => {
    const { data: sessionData } = useSession();

    const { send } = LuisterenMachineContext.useActorRef();
    const { resetSceneRelatedData, setEndTime, sceneData, addScene, getFormattedStoreData } = useLuisterenStore();
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
                    console.log( "data " + JSON.stringify(getFormattedStoreData(sessionData?.user.id ?? "1")))
                    saveToDB(getFormattedStoreData(sessionData?.user.id ?? "1"))
                } }
                className="rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
            >
                <h3 className="text-center text-xl font-bold">Stop Luisteren</h3>
            </button>
        </>
    )
};

export default PlayButtonsRenderer;
