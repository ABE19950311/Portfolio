import styled from "styled-components"
import {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"
import moment from "moment"
import { FaHeart } from "react-icons/fa";
import Header from "./header"


type Post = {
    id:number,
    board_id:number,
    user_id:number,
    username:string,
    postcontent:string,
    created_at:Date
}

type Heart = {
    id:number,
    post_id:number,
    user_id:number
}

const Container = styled.div`
    max-width:1200px;
`

const SDiv = styled.div` 
    padding-top:30px;
    padding-bottom:10px;
    padding-left:25%;

    input {
        width:200px;
    }

    label {
        margin-bottom:3px;
        display: inline-block;
        width: 120px;
    }

    .titlelabel {
        color:red;
    }

    .returnbtn {
        margin-left:350px;
    }

    .postlabel {
        transform: translate(0px,-70px)
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

.postcontent {
    overflow-wrap:break-word;
    width:80%;
    display:inline-block;
    padding:10px 0 0 15px;
    margin-top:20px;
    border: solid 1px #000000;

    .content {
        font-size:20px;
    }

    .post {
        font-size:18px;
    }

    .setcolor {
        color:#e2264d;
    }

    .none {
        color:initial;
    }
}
`

export const Boardcontent = ()=>{
    const [name,setName] = useState("")
    const [post,setPost] = useState("")
    const [flag,setFlag] = useState("")
    const [heartnumber,setHeartnumber] = useState<any>(0)
    const [heartflag,setHeartflag] = useState("")
    const [heartdata,setHeartdata] = useState([])
    const [fontcolor,setFontcolor] = useState<any>({})
    const [postcontent,setPostcontent] = useState([])
    const router=useRouter();

    const board_id = router.query.board_id as unknown as number;
    const user_id = router.query.user_id as unknown as number;
    const username = router.query.username as unknown as string;
    const createdate = router.query.createdate as unknown as string;
    const getenv = router.query.env as unknown as string;
    const content = router.query.content as unknown as string;
    const sessionid = router.query.sessionid as unknown as number;

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
        axios.get(getenv+"/hearts")
        .then(res=>{
            let heartcount:any = {}

            setHeartdata(res.data)

            res.data.map((res:Heart)=>{
                if(sessionid==res.user_id) {
                setFontcolor((fontcolor:any)=>({
                    ...fontcolor,
                    [res.post_id]:true
                }))
                }
            })

            if(res.data.length) {
            for(let i=0;i<res.data.length;i++) {
                let elm = res.data[i]
                heartcount[elm.post_id] = heartcount[elm.post_id] ? heartcount[elm.post_id]+1:1;
                setHeartnumber((heartnumber:any)=>({
                    ...heartnumber,
                    heartcount
                }))
            }
            }else if(!res.data.length) {
                heartcount = {}
                setHeartnumber((heartnumber:any)=>({
                    ...heartnumber,
                    heartcount
                }))
            }
            
        }).catch(error=>{
            console.log(error)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[heartflag])

    console.log(heartdata)
    console.log(heartnumber)

    const doName = (event:{target:HTMLInputElement})=>{
            setName(event.target.value)
    }

    const doPost = (event:{target:HTMLTextAreaElement})=>{
        setPost(event.target.value)
        if(sessionid==user_id) {
            setName(username)
        }
    }

    const setcolorflag = (postid:number)=>{
            axios.post(getenv+"/hearts",{
                hearts: {
                        post_id:postid,
                        user_id:sessionid
                    }
            }).then(res=>{
                setHeartflag(res.data)
                if(res.data.status=="created") {
                setFontcolor((fontcolor:any)=>({
                    ...fontcolor,
                    [postid]:true
                }))
                }else if(res.data.status==="none") {
                    setFontcolor((fontcolor:any)=>({
                        ...fontcolor,
                        [postid]:false
                    }))
                }
            }).catch(error=>{
                console.log(error)
            })
    }

    const doSubmit = (event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault()
        
        if(!post) return
        axios.post(getenv+"/posts",
        {
            posts: {
                username:name ? name:"名無しさん",
                postcontent:post,
                board_id:board_id,
                user_id:sessionid
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

    const doBoard = ()=>{
        router.push({
            pathname:"/components/board",
            query:{state:getenv}
        })
    }

    return (
        <>
            <Header />
            <Container>
            <SDiv>
            <label className={sessionid==user_id ? "none":""}>名前:</label><input type="text" className={sessionid==user_id ? "none":""} value={name} onChange={doName}/><br></br>
            <label className="postlabel">投稿内容:<span className="titlelabel">(必須)</span></label><textarea rows={8} cols={70} value={post} onChange={doPost}></textarea><br></br>
            <label></label><button type="submit" onClick={doSubmit}>返信する</button><button className="returnbtn" onClick={doBoard}>掲示板へ戻る</button>
    
            <div className="postcontent">
                <span className="content">投稿者:{username}&emsp;投稿日:{moment(createdate).format("YYYY-MM-DD h:mm:ss")}</span>
                <p className="post">{content}</p>
            </div>
            {postcontent.filter((posts:Post)=>{
                    if(board_id==posts.board_id) {
                        return posts;
                    }
                }    
            ).map((post:Post,key:number)=>{
                return (
                        <div className="postcontent" key={key}>
                        <span className="content" onClick={()=>setcolorflag(post.id)} >{key+1}&nbsp;投稿者:{post.username}&emsp;投稿日:{moment(post.created_at).format("YYYY-MM-DD h:mm:ss")}&emsp;<FaHeart size={25} className={fontcolor[post.id] ? "setcolor":"none"} />{heartnumber ? heartnumber["heartcount"][post.id]:0}</span>
                        <p className="post">{post.postcontent}</p>
                        </div>
                    )
                })
            }
            </SDiv>
            </Container>
        </>
    )
}

export default Boardcontent