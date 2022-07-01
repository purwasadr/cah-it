import { BACKEND_API } from 'libs/constans';
import { Post, PostItem } from 'models/post';
import Image from 'next/image';
import Link from 'next/link';
import { getDateShort } from 'utils';

interface Props extends PostItem {
    className?: string;
}

const CardPost = ({className = '', title, slug = '', image, excerpt, category, date = ''}: Props) => {
    return (
        <div
            className={`w-full h-full ${className}`}
        >
            <div className="relative aspect-[10/6] rounded-md overflow-hidden shadow-md">
                {image && <Image className="" src={`${BACKEND_API}${image}`} layout="fill" objectFit="cover" alt="Image"/>}
            </div>
            <section>
                <Link href={`/${encodeURIComponent(slug)}`}>
                    <a>
                        <h2 className="pt-4 text-2xl font-semibold">{title}</h2>
                    </a>
                </Link>
                <p className="pt-2 text-slate-500">{excerpt}</p>
                <div className="flex items-center gap-2 pt-3 text-sm">
                    <p>{category}</p>
                    <span className="text-xs">•</span>
                    <p>{getDateShort(new Date(date))}</p>
                </div>
            </section>
        </div>
    );
};

export default CardPost;
