import styled from "styled-components"
import {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"
import Header from "./header"
import moment from "moment"

type Board = {
    id:number,
    user_id:number,
    created_at:string,
    posttitle:string,
    postcontent:string,
    username:string
}

const SDiv = styled.div` 
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
    },[flag,getenv,router])

    useEffect(()=>{
        axios.get(getenv+"/sessionid")
        .then(res=>{
            setSessionid(res.data)
        }).catch(error=>{
            console.log(error)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[getenv,router])

    const doName = (event:{target:HTMLInputElement})=>{
        setName(event.target.value)
    }

    const doTitle = (event:{target:HTMLInputElement})=>{
        setTitle(event.target.value)
    }

    const doContent = (event:{target:HTMLTextAreaElement})=>{
        setContent(event.target.value)
    }

    const doSubmit = (event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        
        if(!title||!content) return
        axios.post(getenv+"/boards",
        {
            boards:{
                posttitle:title,
                postcontent:content,
                username:name ? name:"名無しさん"
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

    const doBoard = (content:string,board_id:number,user_id:number,username:string,createdate:string)=>{
        router.push({
            pathname:"/components/boardcontent",
            query:{content:content,board_id:board_id,user_id:user_id,env:getenv,username:username,createdate:createdate,sessionid:sessionid}
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
        <Header />
        <SDiv>
        <label className="post">名前:</label><input type="text" value={name} onChange={doName}/><br></br>
        <label className="post">タイトル:<span className="titlelabel">(必須)</span></label><input type="text" value={title} onChange={doTitle}/><br></br>
        <label className="postlabel">投稿内容:<span className="titlelabel">(必須)</span></label><textarea rows={8} cols={70} value={content} onChange={doContent}/><br></br>
        <label className="sub"></label><button type="submit" onClick={doSubmit}>投稿する</button><br></br>
        
            {board.map((board:Board,key:number)=>{
                return (
                    <div className="content" key={key}>
                    <p>投稿者:{board.username}&emsp;投稿日:{moment(board.created_at).format("YYYY-MM-DD h:mm:ss")}&emsp;{sessionid===board.user_id ? <button onClick={()=>doDelete(board.id)}>削除する</button>:<></>}</p>
                    <label>タイトル:</label><a onClick={()=>doBoard(board.postcontent,board.id,board.user_id,board.username,board.created_at)} href="#">{board.posttitle}</a>
                    </div>
                )
            })}
        </SDiv>
        </>
    )
}

export default Board