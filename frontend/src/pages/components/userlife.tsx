import styled from "styled-components"
import React, {useState,useEffect,useRef, Fragment} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"
import {Header} from "./header"
import moment from "moment"
import Layout from "./layout"

const SDiv = styled.div`

`

type Life = {
    id:number,
    user_id:number,
    title:string,
    lifeitem:string,
    headline:string,
    created_at:Date,
    updated_at:Date,
    content:string[],
    detail:string[],
    checkcontent:string[]
}

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
    },[router,getenv])

    console.log(lifepost)

    return (
        <Layout>
        <SDiv>
        {query==="lifepost" ?<h1>投稿できました！！！！！</h1>:<></>}

        <table border={1}>
            <tr>
                <th>タイトル</th><th>項目</th><th>作成日</th><th>更新日</th>
            </tr>
        </table>
        {lifepost.map((life:Life)=>{
            return (
                <>
                <table>
                    <tr>
                        <td>{life.title}</td><td>{life.lifeitem}</td><td>{moment(life.created_at).format("YYYY-MM-DD h:mm:ss")}</td><td>{moment(life.updated_at).format("YYYY-MM-DD h:mm:ss")}</td>
                    </tr>
                </table>
                </>
            )
        })}
        
        </SDiv>
        </Layout>
    )
}

export default Userlife