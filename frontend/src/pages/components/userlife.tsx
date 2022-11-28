import styled from "styled-components"
import React, {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"
import moment from "moment"
import Layout from "./layout"
import {FetchData} from "../../components/fetchdata"
import ReactPaginate from 'react-paginate'; 
import { useMediaQuery } from "react-responsive"
import { MdSearch } from "react-icons/md";
import { FaRegLightbulb} from "react-icons/fa";

const PCDiv = styled.div`
    
    margin:70px 0 0 80px;
    overflow-wrap: break-word;

    caption {
        text-align:left;
    }

    select {
        padding:10px;
    }

    .filter {
        margin-left:30vw;
        margin-bottom:5px;
    }

    .sankouicon {
        font-size: 1.5rem;
        cursor:pointer;
    }

    .seticoncolor {
        font-size: 1.5rem;
        cursor:pointer;
        color:#FFCC00;
    }

    .custominput {
        padding: 7px 100px 7px 10px;
        font-size: 16px;
        border-radius: 3px; /*ボックス角の丸み*/
        border: 2px solid #ddd; /*枠線*/
        box-sizing: border-box;
        margin-left:30vw;
    }

    .searchicon {
        position: absolute;
        color: #333;
        font-size: 2rem;
        transform: translate(245px,3px);
        margin-left:30vw;
    }

    .custombutton {
        padding: 3px 5px;
    }

    .kousinbtn {
        font-size:1.5vw;
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
        font-size:1.5vw;
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
    background: #FFCC66;
    border: solid 1px #666666;
    color: #222222;
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
        width:30vw;
    }
    .thhead {
        width:14vw;
    }
    .none {
        width:7.5vw;
    }
    .tdtitle {
        font-size:1.7vw;
        width:30vw;
    }
    .tdhead {
        font-size:1.5vw;
        width:14vw;
    }
    .tdcreate {
        font-size:1.2vw;
        width:15vw;
    }
    .tdupdate {
        font-size:1.2vw;
        width:15vw;
    }

    .create {
        width:15vw;
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
        width:15vw;
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

    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
        gap: 20px 6px;
    }
    
    
    .page-item,
    .page-link {
        display: inline-flex;
        align-items: center;
        border-radius: 30px;
        justify-content: center;
        font-weight: 700;
        font-size: 16px;
        height: 40px;
        width: 40px;
    }
`

const TabDiv = styled.div`
    
    margin:70px 0 0 0;
    overflow-wrap: break-word;

    caption {
        text-align:left;
    }
    .filter {
        margin-left:30vw;
        margin-bottom:5px;
    }
    select {
        padding:10px;
    }

    .custominput {
        padding: 7px 100px 7px 10px;
        font-size: 16px;
        border-radius: 3px; /*ボックス角の丸み*/
        border: 2px solid #ddd; /*枠線*/
        box-sizing: border-box;
        margin-left:10vw;
    }

    .searchicon {
        position: absolute;
        color: #333;
        font-size: 2rem;
        transform: translate(245px,3px);
        margin-left:10vw;
    }

    .custombutton {
        padding: 3px 5px;
    }

    .kousinbtn {
        font-size:1.5vw;
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
        font-size:1.5vw;
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
    background: #FFCC66;
    border: solid 1px #666666;
    color: #222222;
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
        width:30vw;
    }
    .thhead {
        width:14vw;
    }
    .none {
        width:7.5vw;
    }
    .tdtitle {
        font-size:1.7vw;
        width:30vw;
    }
    .tdhead {
        font-size:1.5vw;
        width:14vw;
    }
    .tdcreate {
        font-size:1.2vw;
        width:15vw;
    }
    .tdupdate {
        font-size:1.2vw;
        width:15vw;
    }

    .create {
        width:15vw;
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
        width:15vw;
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

    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
        gap: 20px 6px;
    }
    
    
    .page-item,
    .page-link {
        display: inline-flex;
        align-items: center;
        border-radius: 30px;
        justify-content: center;
        font-weight: 700;
        font-size: 16px;
        height: 40px;
        width: 40px;
    }
`

const MobDiv = styled.div`
    
    margin:70px 0 0 0;
    overflow-wrap: break-word;

    caption {
        text-align:left;
    }
    .filter {
        margin-bottom:5px;
    }
    select {
        padding:10px;
    }

    .custominput {
        padding: 7px 100px 7px 10px;
        font-size: 16px;
        border-radius: 3px; /*ボックス角の丸み*/
        border: 2px solid #ddd; /*枠線*/
        box-sizing: border-box;
        margin-left:10vw;
    }

    .searchicon {
        position: absolute;
        color: #333;
        font-size: 2rem;
        transform: translate(245px,3px);
        margin-left:10vw;
    }

    .custombutton {
        padding: 3px 5px;
    }

    .kousinbtn {
        font-size:1.5vw;
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
        font-size:1.5vw;
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
    background: #FFCC66;
    border: solid 1px #666666;
    color: #222222;
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
        font-size:2.5vw;
        width:30vw;
    }
    .thhead {
        font-size:2.5vw;
        width:14vw;
    }
    .none {
        width:7.5vw;
    }
    .tdtitle {
        font-size:2.5vw;
        width:30vw;
    }
    .tdhead {
        font-size:2vw;
        width:14vw;
    }
    .tdcreate {
        font-size:1.2vw;
        width:15vw;
    }
    .tdupdate {
        font-size:1.2vw;
        width:15vw;
    }

    .create {
        width:15vw;
        font-size:2.5vw;
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
        width:15vw;
        font-size:2.5vw;
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

    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
        gap: 20px 6px;
    }
    
    
    .page-item,
    .page-link {
        display: inline-flex;
        align-items: center;
        border-radius: 30px;
        justify-content: center;
        font-weight: 700;
        font-size: 16px;
        height: 40px;
        width: 40px;
    }
`




const PageContainer = styled.div`
margin: 24px 0;
& ul {
    display: flex;
    justify-content: center;
    font-size: 14px;
}
& li {
    list-style-type: none;
    margin: 0 4px;
    cursor: pointer;
    transition: opacity 0.2s ease;
    &:hover {
    opacity: 0.6;
    }
}
& .previous a, .next a {
    display: block;
    margin-top: 15px;
    width: 16px;
    height: 16px;
    text-indent: -1000px;
    transform: rotate(45deg);
    overflow: hidden;
}
& .previous a {
    border-left: 1px solid #39c;
    border-bottom: 1px solid #39c;
}
& .next a {
    border-top: 1px solid #39c;
    border-right: 1px solid #39c;
}
& li.selected {
    pointer-events: none;
}
& li.selected a {
    background-color: #39c !important;
    color: #fff !important;
}
& li:not(.previous,.next) a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border: 1px solid #39c;
    color: #39c;
}
& li.break a {
    border: none;
}
.disabled {
    opacity: 0.2;
    pointer-events: none;
}
@media (max-width: 600px) {
    & .previous a, .next a {
    margin-top: 13px;
    width: 8px;
    height: 8px;
    }
    & li:not(.previous,.next) a {
    width: 32px;
    height: 32px;
    }
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

type Icon = {
    id:number,
    user_id:number,
    lifepost_id:number
}


export const Userlife = ()=>{
    const PC:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tablet:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})
    const Mobile:boolean = useMediaQuery({query: '(max-width: 519px)'})
    const {env,userid,loginstate,isLoading,isError} = FetchData()
    const [sessionid,setSessionid] = useState<number>()
    const [lifepost,setLifepost] = useState([])
    const [flag,setFlag] = useState("")
    const [updateSortflag,setUpdateSortflag] = useState(false)
    const [filterlife,setFilterlife] = useState("")
    const [filtertitle,setFiltertitle] = useState("")
    const [titledata,setTitledata] = useState([])
    const [offset,setOffset] = useState(0); // 何番目のアイテムから表示するか
    const perPage: number = 5; // 1ページあたりに表示したいアイテムの数
    const [postlength,setPostlength] = useState(0)
    const [currentpage,setCurrentpage] = useState(1)
    const [iconflag,setIconflag] = useState<any>({})
    const [iconcount,setIconcount] = useState<any>({})
    const [icondata,setIcondata] = useState([])
    const router = useRouter()
    const query = router.query.life as unknown as string


    useEffect(()=>{
        const id = Number(userid)
        setSessionid(id)
        setTitledata(lifepost)
        setPostlength(lifepost.length)
    },[userid,lifepost])

    useEffect(()=>{
        if(!env) return
        axios.get(env+"/lifeposts")
        .then(res=>{
            setLifepost(res.data)
        }).catch(error=>{
            console.log(error)
        })

        axios.get(env+"/helpfuls")
        .then(res=>{
            setIcondata(res.data)
        }).catch(error=>{
            console.log(error)
        })
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[env,flag,query])

    useEffect(()=>{
        let array = titledata.filter((value:Life)=>{
            if(value.lifeitem.includes(filterlife)) {
                return value
            }else if(filterlife==="項目でフィルター") {
                return value
            }
        })
        setPostlength(array.length)
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[filterlife,titledata])

    useEffect(()=>{
        let iconcount:any = {}
        icondata.forEach((value:Icon)=>{
            setIconflag((iconflag:any)=>({
                ...iconflag,
                [`${value.lifepost_id}${value.user_id}`]:true
            }))
        })

        for(let i=0;i<icondata.length;i++) {
            let data:Icon = icondata[i]
            iconcount[data.lifepost_id] = iconcount[data.lifepost_id] ? iconcount[data.lifepost_id]+1:1
        }
        
        setIconcount(iconcount)
    },[icondata])

    if(isError) return <p>error</p>
    if(isLoading) return <p>lodaing...</p>

    console.log(icondata)
    console.log(iconcount)

    const lifecontent = (id:number,user_id:number)=>{
        router.push({
            pathname:"/components/lifecontent",
            query:{id:id,user_id:user_id}
            })
    }

    const dofilterlife = (event:React.ChangeEvent<HTMLSelectElement>)=>{
        setFilterlife(event.target.value)
    }

    const dofiltertitle = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setFiltertitle(event.target.value)
    }

    const dosettitle = ()=>{
        let title = lifepost.filter((value:Life)=>value.title.includes(filtertitle))
        setTitledata(title)
        setFiltertitle("")
    }

    const updateAsc = ()=>{
        titledata.sort((a:Life,b:Life)=>{
            if(a.updated_at<b.updated_at) return -1
            if(a.updated_at>b.updated_at) return 1
            return 0
        })
        setUpdateSortflag(false)
    }

    const updateDesc = ()=>{
        titledata.sort((a:Life,b:Life)=>{
            if(a.updated_at>b.updated_at) return -1
            if(a.updated_at<b.updated_at) return 1
            return 0
        })
        setUpdateSortflag(true)
    }

    const seticonflag = (id:number)=>{
        const find:any = icondata.find((value:Icon)=>value.lifepost_id===id&&value.user_id===sessionid)

        if(find) {
            axios.delete(`${env}/helpfuls/${find.id}`)
            .then(res=>{
                setFlag(res.data)
            }).catch(error=>{
                console.log(error)
            })
            setIconflag((iconflag:any)=>({
                ...iconflag,
                [`${id}${sessionid}`]:false
            }))
        }else {
            axios.post(env+"/helpfuls",
            {
                helpfuls: {
                    user_id:userid,
                    lifepost_id:id
                }
            }).then(res=>{
                setFlag(res.data)
            }).catch(error=>{
                console.log(error)
            })
            setIconflag((iconflag:any)=>({
                ...iconflag,
                [`${id}${sessionid}`]:true
            }))
        }
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

     // クリック時のfunction
    const handlePageChange = (data:any) => {
    let page_number = data['selected']; // クリックした部分のページ数が{selected: 2}のような形で返ってくる
    setOffset(page_number*perPage); // offsetを変更し、表示開始するアイテムの番号を変更
    setCurrentpage(page_number+1)
    }

    if(PC) {
    return (
        <Layout>
        <PCDiv>
        <MdSearch className="searchicon"/><input placeholder="タイトルを入力" onChange={dofiltertitle} value={filtertitle} className="custominput"/><button onClick={dosettitle} className="custombutton">タイトル検索</button>
        <table border={1}>
        <caption>投稿件数:{postlength}件</caption><caption>{postlength===0 ? 0:currentpage}/{Math.ceil(postlength/perPage)}ページ</caption>
        <caption>
        <select className="filter" onChange={dofilterlife}>
                    <option value="項目でフィルター">項目でフィルター</option>
                    <option value="none">none</option>
                    <option value="部屋探し・入居">部屋探し・入居</option>
                    <option value="入居前後の手続き">入居前後の手続き</option>
                    <option value="防犯・防災">防犯・防災</option>
                    <option value="掃除">掃除</option>
                    <option value="料理">料理</option>
                    <option value="洗濯">洗濯</option>
                </select>
        </caption>
            <tbody>
            <tr>
                <th className="thtitle">タイトル</th><th className="thhead">項目</th>
                <th className={`update ${updateSortflag ? "updateasc":"updatedesc"}`} onClick={updateSortflag ? updateAsc:updateDesc}>作成日</th>
            </tr>
            </tbody>
        </table>

        {titledata.filter((value:Life,index,self)=>{
                if(value.lifeitem.includes(filterlife)) {
                    return value
                }else if(filterlife==="項目でフィルター") {
                    return value
                }
            }).slice(offset,offset+perPage)
            .map((life:Life,key:number)=>{
            return (
                <table key={key}>
                    <tbody>
                    <tr>
                        <td onClick={()=>lifecontent(life.id,life.user_id)} className="tdtitle">{life.title}</td><td className="tdhead">{life.lifeitem}</td><td className="tdupdate">{moment(life.updated_at).format("YYYY-MM-DD h:mm:ss")}</td>
                        <td><FaRegLightbulb onClick={()=>seticonflag(life.id)} className={iconflag[`${life.id}${sessionid}`] ? "seticoncolor":"sankouicon"}/>{iconcount[life.id] ? iconcount[life.id]:0}</td>{sessionid==life.user_id ? <><td><button onClick={()=>doUpdate(life.id,life.user_id)} className="kousinbtn">更新</button></td><td><button className="delbtn" onClick={()=>doDelete(life.id)}>削除</button></td></>:<></>}
                    </tr>
                    </tbody>
                </table>
            )
        })}
        </PCDiv>

        <PageContainer>
            <ReactPaginate
                pageCount={Math.ceil(postlength/perPage)} // 全部のページ数。端数の場合も考えて切り上げに。
                marginPagesDisplayed={4} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
                pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
                onPageChange={handlePageChange} // クリック時のfunction
                containerClassName="pagination justify-center" // ul(pagination本体)
                pageClassName="page-item" // li
                pageLinkClassName="page-link rounded-full" // a
                activeClassName="active" // active.li
                activeLinkClassName="active" // active.li < a
                
                // 戻る・進む関連
                previousClassName="page-item" // li
                nextClassName="page-item" // li
                previousLabel={'<'} // a
                previousLinkClassName="previous-link"
                nextLabel={'>'} // a
                nextLinkClassName="next-link"
                // 先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくする
                disabledClassName="disabled-button d-none"
                // 中間ページの省略表記関連
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
            />
            </PageContainer>
        </Layout>
    )
    }else if(Tablet) {
        return (
            <Layout>
            <TabDiv>
            <MdSearch className="searchicon"/><input placeholder="タイトルを入力" onChange={dofiltertitle} value={filtertitle} className="custominput"/><button onClick={dosettitle} className="custombutton">タイトル検索</button>
            <table border={1}>
            <caption>投稿件数:{postlength}件</caption><caption>{postlength===0 ? 0:currentpage}/{Math.ceil(postlength/perPage)}ページ</caption>
            <caption>
            <select className="filter" onChange={dofilterlife}>
                    <option value="項目でフィルター">項目でフィルター</option>
                    <option value="none">none</option>
                    <option value="部屋探し・入居">部屋探し・入居</option>
                    <option value="入居前後の手続き">入居前後の手続き</option>
                    <option value="防犯・防災">防犯・防災</option>
                    <option value="掃除">掃除</option>
                    <option value="料理">料理</option>
                    <option value="洗濯">洗濯</option>
                </select>
            </caption>
            <tbody>
            <tr>
                <th className="thtitle">タイトル</th><th className="thhead">項目</th>
                <th className={`update ${updateSortflag ? "updateasc":"updatedesc"}`} onClick={updateSortflag ? updateAsc:updateDesc}>作成日</th>
            </tr>
            </tbody>
            </table>
    
            {titledata.filter((value:Life,index,self)=>{
                if(value.lifeitem.includes(filterlife)) {
                    return value
                }else if(filterlife==="項目でフィルター") {
                    return value
                }
            }).slice(offset,offset+perPage)
            .map((life:Life,key:number)=>{
            return (
                <table key={key}>
                    <tbody>
                    <tr>
                        <td onClick={()=>lifecontent(life.id,life.user_id)} className="tdtitle">{life.title}</td><td className="tdhead">{life.lifeitem}</td><td className="tdupdate">{moment(life.updated_at).format("YYYY-MM-DD h:mm:ss")}</td>
                        {sessionid==life.user_id ? <><td><button onClick={()=>doUpdate(life.id,life.user_id)} className="kousinbtn">更新</button></td><td><button className="delbtn" onClick={()=>doDelete(life.id)}>削除</button></td></>:<></>}
                    </tr>
                    </tbody>
                </table>
                )
            })}
            </TabDiv>
    
            <PageContainer>
                <ReactPaginate
                    pageCount={Math.ceil(postlength/perPage)} // 全部のページ数。端数の場合も考えて切り上げに。
                    marginPagesDisplayed={4} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
                    pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
                    onPageChange={handlePageChange} // クリック時のfunction
                    containerClassName="pagination justify-center" // ul(pagination本体)
                    pageClassName="page-item" // li
                    pageLinkClassName="page-link rounded-full" // a
                    activeClassName="active" // active.li
                    activeLinkClassName="active" // active.li < a
                    
                    // 戻る・進む関連
                    previousClassName="page-item" // li
                    nextClassName="page-item" // li
                    previousLabel={'<'} // a
                    previousLinkClassName="previous-link"
                    nextLabel={'>'} // a
                    nextLinkClassName="next-link"
                    // 先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくする
                    disabledClassName="disabled-button d-none"
                    // 中間ページの省略表記関連
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                />
                </PageContainer>
            </Layout>
        )
    }else {
        return (
            <Layout>
            <MobDiv>
            <MdSearch className="searchicon"/><input placeholder="タイトルを入力" onChange={dofiltertitle} value={filtertitle} className="custominput"/><button onClick={dosettitle} className="custombutton">タイトル検索</button>
            <table border={1}>
            <caption>投稿件数:{postlength}件</caption><caption>{postlength===0 ? 0:currentpage}/{Math.ceil(postlength/perPage)}ページ</caption>
            <caption>
            <select className="filter" onChange={dofilterlife}>
                    <option value="項目でフィルター">項目でフィルター</option>
                    <option value="none">none</option>
                    <option value="部屋探し・入居">部屋探し・入居</option>
                    <option value="入居前後の手続き">入居前後の手続き</option>
                    <option value="防犯・防災">防犯・防災</option>
                    <option value="掃除">掃除</option>
                    <option value="料理">料理</option>
                    <option value="洗濯">洗濯</option>
                </select>
            </caption>
            <tbody>
            <tr>
                <th className="thtitle">タイトル</th><th className="thhead">項目</th>
                <th className={`update ${updateSortflag ? "updateasc":"updatedesc"}`} onClick={updateSortflag ? updateAsc:updateDesc}>作成日</th>
            </tr>
            </tbody>
            </table>
    
            {titledata.filter((value:Life,index,self)=>{
                if(value.lifeitem.includes(filterlife)) {
                    return value
                }else if(filterlife==="項目でフィルター") {
                    return value
                }
            }).slice(offset,offset+perPage)
            .map((life:Life,key:number)=>{
            return (
                <table key={key}>
                    <tbody>
                    <tr>
                        <td onClick={()=>lifecontent(life.id,life.user_id)} className="tdtitle">{life.title}</td><td className="tdhead">{life.lifeitem}</td><td className="tdupdate">{moment(life.updated_at).format("YYYY-MM-DD h:mm:ss")}</td>
                        {sessionid==life.user_id ? <><td><button onClick={()=>doUpdate(life.id,life.user_id)} className="kousinbtn">更新</button></td><td><button className="delbtn" onClick={()=>doDelete(life.id)}>削除</button></td></>:<></>}
                    </tr>
                    </tbody>
                </table>
                )
            })}
            </MobDiv>
    
            <PageContainer>
                <ReactPaginate
                    pageCount={Math.ceil(postlength/perPage)} // 全部のページ数。端数の場合も考えて切り上げに。
                    marginPagesDisplayed={4} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
                    pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
                    onPageChange={handlePageChange} // クリック時のfunction
                    containerClassName="pagination justify-center" // ul(pagination本体)
                    pageClassName="page-item" // li
                    pageLinkClassName="page-link rounded-full" // a
                    activeClassName="active" // active.li
                    activeLinkClassName="active" // active.li < a
                    
                    // 戻る・進む関連
                    previousClassName="page-item" // li
                    nextClassName="page-item" // li
                    previousLabel={'<'} // a
                    previousLinkClassName="previous-link"
                    nextLabel={'>'} // a
                    nextLinkClassName="next-link"
                    // 先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくする
                    disabledClassName="disabled-button d-none"
                    // 中間ページの省略表記関連
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                />
                </PageContainer>
            </Layout>
        )
    }
}

export default Userlife