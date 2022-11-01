import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import Router, {useRouter} from "next/router"
import Layout from "./layout"
import moment from "moment"

type Board = {
    id:number,
    user_id:number,
    created_at:string,
    posttitle:string,
    postcontent:string,
    username:string
}

export const Board = ()=>{
    const [name,setName] = useState("");
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [flag,setFlag] = useState("");
    const [board,setBoard] = useState([]);
    const [sessionid,setSessionid] = useState(0);
    const router=useRouter();

    const getenv = router.query.state as unknown as string;

    useEffect(()=>{
        axios.get(getenv+"/boards")
        .then(res=>{
            setBoard(res.data)
        }).catch(error=>{
            console.log(error)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[flag])

    useEffect(()=>{
        axios.get(getenv+"/sessionid")
        .then(res=>{
            setSessionid(res.data)
        }).catch(error=>{
            console.log(error)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const doName = (event:{target:HTMLInputElement})=>{
        setName(event.target.value)
    }

    const doTitle = (event:{target:HTMLInputElement})=>{
        setTitle(event.target.value)
    }

    const doContent = (event:{target:HTMLTextAreaElement})=>{
        setContent(event.target.value)
    }

    const doSubmit = (event:React.MouseEvent<HTMLFormElement>)=>{
        event.preventDefault();
        axios.post(getenv+"/boards",
        {
            boards:{
                posttitle:title,
                postcontent:content,
                username:name
            }
        }).then(res=>{
            console.log(res.data)
            setFlag(res.data)
            setName("")
            setContent("")
            setTitle("")
        }).catch(error=>{
            console.log(error)
        })
    }

    const doBoard = (content:string,board_id:number,user_id:number)=>{
        router.push({
            pathname:"/components/boardcontent",
            query:{content:content,board_id:board_id,user_id:user_id,env:getenv}
        })
    }
    
    const doDelete = (deleteid:number)=>{
        axios.delete(getenv+`/boards/${deleteid}`)
        .then(res=>{
            setFlag(res.data)
        }).catch(error=>{
            console.log(error)
        })
    }

    return (
        <>
        <Layout>
        <form onSubmit={doSubmit}>
        <label>名前:</label><input type="text" value={name} onChange={doName}/><br></br>
        <label>タイトル:</label><input type="text" value={title} onChange={doTitle}/><br></br>
        <textarea rows={5} cols={70} value={content} onChange={doContent}/><br></br>
        <button type="submit">投稿する</button>
        </form>
            {board.map((board:Board,key:number)=>{
                return (
                    <>
                    <p>作成者:{board.username} {moment(board.created_at).format("YYYY-MM-DD h:mm:ss")}</p>{sessionid===board.user_id ? <button onClick={()=>doDelete(board.id)}>削除する</button>:<></>}
                    <a onClick={()=>doBoard(board.postcontent,board.id,board.user_id)} href="#">{board.posttitle}</a>
                    </>
                )
            })}
        </Layout>
        </>
    )
}

export default Board