import { Category } from 'models/category';
import { Post, PostItem, PostSearch } from 'models/post';

export const toPosts = (posts: any[]) => {
    return posts.map((post): PostItem => ({
        id: post?.id,
        title: post?.attributes?.title,
        slug: post?.attributes?.slug,
        image: post?.attributes?.image?.data?.attributes?.formats?.medium?.url,
        excerpt: post?.attributes?.excerpt,
        category: post?.attributes?.category?.data?.attributes?.name,
        date: post?.attributes?.createdAt,
        author: post?.attributes?.author?.data?.attributes?.username
    }));
}

export const toPostItem = (post: any): PostItem => {
    return {
        id: post?.id,
        title: post?.attributes?.title,
        slug: post?.attributes?.slug,
        image: post?.attributes?.image?.data?.attributes?.formats?.medium?.url,
        excerpt: post?.attributes?.excerpt,
        category: post?.attributes?.category?.data?.attributes?.name,
        date: post?.attributes?.createdAt,
        author: post?.attributes?.author?.data?.attributes?.username
    };
}

export const toPost = (post: any): Post => {
    return {
        id: post?.id,
        title: post?.attributes?.title,
        slug: post?.attributes?.slug,
        image: post?.attributes?.image?.data?.attributes?.formats?.medium?.url,
        excerpt: post?.attributes?.excerpt,
        body: post?.attributes?.body,
        category: post?.attributes?.category?.data?.attributes?.name,
        date: post?.attributes?.createdAt
    };
}

export const toPostSearch = (posts: any[]): PostSearch[] => {
    return posts.map((post): PostSearch => ({
        id: post.id,
        title: post.attributes.title,
        slug: post?.attributes?.slug,
    }));
}

export const toCategories = (categories: any[]) => {
    return categories.map((category): Category => ({
        id: category?.id,
        name: category?.attributes?.name,
        slug: category?.attributes?.slug,
    }));
}