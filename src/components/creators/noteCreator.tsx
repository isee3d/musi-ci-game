import { Note } from '@prisma/client';
import { useNoteStore } from '~/stores/useNotesStore';
import { api } from "~/utils/api";
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import React, { Dispatch, SetStateAction } from 'react';

const validationRules = {
  name: { required: 'Note is required.' },
  time: {
    required: 'StartTime is required.',
    pattern: { value: /^[0-9]+$/, message: 'Duration must be a number.' },
    min: { value: 0, message: 'Duration must be higher than 0' },
    setValueAs: (value: any) => parseInt(value),
  },
  duration: {
    required: 'Note length is required.',
    pattern: { value: /^[0-9]+$/, message: 'Duration must be a number.' },
    min: { value: 0, message: 'Duration must be higher than 0' },
    setValueAs: (value: any) => parseInt(value),
  },
  speed: {
    required: 'Volume is required.',
    pattern: { value: /^[0-9]+$/, message: 'Volume must be a number.' },
    min: { value: 0, message: 'Volume must be higher than 0' },
    setValueAs: (value: any) => parseInt(value),
  },
};

const NoteCreator: React.FC<{ setNewNotes: Dispatch<SetStateAction<Note[]>> }> = ({ setNewNotes }) => {
  // const { addNewNote } = useNoteStore();

  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<Note>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<Note> = (data) => {
    toast.success("Note created!")
    // addNewNote(data);
    setNewNotes((prev) => [...prev, data]);
    reset();
  }

  return (
    <form onSubmit={ handleSubmit(onSubmit) }
      className="m-2 flex w-full items-start space-x-4 rounded-lg shadow-md">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Noot</label>
        <input
          { ...register("name", validationRules.name) }
          placeholder="Bijv: C4"
          type='text'
          autoComplete='off'
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
        <p className='text-red-600'>{ errors.name?.message }</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Starttijd</label>
        <input
          { ...register("time", validationRules.time) }
          placeholder="Bijv: 0"
          type='number'
          onKeyDown={ (evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault() }
          autoComplete='off'
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
        <p className='text-red-600'>{ errors.time?.message }</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Duur</label>
        <input { ...register("duration", validationRules.duration) }
          type='number'
          placeholder="Bijv: 0"
          autoComplete='off'
          onKeyDown={ (evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault() }
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
        <p className='text-red-600'>{ errors.duration?.message }</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Volume</label>
        <input
          { ...register("speed", validationRules.speed) }
          type='number'
          placeholder="Bijv: 0"
          autoComplete='off'
          onKeyDown={ (evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault() }
          className="block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
        <p className='text-red-600'>{ errors.speed?.message }</p>
      </div>

      <button
        type='submit'
        disabled={ !isValid }
        className={ `mt-4 rounded-xl p-4 text-white ${isValid ? 'bg-green-500 hover:bg-green-600' : 'cursor-not-allowed bg-gray-400'}` }>
        Add to fragment
      </button>
    </form>
  );
};

export default NoteCreator;
