export const clearStorage = () => {
    localStorage.clear();
}

export const getStorage = (key: string) => {
    const item =localStorage.getItem(key)
    return item ? JSON.parse(item) : null;
}

export const setStorage = (key: string, value: any) => {
    localStorage.setItem(key, typeof value === "object" ? JSON.stringify(value) : value);
};