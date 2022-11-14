import styled from "styled-components"
import React, {useState,useEffect,useRef, Fragment} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"
import {Header} from "./header"
import moment from "moment"
import Layout from "./layout"

const SDiv = styled.div`

`

export const Userlife = ()=>{
    const [lifepost,setLifepost] = useState([])
    const router = useRouter()
    const query = router.query.life as unknown as string
    const getenv = router.query.state as unknown as string

    useEffect(()=>{
        axios.get(getenv+"/lifeposts")
        .then(res=>{
            setLifepost(res.data)
        }).catch(error=>{
            console.log(error)
        })
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[router,query])

    console.log(lifepost)

    return (
        <Layout>
        <SDiv>
        {query==="lifepost" ?<h1>投稿できました！！！！！</h1>:<></>}
        <h1>kouzinoww</h1>
        </SDiv>
        </Layout>
    )
}

export default Userlife