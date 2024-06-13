import { useState, useMemo, useEffect} from "react"
import { debounce } from "lodash"

const useScreenSize = (debounceTime=25) => {
    const [size, setSize]= useState({height: window.innerHeight, width: window.innerWidth})


    const handleResize = ()=> {
        setSize({height: window.innerHeight, width: window.innerWidth})
    }
    const handleResizeDebounced = useMemo(() => 
        debounce(handleResize, debounceTime)
    , [debounceTime] )

	useEffect(() => {
		window.addEventListener("resize", handleResizeDebounced, true)
		return function cleanup() {
			window.removeEventListener("resize", handleResizeDebounced, true)
		}
	}, [handleResizeDebounced])
    return size
}

export default useScreenSize