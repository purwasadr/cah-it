import { Dialog } from '@headlessui/react';
import CategoryModel, { Category } from 'models/category';
import { useEffect, useState } from 'react';

interface Props {
    isDialogOpen: boolean;
    setDialogOpen: (value: boolean) => void;
}

const DialogCategories = ({isDialogOpen, setDialogOpen}: Props) => {
    const [items, setItems] = useState<Array<Category>>([]);

    useEffect(() => {
        CategoryModel.getCategories()
            .then((data) => {
                setItems(data);
            })
            .catch((reason) => {
                console.error(reason);
            })
    }, [])

    return (
        <Dialog className="fixed inset-0 z-10" open={isDialogOpen} onClose={() => setDialogOpen(false)}>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-10" />
            <div className="flex justify-center items-center min-h-screen px-4">
                <div className="w-full max-w-sm overflow-y-auto max-h-screen overflow-hidden transition-all transform bg-white shadow-xl rounded-2xl">
                    <ul className="max-h-80 divide-y-[1px]">
                        {items.map((item) => (
                            <li key={item.id}>
                                <div className="py-3 px-4 font-medium hover:bg-slate-100 cursor-pointer" onClick={() => setDialogOpen(false)}>{item.name}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Dialog>
    );
}

export default DialogCategories;