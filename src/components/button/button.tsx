import clsxm from '@/libs/clsxm';
import {MouseEventHandler, ReactNode} from 'react';

interface Props {
    type?: 'submit' | 'button' | 'reset';
    variant?: 'fill' | 'outline';
    className?: string;
    disabled?: boolean;
    children?: ReactNode;
    onClick?:  MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button = ({
    type = 'submit',
    variant = 'fill',
    className = '',
    disabled = false,
    children = '',
    onClick,
}: Props) => {
    return (
        <button
            type={type}
            className={
                clsxm(
                    "block focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium rounded-md text-sm px-4 py-2.5 text-primary",
                    [ 
                        variant === "fill" && "bg-primary text-white hover:bg-primary-dark focus:ring-primary",
                        variant === "outline" && "bg-white text-slate-900 border border-gray-200 shadow-sm hover:bg-gray-100 focus:ring-slate-200"
                    ],
                    "dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
                    disabled && 'opacity-25',
                    className
                )
            }
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
