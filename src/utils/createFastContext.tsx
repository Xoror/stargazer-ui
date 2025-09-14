import { type ReactNode, useRef, useMemo, useCallback, createContext, useContext, useSyncExternalStore } from "react";
import { isEqual } from "lodash";
//type Store = {first:string, last:string, isAllowed?: boolean, number?: number}

const createFastContext = <Store,>() => {
    type SelectorType = (store: Store) => (Store[keyof Store] | Store | Array<Store[keyof Store]>)
    type IsEqualFunction = (oldValue: ReturnType<SelectorType>, newValue: ReturnType<SelectorType>) => boolean
    type SetStore = Partial<Store> | ( (store: Store) => Store )
    type GetStoreReturn<T> = T extends SelectorType ? ReturnType<T>:  T extends undefined ? Store : never
    type SetStoreReturn = (setProp: SetStore) => void


    function useStoreData(initialState:Store, refreshKeys: Array<keyof Store> = []) : {
        get: () => Store, 
        set: (setProp: SetStore) => void, 
        subscribe: (callback: () => void) => () => void,
    } {
        const store = useRef(initialState)
        const subscribers = useRef(new Set<() => void>())
        
        refreshKeys.forEach(key => {
            if(initialState[key] != store.current[key]) store.current[key] = initialState[key]
        })
        const get = useCallback( () => {
            return store.current
        }, [])
        const set = useCallback( (setProp: SetStore) => {
            if( typeof setProp === "function") {
                store.current = setProp(store.current)
            }
            else store.current = {...store.current, ...setProp}
            subscribers.current.forEach((callback) => callback())
        }, [])
        const subscribe = useCallback( (callback: any) => {
            subscribers.current.add(callback)
            return () => {subscribers.current.delete(callback)}
        }, [])
        return {get, set, subscribe}
    }


    const StoreContext = createContext<ReturnType<typeof useStoreData> | null>(null);
    const StoreContextProvider = ({children, initialState, refreshKeys}:{children:ReactNode, initialState: Store, refreshKeys?: Array<keyof Store>}) => {
        return(
            <StoreContext.Provider value={useStoreData(initialState, refreshKeys)}>
                {children}
            </StoreContext.Provider>
        )
    }

    function getStore<T extends SelectorType, >(selector: T, equalityFunction?:IsEqualFunction, id?: string): GetStoreReturn<T>
    function getStore<T extends undefined, >(selector?: T, equalityFunction?:IsEqualFunction, id?: string): GetStoreReturn<T>
    function getStore<T extends SelectorType, >(selector: T, equalityFunction?:IsEqualFunction, id?: string): GetStoreReturn<T> {
        const store = useContext(StoreContext)
        if(!store) {
            throw new Error("You have to use useStore within the proper provider!")
        }
        const storeGet:SelectorType = (store) => {
            return store
        }
        
        let getSnapshot = useMemo(() => {
            const selectorInternal = selector !== undefined ? selector : storeGet
            //memoization through closures
            let hasMemo = false
            let memoState: Store | undefined
            let memoSelected: ReturnType<SelectorType>
            const memoSelector = (newState: Store) => {
                if(!hasMemo) {
                    hasMemo = true
                    memoState = newState
                    memoSelected = selectorInternal(newState)
                    return memoSelected
                }
                const oldState = memoState
                if(isEqual(oldState, newState)) return memoSelected
                const oldSelected = memoSelected
                const newSelected = selectorInternal(newState)
                if(id) console.log(id, oldSelected == newSelected)
                if(equalityFunction && equalityFunction(oldSelected, newSelected)) {
                    //console.log(oldSelected, newSelected, equalityFunction(oldSelected, newSelected))
                    return memoSelected
                }
                if(isEqual(oldSelected, newSelected)) return memoSelected
                memoState = newState
                memoSelected = newSelected
                return newSelected
            }

            return () => memoSelector(store.get()) as GetStoreReturn<T>
        }, [selector])
        
        //const getSnapshot = () => (selectorInternal!(store.get()) as GetStoreReturn<T>)

        const state = useSyncExternalStore< GetStoreReturn<T> >(store.subscribe, getSnapshot)
        return state
    }
    function setStore(): SetStoreReturn {
        const store = useContext(StoreContext)
        if(!store) {
            throw new Error("You have to use useStore within the proper provider!")
        }
        return store.set
    }
    function checkContext():boolean {
        const store = useContext(StoreContext)
        console.log("check ", store != null)
        return store != null
    }

    return {
        Provider: StoreContextProvider,
        getStore: getStore,
        setStore: setStore,
        checkContext
    }
}
export default createFastContext
export type StoreType = Parameters<ReturnType<typeof createFastContext>["Provider"]>[0]["initialState"]