import { useState, useMemo, useEffect} from "react"
import { debounce } from "es-toolkit"

const useScreenSize = (debounceTime=25) => {
    const [size, setSize]= useState({height: window.innerHeight, width: window.innerWidth})


    const handleResize = ()=> {
        setSize({height: window.innerHeight, width: window.innerWidth})
    }
    const handleResizeDebounced = useMemo(() => 
        debounce(handleResize, debounceTime)
    , [debounceTime] )

	useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
		window.addEventListener("resize", handleResizeDebounced, {capture: true, signal})
		return function cleanup() {
			controller.abort()
		}
	}, [handleResizeDebounced])
    return size
}

export default useScreenSize