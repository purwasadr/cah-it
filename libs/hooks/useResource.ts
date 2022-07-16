import {useEffect, useState} from 'react';

const useResource = <T>(
    resource: Promise<T>
): [T | undefined, boolean, any] => {
    const [data, setData] = useState<T>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>();

    useEffect(() => {
        setIsLoading(true);
        resource
            .then((res) => {
                setData(res);
            })
            .catch((reason) => {
                setError(reason);
            })
            .finally(() => {
                setIsLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [data, isLoading, error];
};

export default useResource;
