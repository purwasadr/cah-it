import { Dialog } from '@headlessui/react';
import useResource from 'libs/hooks/useResource';
import CategoryModel, { Category } from 'models/category';
import Link from 'next/link';
import Spinner from '../spinner/spinner';

interface Props {
    isDialogOpen: boolean;
    setDialogOpen: (value: boolean) => void;
}

const DialogCategories = ({isDialogOpen, setDialogOpen}: Props) => {
    const [items, isLoading, error] = useResource(CategoryModel.getCategories());

    return (
        <Dialog className="fixed inset-0 z-10" open={isDialogOpen} onClose={() => setDialogOpen(false)}>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-10" />
            <div className="flex justify-center items-center h-screen px-4">
                <div className="w-full max-w-sm overflow-y-auto max-h-screen overflow-hidden transition-all transform bg-white shadow-xl rounded-2xl">
                    {(!isLoading && !error) && (<ul className="max-h-80 divide-y-[1px]">
                        {items?.map((item) => (
                            <li key={item.id}>
                                <Link href={`/categories/${item.slug}`}>
                                    <a className="block py-3 px-4 font-medium hover:bg-slate-100 cursor-pointer" onClick={() => setDialogOpen(false)}>
                                        {item.name}
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>)}
                    {!isLoading && error && ((
                        <div className="flex justify-center items-center h-20 max-h-screen">
                            <p>Error fetch categories</p>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-center items-center h-20 max-h-screen">
                            <Spinner />
                        </div>
                    )}
                </div>
            </div>
        </Dialog>
    );
}

export default DialogCategories;