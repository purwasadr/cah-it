import type { NextPage } from "next";
import CardPost from "@/components/card/card-post";
import Spinner from "@/components/spinner/spinner";
import { BACKEND_API, MEDIA_BACKEND_API } from "@/libs/constants";
import usePaging from "@/hooks/usePaging";
import qs from "qs";
import { toPosts } from "@/utils/mapper";
import Button from "@/components/button/button";
import clsxm from "@/libs/clsxm";
import Carousel from "react-multi-carousel";
import { GetServerSideProps } from "next";
import PostModel, { PostItem } from "@/models/post";
import Image from "next/image";
import { deleteUndefined } from "@/utils";
import CardPostSM from "@/components/card/card-post-sm";

const CardPosts = ({ className }: { className?: string }) => {
    const {
        isLoading,
        error,
        items: posts,
        hasMore,
        loadMore,
        tryAgain,
    } = usePaging(
        (pageNum: number) => postsUrl(pageNum),
        "",
        (res) => ({
            items: toPosts(res.data.data),
            currentPage: res.data.meta.pagination.page,
            pageCount: res.data.meta.pagination.pageCount,
        })
    );

    const postsUrl = (pageNum: number) => {
        const qsQuery = qs.stringify(
            {
                populate: ["image", "category", "author"],
                pagination: {
                    page: pageNum,
                    pageSize: 20,
                },
            },
            { encodeValuesOnly: true }
        );

        return `${BACKEND_API}/api/posts?${qsQuery}`;
    };

    return (
        <section className={clsxm(className)}>
            {posts.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post, i) => (
                        <CardPost key={post.id} {...post} />
                    ))}
                </div>
            ) : null}
            <div className="flex justify-center mt-4">

                {/* Saat halaman selanjutnya perlu dimuat ulang */}
                {hasMore && !isLoading && !error ? (
                    <Button onClick={() => loadMore()}>Load More</Button>
                ) : isLoading ? (
                    <Spinner />
                ) : error ? (
                    <div className="flex items-center">
                        <div className="mr-4">Error fetch data</div>
                        <Button onClick={() => tryAgain()}>Try Again</Button>
                    </div>

                ) : posts.length == 0 ? ( // Saat halaman kosong 
                    <div className="flex items-center">
                        <div className="mr-4">Data empty</div>
                    </div>
                ) : null}
            </div>
        </section>
    );
};

interface FeaturedPostsProps {
    featuredPosts?: PostItem[];
}

const CarouselFeaturedPosts = ({ featuredPosts }: FeaturedPostsProps) => {
    const responsive = {
        xs: {
            breakpoint: { min: 0, max: 4000 },
            items: 1,
        },
    };

    return (
        <>
            <Carousel responsive={responsive} arrows>
                {/* <FeaturedPosts featuredPosts={featuredPosts!!} /> */}
                {featuredPosts?.map((post) => (
                    <div
                        key={post.id}
                        className="flex flex-col justify-end bg-blue-500 h-72"
                    >
                        <Image
                            className="absolute z-0 object-cover w-full h-full"
                            fill
                            src={MEDIA_BACKEND_API!! + post.image ?? ""}
                            alt={`Image ${post.title}`}
                        />
                        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-transparent to-black"></div>
                        <div className="relative z-20 p-4">
                            <h3 className="w-full text-xl font-bold text-white">
                                {post.title}
                            </h3>
                            <p className="text-sm mt-1 text-white line-clamp-2">
                                {post.excerpt}
                            </p>
                        </div>
                    </div>
                )) ?? []}
            </Carousel>
        </>
    );
};

interface TopPostsProps {
    topPosts?: PostItem[];
    className?: string;
}

const TopPosts = ({ topPosts, className}: TopPostsProps) => {
    return (
        <ul className={clsxm(`space-y-3 ${className}`)}>
            {topPosts?.map((topPost) => {
                return (
                    <CardPostSM
                        key={topPost.id}
                        {...topPost}
                        slug={topPost.slug}
                    />
                );
            })}
        </ul>
    );
};

interface PageProps {
    featuredPosts?: PostItem[];
    topPosts?: PostItem[];
}

const Home: NextPage<PageProps> = ({ featuredPosts, topPosts }) => {
    return (
        <>
            <section className="md:flex">
                <div className="overflow-hidden rounded-lg md:w-[65%]">
                    <CarouselFeaturedPosts featuredPosts={featuredPosts} />
                </div>
                <div className="mt-3 md:px-5 md:py-2  md:w-[35%]">
                    <h2 className="text-xl font-bold">Top Blogs</h2>
                    <div className="mt-2">
                        <TopPosts topPosts={topPosts} />
                    </div>
                </div>
            </section>
            <CardPosts className="mt-4 md:mt-8" />
        </>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const featuredPosts = await PostModel.getFeaturedPosts();
        const topPosts = await PostModel.getTopPosts(3);
        // console.log('feat', featuredPosts);

        deleteUndefined(featuredPosts);
        deleteUndefined(topPosts);
        return {
            props: {
                featuredPosts,
                topPosts,
            },
        };
    } catch (error) {
        return {
            props: {},
        };
    }
};
