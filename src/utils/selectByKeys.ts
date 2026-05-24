export type KeysOfType<T> = {
    [K in keyof T]: T[K]
}
export const selectByKeys = <T, >(state: T, keys: Array<keyof T>) => {
    const returnObject = {} as KeysOfType<T>
    keys.forEach(key => {
        returnObject[key] = state[key]
    })
    return returnObject
}