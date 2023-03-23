import { Note } from '@prisma/client';
import React, { useState } from 'react';
import { useNoteStore } from '~/stores/useNotesStore';
import { api } from "~/utils/api";
import { SubmitHandler, useForm } from 'react-hook-form';

const NoteCreator: React.FC = () => {
  const { addNewNote } = useNoteStore();
  const createNote = api.fragmentNote.createNote.useMutation(
    { onSuccess: (note: Note) => addNewNote(note) }
  );

  const { register, handleSubmit, formState: { errors } } = useForm<Note>({
    defaultValues: {
      note: '',
      velocity: undefined,
      time: '',
      dur: undefined,
    },
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<Note> = (data) => createNote.mutate(data);

  return (
    <form onSubmit={ handleSubmit(onSubmit) }
      className="m-2 flex w-full items-start space-x-4 rounded-lg shadow-md">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Noot</label>
        <input { ...register("note", { required: 'Note is required.' }) } placeholder="Bijv: C4" type='text' className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
        <p className='text-red-600'>{ errors.note?.message }</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Starttijd</label>
        <input { ...register("time", { required: 'StartTime is required.' }) } placeholder="Bijv: 0" type='text' className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
        <p className='text-red-600'>{ errors.time?.message }</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Duur</label>
        <input { ...register("dur", {
          required: 'Note length is required.',
          pattern: {
            value: /^[0-9]+$/,
            message: "Volume must be a number.",
          },
          min: {
            value: 0,
            message: 'Length must be higher than 0'
          }
        }) }
          type='number'
          placeholder="Bijv: 0"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
        <p className='text-red-600'>{ errors.dur?.message }</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Volume</label>
        <input { ...register("velocity", {
          required: 'Volume is required.',
          pattern: {
            value: /^[0-9]+$/,
            message: "Volume must be a number.",
          },
          min: {
            value: 0,
            message: 'Length must be higher than 0'
          }
        }) }
          type='number'
          placeholder="Bijv: 0"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
        <p className='text-red-600'>{ errors.velocity?.message }</p>
      </div>

      <button type='submit' className='mt-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20'>
        Send to DB
      </button>
    </form>
  );
};

export default NoteCreator;
