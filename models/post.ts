import axios from 'axios';
import qs from 'qs';
import { toPost, toPosts } from 'utils/mapper';
import { BACKEND_API } from '../libs/constans';


export interface Post {
    id: number;
    title?: string;
    slug?: string;
    image?: string;
    excerpt?: string;
    body?: string;
    category?: string;
    date?: string;
}

export interface PostItem {
    id: number;
    title?: string;
    slug?: string;
    image?: string;
    excerpt?: string;
    category?: string;
    date?: string;
}

const getPosts = async () => {
    const query = qs.stringify({
        populate: ['image', 'category']
    }, { encodeValuesOnly: true });

    const res = await axios.get(`${BACKEND_API}/api/posts?${query}`);
    
    return toPosts(res.data.data);
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
    
    return toPost(res.data.data[0]);
}

const PostModel = {
    getPosts,
    getPost
}

export default PostModel;