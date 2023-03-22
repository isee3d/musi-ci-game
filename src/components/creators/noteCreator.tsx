import React, { useState } from 'react';
import { useNoteStore } from '~/stores/useNotesStore';
import { api } from "~/utils/api";
import { NoteSchema } from "prisma/generated/zod";

const NoteCreator: React.FC = () => {
  const { addNewNote } = useNoteStore();
  const createNote = api.fragmentNote.createNote.useMutation();
  const [note, setNote] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [length, setLength] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0);

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLength(isNaN(value) ? 0 : value);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setVolume(isNaN(value) ? 0 : value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNote = {
      note: note,
      velocity: volume,
      time: startTime,
      dur: length,
    }
    createNote.mutate(newNote);
    addNewNote(newNote);
  };

  return (
    <form onSubmit={ handleSubmit } className="m-2 flex w-full items-start space-x-4 rounded-lg shadow-md">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Noot</label>
        <input type="text" placeholder="C4" value={ note } onChange={ handleNoteChange } className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" required />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Starttijd</label>
        <input type="string" placeholder="0" value={ startTime } onChange={ handleStartTimeChange } className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" required />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Duur</label>
        <input type="number" placeholder="John" value={ length } onChange={ handleLengthChange } className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" required />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Volume</label>
        <input type="number" placeholder="John" value={ volume } onChange={ handleVolumeChange } className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" required />
      </div>

      <button type='submit' className='mt-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20'>
        Send to DB
      </button>
    </form>
  );
};

export default NoteCreator;
