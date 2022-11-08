import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import Router, {useRouter} from "next/router"
import Layout from "./layout"
import moment from "moment"

type Todo = {
    id:number,
    user_id:number,
    list:string,
    life:string,
    startdate:String,
    duedate:String
}

export const Mypage = ()=>{
    const [todo,setTodo] = useState([])
    const [board,setBoard] = useState([])
    const [post,setPost] = useState([])
    const [heart,setHeart] = useState([])
    const [sessionid,setSessionid] = useState("")
    const [sessionname,setSessionname] = useState("")
    const router = useRouter()

    const getenv = router.query.state as unknown as string

    console.log(sessionname)
    console.log(todo)
    console.log(board)
    console.log(post)
    console.log(heart)
    
    useEffect(()=>{
        axios.get(getenv+"/sessionid")
        .then(res=>{
            setSessionid(res.data)
        }).catch(error=>{
            console.log(error)
        })
        axios.get(getenv+"/sessionname")
        .then(res=>{
            setSessionname(res.data)
        }).catch(error=>{
            console.log(error)
        })
        axios.get(getenv+"/todos")
        .then(res=>{
            setTodo(res.data)
        }).catch(error=>{
            console.log(error)
        })
        axios.get(getenv+"/myboards")
        .then(res=>{
            setBoard(res.data)
        }).catch(error=>{
            console.log(error)
        })
        axios.get(getenv+"/myposts")
        .then(res=>{
            setPost(res.data)
        }).catch(error=>{
            console.log(error)
        })
        axios.get(getenv+"/myhearts")
        .then(res=>[
            setHeart(res.data)
        ]).catch(error=>{
            console.log(error)
        })
    },[router,getenv])

    const passChange = ()=>{
        router.push({
            pathname:"/components/passchange",
            query:{state:getenv}
            })
    }


    return(
        <Layout>
        <h1>ようこそ！{sessionname}さん！</h1><h1 onClick={passChange}>パスワードを変更する</h1>
        {todo.map((todo:Todo)=>{
            return(
                <>
                <h3>{todo.list}</h3><h3>{todo.life}</h3><h3>{todo.startdate}</h3><h3>{todo.duedate}</h3>
                </>
            )
        })}
        </Layout>
    )
}

export default Mypage