import { User } from "@prisma/client";
import { api } from "~/utils/api";

interface BaseStaticModalProps {
    setmodal: React.Dispatch<React.SetStateAction<boolean>>;
    user: User;
}

type UserRole = 'USER' | 'ADMIN';
const userRoles = ['USER', 'ADMIN'];

const UpdateUsersModal: React.FC<BaseStaticModalProps> = ({ setmodal, user }) => {
    const { mutate: updateUserRole } = api.user.updateUserRole.useMutation();
    console.log(user);
    function updateUserValues(role: string) {
        updateUserRole({
            id: user.id,
            role: role,
        });
        setmodal(false);
    }


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
                                Vul de nieuwe rol in voor { user.name }
                            </h3>
                        </div>
                        <div className="relative flex justify-center p-6">
                            <select
                                className="mr-2 border-2 border-gray-300 p-2"
                                value={ user.role ?? userRoles[0] }
                                onChange={ (e) => updateUserValues(e.target.value) }
                            >
                                { userRoles.map((role, index) =>
                                    <option key={ index } value={ role }>{ role }</option>
                                ) }
                            </select>
                        </div>
                        <div className="flex items-center justify-center rounded-b border-t border-solid border-slate-200 p-6">
                            <button
                                className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                                type="button"
                                onClick={ () => setmodal(false) }
                            >
                                Sluiten
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
    );
};

export default UpdateUsersModal;
