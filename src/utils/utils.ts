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
