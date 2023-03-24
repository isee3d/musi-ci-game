import React, { useEffect, useState } from 'react';
import { api, RouterOutputs } from '~/utils/api';

type NoteFromRoute = RouterOutputs["fragmentNote"]["getAllNotes"][number]
const ExistingNote: React.FC<NoteFromRoute> = ({ id, note, velocity, time, dur }) => {
    const ctx = api.useContext();

    const deleteNote = api.fragmentNote.deleteNote.useMutation();
    const updateNote = api.fragmentNote.updateNote.useMutation();

    const [noteValue, setNoteValue] = useState<string>(note);
    const [startTimeValue, setStartTimeValue] = useState<string>(time);
    const [lengthValue, setLengthValue] = useState<number>(dur);
    const [volumeValue, setVolumeValue] = useState<number>(velocity);

    const [hasChanged, setHasChanged] = useState<boolean>(false);

    useEffect(() => {
        // Check if the input values are different from the props values
        const noteChanged = noteValue !== note;
        const startTimeChanged = startTimeValue !== time;
        const lengthChanged = lengthValue !== dur;
        const volumeChanged = volumeValue !== velocity;

        // Set the hasChanged flag if any input value has changed
        setHasChanged(noteChanged || startTimeChanged || lengthChanged || volumeChanged);
    }, [note, noteValue, time, startTimeValue, dur, lengthValue, velocity, volumeValue]);


    const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNoteValue(e.target.value);
    };

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartTimeValue(e.target.value);
    };

    const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setLengthValue(isNaN(value) ? 0 : value);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setVolumeValue(isNaN(value) ? 0 : value);
    };

    const onDeleteNote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        deleteNote.mutate({ id });
        ctx.fragmentNote.getAllNotes.invalidate();
    };

    const onUpdateNote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (hasChanged)
            updateNote.mutate({ id, note: noteValue, velocity: volumeValue, time: startTimeValue, dur: lengthValue });
    };

    return (
        <div className="m-2 flex w-full items-start space-x-4 rounded-lg shadow-md">
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Noot</label>
                <input type="text" placeholder="C4" value={ noteValue } onChange={ handleNoteChange } className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" required />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Starttijd</label>
                <input type="string" placeholder="0" value={ startTimeValue } onChange={ handleStartTimeChange } className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" required />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Duur</label>
                <input type="number" placeholder="John" value={ lengthValue } onChange={ handleLengthChange } className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" required />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Volume</label>
                <input type="number" placeholder="John" value={ volumeValue } onChange={ handleVolumeChange } className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" required />
            </div>

            <button onClick={ onDeleteNote } className='mt-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20'>
                Remove
            </button>
            <button onClick={ onUpdateNote } className='mt-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20'>
                Update
            </button>
        </div>
    );
};

export default ExistingNote;
