import styled from "styled-components"
import React, {useState,useEffect} from "react"
import axios from "../../setting-axios"
import {useRouter} from "next/router"
import moment from "moment"
import Layout from "./layout"
import {FetchData} from "../../components/fetchdata"
import ReactPaginate from 'react-paginate'
import { useMediaQuery } from "react-responsive"
import { MdSearch } from "react-icons/md"
import { FaRegLightbulb} from "react-icons/fa"
import Link from "next/link"

const PC = styled.div`
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
.notloginicon {
    font-size: 1.5rem;
}
.custominput {
    padding: 7px 100px 7px 10px;
    font-size: 16px;
    border-radius: 3px;
    border: 2px solid #ddd;
    box-sizing: border-box;
    margin-left:30vw;
}
.search {
    position: relative;
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

const Tablet = styled.div`
margin:70px 0 0 0;
overflow-wrap: break-word;

caption {
    text-align:left;
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
.notloginicon {
    font-size: 1.5rem;
}
select {
    padding:10px;
}
.custominput {
    padding: 7px 100px 7px 10px;
    font-size: 16px;
    border-radius: 3px;
    border: 2px solid #ddd;
    box-sizing: border-box;
    margin-left:10vw;
}
.search {
    position: relative;
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

const Mobile = styled.div`
margin:70px 0 0 0;
overflow-wrap: break-word;

caption {
    text-align:left;
}
.filter {
    margin:5px 0 5px 0;
}
.sankouicon {
    font-size: 1rem;
    cursor:pointer;
}
.seticoncolor {
    font-size: 1rem;
    cursor:pointer;
    color:#FFCC00;
}
.notloginicon {
    font-size: 1.5rem;
}
select {
    padding:10px;
}
.custominput {
    padding: 7px 80px 7px 10px;
    font-size: 16px;
    margin-left:50px;
    border-radius: 3px;
    border: 2px solid #ddd;
}
.search {
    position: relative;
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
    margin:5px 0 10px 120px;
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
    width:18vw;
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
    width:18vw;
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

type Iconflag = {
    [id:string]:boolean
}

type Iconcount = {
    [id:number]:number
}


export const Userlife = ()=>{
    const PCsize:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tabletsize:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})
    const {env,userid,isLoading,isError} = FetchData()
    const [sessionid,setSessionid] = useState<number>()
    const [lifepost,setLifepost] = useState([])
    const [flag,setFlag] = useState("")
    const [updateSortflag,setUpdateSortflag] = useState(false)
    const [filterlife,setFilterlife] = useState("")
    const [filtertitle,setFiltertitle] = useState("")
    const [titledata,setTitledata] = useState([])
    const [offset,setOffset] = useState(0)
    const perPage: number = 5
    const [postlength,setPostlength] = useState(0)
    const [currentpage,setCurrentpage] = useState(1)
    const [iconflag,setIconflag] = useState<Iconflag>({})
    const [iconcount,setIconcount] = useState<Iconcount>({})
    const [icondata,setIcondata] = useState<Icon[]>([])
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
            }else if(filterlife==="????????????????????????") {
                return value
            }
        })
        setPostlength(array.length)
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[filterlife,titledata])

    useEffect(()=>{
        let iconcount:any = {}
        icondata.forEach((value:Icon)=>{
            setIconflag((iconflag)=>({
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
        const find = icondata.find((value:Icon)=>value.lifepost_id===id&&value.user_id===sessionid)

        if(find) {
            axios.delete(`${env}/helpfuls/${find.id}`)
            .then(res=>{
                setFlag(res.data)
            }).catch(error=>{
                console.log(error)
            })
            setIconflag((iconflag)=>({
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
            setIconflag((iconflag)=>({
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

    const handlePageChange = (data:any) => {
    let page_number = data['selected']
    setOffset(page_number*perPage)
    setCurrentpage(page_number+1)
    }

    if(PCsize) {
    return (
        <Layout>
        <PC>
        <div className="search">
        <MdSearch className="searchicon"/><input placeholder="?????????????????????" onChange={dofiltertitle} value={filtertitle} className="custominput"/><button onClick={dosettitle} className="custombutton">??????????????????</button>
        </div>
        <table border={1}>
        <caption>????????????:{postlength}???</caption><caption>{postlength===0 ? 0:currentpage}/{Math.ceil(postlength/perPage)}?????????</caption>
        <caption>
        <select className="filter" onChange={dofilterlife}>
                    <option value="????????????????????????">????????????????????????</option>
                    <option value="none">none</option>
                    <option value="?????????????????????">?????????????????????</option>
                    <option value="????????????????????????">????????????????????????</option>
                    <option value="???????????????">???????????????</option>
                    <option value="??????">??????</option>
                    <option value="??????">??????</option>
                    <option value="??????">??????</option>
                </select>
        </caption>
            <tbody>
            <tr>
                <th className="thtitle">????????????</th><th className="thhead">??????</th>
                <th className={`update ${updateSortflag ? "updateasc":"updatedesc"}`} onClick={updateSortflag ? updateAsc:updateDesc}>?????????</th>
            </tr>
            </tbody>
        </table>

        {titledata.filter((value:Life,index,self)=>{
                if(value.lifeitem.includes(filterlife)) {
                    return value
                }else if(filterlife==="????????????????????????") {
                    return value
                }
            }).slice(offset,offset+perPage)
            .map((life:Life,key:number)=>{
            return (
                <table key={key}>
                    <tbody>
                    <tr>
                        <td className="tdtitle"><Link href={{pathname:"/components/lifecontent",query:{id:life.id,user_id:life.user_id}}}>{life.title}</Link></td><td className="tdhead">{life.lifeitem}</td><td className="tdupdate">{moment(life.updated_at).format("YYYY-MM-DD h:mm:ss")}</td>
                        <td><FaRegLightbulb  onClick={sessionid ? ()=>seticonflag(life.id):()=>""} className={sessionid ? iconflag[`${life.id}${sessionid}`] ? "seticoncolor":"sankouicon":"notloginicon"}/>{iconcount[life.id] ? iconcount[life.id]:0}</td>{sessionid==life.user_id ? <><td><Link href={{pathname:"/components/updatelife",query:{id:life.id,userid:life.user_id}}}><button className="kousinbtn">??????</button></Link></td><td><button className="delbtn" onClick={()=>doDelete(life.id)}>??????</button></td></>:<></>}
                    </tr>
                    </tbody>
                </table>
            )
        })}
        </PC>

        <PageContainer>
            <ReactPaginate
                pageCount={Math.ceil(postlength/perPage)} // ?????????????????????????????????????????????????????????????????????
                marginPagesDisplayed={4} // ?????????????????????????????????????????????????????????????????????????????????????????????
                pageRangeDisplayed={5} // ???????????????????????????????????????????????????????????????????????????????????????????????????
                onPageChange={handlePageChange} // ??????????????????function
                containerClassName="pagination justify-center" // ul(pagination??????)
                pageClassName="page-item" // li
                pageLinkClassName="page-link rounded-full" // a
                activeClassName="active" // active.li
                activeLinkClassName="active" // active.li < a

                // ?????????????????????
                previousClassName="page-item" // li
                nextClassName="page-item" // li
                previousLabel={'<'} // a
                previousLinkClassName="previous-link"
                nextLabel={'>'} // a
                nextLinkClassName="next-link"
                // ?????? or ?????????????????????????????????????????????(??????)????????????
                disabledClassName="disabled-button d-none"
                // ????????????????????????????????????
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
            />
            </PageContainer>
        </Layout>
    )
    }else if(Tabletsize) {
        return (
            <Layout>
            <Tablet>
            <div className="search">
            <MdSearch className="searchicon"/><input placeholder="?????????????????????" onChange={dofiltertitle} value={filtertitle} className="custominput"/><button onClick={dosettitle} className="custombutton">??????????????????</button>
            </div>
            <table border={1}>
            <caption>????????????:{postlength}???</caption><caption>{postlength===0 ? 0:currentpage}/{Math.ceil(postlength/perPage)}?????????</caption>
            <caption>
            <select className="filter" onChange={dofilterlife}>
                    <option value="????????????????????????">????????????????????????</option>
                    <option value="none">none</option>
                    <option value="?????????????????????">?????????????????????</option>
                    <option value="????????????????????????">????????????????????????</option>
                    <option value="???????????????">???????????????</option>
                    <option value="??????">??????</option>
                    <option value="??????">??????</option>
                    <option value="??????">??????</option>
                </select>
            </caption>
            <tbody>
            <tr>
                <th className="thtitle">????????????</th><th className="thhead">??????</th>
                <th className={`update ${updateSortflag ? "updateasc":"updatedesc"}`} onClick={updateSortflag ? updateAsc:updateDesc}>?????????</th>
            </tr>
            </tbody>
            </table>

            {titledata.filter((value:Life,index,self)=>{
                if(value.lifeitem.includes(filterlife)) {
                    return value
                }else if(filterlife==="????????????????????????") {
                    return value
                }
            }).slice(offset,offset+perPage)
            .map((life:Life,key:number)=>{
            return (
                <table key={key}>
                    <tbody>
                    <tr>
                    <td className="tdtitle"><Link href={{pathname:"/components/lifecontent",query:{id:life.id,user_id:life.user_id}}}>{life.title}</Link></td><td className="tdhead">{life.lifeitem}</td><td className="tdupdate">{moment(life.updated_at).format("YYYY-MM-DD h:mm:ss")}</td>
                    <td><FaRegLightbulb  onClick={sessionid ? ()=>seticonflag(life.id):()=>""} className={sessionid ? iconflag[`${life.id}${sessionid}`] ? "seticoncolor":"sankouicon":"notloginicon"}/>{iconcount[life.id] ? iconcount[life.id]:0}</td>{sessionid==life.user_id ? <><td><Link href={{pathname:"/components/updatelife",query:{id:life.id,userid:life.user_id}}}><button className="kousinbtn">??????</button></Link></td><td><button className="delbtn" onClick={()=>doDelete(life.id)}>??????</button></td></>:<></>}
                    </tr>
                    </tbody>
                </table>
                )
            })}
            </Tablet>

            <PageContainer>
                <ReactPaginate
                    pageCount={Math.ceil(postlength/perPage)} // ?????????????????????????????????????????????????????????????????????
                    marginPagesDisplayed={4} // ?????????????????????????????????????????????????????????????????????????????????????????????
                    pageRangeDisplayed={5} // ???????????????????????????????????????????????????????????????????????????????????????????????????
                    onPageChange={handlePageChange} // ??????????????????function
                    containerClassName="pagination justify-center" // ul(pagination??????)
                    pageClassName="page-item" // li
                    pageLinkClassName="page-link rounded-full" // a
                    activeClassName="active" // active.li
                    activeLinkClassName="active" // active.li < a

                    // ?????????????????????
                    previousClassName="page-item" // li
                    nextClassName="page-item" // li
                    previousLabel={'<'} // a
                    previousLinkClassName="previous-link"
                    nextLabel={'>'} // a
                    nextLinkClassName="next-link"
                    // ?????? or ?????????????????????????????????????????????(??????)????????????
                    disabledClassName="disabled-button d-none"
                    // ????????????????????????????????????
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
            <Mobile>
            <div className="search">
            <MdSearch className="searchicon"/><input placeholder="?????????????????????" onChange={dofiltertitle} value={filtertitle} className="custominput"/><button onClick={dosettitle} className="custombutton">??????????????????</button>
            </div>
            <table border={1}>
            <caption>????????????:{postlength}???</caption><caption>{postlength===0 ? 0:currentpage}/{Math.ceil(postlength/perPage)}?????????</caption>
            <caption>
            <select className="filter" onChange={dofilterlife}>
                    <option value="????????????????????????">????????????????????????</option>
                    <option value="none">none</option>
                    <option value="?????????????????????">?????????????????????</option>
                    <option value="????????????????????????">????????????????????????</option>
                    <option value="???????????????">???????????????</option>
                    <option value="??????">??????</option>
                    <option value="??????">??????</option>
                    <option value="??????">??????</option>
                </select>
            </caption>
            <tbody>
            <tr>
                <th className="thtitle">????????????</th><th className="thhead">??????</th>
                <th className={`update ${updateSortflag ? "updateasc":"updatedesc"}`} onClick={updateSortflag ? updateAsc:updateDesc}>?????????</th>
            </tr>
            </tbody>
            </table>

            {titledata.filter((value:Life,index,self)=>{
                if(value.lifeitem.includes(filterlife)) {
                    return value
                }else if(filterlife==="????????????????????????") {
                    return value
                }
            }).slice(offset,offset+perPage)
            .map((life:Life,key:number)=>{
            return (
                <table key={key}>
                    <tbody>
                    <tr>
                    <td className="tdtitle"><Link href={{pathname:"/components/lifecontent",query:{id:life.id,user_id:life.user_id}}}>{life.title}</Link></td><td className="tdhead">{life.lifeitem}</td><td className="tdupdate">{moment(life.updated_at).format("YYYY-MM-DD h:mm:ss")}</td>
                    <td><FaRegLightbulb  onClick={sessionid ? ()=>seticonflag(life.id):()=>""} className={sessionid ? iconflag[`${life.id}${sessionid}`] ? "seticoncolor":"sankouicon":"notloginicon"}/>{iconcount[life.id] ? iconcount[life.id]:0}</td>{sessionid==life.user_id ? <><td><Link href={{pathname:"/components/updatelife",query:{id:life.id,userid:life.user_id}}}><button className="kousinbtn">??????</button></Link></td><td><button className="delbtn" onClick={()=>doDelete(life.id)}>??????</button></td></>:<></>}
                    </tr>
                    </tbody>
                </table>
                )
            })}
            </Mobile>

            <PageContainer>
                <ReactPaginate
                    pageCount={Math.ceil(postlength/perPage)} // ?????????????????????????????????????????????????????????????????????
                    marginPagesDisplayed={4} // ?????????????????????????????????????????????????????????????????????????????????????????????
                    pageRangeDisplayed={5} // ???????????????????????????????????????????????????????????????????????????????????????????????????
                    onPageChange={handlePageChange} // ??????????????????function
                    containerClassName="pagination justify-center" // ul(pagination??????)
                    pageClassName="page-item" // li
                    pageLinkClassName="page-link rounded-full" // a
                    activeClassName="active" // active.li
                    activeLinkClassName="active" // active.li < a

                    // ?????????????????????
                    previousClassName="page-item" // li
                    nextClassName="page-item" // li
                    previousLabel={'<'} // a
                    previousLinkClassName="previous-link"
                    nextLabel={'>'} // a
                    nextLinkClassName="next-link"
                    // ?????? or ?????????????????????????????????????????????(??????)????????????
                    disabledClassName="disabled-button d-none"
                    // ????????????????????????????????????
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