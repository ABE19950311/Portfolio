import styled from "styled-components"
import {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"
import moment from "moment"
import Layout from "./layout"
import {FetchData} from "./fetchdata"

const SDiv = styled.div`
    
    margin:70px 0 0 80px;
    overflow-wrap: break-word;

    caption {
        text-align:left;
    }

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

    .create {
        width:200px;
        cursor: pointer;
        position: relative;
    }
    
    .create::before, .create::after {
        content: "";
        height: 0;
        width: 0;
        position: absolute;
        border: 5px solid transparent;
        right: 10px;
        top: 50%;
    }
    
    .create::before {
        border-bottom-color: #aaa;
        margin-top: -10px;
    }
    
    .create::after {
        border-top-color: #aaa;
        margin-top: 2px;
    }
    
    .update {
        width:200px;
        cursor: pointer;
        position: relative;
    }
    
    .update::before, .update::after {
        content: "";
        height: 0;
        width: 0;
        position: absolute;
        border: 5px solid transparent;
        right: 10px;
        top: 50%;
    }
    
    .update::before {
        border-bottom-color: #aaa;
        margin-top: -10px;
    }
    
    .update::after {
        border-top-color: #aaa;
        margin-top: 2px;
    }
    
    .createdesc::before {
        border-bottom-color: #444;
    }
    .createasc::after {
        border-top-color: #444;
    }
    
    .updatedesc::before {
        border-bottom-color: #444;
    }
    .updateasc::after {
        border-top-color: #444;
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
    const [createSortflag,setCreateSortflag] = useState(false)
    const [updateSortflag,setUpdateSortflag] = useState(false)
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

    const createAsc = ()=>{
        lifepost.sort((a:Life,b:Life)=>{
            if(a.created_at<b.created_at) return -1
            if(a.created_at>b.created_at) return 1
            return 0
        })
        setCreateSortflag(false)
    }

    const createDesc = ()=>{
        lifepost.sort((a:Life,b:Life)=>{
            if(a.created_at>b.created_at) return -1
            if(a.created_at<b.created_at) return 1
            return 0
        })
        setCreateSortflag(true)
    }

    const updateAsc = ()=>{
        lifepost.sort((a:Life,b:Life)=>{
            if(a.updated_at<b.updated_at) return -1
            if(a.updated_at>b.updated_at) return 1
            return 0
        })
        setUpdateSortflag(false)
    }

    const updateDesc = ()=>{
        lifepost.sort((a:Life,b:Life)=>{
            if(a.updated_at>b.updated_at) return -1
            if(a.updated_at<b.updated_at) return 1
            return 0
        })
        setUpdateSortflag(true)
    }

    const doDelete = (id:number)=>{
        axios.delete(env+`/lifeposts/${id}`)
        .then(res=>{
            setFlag(res.data)
        }).catch(error=>{
            console.log(error)
        })
    }

    const doUpdate = (id:number,userid:number)=>{
        router.push({
            pathname:"/components/updatelife",
            query:{id:id,userid:userid}
            })
    }

    return (
        <Layout>
        <SDiv>
        {query==="lifepost" ?<h1>投稿できました！！！！！</h1>:query==="updatepost" ? <h1>更新しました！！</h1>:<></>}

        <table border={1}>
        <caption>投稿件数:{lifepost.length}件</caption>
            <tr>
                <th className="thtitle">タイトル</th><th className="thhead">項目</th>
                <th className={`create ${createSortflag ? "createasc":"createdesc"}`} onClick={createSortflag ? createAsc:createDesc}>作成日</th>
                <th className={`update ${updateSortflag ? "updateasc":"updatedesc"}`} onClick={updateSortflag ? updateAsc:updateDesc}>更新日</th>
            </tr>
        </table>
        {lifepost.map((life:Life,key:number)=>{
            return (
                <table key={key}>
                    <tr>
                        <td onClick={()=>lifecontent(life.id,life.user_id)} className="tdtitle">{life.title}</td><td className="tdhead">{life.lifeitem}</td><td className="tdcreate">{moment(life.created_at).format("YYYY-MM-DD h:mm:ss")}</td><td className="tdupdate">{moment(life.updated_at).format("YYYY-MM-DD h:mm:ss")}</td>
                        {sessionid==life.user_id ? <><td><button onClick={()=>doUpdate(life.id,life.user_id)} className="kousinbtn">更新する</button></td><td><button className="delbtn" onClick={()=>doDelete(life.id)}>削除する</button></td></>:<></>}
                    </tr>
                </table>
            )
        })}
        
        </SDiv>
        </Layout>
    )
}

export default Userlife