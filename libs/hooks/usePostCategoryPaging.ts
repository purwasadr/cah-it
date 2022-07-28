import {useState, useEffect, useRef, useCallback} from 'react';
import PostModel, { PostItem } from 'models/post';
import axios from 'axios';
import QueryString from 'qs';
import { toPosts } from 'utils/mapper';
import { BACKEND_API } from 'libs/constants';

function usePostCategoryPaging(slugCategory?: string) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [hasMore, setHasMore] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(false);

    const observer = useRef<IntersectionObserver>();
    const lastElementRef = useCallback(
        (node: any) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPageNum((prev) => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore]
    );

    useEffect(() => {
        setPosts([]);
        setPageNum(1);
    }, [slugCategory]);

    useEffect(() => {
        if (!slugCategory) return;

        setIsLoading(true);
        setError(false);

        const abortController = new AbortController();
        const qsQuery = QueryString.stringify({
            populate: ['image', 'category', 'author'],
            pagination: {
                page: pageNum,
                pageSize: 20,
            },
            filters: {
                category: {
                    slug: {
                        $eq: slugCategory
                    }
                }
            },
        }, { encodeValuesOnly: true });

        axios.get(`${BACKEND_API}/api/posts?${qsQuery}`, { 
            signal: abortController.signal
         })
            .then((res) => {
                const posts = toPosts(res.data.data)
                const meta = res.data.meta

                setPosts((prev: PostItem[]) => {
                    return Array.from(
                        new Map(
                            [...prev, ...posts].map((item) => [
                                item['id'],
                                item,
                            ])
                        ).values()
                    );
                });
                setHasMore(
                    meta.pagination.page < meta.pagination.pageCount
                );
            })
            .catch((err: any) => {
                if (abortController.signal.aborted) return;

                setError(err);
            }).finally(() => {
                setIsLoading(false);
                setIsInitialLoad(pageNum === 1)
            });

        return () => {
            abortController.abort();
        };
    }, [pageNum, slugCategory]);

    useEffect(() => {
        setIsEmpty(!isLoading && posts.length === 0 && isInitialLoad && !error);
    }, [isLoading, posts, isInitialLoad, error])

    return {isLoading, error, posts, lastElementRef, isEmpty};
}

export default usePostCategoryPaging;
