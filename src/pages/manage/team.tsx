import Head from 'next/head';
import { type NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Game, GameMode, Kliniek, Team, User } from '@prisma/client';
import toast from 'react-hot-toast';
import { api } from '~/utils/api';

const validationRules = {
    name: { required: 'Field is required.' },
    description: { required: 'Field is required.' },
};

const ManageTeam: NextPage = () => {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<Team>({ mode: 'onBlur' });
    const teamQuery = api.team.getAllTeams.useQuery();
    const getUsersWithoutTeamQuery = api.user.getAllUsersWithoutTeam.useQuery();
    const { mutate: setUserToTeam } = api.user.setUserToTeam.useMutation({
        onSuccess: () => {
            toast.success("User added to team!");
            ctx.user.getAllUsersWithoutTeam.invalidate();
        },
    });
    const ctx = api.useContext();
    const { mutate: addTeam } = api.team.createTeam.useMutation(
        {
            onSuccess: () => {
                ctx.game.getAllGames.invalidate()
            }
        }
    );

    const { mutate: deleteTeam } = api.team.deleteTeam.useMutation();

    const usersWithoutTeamList = getUsersWithoutTeamQuery.data?.map((user: User) => {
        return (
            <li key={ user.id } className="flex items-center justify-between">
                <label className="mb-2 block p-4 text-center text-sm font-medium text-gray-900 dark:text-white">
                    { user.name }
                </label>
                <label className="mb-2 block p-4 text-center text-sm font-medium text-gray-900 dark:text-white">
                    { user.id_Team ? user.id_Team : 'Geen team' }
                </label>
                <div className="relative w-full lg:max-w-sm">
                    <select
                        value={ teamQuery.data?.[0]?.id }
                        onChange={ (e) => { setUserToTeam({ userId: user.id, teamId: parseInt(e.target.value) }); } }
                        className="w-full appearance-none rounded-md border bg-white p-2.5 text-gray-500 shadow-sm outline-none focus:border-indigo-600">
                        { teamQuery.data?.map((team: Team) => {
                            return (
                                <option
                                    key={ team.id }
                                    value={ team.id }
                                >
                                    { team.name }
                                </option>
                            );
                        })
                        }
                    </select>
                </div>
            </li>
        );
    });


    const onSubmit: SubmitHandler<Team> = (data) => {
        const exists = teamQuery.data?.find((team) => team.name === data.name);
        const toastMessage = exists ? "Team already exists!" : "team created!";
        exists ? toast.error(toastMessage) : (addTeam(data), toast.success(toastMessage));
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
                    Teams beheren
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
                                    placeholder="bijv: Team 1"
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
                        </div>
                        <button
                            type="submit"
                            disabled={ !isValid }
                            className={ `mt-4 rounded-xl p-4 text-white ${isValid ? 'bg-green-500 hover:bg-green-600' : 'cursor-not-allowed bg-gray-400'}` }
                        >
                            <h3 className="text-center text-2xl font-bold">Nieuwe team opslaan</h3>
                        </button>

                        <h3 className="my-2 text-xl text-white">
                            User toevoegen aan team
                        </h3>
                        <ul>
                            { usersWithoutTeamList }
                        </ul>
                        <h3 className="my-2 text-xl text-white">
                            Alle teams
                        </h3>
                        { teamQuery.data?.map((team) => {
                            return (
                                <div key={ team.id } className="flex items-center justify-center space-x-4">
                                    <h3 className="text-2xl font-bold text-white">{ team.name }</h3>
                                    <p className="text-xl text-white">{ team.description }</p>
                                    <button
                                        onClick={ () => deleteTeam({ id: team.id }) }
                                        className="rounded-xl bg-red-500 p-2 text-white hover:bg-red-600">
                                        Delete
                                    </button>
                                    <button className="rounded-xl bg-green-500 p-2 text-white hover:bg-green-600">
                                        Update
                                    </button>
                                </div>
                            );
                        }) }

                    </form>

                </div>
            </main>
        </>
    );
};

export default ManageTeam;
