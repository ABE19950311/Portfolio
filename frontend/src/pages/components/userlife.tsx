import styled from "styled-components"
import {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"
import moment from "moment"
import Layout from "./layout"
import {FetchData} from "./fetchdata"

const SDiv = styled.div`
    
    margin:70px 0 0 80px;

    .kousinbtn {
        font-weight: 700;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        text-align: center;
        vertical-align: middle;
        text-decoration: none;
        border-radius: 0.5rem;
        border: 2px solid #27acd9;
        background: #27acd9;
        color: #fff;
    }

    .delbtn {
        font-weight: 700;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        text-align: center;
        vertical-align: middle;
        text-decoration: none;
        border-radius: 0.5rem;
        border: 2px solid #FF9933;
        background: #FF9933;
        color: #fff;
    }

    table {
    overflow-wrap:break-word;
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
        width:200px;
    }
    .thupdate {
        width:200px;
    }
    .tdtitle {
        width:450px;
    }
    .tdhead {
        width:250px;
    }
    .tdcreate {
        width:200px;
    }
    .tdupdate {
        width:200px;
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
    const {env,userid,loginstate,isLoading,isError} = FetchData()
    const [sessionid,setSessionid] = useState<number>()
    const [lifepost,setLifepost] = useState([])
    const [flag,setFlag] = useState("")
    const router = useRouter()
    const query = router.query.life as unknown as string

    useEffect(()=>{
        const id = Number(userid)
        setSessionid(id)
    },[userid])

    useEffect(()=>{
        if(!env) return
        axios.get(env+"/lifeposts")
        .then(res=>{
            setLifepost(res.data)
        }).catch(error=>{
            console.log(error)
        })
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[router,env,flag])

    if(isError) return <p>error</p>
    if(isLoading) return <p>lodaing...</p>

    const lifecontent = (id:number,user_id:number)=>{
        router.push({
            pathname:"/components/lifecontent",
            query:{id:id,user_id:user_id}
            })
    }

    const doDelete = (id:number)=>{
        axios.delete(env+`/lifeposts/${id}`)
        .then(res=>{
            setFlag(res.data)
        }).catch(error=>{
            console.log(error)
        })
    }

    const doUpdate = ()=>{
        router.push({
            pathname:"/components/lifepost",
            query:{flag:true}
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
        {lifepost.map((life:Life,key:number)=>{
            return (
                <table key={key}>
                    <tr>
                        <td onClick={()=>lifecontent(life.id,life.user_id)} className="tdtitle">{life.title}</td><td className="tdhead">{life.lifeitem}</td><td className="tdcreate">{moment(life.created_at).format("YYYY-MM-DD h:mm:ss")}</td><td className="tdupdate">{moment(life.updated_at).format("YYYY-MM-DD h:mm:ss")}</td>
                        {sessionid==life.user_id ? <><td><button onClick={doUpdate} className="kousinbtn">更新する</button></td><td><button className="delbtn" onClick={()=>doDelete(life.id)}>削除する</button></td></>:<></>}
                    </tr>
                </table>
            )
        })}
        
        </SDiv>
        </Layout>
    )
}

export default Userlife