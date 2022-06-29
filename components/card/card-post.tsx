import { BACKEND_API } from 'libs/constans';
import { Post } from 'models/post';
import Image from 'next/image';
import { getDateShort } from 'utils';

interface Props extends Post {
    className?: string;
}

const CardPost = ({className = '', title, slug, image, excerpt, category, date = ''}: Props) => {
    return (
        <div
            className={`w-full h-full md:w-[260px] ${className}`}
        >
            <div className="relative aspect-[3/2] rounded-md overflow-hidden shadow-md">
                <Image className="" src={`${BACKEND_API}${image}`} layout="fill" objectFit="cover" alt="Image"/>
            </div>
            <h2 className="mt-4 text-2xl font-medium">{title}</h2>
            <p className="mt-2 text-slate-500">{excerpt}</p>
            <div className="flex gap-2 mt-3 text-sm">
                <p>{category}</p>
                <span>•</span>
                <p>{getDateShort(new Date(date))}</p>
            </div>
        </div>
    );
};

export default CardPost;
