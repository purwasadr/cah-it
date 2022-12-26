import {useState, useEffect, useRef, useCallback} from 'react';
import axios from 'axios';

export default function usePaging<T>(
    url: (pageNum: number, query: string) => string,
    query: string = '',
    resPage: (res: any) => {items: T[]; pageCount: number; currentPage: number}
) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [items, setItems] = useState<T[]>([]);
    const [hasMore, setHasMore] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [isEmpty, setIsEmpty] = useState(false);
    const [trigger, setTrigger] = useState({});
    const [isInitialLoad, setIsInitialLoad] = useState(false);
    
    useEffect(() => {
        setItems([]);
        setPageNum(1);
    }, [query]);

    useEffect(() => {
        setIsLoading(true);
        setError(false);

        const abortController = new AbortController();

        axios
            .get(url(pageNum, query), {
                signal: abortController.signal,
            })
            .then((res) => {
                const pageData = resPage(res);

                setItems((prev: T[]) => {
                    return Array.from(
                        new Map(
                            [...prev, ...pageData.items].map((item: any) => [
                                item['id'],
                                item,
                            ])
                        ).values()
                    );
                });
                setHasMore(pageData.currentPage < pageData.pageCount);

                setIsLoading(false);
                setIsInitialLoad(pageNum === 1);
            })
            .catch((err: any) => {
                if (abortController.signal.aborted) return;

                setError(true);

                setIsLoading(false);
                setIsInitialLoad(pageNum === 1);
            });

        return () => {
            abortController.abort();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum, query, trigger]);

    useEffect(() => {
        setIsEmpty(!isLoading && items.length === 0 && isInitialLoad && !error);
    }, [isLoading, items, isInitialLoad, error]);

    const loadMore = () => {
        setPageNum((prev) => prev + 1);
    }

    const tryAgain = () => {
        setTrigger({});
    }

    return {isLoading, error, items, hasMore, isEmpty, loadMore, tryAgain};
}
