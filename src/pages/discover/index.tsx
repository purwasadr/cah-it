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
import { toPosts } from '@/utils/mapper';
import Spinner from '@/components/spinner/spinner';
import clsxm from '@/libs/clsxm';

const CardPosts = ({className, query}: {className?: string, query: string }) => {
    const {isLoading, error, items:posts, hasMore, loadMore} = usePaging(
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
            },
            {encodeValuesOnly: true}
        );
        return `${BACKEND_API}/api/posts?${qsQuery}`;
    };

    return (
        <section className={clsxm(className)}>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    posts.map((post, i) => <CardPost key={post.id} {...post}/>)
                }
            </div>
            <div className="flex justify-center mt-4">
                {hasMore && !isLoading ? <Button onClick={() => loadMore()}>Load More</Button> : isLoading ? <Spinner /> : null}
            </div>
        </section>
        
    )
};

const Discover: NextPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <>
            <div className="flex">
                <Input
                    className="rounded-r-none"
                    value={searchQuery}
                    handleChange={(e) => setSearchQuery(e.target.value)}
                    id="search"
                    name="search"
                />
                <Button className="rounded-l-none">Search</Button>
            </div>
            <CardPosts query={searchQuery}/>
        </>
    );
};

export default Discover;
