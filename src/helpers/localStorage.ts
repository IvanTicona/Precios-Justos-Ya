export const clearStorage = () => {
    localStorage.clear();
}

export const getStorage = (key: string) => {
    const item =localStorage.getItem(key)
    return item ? JSON.parse(item) : null;
}

export const setStorage = (key: string, value: any)=>{
    if ( typeof value === "object" ) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}