import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import Router, {useRouter} from "next/router"
import Layout from "./layout"
import moment from "moment"

type Post = {
    id:number,
    board_id:number,
    user_id:number,
    username:string,
    postcontent:string,
    created_at:Date
}

export const Boardcontent = ()=>{
    const [name,setName] = useState("")
    const [post,setPost] = useState("")
    const [flag,setFlag] = useState("")
    const [postcontent,setPostcontent] = useState([])
    const router=useRouter();

    const content = router.query.content as unknown as string;
    const board_id = router.query.board_id as unknown as number;
    const user_id = router.query.user_id as unknown as number;
    const getenv = router.query.env as unknown as string;

    useEffect(()=>{
        axios.get(getenv+"/posts")
        .then(res=>{
            setPostcontent(res.data)
        }).catch(error=>{
            console.log(error)
        })
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[flag])

    console.log(postcontent)

    const doName = (event:{target:HTMLInputElement})=>{
        setName(event.target.value)
    }

    const doPost = (event:{target:HTMLTextAreaElement})=>{
        setPost(event.target.value)
    }

    const doSubmit = (event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault()
        axios.post(getenv+"/posts",
        {
            posts: {
                username:name,
                postcontent:content,
                board_id:board_id,
                user_id:user_id
            }
        }).then(res=>{
            console.log(res.data)
            setFlag(res.data)
            setName("")
            setPost("")
        }).catch(error=>{
            console.log(error)
        })
    }

    return (
        <>
        <Layout>
            <form>
            <input type="text" value={name} onChange={doName}/><br></br>
            <textarea rows={5} cols={70} value={post} onChange={doPost}></textarea>
            <h1>kouzityuu</h1>
            <button type="submit" onClick={doSubmit}>返信する</button>
            </form>
            {postcontent.filter((posts:Post)=>{
                    if(board_id==posts.board_id) {
                        return posts;
                    }
                }    
            ).map((post:Post,key:number)=>{
                return (
                    <>
                        <p key={key}>{post.postcontent}{post.username}</p>
                    </>
                    )
                })
            }
        </Layout>
        </>
    )
}

export default Boardcontent