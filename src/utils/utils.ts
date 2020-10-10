export const extractFromArrayPath = (source: object, pathArray: string[]): any => {
    let value = null;

    pathArray.forEach(path => {
        if (value === null) {
            value = source[path];
        } else {
            value = value[path];
        }
    });

    return value;
};

export const arrayIncludesString = (source: string[], target: string): boolean => {
    return source.some(e => stringIncludes(e, target));
};

export const stringIncludes = (source: string, target: string): boolean => {
    return normalizeString(source).includes(normalizeString(target));
};

export const normalizeString = (value: string): string => {
    return value?.trim().toLocaleLowerCase();
};
