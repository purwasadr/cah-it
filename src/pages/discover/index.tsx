import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {NextPage} from 'next';
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import CardPost from '@/components/card/card-post';
import usePaging from '@/hooks/usePaging';
import {PostItem} from '@/models/post';
import {BACKEND_API} from '@/libs/constants';
import qs from 'qs';
import {toPosts} from '@/utils/mapper';
import Spinner from '@/components/spinner/spinner';
import clsxm from '@/libs/clsxm';

const CardPosts = ({className, query}: {className?: string; query: string}) => {
    const {
        isLoading,
        error,
        items: posts,
        hasMore,
        loadMore,
        tryAgain
    } = usePaging(
        (pageNum: number, query: string) => searchPostsUrl(query, pageNum),
        query,
        (res) => ({
            items: toPosts(res.data.data),
            currentPage: res.data.meta.pagination.page,
            pageCount: res.data.meta.pagination.pageCount,
        })
    );

    const searchPostsUrl = (queryUrl: string, pageNum: number) => {
        const qsQuery = qs.stringify(
            {
                filters: {
                    title: {
                        $containsi: queryUrl,
                    },
                },
                pagination: {
                    page: pageNum,
                    pageSize: 5,
                },
                populate: ['image', 'category', 'author']
            },
            {encodeValuesOnly: true}
        );
        return `${BACKEND_API}/api/posts?${qsQuery}`;
    };

    return (
        <section className={clsxm(className)}>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post, i) => (
                    <CardPost key={post.id} {...post} />
                ))}
            </div>
            <div className="flex justify-center mt-4">
                {hasMore && !isLoading && !error ? (
                    <Button onClick={() => loadMore()}>Load More</Button>
                ) : isLoading ? (
                    <Spinner />
                ) : error ? (
                    <div className="flex items-center">
                        <div className='mr-4'>Error fetch data</div>
                        <Button onClick={() => tryAgain()}>Try Again</Button>
                    </div>
                ) : null}
            </div>
        </section>
    );
};

const Discover: NextPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInput, setSearchInput] = useState('');

    return (
        <>
            <div className="flex justify-center">
                <form className="flex w-4/5" onSubmit={(e) => e.preventDefault()}>
                    <Input
                        className="rounded-r-none"
                        value={searchInput}
                        handleChange={(e) => setSearchInput(e.target.value)}
                        id="search"
                        name="search"
                    />
                    <Button className="rounded-l-none" onClick={() => setSearchQuery(searchInput)}>Search</Button>
                </form>
            </div>
          
            <CardPosts className="mt-2" query={searchQuery} />
        </>
    );
};

export default Discover;
