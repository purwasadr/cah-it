import axios from 'axios';
import { BACKEND_API } from '@/libs/constants';
import qs from 'qs';
import { toCategories, toCategory } from '@/utils/mapper';

export interface Category {
    id?: number;
    name?: string;
    slug?: string;
}

const getCategories = async () => {
    const res = await axios.get(`${BACKEND_API}/api/categories`);
        
    return toCategories(res.data.data);
}

const getCategory = async (slug: string) => {
    const qsQuery = qs.stringify({
        filters: {
            slug: {
                $eq: slug
            }
        },
    }, { encodeValuesOnly: true });

    const res = await axios.get(`${BACKEND_API}/api/categories?${qsQuery}`);
    const resData = res.data.data[0]
        
    return resData ? toCategory(resData) : undefined;
}

const CategoryModel = {
    getCategories,
    getCategory
}

export default CategoryModel;