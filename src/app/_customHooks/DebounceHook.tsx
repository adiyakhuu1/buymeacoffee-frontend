import { useEffect, useState } from "react"

export const useDebounce = (value:String, delay = 600) =>{
    const [debounce, setDebounce] = useState(value)

    useEffect(()=>{
    const timeout = setTimeout(() => {
        setDebounce(value);
    }, delay);

    return ()=> clearTimeout(timeout)
    },[value])

    return debounce
}