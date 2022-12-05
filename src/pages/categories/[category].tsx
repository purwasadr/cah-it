import CardPost from '@/components/card/card-post';
import Spinner from '@/components/spinner/spinner';
import usePostCategoryPaging from '@/libs/hooks/usePostCategoryPaging';
import CategoryModel from '@/models/category';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Category = () => {
    const router = useRouter()
    const { category } = router.query;

    const {isLoading, error, posts, lastElementRef, isEmpty} = usePostCategoryPaging(category?.toString());
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        if (!category) return;

        CategoryModel.getCategory(category.toString())
            .then((res) => {
                setCategoryName(res?.name ?? '');
            });
    }, [category])
    
    return (
        <div>
            <section>
                <h1 className="text-3xl font-bold text-center mt-4">{categoryName}</h1>
            </section>
            <section>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        posts.map((post, i) => posts.length !== i + 1 ?
                        (
                            <CardPost key={post.id} {...post}/>
                        ) : (
                            <CardPost key={post.id} {...post} inputRef={lastElementRef}/>
                        ))
                    }
                </div>
                {isLoading && (<Spinner />)}
                {error && (<div>Error</div>)}
                {isEmpty && (<div>Is Empty</div>)}
            </section>
            
        </div>
    );
}

export default Category;