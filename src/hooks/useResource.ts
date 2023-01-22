import {useEffect, useState} from 'react';

const useResource = <T>(
    resource: Promise<T>
): [T | undefined, boolean, any, () => void] => {
    const [data, setData] = useState<T>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [triggerEffect, setTriggerEffect] = useState({});

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
    }, [triggerEffect]);

    const tryAgain = () => {
        setTriggerEffect({})
        setError(null);
    }

    return [data, isLoading, error, tryAgain];
};

export default useResource;
