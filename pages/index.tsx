import type {NextPage} from 'next';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import ModelPost, { Post } from 'models/post';
import CardPost from '@/components/card/card-post';
import { getDateShort } from 'utils';

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    try {
        const posts = await ModelPost.getPosts()

        return{
            props:{
                posts: {
                    data: posts
                }
            }
        } 
    } catch (error) {
        return {
            props:{
                posts: {
                    error: 'error'
                }
            }
        }
    }
}
interface PageProps {
    posts: { data?: Post[], error?: string }
}

const Home: NextPage<PageProps> = ({ posts }) => {
    
    return (
        <>
            <section className="flex gap-8">
                <section className="w-2/3">
                    <div className="relative rounded-lg h-[300px] shadow-md overflow-hidden">
                        <Image src="/img1.jpg" alt="Poster" layout="fill" objectFit="cover" />
                    </div>
                </section>
                <section className="flex flex-col justify-center w-1/3">
                    <div className="">
                    <h2 className="mt-4 text-2xl font-medium">Loem</h2>
                    <p className="mt-2 text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, error.</p>
                    <div className="flex gap-2 mt-3 text-sm">
                        <p>Shounen</p>
                        <span>|</span>
                        <p>{getDateShort(new Date('2002-8-2'))}</p>
                    </div>
                    </div>
                </section>
            </section>
            <section className="mt-8">
                {
                    posts.data?.map((post) => (<CardPost key={post.id} {...post}/>))
                }
            </section>
            <div className="h-[400px]"></div>
        </>
    );
};

export default Home;
