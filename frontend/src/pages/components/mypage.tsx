import styled from "styled-components"
import {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"
import Layout from "./layout"
import moment from "moment"
import {FetchData} from "./fetchdata"

type Todo = {
    id:number,
    user_id:number,
    list:string,
    life:string,
    startdate:String,
    duedate:String
}

type Board = {
    id:number,
    user_id:number,
    created_at:string,
    posttitle:string,
    postcontent:string,
    username:string
}

type Post = {
    id:number,
    board_id:number,
    user_id:number,
    username:string,
    postcontent:string,
    created_at:string
}

type Heart = {
    id:number,
    post_id:number,
    user_id:number
}

const SDiv = styled.div`

    .topmain {
        display:flex;
        justify-content:space-between;

        h1 {
            margin-left:30px;
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
        flex-wrap: wrap;
        gap: 30px 20px;

        .content {
            width:30%;
            text-align: center;

            table {
                margin-left:20px;
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
                padding: 10px;
                border: solid 1px #748ca5;
                background-color:white;
            }
        }
    }

`

export const Mypage = ()=>{
    const {env,userid,loginstate,isLoading,isError} = FetchData()
    const [sessionid,setSessionid] = useState("")
    const [todo,setTodo] = useState([])
    const [board,setBoard] = useState([])
    const [post,setPost] = useState([])
    const [heart,setHeart] = useState([])
    const [sessionname,setSessionname] = useState("")
    const router = useRouter()

    useEffect(()=>{
        setSessionid(userid)
    },[userid])

    useEffect(()=>{
        if(!env) return
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
        axios.get(env+"/myboards")
        .then(res=>{
            setBoard(res.data)
        }).catch(error=>{
            console.log(error)
        })
        axios.get(env+"/myposts")
        .then(res=>{
            setPost(res.data)
        }).catch(error=>{
            console.log(error)
        })
        axios.get(env+"/myhearts")
        .then(res=>[
            setHeart(res.data)
        ]).catch(error=>{
            console.log(error)
        })
    },[router,env])

    if(isError) return <p>error</p>
    if(isLoading) return <p>lodaing...</p>

    const passChange = ()=>{
        router.push({
            pathname:"/components/passchange",
            })
    }

    return(
        <>
        <Layout>
        <SDiv>
            <div className="topmain">
            <div><h1>{sessionname}様のマイページ</h1></div><div><button onClick={passChange}>パスワードを変更する</button></div>
            </div>

        <div className="main">

            <div className="content">
            <table border={1}>
            <caption>作成したTODOリスト</caption>
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
            </table>
            </div>

            <div className="content">
            <table border={1}>
                <caption>作成した掲示板</caption>
                <tr>
                    <th>入力したユーザ名</th><th>タイトル</th><th>内容</th><th>作成日時</th>
                </tr>
        {board.map((board:Board,key:number)=>{
            return(
                <tr key={key}>
                    <td>{board.username}</td><td>{board.posttitle}</td><td>{board.postcontent}</td><td>{moment(board.created_at).format("YYYY-MM-DD h:mm:ss")}</td>
                </tr>
            )
        })}
            </table>
            </div>

            <div className="content">
                <table border={1}>
                    <caption>掲示板に投稿した内容</caption>
                    <tr>
                        <th>入力したユーザ名</th><th>投稿内容</th><th>投稿日時</th>
                    </tr>
        {post.map((post:Post,key:number)=>{
            return(
                <tr key={key}>
                    <td>{post.username}</td><td>{post.postcontent}</td><td>{moment(post.created_at).format("YYYY-MM-DD h:mm:ss")}</td>
                </tr>
            )
        })}
                </table>
            </div>

        </div>
        </SDiv>
        </Layout>
        </>
    )
}

export default Mypage