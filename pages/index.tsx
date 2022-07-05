import type {NextPage} from 'next';
import Image from 'next/image';
import CardPost from '@/components/card/card-post';
import { getDateShort } from 'utils';
import usePostPaging from 'libs/hooks/usePostPaging';

const Home: NextPage = () => {
    const {isLoading, error, posts, lastPostElementRef} = usePostPaging();

    return (
        <>
            <section className="flex flex-col md:flex-row gap-2">
                <section className="w-full md:w-[60%] lg:w-2/3">
                    <div className="relative rounded-lg aspect-[10/6] md:aspect-[20/9] shadow-md overflow-hidden">
                        <Image src="/img1.jpg" alt="Poster" layout="fill" objectFit="cover" />
                    </div>
                </section>
                <section className="flex flex-col justify-center w-full md:w-[40%] lg:w-1/3 pl-3">
                    <h2 className="mt-3.5 text-2xl font-medium">Loem</h2>
                    <p className="mt-2 text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, error.</p>
                    <div className="flex gap-2 mt-3 text-sm">
                        <p>Shounen</p>
                        <span>|</span>
                        <p>{getDateShort('2002-8-2')}</p>
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
            {isLoading && <div className='flex justify-center mt-4'>Loading...</div>}
            {!isLoading && error && <div className='flex justify-center mt-4'>Error get data</div>}
            <div className="h-[400px]"></div>
        </>
    );
};

export default Home;

