import Head from 'next/head';
import { type NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TypeCI } from '@prisma/client';
import toast from 'react-hot-toast';
import { api } from '~/utils/api';

const validationRules = {
    name: { required: 'Field is required.' },
    merk: { required: 'Field is required.' },
};

const ManageTypeCI: NextPage = () => {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<TypeCI>({ mode: 'onBlur' });
    const typeCIQuery = api.typeCI.getAllTypeCI.useQuery();
    const ctx = api.useContext();
    const { mutate: addTypeCI } = api.typeCI.createTypeCI.useMutation(
        {
            onSuccess: () => {
                ctx.typeCI.getAllTypeCI.invalidate()
            }
        }
    );

    const onSubmit: SubmitHandler<TypeCI> = (data) => {
        const exists = typeCIQuery.data?.find((typeCI) => typeCI.name === data.name);
        const toastMessage = exists ? "TypeCI already exists!" : "TypeCI created!";
        exists ? toast.error(toastMessage) : (addTypeCI(data), toast.success(toastMessage));
        reset();
    };

    return (
        <>
            <Head>
                <title></title>
                <meta name='description' content='manage team' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className="flex grow flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <h1 className="mb-10 py-3 text-center text-4xl font-extrabold tracking-tight text-white ">
                    Type CI beheren
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
                                    placeholder="bijv: typeci 1"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                    required />
                                <p className='text-red-600'>{ errors.name?.message }</p>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Naam</label>
                                <input
                                    { ...register("merk", validationRules.merk) }
                                    type="text"
                                    id="name"
                                    autoComplete='off'
                                    placeholder="bijv: philips"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                    required />
                                <p className='text-red-600'>{ errors.merk?.message }</p>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={ !isValid }
                            className={ `mt-4 rounded-xl p-4 text-white ${isValid ? 'bg-green-500 hover:bg-green-600' : 'cursor-not-allowed bg-gray-400'}` }
                        >
                            <h3 className="text-center text-2xl font-bold">Nieuwe typeCI opslaan</h3>
                        </button>
                    </form>

                </div>
            </main>
        </>
    );
};

export default ManageTypeCI;
