import axios from 'axios';
import { BACKEND_API } from 'libs/constants';
import qs from 'qs';
import { toCategories } from 'utils/mapper';

export interface Category {
    id?: number;
    name?: string;
    slug?: string;
}

const getCategories = async () => {
    const res = await axios.get(`${BACKEND_API}/api/categories`);
        
    return toCategories(res.data.data);
}

const CategoryModel = {
    getCategories
}

export default CategoryModel;