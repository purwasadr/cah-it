import clsxm from '@/libs/clsxm';
import {ChangeEventHandler, MouseEventHandler} from 'react';

interface Props {
    type?: string;
    id?: string;
    name?: string;
    value?: string;
    className?: string;
    autoComplete?: string;
    required?: boolean;
    handleChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({
    type = 'text',
    id,
    name,
    className,
    value,
    autoComplete,
    required,
    handleChange,
}: Props) => {
    return (
        <input
            className={
                clsxm(
                    "block focus:ring-primary focus:border-primary w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md",
                    className
                )
            }
            id={id}
            type={type}
            name={name}
            value={value}
            autoComplete={autoComplete}
            required={required}
            onChange={handleChange}
        />
    );
};

export default Input;
