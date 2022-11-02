import dynamic from "next/dynamic"
import {useMemo} from "react"

export const Mappage = ()=>{
    const Map = useMemo(()=>{
        return dynamic(()=> import("./components/map"),{
            loading: () => <p>A map is loading</p>,
            ssr: false,
        })
    },[])
    return <Map />;
}

export default Mappage
