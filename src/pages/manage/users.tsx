import Head from 'next/head';
import { type NextPage } from 'next';
import { api } from '~/utils/api';

const ManageUsers: NextPage = () => {
    const usersQuery = api.user.getAllUsers.useQuery();
    const { mutate: deleteUser } = api.user.deleteUser.useMutation();

    return (
        <>
            <Head>
                <title></title>
                <meta name='description' content='' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className="flex grow flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <h1 className="mb-10 py-3 text-center text-4xl font-extrabold tracking-tight text-white ">Manage Users</h1>
                <div className="container mx-auto flex w-1/2 flex-col items-center rounded border-2 border-white p-4 shadow">
                    {/* The modal activation for the update actions */}

                    { usersQuery.data?.map((user) => {
                        return (
                            <div key={ user.id } className="flex items-center justify-center space-x-4">
                                <h3 className="text-2xl font-bold text-white">{ user.name }</h3>
                                <p className="text-xl text-white">{ user.participantId }</p>
                                <button
                                    onClick={ () => deleteUser({ id: user.id }) }
                                    className="rounded-xl bg-red-500 p-2 text-white hover:bg-red-600">
                                    Delete
                                </button>
                                <button className="rounded-xl bg-green-500 p-2 text-white hover:bg-green-600">
                                    Update
                                </button>
                            </div>
                        );
                    }) }
                </div>
            </main>
        </>
    );
};

export default ManageUsers;
