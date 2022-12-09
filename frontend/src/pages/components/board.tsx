import styled from "styled-components"
import {useState,useEffect,useRef} from "react"
import axios from "../../setting-axios"
import moment from "moment"
import {FetchData} from "../../components/fetchdata"
import { useMediaQuery } from "react-responsive"
import Link from "next/link"
import Layout from "./layout"

const PC = styled.div` 
padding-top:30px;
padding-bottom:10px;
padding-left:25%;
position:relative;

input {
    width:200px;
}
.post {
    margin-bottom:3px;
    display: inline-block;
    width: 120px;
    top: 50%;
}
.sub {
    margin-bottom:3px;
    display: inline-block;
    width: 120px;
    top: 50%;
}
.titlelabel {
    color:red;
}
.postlabel {
    margin-bottom:3px;
    display: inline-block;
    width: 120px;
    top: 50%;
    transform: translate(0px,-70px)
}
input,textarea {
    margin-left:10px;
}
button {
    margin:10px 0 0 10px
}
.content {
    overflow-wrap:break-word;
    border: solid 1px #000000;
    box-sizing: border-box;
    padding:0 250px 15px 20px;
    margin-top:20px;
    transform: translate(0px,10px);
    display:inline-block;

    a {
        text-align:left;
        color:blue;
        text-decoration: underline;
    }
}
`

const Tablet = styled.div` 
padding-top:30px;
padding-bottom:10px;
position:relative;

input {
    width:200px;
}
.post {
    margin-bottom:3px;
    display: inline-block;
    width: 120px;
    top: 50%;
}
.sub {
    margin-bottom:3px;
    display: inline-block;
    width: 120px;
    top: 50%;
}
.titlelabel {
    color:red;
}
.postlabel {
    margin-bottom:3px;
    display: inline-block;
    width: 120px;
    top: 50%;
    transform: translate(0px,-70px)
}
input,textarea {
    margin-left:10px;
}
button {
    margin:10px 0 0 10px
}
.content {
    overflow-wrap:break-word;
    border: solid 1px #000000;
    box-sizing: border-box;
    padding:0 250px 15px 20px;
    margin-top:20px;
    transform: translate(0px,10px);
    display:inline-block;

    a {
        text-align:left;
        color:blue;
        text-decoration: underline;
    }
}
`

const Mobile = styled.div` 
padding-top:30px;
padding-bottom:10px;
position:relative;

input {
    width:200px;
}
.post {
    margin-bottom:3px;
    display: inline-block;
    width: 120px;
    top: 50%;
}
.sub {
    margin-bottom:3px;
    display: inline-block;
    width: 120px;
    top: 50%;
}
.titlelabel {
    color:red;
}
.postlabel {
    margin-bottom:3px;
    display: inline-block;
    width: 120px;
    top: 50%;
    transform: translate(0px,-70px)
}
input,textarea {
    margin-left:10px;
}
.delbutton {
    transform: translate(250px,0px)
}
.content {
    overflow-wrap:break-word;
    border: solid 1px #000000;
    box-sizing: border-box;
    padding:0 60px 15px 20px;
    margin-top:20px;
    transform: translate(0px,10px);
    display:inline-block;

    a {
        text-align:left;
        color:blue;
        text-decoration: underline;
    }
}
`

type Boardtype = {
    id:number,
    user_id:number,
    created_at:string,
    posttitle:string,
    postcontent:string,
    username:string
}

export const Board = ()=>{
    const PCsize:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tabletsize:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})
    const {env,userid,isLoading,isError} = FetchData()
    const [sessionid,setSessionid] = useState<number>()
    const [name,setName] = useState("");
    const [title,setTitle] = useState("");
    const [content,setContent] = useState<any[]>([]);
    const [flag,setFlag] = useState("");
    const [board,setBoard] = useState([]);
    const formRef = useRef<HTMLTextAreaElement>(null)

    useEffect(()=>{
        const id = Number(userid)
        setSessionid(id)
    },[userid])

    useEffect(()=>{
        if(!env) return
        axios.get(env+"/boards")
        .then(res=>{
            setBoard(res.data)
        }).catch(error=>{
            console.log(error)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[flag,env])

    if(isError) return <p>error</p>


    const doName = (event:{target:HTMLInputElement})=>{
        setName(event.target.value)
    }

    const doTitle = (event:{target:HTMLInputElement})=>{
        setTitle(event.target.value)
    }

    const doContent = (event:{target:HTMLTextAreaElement})=>{
        const value = event.target.value.trim().split("\n")
        setContent(value)
    }

    const doSubmit = (event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();

        const existcontentcheck = content.filter((value:string)=>{
            if(value) {
                return value
            }
        })
        
        if(!title||!existcontentcheck.length) return

        const jsoncontent = JSON.stringify(content)

        axios.post(env+"/boards",
        {
            boards:{
                posttitle:title,
                postcontent:jsoncontent,
                username:name ? name:"匿名さん"
            }
        }).then(res=>{
            setFlag(res.data)
            setName("")
            setTitle("")
            setContent([])
            if(!formRef.current) return
            formRef.current.value=""
        }).catch(error=>{
            console.log(error)
        })
    }

    const doDelete = (deleteid:number)=>{
        axios.delete(env+`/boards/${deleteid}`)
        .then(res=>{
            setFlag(res.data)
        }).catch(error=>{
            console.log(error)
        })
    }

    if(PCsize) {
    return (
        <Layout>
        <PC>
        <label className="post">名前test:</label><input type="text" data-testid="nametest" value={name} onChange={doName}/><br></br>
        <label className="post">タイトル:<span className="titlelabel">(必須)</span></label><input data-testid="titletest" type="text" value={title} onChange={doTitle}/><br></br>
        <label className="postlabel">投稿内容:<span className="titlelabel">(必須)</span></label><textarea data-testid="contenttest" ref={formRef} rows={8} cols={70} onChange={doContent}/><br></br>
        <label className="sub"></label><button data-testid="submit" type="submit" onClick={doSubmit}>投稿する</button><br></br>
        
            {board.map((board:Boardtype,key:number)=>{
                return (
                    <div className="content" key={key}>
                    <p>投稿者:{board.username}&emsp;投稿日:{moment(board.created_at).format("YYYY-MM-DD h:mm:ss")}&emsp;{sessionid===board.user_id ? <button onClick={()=>doDelete(board.id)}>削除する</button>:<></>}</p>
                    <label>タイトル:</label>
                    <Link href={{
                        pathname:"/components/boardcontent",
                        query:{content:board.postcontent,board_id:board.id,user_id:board.user_id,username:board.username,createdate:board.created_at,sessionid:sessionid}
                                }}>{board.posttitle}</Link>
                    </div>
                )
            })}
        </PC>
        </Layout>
    )
    }else if(Tabletsize) {
        return (
            <Layout>
            <Tablet>
            <label className="post">名前:</label><input type="text" data-testid="nametest" value={name} onChange={doName}/><br></br>
            <label className="post">タイトル:<span className="titlelabel">(必須)</span></label><input data-testid="titletest" type="text" value={title} onChange={doTitle}/><br></br>
            <label className="postlabel">投稿内容:<span className="titlelabel">(必須)</span></label><textarea data-testid="contenttest" ref={formRef} rows={8} cols={70} onChange={doContent}/><br></br>
            <label className="sub"></label><button data-testid="submit" type="submit" onClick={doSubmit}>投稿する</button><br></br>
            
                {board.map((board:Boardtype,key:number)=>{
                    return (
                        <div className="content" key={key}>
                        <p>投稿者:{board.username}&emsp;投稿日:{moment(board.created_at).format("YYYY-MM-DD h:mm:ss")}&emsp;{sessionid===board.user_id ? <button onClick={()=>doDelete(board.id)}>削除する</button>:<></>}</p>
                        <label>タイトル:</label>
                        <Link href={{
                            pathname:"/components/boardcontent",
                            query:{content:board.postcontent,board_id:board.id,user_id:board.user_id,username:board.username,createdate:board.created_at,sessionid:sessionid}
                                    }}>{board.posttitle}</Link>
                        </div>
                    )
                })}
            </Tablet>
            </Layout>
        )
    }else {
        return (
            <Layout>
            <Mobile>
            &emsp;<label className="post">名前:</label><input type="text" data-testid="nametest" value={name} onChange={doName}/><br></br>
            &emsp;<label className="post">タイトル:<span className="titlelabel">(必須)</span></label><input data-testid="titletest" type="text" value={title} onChange={doTitle}/><br></br>
            &emsp;投稿内容:<span className="titlelabel">(必須)</span><textarea data-testid="contenttest" ref={formRef} rows={8} cols={60} onChange={doContent}/><br></br>
            <button data-testid="submit" type="submit" onClick={doSubmit}>投稿する</button><br></br>
            
                {board.map((board:Boardtype,key:number)=>{
                    return (
                        <div className="content" key={key}>
                        <p>投稿者:{board.username}&emsp;投稿日:{moment(board.created_at).format("YYYY-MM-DD h:mm:ss")}&emsp;<br></br>{sessionid===board.user_id ? <button className="delbutton" onClick={()=>doDelete(board.id)}>削除する</button>:<></>}</p>
                        <label>タイトル:</label>
                        <Link href={{
                                pathname:"/components/boardcontent",
                                query:{content:board.postcontent,board_id:board.id,user_id:board.user_id,username:board.username,createdate:board.created_at,sessionid:sessionid}
                                    }}>{board.posttitle}</Link>
                        </div>
                    )
                })}
            </Mobile>
            </Layout>
        )
    }
}

export default Board