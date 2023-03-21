import React from 'react';

interface NoteCreatorProps {
}

const NoteCreator: React.FC<NoteCreatorProps> = () => {
  return (
    <div className="m-2 flex w-full items-start space-x-4 rounded-lg shadow-md">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Noot</label>
        <input type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="John" required />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Starttijd</label>
        <input type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="John" required />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Duur</label>
        <input type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="John" required />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Volume</label>
        <input type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="John" required />
      </div>

      <button className='mt-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20'>
        Verwijderen
      </button>
    </div>
  );
};

export default NoteCreator;
