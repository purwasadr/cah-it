import { MEDIA_BACKEND_API } from "@/libs/constants";
import PostModel, { Post } from "@/models/post";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { deleteUndefined, getDateShort } from "@/utils";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const post = await PostModel.getPost(String(ctx.params?.slug));

        if (!post)
            return {
                notFound: true,
            };

        deleteUndefined(post);

        return {
            props: {
                post: {
                    data: post,
                },
            },
        };
    } catch (error) {
        return {
            props: {
                post: {
                    error: "Cannot fetch",
                },
            },
        };
    }
};

interface PageProps {
    post: { data?: Post; error?: string };
}

const PostDetail: NextPage<PageProps> = ({ post }) => {
    return (
        <div className="flex justify-center">
            <div className="flex-grow max-w-xl">
                <h1 className="text-2xl font-bold text-center">
                    {post.data?.title}
                </h1>
                <div className="flex items-center justify-center gap-2 mt-3 text-sm text-slate-500">
                    <p>{post.data?.category}</p>
                    <p className="text-xs">•</p>
                    <p>
                        {post.data?.date ? getDateShort(post.data?.date) : "-"}
                    </p>
                </div>
                {post.data?.image && (
                    <div className="relative mt-8 aspect-[10/6] overflow-hidden rounded-lg">
                        <Image
                            src={`${MEDIA_BACKEND_API}${post.data?.image}`}
                            layout="fill"
                            objectFit="cover"
                            alt="Image Post"
                        />
                    </div>
                )}
                <ReactMarkdown
                    className="mt-8 prose"
                    rehypePlugins={[rehypeRaw]}
                >
                    {post.data?.body ?? ""}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default PostDetail;
