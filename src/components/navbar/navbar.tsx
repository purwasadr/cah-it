import { Combobox, Dialog, Menu } from "@headlessui/react";
import PostModel, { PostSearch } from "@/models/post";
import Link from "next/link";
import { ChangeEvent, forwardRef, useRef, useState } from "react";
import DialogCategories from "../dialog/dialog-categories";
import NavbarLink from "./navbar-link";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

interface PropsMenuLink {
    active: boolean;
    href: string;
    children: React.ReactNode;
}

const MenuLink = forwardRef<HTMLAnchorElement, PropsMenuLink>(
    ({ active, href, children, ...rest }, ref) => {
        return (
            <Link
                href={href}
                className={`${
                    active ? "bg-gray-100" : "text-gray-900"
                } block w-full items-center px-4 py-3 text-sm`}
                {...rest}
            >
                {children}
            </Link>
        );
    }
);

MenuLink.displayName = "MenuLink";

const Navbar = () => {
    const [isDialogCategoriesOpen, setIsDialogCategoriesOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-800 sm:px-4">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center px-3 lg:px-4">
                <div className="flex w-auto items-center">
                    <Link href="/" className="flex items-center">
                        <span className="whitespace-nowrap text-xl font-bold text-slate-900 dark:text-white">
                            Cah IT
                        </span>
                    </Link>
                </div>
                <div className="ml-auto hidden md:flex md:items-center">
                    <ul className="flex flex-wrap space-x-8 text-sm font-semibold text-slate-700">
                        <NavbarLink href="/">Home</NavbarLink>
                        <NavbarLink href="/discover">Discover</NavbarLink>
                        <li>
                            <div
                                className="cursor-pointer py-2 dark:text-gray-400 dark:hover:text-white"
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
                <div className="relative ml-auto md:hidden">
                    <Menu as="div">
                        <Menu.Button className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden">
                            <EllipsisVerticalIcon className="h-6 w-6" />
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 mt-2 w-56 divide-y divide-gray-100 overflow-y-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                    <MenuLink active={active} href="/">
                                        Home
                                    </MenuLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <MenuLink active={active} href="/discover">
                                        Discover
                                    </MenuLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        className={`${
                                            active
                                                ? "bg-gray-100"
                                                : "text-gray-900"
                                        } w-full cursor-pointer px-4 py-3 text-sm`}
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
