import {useState, useEffect, useRef, useCallback} from 'react';
import PostModel, { PostItem } from 'models/post';

function usePostPaging() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [hasMore, setHasMore] = useState(false);
    const [pageNum, setPageNum] = useState(1);

    const observer = useRef<IntersectionObserver>();
    const lastPostElementRef = useCallback(
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

        setIsLoading(true);
        setError(false);

        const posts = PostModel.getPostsPaging(pageNum);
        posts.data
            .then((res) => {
                setPosts((prev: PostItem[]) => {
                    // return [...prev, ...trData.data];
                    return Array.from(
                        new Map(
                            [...prev, ...res.data].map((item) => [
                                item['id'],
                                item,
                            ])
                        ).values()
                    );
                });
                setHasMore(
                    res.meta.pagination.page < res.meta.pagination.pageCount
                );
                setIsLoading(false);
            })
            .catch((err: any) => {
                if (posts.abortController.signal.aborted) return;
                setIsLoading(false);
                setError(err);
            });

        return () => {
            posts.abortController.abort();
        };
    }, [pageNum]);

   

    return {isLoading, error, posts, lastPostElementRef};
}

export default usePostPaging;
