import { Post } from 'models/post';

export const toPosts = (posts: any[]) => {
    return posts.map((post): Post => ({
        id: post.id,
        title: post.attributes.title,
        slug: post.attributes.slug,
        image: post.attributes.image.data.attributes.formats.medium.url,
        excerpt: post.attributes.excerpt,
        category: post.attributes.category.data.attributes.name,
        date: post.attributes.createdAt
    }));
}