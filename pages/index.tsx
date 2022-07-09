import type {NextPage} from 'next';
import Image from 'next/image';
import CardPost from '@/components/card/card-post';
import { getDateShort } from 'utils';
import usePostPaging from 'libs/hooks/usePostPaging';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PostModel, { PostItem } from 'models/post';
import Spinner from '@/components/spinner/spinner';
import { BACKEND_API } from 'libs/constants';

const Home: NextPage = () => {
    const {isLoading, error, posts, lastPostElementRef} = usePostPaging();
    const [featuredPost, setFeaturedPost] = useState<PostItem>();

    useEffect(() => {
        const req = async () => {
            try {
                const reqPost = await PostModel.getFeaturedPost();
                setFeaturedPost(reqPost);
            } catch (error) {
                console.error(error);
                
            }
        }
        req()
    }, [])

    return (
        <>
            <section className="flex flex-col md:flex-row md:space-x-5">
                <section className="w-full md:w-[60%] lg:w-2/3">
                    <div className="relative rounded-lg aspect-[10/6] md:aspect-[20/9] shadow-md overflow-hidden">
                       {featuredPost?.image && <Image src={`${BACKEND_API}${featuredPost?.image}`} alt="Poster" layout="fill" objectFit="cover" />}
                    </div>
                </section>
                <section className="flex flex-col justify-center w-full lg:w-1/3">
                    <p className="pt-4 text-sky-700 tracking-wider uppercase text-sm font-medium">{featuredPost?.category}</p>
                    <Link href={`/${encodeURIComponent(featuredPost?.slug ?? '')}`}>
                        <a>
                            <h2 className="pt-1 text-xl font-semibold">{featuredPost?.title}</h2>
                        </a>
                    </Link>
                    <p className="pt-1 text-slate-500">{featuredPost?.excerpt}</p>
                    <div className="flex items-center gap-2 pt-2 text-sm">
                        <p>{featuredPost?.author}</p>
                        <span className="text-xs">•</span>
                        <p>{getDateShort(featuredPost?.date) ?? '-'}</p>
                    </div>
                </section>
            </section>
            <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    posts.map((post, i) => posts.length !== i + 1 ?
                    (
                        <CardPost key={post.id} {...post}/>
                    ) : (
                        <CardPost key={post.id} {...post} inputRef={lastPostElementRef}/>
                    ))
                }
            </section>
            {isLoading && (<div className="flex justify-center items-center min-h-[300px]"><Spinner /></div>)}
            {!isLoading && error && <div className='flex justify-center mt-4'>Error get data</div>}
        </>
    );
};

export default Home;

