import styled from "styled-components"
import React, {useState,useEffect,useRef, Fragment} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"
import {Header} from "./header"
import moment from "moment"
import Layout from "./layout"

const SDiv = styled.div`
    
    margin:70px 0 0 80px;

    table {
    text-align:center;
    border-collapse: collapse;
    border-spacing: 0;
    }
    th {
    padding: 10px;
    background: #778ca3;
    border: solid 1px #666666;
    color: #ffffff;
    }
    td {
    padding: 10px;
    border: solid 1px #666666;
    }
    td:first-child {
    cursor:pointer;
    color:blue;
    text-decoration : underline;
    background: #e9faf9;
    }
    .thtitle {
        width:450px;
    }
    .thhead {
        width:250px;
    }
    .thcreate {
        width:250px;
    }
    .thupdate {
        width:250px;
    }
    .tdtitle {
        width:450px;
    }
    .tdhead {
        width:250px;
    }
    .tdcreate {
        width:250px;
    }
    .tdupdate {
        width:250px;
    }
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

    const lifecontent = (id:number,user_id:number)=>{
        router.push({
            pathname:"/components/lifecontent",
            query:{id:id,user_id:user_id,env:getenv}
            })
    }

    return (
        <Layout>
        <SDiv>
        {query==="lifepost" ?<h1>投稿できました！！！！！</h1>:<></>}

        <table border={1}>
            <tr>
                <th className="thtitle">タイトル</th><th className="thhead">項目</th><th className="thcreate">作成日</th><th className="thupdate">更新日</th>
            </tr>
        </table>
        {lifepost.map((life:Life)=>{
            return (
                <>
                <table>
                    <tr>
                        <td onClick={()=>lifecontent(life.id,life.user_id)} className="tdtitle">{life.title}</td><td className="tdhead">{life.lifeitem}</td><td className="tdcreate">{moment(life.created_at).format("YYYY-MM-DD h:mm:ss")}</td><td className="tdupdate">{moment(life.updated_at).format("YYYY-MM-DD h:mm:ss")}</td>
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