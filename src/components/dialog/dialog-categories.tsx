import { Dialog } from "@headlessui/react";
import useResource from "@/hooks/useResource";
import CategoryModel from "@/models/category";
import Link from "next/link";
import Spinner from "@/components/spinner/spinner";
import Button from "@/components/button/button";

interface Props {
    isDialogOpen: boolean;
    setDialogOpen: (value: boolean) => void;
}

const DialogCategories = ({ isDialogOpen, setDialogOpen }: Props) => {
    const [items, isLoading, error, tryAgain] = useResource(
        CategoryModel.getCategories()
    );

    return (
        <Dialog
            className="fixed inset-0 z-10"
            open={isDialogOpen}
            onClose={() => setDialogOpen(false)}
        >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-10" />
            <div className="flex items-center justify-center h-screen px-4">
                <div className="w-full max-w-sm max-h-screen overflow-hidden overflow-y-auto transition-all transform bg-white shadow-xl rounded-2xl">
                    {items && items.length > 0 ? (
                        <ul className="max-h-80 divide-y-[1px]">
                            {items?.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        className="block px-4 py-3 font-medium cursor-pointer hover:bg-slate-100"
                                        href={`/categories/${item.slug}`}
                                        onClick={() => setDialogOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                    {!isLoading && error ? (
                        <div className="flex items-center justify-center h-20 max-h-screen">
                            <p>Error fetch categories</p>
                            <Button onClick={() => tryAgain()}>
                                Try Again
                            </Button>
                        </div>
                    ) : isLoading ? (
                        <div className="flex items-center justify-center h-20 max-h-screen">
                            <Spinner />
                        </div>
                    ) : items && items.length == 0 ? (
                        <div className="flex items-center justify-center h-20 max-h-screen">
                            <p>Category Empty</p>
                        </div>
                    ) : null}
                </div>
            </div>
        </Dialog>
    );
};

export default DialogCategories;
