import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

interface BaseStaticModalProps {
    setmodal: React.Dispatch<React.SetStateAction<boolean>>;
    showModal: boolean;
}

const UpdateFragmentModal: React.FC = () => {


    const [showModal, setShowModal] = useState(false);
    const [teamId, setTeamId] = useState('');
    const [participantId, setParticipantId] = useState('');


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
                                        Vul hier uw gegeven team ID en participant ID in
                                    </h3>
                                </div>
                                <div className="relative flex justify-center p-6">
                                    <input
                                        type="number"
                                        className="mr-2 border-2 border-gray-300 p-2"
                                        placeholder="Team ID"
                                        value={ teamId }
                                        onChange={ (e) => setTeamId(e.target.value) }
                                    />
                                    <input
                                        type="number"
                                        className="ml-2 border-2 border-gray-300 p-2"
                                        placeholder="Participant ID"
                                        value={ participantId }
                                        onChange={ (e) => setParticipantId(e.target.value) }
                                    />
                                </div>
                                <div className="flex items-center justify-center rounded-b border-t border-solid border-slate-200 p-6">
                                    <button
                                        className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                                        type="button"
                                        onClick={ sendTeamIdAndParticipantId }
                                    >
                                        Pas fragment aan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                </>
            ) : null }
        </>
    );
};

export default UpdateFragmentModal;
