import axios from 'axios';
import qs from 'qs';
import { toPost, toPostItem, toPosts, toPostSearch } from '@/utils/mapper';
import { BACKEND_API } from '@/libs/constants';


export interface Post {
    id?: number;
    title?: string;
    slug?: string;
    image?: string;
    excerpt?: string;
    body?: string;
    category?: string;
    date?: string;
}

export interface PostItem {
    id?: number;
    title?: string;
    slug?: string;
    image?: string;
    excerpt?: string;
    category?: string;
    date?: string;
    author?: string;
}

export interface PostSearch {
    id?: number;
    title?: string;
    slug?: string;
}

const getPosts = async () => {
    const query = qs.stringify({
        populate: ['image', 'category', 'author']
    }, { encodeValuesOnly: true });

    const res = await axios.get(`${BACKEND_API}/api/posts?${query}`);
        
    return toPosts(res.data.data);
}

const getFeaturedPost = async () => {
    const qsQuery = qs.stringify({
        filters: {
            featured: {
                $eq: true
            },
        },
        sort: ['createdAt:desc'],
        pagination: {
            pageSize: 1,
        },
        populate: ['image', 'category', 'author']
    }, { encodeValuesOnly: true });

    const res = await axios.get(`${BACKEND_API}/api/posts?${qsQuery}`);
    const dataPost = res.data.data[0];

    return dataPost ? toPostItem(dataPost) : undefined;
}

const getPost = async (slug: string) => {
    const qsQuery = qs.stringify({
        filters: {
            slug: {
                $eq: slug
            }
        },
        populate: ['image', 'category']
    }, { encodeValuesOnly: true });

    const res = await axios.get(`${BACKEND_API}/api/posts?${qsQuery}`);
    const dataPost = res.data.data[0];

    return dataPost ? toPost(dataPost) : undefined;
}

const getPostSearch = async (query: string) => {
    const qsQuery = qs.stringify({
        filters: {
            title: {
                $containsi: query
            }
        },
    }, { encodeValuesOnly: true });
    
    const req = await axios.get(`${BACKEND_API}/api/posts?${qsQuery}`);
    
    return toPostSearch(req.data.data)
}

const getPostsPaging = (pageNum: number, pageSize: number = 20) => {
    const qsQuery = qs.stringify({
        populate: ['image', 'category', 'author'],
        pagination: {
            page: pageNum,
            pageSize: pageSize,
        },
        filters: {
            featured: {
                $eq: false
            }
        },
    }, { encodeValuesOnly: true });
    const abortController = new AbortController();

    console.log('getPostsPaging:', qsQuery);

    const reqPosts = async () => {
        const req = await axios.get(`${BACKEND_API}/api/posts?${qsQuery}`, { 
            signal: abortController.signal
         });
        return {
            data: toPosts(req.data.data),
            meta: req.data.meta
        }
    }

    return {
        data: reqPosts(),
        abortController
    }
}

const PostModel = {
    getPosts,
    getPost,
    getPostSearch,
    getPostsPaging,
    getFeaturedPost,
}

export default PostModel;