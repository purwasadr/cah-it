import axios from 'axios';
import qs from 'qs';
import { toPosts } from 'utils/mapper';
import { BACKEND_API } from '../libs/constans';

export interface Post {
    id: number;
    title?: string;
    slug?: string;
    image?: string;
    excerpt?: string;
    category: string;
    date?: string;
}

const getPosts = async () => {
    const query = qs.stringify({
        populate: ['image', 'category']
    }, { encodeValuesOnly: true });

    const res = await axios.get(`${BACKEND_API}/api/posts?${query}`);
    console.log('getPostsQuery:', query);
    
    return toPosts(res.data.data);
}

const ModelPost = {
    getPosts
}

export default ModelPost;