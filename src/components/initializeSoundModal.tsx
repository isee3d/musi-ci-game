import { useEffect } from "react";
import { initializeSound } from "~/components/fragmentPlayer/audio/AudioControls";
import { useAudioServiceStore } from "~/stores/useAudioServiceStore";

interface BaseStaticModalProps {
    setmodal: React.Dispatch<React.SetStateAction<boolean>>;
    showModal: boolean;
}

const InitializeSoundModal: React.FC<BaseStaticModalProps> = ({ showModal, setmodal }) => {
    const { audioContext } = useAudioServiceStore();

    function handleAudiocontextChange(e: AudioContextState) {
        if (e === "running") return
        setmodal(true);
    }

    async function initializeAudio() {
        setmodal(false);
        await initializeSound();
    }

    useEffect(() => {
        if (!audioContext) return;
        audioContext.onstatechange = () => {
            handleAudiocontextChange(audioContext.state)
        }
    }, [])

    return (
        <>
            { showModal ? (
                <>
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
                    >
                        <div className="relative mx-auto my-6 w-auto max-w-3xl">
                            {/*content*/ }
                            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                                {/*header*/ }
                                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                                    <h3 className="text-3xl font-semibold">
                                        Geluid is uitgeschakeld voor deze website
                                    </h3>
                                </div>
                                {/*body*/ }
                                <div className="relative flex justify-center p-6">
                                    <p className="my-4 text-lg leading-relaxed ">
                                        Klik op de knop hieronder om het geluid in te schakelen.
                                    </p>
                                </div>
                                {/*footer*/ }
                                <div className="flex items-center justify-center rounded-b border-t border-solid border-slate-200 p-6">
                                    <button
                                        className="mb-1 mr-1 rounded bg-primary px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-primary"
                                        type="button"
                                        onClick={ initializeAudio }
                                    >
                                        * icoon geluid hier *
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Cover for the background so its a bit blurred out */}
                    <div className="fixed inset-0 z-40 backdrop-blur-3xl bg-black opacity-50"></div>
                </>
            ) : null }
        </>
    );
};

export default InitializeSoundModal;
