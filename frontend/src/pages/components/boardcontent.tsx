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

const SForm = styled.form` 
    padding-top:30px;
    padding-bottom:10px;
    padding-left:25%;

    input {
        width:200px;
    }

    label {
        margin-bottom:3px;
        display: inline-block;
        width: 100px;
    }

    input,textarea {
        margin-left:10px;
    }

    button {
        margin:10px 0 0 10px
    }

    .none {
        display:none;
    }
`

const SDiv = styled.div`
    padding-left:3%;
    margin-left:25%;
    margin-top:20px;
    margin-bottom:20px;
    border: solid 1px #000000;
    box-sizing: border-box;
    width:700px
`

export const Boardcontent = ()=>{
    const [name,setName] = useState("")
    const [post,setPost] = useState("")
    const [flag,setFlag] = useState("")
    const [sessionid,setSessionid] = useState(0)
    const [postcontent,setPostcontent] = useState([])
    const router=useRouter();

    const board_id = router.query.board_id as unknown as number;
    const user_id = router.query.user_id as unknown as number;
    const username = router.query.username as unknown as string;
    const createdate = router.query.createdate as unknown as string;
    const getenv = router.query.env as unknown as string;
    const content = router.query.content as unknown as string;

    useEffect(()=>{
        axios.get(getenv+"/posts")
        .then(res=>{
            setPostcontent(res.data)
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

    console.log(postcontent)

    const doName = (event:{target:HTMLInputElement})=>{
            setName(event.target.value)
    }

    const doPost = (event:{target:HTMLTextAreaElement})=>{
        setPost(event.target.value)
        if(sessionid==user_id) {
            setName(username)
        }
    }

    const doSubmit = (event:React.MouseEvent<HTMLFormElement>)=>{
        event.preventDefault()

        axios.post(getenv+"/posts",
        {
            posts: {
                username:name,
                postcontent:post,
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
            <SForm onSubmit={doSubmit}>
            <label className={sessionid==user_id ? "none":""}>名前:</label><input type="text" className={sessionid==user_id ? "none":""} value={name} onChange={doName}/><br></br>
            <label></label><textarea rows={5} cols={70} value={post} onChange={doPost}></textarea><br></br>
            <label></label><button type="submit">返信する</button>
            </SForm>
            <SDiv>
                <p>投稿者:{username}&emsp;投稿日:{moment(createdate).format("YYYY-MM-DD h:mm:ss")}</p>
                <p>{content}</p>
            </SDiv>
            {postcontent.filter((posts:Post)=>{
                    if(board_id==posts.board_id) {
                        return posts;
                    }
                }    
            ).map((post:Post,key:number)=>{
                return (
                    <>
                        <SDiv key={key}>
                        <p>投稿者:{post.username}&emsp;投稿日:{moment(post.created_at).format("YYYY-MM-DD h:mm:ss")}</p>
                        <p>{post.postcontent}</p>
                        </SDiv>
                    </>
                    )
                })
            }
        </Layout>
        </>
    )
}

export default Boardcontent