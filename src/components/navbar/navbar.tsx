import {Combobox, Dialog, Menu} from '@headlessui/react';
import PostModel, {PostSearch} from '@/models/post';
import Link from 'next/link';
import {ChangeEvent, forwardRef, useRef, useState} from 'react';
import DialogCategories from '../dialog/dialog-categories';
import NavbarLink from './navbar-link';

interface PropsMenuLink {
    active: boolean;
    href: string;
    children: React.ReactNode;
}

const MenuLink = forwardRef<HTMLAnchorElement, PropsMenuLink>(
    ({active, href, children, ...rest}, ref) => {
        return (
            <Link
                href={href}
                className={`${
                    active ? 'bg-gray-100' : 'text-gray-900'
                } block w-full items-center px-4 py-3 text-sm`}
                {...rest}
            >
                {children}
            </Link>
        );
    }
);

MenuLink.displayName = 'MenuLink';

const Navbar = () => {
    const [isDialogCategoriesOpen, setIsDialogCategoriesOpen] = useState(false);


    return (
        <nav className="sticky top-0 z-10 px-2 sm:px-4 py-2.5 border-b border-gray-200 bg-white dark:bg-gray-800">
            <div className="flex flex-wrap max-w-5xl items-center px-3 lg:px-4 mx-auto">
                <div className="flex items-center w-auto">
                    <Link href="/" className="flex items-center">
                        <span className="text-xl font-bold text-slate-900 whitespace-nowrap dark:text-white">
                            CahIT
                        </span>
                    </Link>
                </div>
                <div className="hidden md:flex md:items-center ml-auto">
                    <ul className="flex space-x-8 flex-wrap text-slate-700 text-sm font-semibold">
                        <NavbarLink href="/">Home</NavbarLink>
                        <NavbarLink href="/discover">Discover</NavbarLink>
                        <li>
                            <div
                                className="py-2 cursor-pointer dark:hover:text-white dark:text-gray-400"
                                onClick={() => setIsDialogCategoriesOpen(true)}
                            >
                                Categories
                            </div>
                            <DialogCategories
                                isDialogOpen={isDialogCategoriesOpen}
                                setDialogOpen={(value) => {
                                    setIsDialogCategoriesOpen(value);
                                }}
                            />
                        </li>
                    </ul>
                </div>
                <div className="md:hidden relative">
                    <Menu as="div">
                        <Menu.Button className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="12" cy="2" r="2" />
                                <circle cx="12" cy="12" r="2" />
                                <circle cx="12" cy="22" r="2" />
                            </svg>
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 mt-2 w-56 overflow-y-hidden divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({active}) => (
                                    <MenuLink active={active} href="/">
                                        Home
                                    </MenuLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <div
                                        className={`${
                                            active
                                                ? 'bg-gray-100'
                                                : 'text-gray-900'
                                        } w-full px-4 py-3 text-sm cursor-pointer`}
                                        onClick={() =>
                                            setIsDialogCategoriesOpen(true)
                                        }
                                    >
                                        Categories
                                    </div>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
