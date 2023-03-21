import { useState } from "react";
import Link from "next/link";

const NavMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="flex flex-wrap items-center justify-between bg-white p-6 dark:bg-gray-900">
            <div className="mr-6 flex shrink-0 items-center dark:text-white">
                <span className="text-xl font-bold">Logo</span>
            </div>
            <div className="block lg:hidden">
                <button
                    onClick={ toggleMenu }
                    className="flex items-center rounded border border-white px-3 py-2 hover:border-gray-200 hover:text-gray-200 dark:text-white"
                >
                    { isOpen ? (
                        <svg
                            className="h-4 w-4 fill-current"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Close</title>
                            <path
                                fillRule="evenodd"
                                d="M10.293 9.995l4.352-4.353a1 1 0 1 0-1.414-1.414l-4.352 4.352L4.53 4.228a1 1 0 0 0-1.414 1.414l4.352 4.352L3.116 14.34a1 1 0 1 0 1.414 1.414l4.352-4.352 4.353 4.353a1 1 0 1 0 1.414-1.414L10.293 9.995z"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="h-4 w-4 fill-current"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Menu</title>
                            <path
                                fillRule="evenodd"
                                d="M2 5h16a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2z"
                            />
                        </svg>
                    ) }
                </button>
            </div>
            <div
                className={ `${isOpen ? "block" : "hidden"
                    } block w-full grow lg:flex lg:w-auto lg:items-center` }
            >
                <div className="flex justify-end pr-12 text-sm lg:grow lg:space-x-7">
                    <Link
                        className="mt-4 block hover:text-gray-200 dark:text-white lg:mt-0 lg:inline-block"
                        href="/"
                    >
                        Manage users
                    </Link>
                    <Link
                        className="mt-4 block hover:text-gray-200 dark:text-white lg:mt-0 lg:inline-block"
                        href="/manage/fragments"
                    >
                        manage fragments
                    </Link>
                    <Link
                        className="mt-4 block hover:text-gray-200 dark:text-white lg:mt-0 lg:inline-block"
                        href="/manage/levels"
                    >
                        Manage levels
                    </Link>
                    <Link
                        className="mt-4 block hover:text-gray-200 dark:text-white lg:mt-0 lg:inline-block"
                        href="/contact"
                    >
                        Manage results
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavMenu;
