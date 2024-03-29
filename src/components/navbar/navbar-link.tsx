import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
    href: string;
    children: ReactNode;
    isDropdown?: boolean;
}

const NavbarLink = ({href, children, isDropdown = false}: Props) => {
    return (
        <li>
            <Link href={href} className="flex items-center py-2 cursor-pointer dark:hover:text-white dark:text-gray-400">
               
                    {children}
                    {isDropdown && (
                        <svg
                            className="ml-1 w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    )}
            </Link>
        </li>
    );
};

export default NavbarLink;
