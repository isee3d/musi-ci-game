import { Fragment, Level } from "@prisma/client";
import { NextPage } from "next";
import Head from "next/head";
import { FragmentOptionalDefaultsWithRelations, FragmentWithRelations } from "prisma/generated/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import NoteCreator from "~/components/creators/noteCreator";
import { api } from "~/utils/api";

const validationRules = {
    name: { required: 'Note is required.' },
    description: { required: 'Description is required.' },
    bpm: {
        required: 'BPM is required.',
        pattern: { value: /^[0-9]+$/, message: 'BPM must be a number.' },
        min: { value: 0, message: 'BPM must be higher than 0' },
        setValueAs: (value: any) => parseInt(value),
    },
    correctAnswers: {
        required: 'Field is required.',
        pattern: { value: /^[0-9]+$/, message: 'Field must be a number.' },
        min: { value: 0, message: 'Field must be higher than 0' },
        setValueAs: (value: any) => parseInt(value),
    },
    fragmentsToShow: {
        required: 'Field is required.',
        pattern: { value: /^[0-9]+$/, message: 'Field must be a number.' },
        min: { value: 0, message: 'Field must be higher than 0' },
        setValueAs: (value: any) => parseInt(value),
    },
};

const ManageLevels: NextPage = () => {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<Level>({ mode: 'onBlur' });
    const fragmentQuery = api.fragmentNote.getAllFragments.useQuery();
    const { mutate: addLevel } = api.level.createSubLevel.useMutation();
    const [addedFragments, setAddedFragments] = useState<Fragment[]>([]);

    const onSubmit: SubmitHandler<Level> = (data) => {
        addLevel({ ...data, fragments: addedFragments.map(f => f.id) });
        toast.success("Level created!")
        setAddedFragments([]);
        reset();
    }

    const onAddFragmentButtonClick = (fragment: Fragment) => {
        setAddedFragments([...addedFragments, fragment]);
    }

    const onRemoveFragmentButtonClick = (fragment: Fragment) => {
        setAddedFragments(addedFragments.filter(f => f.id !== fragment.id));
    }


    const fragmentsfromDBList = fragmentQuery.data?.map(fragment => {
        if (addedFragments.find(f => f.id === fragment.id)) return null;
        return (
            <li key={ fragment.id } className="flex items-center justify-between">
                <label className="mb-2 block p-4 text-center text-sm font-medium text-gray-900 dark:text-white">{ fragment.name }</label>
                <button
                    type="button"
                    className="rounded bg-red-500 p-4 font-bold text-white active:bg-red-800"
                    onClick={ () => onAddFragmentButtonClick(fragment) }>
                    Add
                </button>
            </li>
        );
    });

    const addedFragmentsList = addedFragments.map((fragment) => {
        return (
            <li key={ fragment.id } className="flex items-center justify-between">
                <label className="mb-2 block p-4 text-center text-sm font-medium text-gray-900 dark:text-white">{ fragment.name }</label>
                <button
                    type="button"
                    className="rounded bg-red-500 p-4 font-bold text-white active:bg-red-800"
                    onClick={ () => onRemoveFragmentButtonClick(fragment) }>
                    Remove
                </button>
            </li>
        )
    })

    return (
        <>
            <Head>
                <title>Manage fragments</title>
                <meta name="description" content="Level name here" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex grow flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <h1 className="mb-10 py-3 text-center text-4xl font-extrabold tracking-tight text-white ">
                    Levels beheren
                </h1>

                <div className="container mx-auto flex w-1/2 flex-col items-center rounded border-2 border-white p-4 shadow ">
                    <form onSubmit={ handleSubmit(onSubmit) }>
                        <div className="grid w-full gap-6 md:grid-cols-1">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Naam</label>
                                <input
                                    { ...register("name", validationRules.name) }
                                    type="text"
                                    id="name"
                                    autoComplete='off'
                                    placeholder="bijv: gelijk: twee gelijke noten"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                    required />
                                <p className='text-red-600'>{ errors.name?.message }</p>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Omschrijving</label>
                                <textarea
                                    { ...register("description", validationRules.description) }
                                    autoComplete='off'
                                    placeholder="Vul hier een omschrijving in"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                    required />
                                <p className='text-red-600'>{ errors.description?.message }</p>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Tempo (BPM)</label>
                                <input
                                    { ...register("BPM", validationRules.bpm) }
                                    type="number"
                                    autoComplete='off'
                                    id="bpm"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                    placeholder="bijv: 60"
                                    required />
                                <p className='text-red-600'>{ errors.BPM?.message }</p>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Het aantal goede antwoord voor een level is gehaald</label>
                                <input
                                    { ...register("correctAnswers", validationRules.correctAnswers) }
                                    type="number"
                                    autoComplete='off'
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                    placeholder="bijv: 10"
                                    required />
                                <p className='text-red-600'>{ errors.correctAnswers?.message }</p>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Aantal zichtbare fragmenten in Scene</label>
                                <input
                                    { ...register("fragmentToShow", validationRules.fragmentsToShow) }
                                    type="number"
                                    autoComplete='off'
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="bijv: 2"
                                    required />
                                <p className='text-red-600'>{ errors.fragmentToShow?.message }</p>
                            </div>
                            <h3 className="my-2 text-xl text-white">
                                Toegevoegde fragmenten
                            </h3>
                            <ul>
                                { addedFragmentsList }
                            </ul>
                            <h3 className="my-2 text-xl text-white">
                                Fragmenten toevoegen
                            </h3>
                            <ul>
                                { fragmentsfromDBList }
                            </ul>
                        </div>
                        <button
                            type="submit"
                            disabled={ !isValid }
                            className={ `mt-4 rounded-xl p-4 text-white ${isValid ? 'bg-green-500 hover:bg-green-600' : 'cursor-not-allowed bg-gray-400'}` }
                        >
                            <h3 className="text-center text-2xl font-bold">Nieuw level opslaan</h3>
                        </button>
                    </form>

                </div>
            </main>
        </>
    );
};

export default ManageLevels;
