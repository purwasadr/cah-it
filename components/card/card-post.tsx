import { BACKEND_API } from 'libs/constants';
import { Post, PostItem } from 'models/post';
import Image from 'next/image';
import Link from 'next/link';
import { getDateShort } from 'utils';

interface Props extends PostItem {
    className?: string;
    inputRef?: (node: any) => void;
}

const CardPost = ({className = '', inputRef, title, slug = '', image, excerpt, category, date, author}: Props) => {
    return (
        <article
            ref={inputRef}
            className={`w-full h-full ${className}`}
        >
            <div className="relative aspect-[10/6] rounded-md overflow-hidden shadow-md">
                {image && <Image className="" src={`${BACKEND_API}${image}`} layout="fill" objectFit="cover" alt="Image"/>}
            </div>
            <section>
                <p className="pt-3.5 text-sky-700 tracking-wider uppercase text-sm font-medium">{category}</p>
                <Link href={`/${encodeURIComponent(slug)}`}>
                    <a>
                        <h2 className="pt-1 text-xl font-semibold">{title}</h2>
                    </a>
                </Link>
                <p className="pt-1 text-slate-500">{excerpt}</p>
                <div className="flex items-center gap-2 pt-2 text-sm">
                    <p>{author}</p>
                    <span className="text-xs">•</span>
                    <p>{getDateShort(date) ?? '-'}</p>
                </div>
            </section>
        </article>
    );
};

export default CardPost;
