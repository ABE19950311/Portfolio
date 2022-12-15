import styled from "styled-components"
import React, {useState,useEffect} from "react"
import axios from "../../setting-axios"
import {useRouter} from "next/router"
import Layout from "./layout"
import moment from "moment"
import {FetchData} from "../../components/fetchdata"
import { useMediaQuery } from "react-responsive"


const PC = styled.div`
overflow-wrap: break-word;

.due {
    margin-left:20px;
}
ul {
    list-style:none;
    width:70%;
    background: #fcfcfc;
    padding: 0.1em 0 0.1em 0.5em;
    border: solid 1px gray;
}
ul li {
    padding: 0.5em 0;
}
.topmain {
    display:flex;
    justify-content:space-between;

    h2 {
        position: relative;
        display: inline-block;
        padding: 0 65px;
        text-align: center;
        margin:30px 0 5px 40px;
    }
    h2:before,
    h2:after {
        position: absolute;
        top: calc(50% - 3px);
        width: 50px;
        height: 6px;
        content: '';
        border-top: solid 2px #000;
        border-bottom: solid 2px #000;
    }
    h2:before {
        left: 0;
    }
    h2:after {
        right: 0;
    }
    button {
        margin:30px 50px 0 0;
        font-weight: 700;
        padding: 0.5rem 1.5rem;
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
}
.main {
    display: flex;
    justify-content:space-between;

    .content {
        text-align: center;

        table {
            width:40vw;
            margin:0 35px;
            text-align: center;
            border-collapse: collapse;
        }
        caption {
            margin-top:20px;
            font-size:18px;
            background-color: lightyellow;
            border: solid 1px #333;
        }
        th {
            padding: 10px;
            background: #e3faf8;
            border: solid 1px #748ca5;
        }
        td {
            font-size:1.5vw;
            padding: 10px;
            border: solid 1px #748ca5;
            background-color:white;
        }
    }
}
`

const Tablet = styled.div`
overflow-wrap: break-word;

ul {
    list-style:none;
    width:100%;
    background: #fcfcfc;
    padding: 0.1em 0 0.1em 0.5em;
    border: solid 1px gray;
}
ul li {
    padding: 0.5em 0;
}
.topmain {
    display:flex;
    justify-content:space-between;

    h2 {
        font-size:3.5vw;
        position: relative;
        display: inline-block;
        padding: 0 65px;
        text-align: center;
        margin:30px 0 5px 0;
    }
    h2:before,
    h2:after {
        position: absolute;
        top: calc(50% - 3px);
        width: 50px;
        height: 6px;
        content: '';
        border-top: solid 2px #000;
        border-bottom: solid 2px #000;
    }
    h2:before {
        left: 0;
    }
    h2:after {
        right: 0;
    }
    button {
        margin:30px 0 0 0;
        font-weight: 700;
        padding: 0.5rem 1.5rem;
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
}
.main {
    display: flex;
    justify-content:space-between;

    .content {
        text-align: center;

        table {
            width:40vw;
            text-align: center;
            border-collapse: collapse;
        }
        caption {
            margin-top:20px;
            font-size:18px;
            background-color: lightyellow;
            border: solid 1px #333;
        }
        th {
            font-size:1.5vw;
            padding: 10px;
            background: #e3faf8;
            border: solid 1px #748ca5;
        }
        td {
            font-size:1.5vw;
            padding: 10px;
            border: solid 1px #748ca5;
            background-color:white;
        }
    }
}
`

const Mobile = styled.div`
overflow-wrap: break-word;

ul {
    list-style:none;
    width:100%;
    background: #fcfcfc;
    padding: 0.1em 0 0.1em 0.5em;
    border: solid 1px gray;
}
ul li {
    padding: 0.5em 0;
}
.topmain {
    display:flex;
    flex-wrap:wrap;

    h3 {
        position: relative;
        display: inline-block;
        padding: 0 65px;
        text-align: center;
        margin:30px 0 5px 0px;
    }
    h3:before,
    h3:after {
        position: absolute;
        top: calc(50% - 3px);
        width: 50px;
        height: 6px;
        content: '';
        border-top: solid 2px #000;
        border-bottom: solid 2px #000;
    }
    h3:before {
        left: 0;
    }
    h3:after {
        right: 0;
    }
    button {
        margin:30px 0 20px 185px;
        font-weight: 700;
        padding: 0.5rem 1.5rem;
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
}
.main {
    .content {
        text-align: center;

        table {
            width:315px;
            margin:0 0 20px 0;
            text-align: center;
            border-collapse: collapse;
        }
        caption {
            margin-top:20px;
            font-size:18px;
            background-color: lightyellow;
            border: solid 1px #333;
        }
        th {
            font-size:1.5vw;
            padding: 10px;
            background: #e3faf8;
            border: solid 1px #748ca5;
        }
        td {
            font-size:1.5vw;
            padding: 10px;
            border: solid 1px #748ca5;
            background-color:white;
        }
    }
}
`

type Todo = {
    id:number,
    user_id:number,
    list:string,
    life:string,
    startdate:string,
    duedate:string
}

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

export const Mypage = ()=>{
    const PCsize:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tabletsize:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})
    const {env,userid,isLoading,isError} = FetchData()
    const [id,setId] = useState("")
    const [todo,setTodo] = useState([])
    const [lifepost,setLifepost] = useState([])
    const [sessionname,setSessionname] = useState("")
    const [dueflag,setDueflag] = useState(false)
    const [excessflag,setExcessflag] = useState(false)

    const router = useRouter()

    useEffect(()=>{
        setId(userid)
    },[userid])

    useEffect(()=>{
        if(!env||!id) return
        axios.get(env+"/sessionname")
        .then(res=>{
            setSessionname(res.data)
        }).catch(error=>{
            console.log(error)
        })
        axios.get(env+"/todos")
        .then(res=>{
            setTodo(res.data)
        }).catch(error=>{
            console.log(error)
        })
        axios.get(`${env}/lifeposts/${id}`)
        .then(res=>{
            setLifepost(res.data)
        }).catch(error=>{
            console.log(error)
        })
    },[router,env,id])

    if(isError) return <p>error</p>
    if(isLoading) return <p>lodaing...</p>

    const passChange = ()=>{
        router.push("/components/passchange")
    }

    if(PCsize) {
    return(
        <Layout>
        <PC>
            <div className="topmain">
            <div><h2>{sessionname}様のマイページ</h2></div><div><button onClick={passChange}>パスワードを変更する</button></div>
            </div>

            <div className="due">
                {dueflag ? <h3>下記TODOが期日まで残り3日を切っています</h3>:<></>}
                {todo.map((value:Todo,key:number)=>{
                    let duedate = moment(value.duedate).format("YYYYMMDD")
                    let nowdate = moment(new Date()).format("YYYYMMDD")
                    let diffdate = Number(duedate)-Number(nowdate)
                    if(diffdate<=3&&diffdate>=0) {
                        dueflag ? "":setDueflag(true)
                    return (
                        <React.Fragment key={key}>
                        <ul>
                            <li>項目: {value.life}&emsp;TODO: {value.list}&emsp;残り日数: {diffdate}日</li>
                        </ul>
                        </React.Fragment>
                    )
                    }else {
                        <></>
                    }
                })}
                {excessflag ? <h3>下記TODOが期日を過ぎています</h3>:<></>}
                {todo.map((value:Todo,key:number)=>{
                    let duedate = moment(value.duedate).format("YYYYMMDD")
                    let nowdate = moment(new Date()).format("YYYYMMDD")
                    let diffdate = Number(duedate)-Number(nowdate)
                    if(diffdate<=-1) {
                        excessflag ? "":setExcessflag(true)
                    return (
                        <React.Fragment key={key}>
                        <ul>
                            <li>項目: {value.life}&emsp;TODO: {value.list}&emsp;経過日数: {Math.abs(diffdate)}日</li>
                        </ul>
                        </React.Fragment>
                    )
                    }else {
                        <></>
                    }
                })}
            </div>

        <div className="main">
            <div className="content">
            <table border={1}>
            <caption>作成したTODOリスト</caption>
                <tbody>
                <tr>
                    <th>開始日</th><th>期日</th><th>項目</th><th>TODO</th>
                </tr>

        {todo.map((todo:Todo,key:number)=>{
            return(
                <tr key={key}>
                    <td>{todo.startdate}</td><td>{todo.duedate}</td><td>{todo.life}</td><td>{todo.list}</td>
                </tr>
            )
        })}
            </tbody>
            </table>
            </div>

            <div className="content">
            <table border={1}>
                <caption>投稿した生活情報</caption>
                <tbody>
                <tr>
                    <th>タイトル</th><th>項目</th><th>作成日</th>
                </tr>
        {lifepost.map((lifepost:Life,key:number)=>{
            return(
                <tr key={key}>
                    <td>{lifepost.title}</td><td>{lifepost.lifeitem}</td><td>{moment(lifepost.updated_at).format("YYYY-MM-DD h:mm:ss")}</td>
                </tr>
            )
        })}
            </tbody>
            </table>
            </div>

        </div>
        </PC>
        </Layout>
    )
    }else if(Tabletsize) {
        return(
            <Layout>
            <Tablet>
                <div className="topmain">
                <div><h2>{sessionname}様のマイページ</h2></div><div><button onClick={passChange}>パスワードを変更する</button></div>
                </div>

                <div className="due">
                {dueflag ? <h3>下記TODOが期日まで残り3日を切っています</h3>:<></>}
                {todo.map((value:Todo,key:number)=>{
                    let duedate = moment(value.duedate).format("YYYYMMDD")
                    let nowdate = moment(new Date()).format("YYYYMMDD")
                    let diffdate = Number(duedate)-Number(nowdate)
                    if(diffdate<=3&&diffdate>=0) {
                        dueflag ? "":setDueflag(true)
                    return (
                        <React.Fragment key={key}>
                        <ul>
                            <li>項目: {value.life}&emsp;TODO: {value.list}&emsp;残り日数: {diffdate}日</li>
                        </ul>
                        </React.Fragment>
                    )
                    }else {
                        <></>
                    }
                })}
                {excessflag ? <h3>下記TODOが期日を過ぎています</h3>:<></>}
                {todo.map((value:Todo,key:number)=>{
                    let duedate = moment(value.duedate).format("YYYYMMDD")
                    let nowdate = moment(new Date()).format("YYYYMMDD")
                    let diffdate = Number(duedate)-Number(nowdate)
                    if(diffdate<=-1) {
                        excessflag ? "":setExcessflag(true)
                    return (
                        <React.Fragment key={key}>
                        <ul>
                            <li>項目: {value.life}&emsp;TODO: {value.list}&emsp;経過日数: {Math.abs(diffdate)}日</li>
                        </ul>
                        </React.Fragment>
                    )
                    }else {
                        <></>
                    }
                })}
            </div>

            <div className="main">
                <div className="content">
                <table border={1}>
                <caption>作成したTODOリスト</caption>
                <tbody>
                    <tr>
                        <th>開始日</th><th>期日</th><th>項目</th><th>TODO</th>
                    </tr>
            {todo.map((todo:Todo,key:number)=>{
                return(
                    <tr key={key}>
                        <td>{todo.startdate}</td><td>{todo.duedate}</td><td>{todo.life}</td><td>{todo.list}</td>
                    </tr>
                )
            })}
            </tbody>
                </table>
                </div>

                <div className="content">
                <table border={1}>
                    <caption>投稿した生活情報</caption>
                    <tbody>
                    <tr>
                        <th>タイトル</th><th>項目</th><th>作成日</th>
                    </tr>
            {lifepost.map((lifepost:Life,key:number)=>{
                return(
                    <tr key={key}>
                        <td>{lifepost.title}</td><td>{lifepost.lifeitem}</td><td>{moment(lifepost.updated_at).format("YYYY-MM-DD h:mm:ss")}</td>
                    </tr>
                )
            })}
            </tbody>
                </table>
                </div>

            </div>
            </Tablet>
            </Layout>
        )
    }else {
        return(
            <Layout>
            <Mobile>
                <div className="topmain">
                <div><h3>{sessionname}様のマイページ</h3></div><div><button onClick={passChange}>パスワードを変更する</button></div>
                </div>

                <div className="due">
                {dueflag ? <h4>下記TODOが期日まで残り3日を切っています</h4>:<></>}
                {todo.map((value:Todo,key:number)=>{
                    let duedate = moment(value.duedate).format("YYYYMMDD")
                    let nowdate = moment(new Date()).format("YYYYMMDD")
                    let diffdate = Number(duedate)-Number(nowdate)
                    if(diffdate<=3&&diffdate>=0) {
                        dueflag ? "":setDueflag(true)
                    return (
                        <React.Fragment key={key}>
                        <ul>
                            <li>項目: {value.life}&emsp;TODO: {value.list}&emsp;残り日数: {diffdate}日</li>
                        </ul>
                        </React.Fragment>
                    )
                    }else {
                        <></>
                    }
                })}
                {excessflag ? <h4>下記TODOが期日を過ぎています</h4>:<></>}
                {todo.map((value:Todo,key:number)=>{
                    let duedate = moment(value.duedate).format("YYYYMMDD")
                    let nowdate = moment(new Date()).format("YYYYMMDD")
                    let diffdate = Number(duedate)-Number(nowdate)
                    if(diffdate<=-1) {
                        excessflag ? "":setExcessflag(true)
                    return (
                        <React.Fragment key={key}>
                        <ul>
                            <li>項目: {value.life}&emsp;TODO: {value.list}&emsp;経過日数: {Math.abs(diffdate)}日</li>
                        </ul>
                        </React.Fragment>
                    )
                    }else {
                        <></>
                    }
                })}
            </div>

            <div className="main">
                <div className="content">
                <table border={1}>
                <caption>作成したTODOリスト</caption>
                <tbody>
                    <tr>
                        <th>開始日</th><th>期日</th><th>項目</th><th>TODO</th>
                    </tr>
            {todo.map((todo:Todo,key:number)=>{
                return(
                    <tr key={key}>
                        <td>{todo.startdate}</td><td>{todo.duedate}</td><td>{todo.life}</td><td>{todo.list}</td>
                    </tr>
                )
            })}
            </tbody>
                </table>
                </div>

                <div className="content">
                <table border={1}>
                    <caption>投稿した生活情報</caption>
                    <tbody>
                    <tr>
                        <th>タイトル</th><th>項目</th><th>作成日</th>
                    </tr>
            {lifepost.map((lifepost:Life,key:number)=>{
                return(
                    <tr key={key}>
                        <td>{lifepost.title}</td><td>{lifepost.lifeitem}</td><td>{moment(lifepost.updated_at).format("YYYY-MM-DD h:mm:ss")}</td>
                    </tr>
                )
            })}
            </tbody>
                </table>
                </div>

            </div>
            </Mobile>
            </Layout>
        )
    }
}

export default Mypage