import { Level, SubLevel } from "@prisma/client";
import { useState } from "react";
import { api } from "~/utils/api";

interface BaseStaticModalProps {
    setmodal: React.Dispatch<React.SetStateAction<boolean>>;
    level: Level;
}

const UpdateLevelModal: React.FC<BaseStaticModalProps> = ({ level, setmodal }) => {
    const [levelName, setLevelName] = useState(level.name);
    const [levelDescription, setLevelDescription] = useState(level.description);
    const subLevelsOfLevelQuery = api.level.getSubLevelsOfLevel.useQuery({ levelId: level.id.toString() },
        { onSuccess: (data) => setAddedSublevels(data)});
    const otherSubLevelsQuery = api.level.getAllRemainingSubLevelsOfLevel.useQuery({ levelId: level.id.toString()},
        { onSuccess: (data) => setRemainingSublevels(data) });
    const [addedSublevels, setAddedSublevels] = useState<SubLevel[]>([]);
    const [remainingSubLevels, setRemainingSublevels] = useState<SubLevel[]>([]);

    const { mutate: updateLevel } = api.level.updateLevel.useMutation();
    const { mutate: updateSublevelsOfLevel } = api.level.setSubLevelsToLevel.useMutation();



    const onAddSublevelButtonClick = (sublevel: SubLevel) => {
        setAddedSublevels([...addedSublevels, sublevel]);
        setRemainingSublevels(remainingSubLevels.filter(s => s.id !== sublevel.id));
    }

    const onRemoveSublevelButtonClick = (sublevel: SubLevel) => {
        setAddedSublevels(addedSublevels.filter(s => s.id !== sublevel.id));
        setRemainingSublevels([...remainingSubLevels, sublevel]);
    }



    function updateLevelValues() {
        updateLevel({
            id: level.id,
            name: levelName,
            description: levelDescription,
        });
        updateSublevelsOfLevel({
            sublevels: addedSublevels.map(s => s.id) ?? [],
            levelId: level.id.toString(),
        })
        setmodal(false);
    }

    const sublevelsNotCOnnectedToLevel = remainingSubLevels.map(sublevel => {
        return (
            <li key={ sublevel.id } className="flex items-center justify-between">
                <label className="mb-2 block p-4 text-center text-sm font-medium text-gray-900 dark:text-black">{ sublevel.name }</label>
                <button
                    type="button"
                    className="rounded bg-red-500 p-4 font-bold text-white active:bg-red-800"
                    onClick={ () => onAddSublevelButtonClick(sublevel) }>
                    Add
                </button>
            </li>
        );
    });

    const addedSublevelsList = addedSublevels.map((sublevel) => {
        return (
            <li key={ sublevel.id } className="flex items-center justify-between">
                <label className="mb-2 block p-4 text-center text-sm font-medium text-gray-900 dark:text-black">{ sublevel.name }</label>
                <button
                    type="button"
                    className="rounded bg-red-500 p-4 font-bold text-white active:bg-red-800"
                    onClick={ () => onRemoveSublevelButtonClick(sublevel) }>
                    Remove
                </button>
            </li>
        )
    })

    return (
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
                                Pas level aan
                            </h3>
                        </div>
                        <div className="relative flex justify-center p-6">
                            <input
                                type="text"
                                className="mr-2 border-2 border-gray-300 p-2"
                                placeholder="Level name"
                                value={ levelName }
                                onChange={ (e) => setLevelName(e.target.value) }
                            />
                            <input
                                type="text"
                                className="ml-2 border-2 border-gray-300 p-2"
                                placeholder="level description"
                                value={ levelDescription ?? "" }
                                onChange={ (e) => setLevelDescription(e.target.value) }
                            />
                        </div>
                        <h3 className="my-2 text-xl text-black">
                            Toegevoegde sublevels
                        </h3>
                        <ul>
                            { addedSublevelsList }
                        </ul>
                        <h3 className="my-2 text-xl text-black">
                            Sublevels toevoegen
                        </h3>
                        <ul>
                            { sublevelsNotCOnnectedToLevel }
                        </ul>
                        <div className="flex items-center justify-center rounded-b border-t border-solid border-slate-200 p-6">
                            <button
                                className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                                type="button"
                                onClick={ () => updateLevelValues() }
                            >
                                Pas level aan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
    )
};

export default UpdateLevelModal;
