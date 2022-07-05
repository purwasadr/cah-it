export const getDateShort = (dateString?: string) => {
    if (!dateString) return undefined;

    const date = new Date(dateString);

    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: '2-digit',
    });
};

// Hack needed to avoid JSON-Serialization validation error from Next.js https://github.com/zeit/next.js/discussions/11209
// >>> Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value all together.
export const deleteUndefined = (obj: Record<string, any> | undefined): void => {
    if (obj) {
        Object.keys(obj).forEach((key: string) => {
            if (obj[key] && typeof obj[key] === 'object') {
                deleteUndefined(obj[key]);
            } else if (typeof obj[key] === 'undefined') {
                delete obj[key];
            }
        });
    }
};
