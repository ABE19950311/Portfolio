import {useState,useEffect} from "react"
import axios from "../csrf-axios"


export const FetchData = ()=>{
    const [env,setEnv] = useState("")
    const [error,setError] = useState("")
    const [userid,setUserid] = useState("")
    const [loginstate,setLoginstate] = useState("")
    console.log(process.env.NEXT_PUBLIC_PRODUCTION_ADDRESS)


    useEffect(()=>{
        if(process.env.NEXT_PUBLIC_ADDRESS!==undefined) {
            setEnv(process.env.NEXT_PUBLIC_ADDRESS as string)
            axios.get(process.env.NEXT_PUBLIC_ADDRESS+"/sessionid")
            .then(res=>{
                axios.defaults.headers.common['X-CSRF-Token'] = res.headers['x-csrf-token'];
                setUserid(res.data.id)
                setLoginstate(res.data.state)
            }).catch(error=>{
                setError(error)
            })
        }else{
            setEnv(process.env.NEXT_PUBLIC_PRODUCTION_ADDRESS as string)
            axios.get(process.env.NEXT_PUBLIC_PRODUCTION_ADDRESS+"/sessionid")
            .then(res=>{
                axios.defaults.headers.common['X-CSRF-Token'] = res.headers['x-csrf-token'];
                setUserid(res.data.id)
                setLoginstate(res.data.state)
            }).catch(error=>{
                setError(error)
            })
        }
    },[])


    return {
        env: env,
        loginstate: loginstate,
        userid: userid ? userid:"",
        isLoading: !error && !env && !loginstate && !userid,
        isError: error
    }
}

export default FetchData