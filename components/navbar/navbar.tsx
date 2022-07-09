import {Combobox, Dialog, Menu} from '@headlessui/react';
import PostModel, { PostSearch } from 'models/post';
import Link from 'next/link';
import { ChangeEvent, forwardRef, useRef, useState } from 'react';
import DialogCategories from '../dialog/dialog-categories';
import SearchIcon from '../icon/search-icon';
import NavbarLink from './navbar-link';

interface PropsMenuLink {
    active: boolean,
    href: string,
    children: React.ReactNode,
}

const MenuLink = forwardRef<HTMLAnchorElement, PropsMenuLink>(({ active, href, children, ...rest }, ref) => {
    
    return (
        <Link href={href}>
            <a
                className={`${
                    active
                        ? 'bg-gray-100'
                        : 'text-gray-900'
                } block w-full items-center px-4 py-3 text-sm`}
            {...rest}>
                {children}
            </a>
        </Link>
    )
});

MenuLink.displayName = 'MenuLink';

const Navbar = () => {
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchTimer = useRef<NodeJS.Timeout>();
    const [selectedPerson, setSelectedPerson] = useState<PostSearch>();
    const [searchResult, setSearchResult] = useState<Array<PostSearch>>([]);
    const [isDialogCategoriesOpen, setIsDialogCategoriesOpen] = useState(false);
    
    const handleSearchQueryChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);

        clearTimeout(searchTimer.current);

        if (!e.target.value) {
            setSearchResult([]);
            return;
        }

        let timeout = setTimeout(() => {
            PostModel
                .getPostSearch(e.target.value)
                .then((value) => setSearchResult(value))
                .catch((reason) => {
                    setSearchResult([]);
                    console.log(reason);
                });

        }, 300)

        searchTimer.current = timeout;
    }

    return (
        <nav className="sticky top-0 z-10 px-2 sm:px-4 py-2.5 border-b border-gray-200 bg-white dark:bg-gray-800">
            <div className="flex flex-wrap max-w-5xl items-center px-3 lg:px-4 mx-auto">
                <div className="flex items-center w-auto">
                    <Link href="/">
                        <a className="flex items-center">
                            <span className="text-xl font-bold whitespace-nowrap dark:text-white">
                                Ngeblog
                            </span>
                        </a>
                    </Link>
                </div>
                <div className="hidden md:flex md:items-center ml-auto">
                    <ul className="flex space-x-8 flex-wrap text-sm font-semibold">
                        <NavbarLink href="/">Home</NavbarLink>
                        <li>
                            <div className="py-2 text-gray-700 cursor-pointer dark:hover:text-white dark:text-gray-400" 
                                onClick={() => setIsDialogCategoriesOpen(true)}>Categories</div>
                            <DialogCategories 
                                isDialogOpen={isDialogCategoriesOpen} 
                                setDialogOpen={(value) => { setIsDialogCategoriesOpen(value)}} />
                        </li>
                    </ul>
                </div>
                <div className="border-l ml-auto md:ml-4 pl-4">
                    <div className="cursor-pointer" onClick={() => setIsOpenDialog(true)}>
                        <SearchIcon className="w-4 h-4" />
                    </div>
                    <Dialog className="fixed inset-0 z-10" open={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-10" />
                        <div className="flex justify-center items-center min-h-screen px-4">
                            <div className="w-full max-w-lg overflow-hidden transition-all transform bg-white shadow-xl rounded-2xl">
                                <Combobox value={selectedPerson} onChange={() => setIsOpenDialog(false)}>
                                    <div className="flex items-center gap-2 px-4 border-b-[1px]">
                                        <SearchIcon className="h-4 w-4 text-slate-500" />
                                        <Combobox.Input className="w-full h-12 border-0  py-2 pl-3 pr-10 text-sm text-gray-900 focus:ring-0" 
                                            onChange={handleSearchQueryChange} 
                                        />
                                    </div>
                                    <div className="overflow-y-auto max-h-80">
                                        <Combobox.Options>
                                            {searchResult.map((post) => (
                                                <Link key={post.id} href={`/${post.slug}`}>
                                                    <a>
                                                        <Combobox.Option className="py-3 px-4 font-medium hover:bg-slate-100" value={post}>
                                                            {post.title}
                                                        </Combobox.Option>
                                                    </a>
                                                </Link>
                                            ))}
                                        </Combobox.Options>
                                    </div>
                                </Combobox>
                            </div>
                        </div>
                    </Dialog>
                </div>
                <div className="md:hidden relative">
                    <Menu as="div">
                        <Menu.Button className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="2" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="22" r="2"/></svg>
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 mt-2 w-56 overflow-y-hidden divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({active}) => (
                                    <MenuLink active={active} href="/" >Home</MenuLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <div className={`${
                                        active
                                            ? 'bg-gray-100'
                                            : 'text-gray-900'
                                        } w-full px-4 py-3 text-sm cursor-pointer`} 
                                        onClick={() => setIsDialogCategoriesOpen(true)}>Categories</div>
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