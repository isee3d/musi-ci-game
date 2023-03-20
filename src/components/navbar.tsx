import { useState } from "react";
import Link from "next/link";

const NavMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="flex flex-wrap items-center justify-between bg-blue-500 p-6">
            <div className="mr-6 flex shrink-0 items-center text-white">
                <span className="text-xl font-bold">Logo</span>
            </div>
            <div className="block lg:hidden">
                <button
                    onClick={ toggleMenu }
                    className="flex items-center rounded border border-white px-3 py-2 text-white hover:border-gray-200 hover:text-gray-200"
                >
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
                </button>
            </div>
            <div
                className={ `${isOpen ? "block" : "hidden"
                    } block w-full grow lg:flex lg:w-auto lg:items-center` }
            >
                <div className="text-sm lg:grow">
                    <Link className="mt-4 mr-4 block text-white hover:text-gray-200 lg:mt-0 lg:inline-block" href="/">
                        Home
                    </Link>
                    <Link className="mt-4 mr-4 block text-white hover:text-gray-200 lg:mt-0 lg:inline-block" href="/about">
                        About
                    </Link>
                    <Link className="mt-4 block text-white hover:text-gray-200 lg:mt-0 lg:inline-block" href="/contact">
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavMenu;
