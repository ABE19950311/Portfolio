import styled from "styled-components"
import {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import {useSearchParams} from "next/navigation"
import moment from "moment"
import { FaHeart } from "react-icons/fa";
import {FetchData} from "../../components/fetchdata"
import { useMediaQuery } from "react-responsive"
import Link from "next/link"
import Layout from "./layout"

const Container = styled.div`
max-width:1200px;
`

const PC = styled.div` 
padding-top:30px;
padding-bottom:10px;
padding-left:25%;

input {
    width:200px;
}
.name {
    display: inline-block;
    transform: translate(-110px,0px)
}
label {
    margin-bottom:3px;
    display: inline-block;
    width: 140px;
}
.titlelabel {
    color:red;
}
.returnbtn {
    transform: translate(540px,-20px)
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
    .noheart {
        color:initial;
    }
}
`

const Tablet = styled.div` 
padding-top:30px;
padding-bottom:10px;

input {
    width:200px;
}
.name {
    display: inline-block;
    transform: translate(-110px,0px)
}
label {
    margin-bottom:3px;
    display: inline-block;
    width: 140px;
}
.titlelabel {
    color:red;
}
.returnbtn {
    transform: translate(540px,-20px)
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
    .noheart {
        color:initial;
    }
}
`

const Mobile = styled.div` 
padding-top:30px;
padding-bottom:10px;

input {
    width:200px;
}
label {
    margin:0 0 3px 15px;
    display: inline-block;
    width: 40px;
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
    width:100%;
    display:inline-block;
    padding:10px 0 0 15px;
    margin-top:20px;
    border: solid 1px #000000;

    .content {
        font-size:16px;
    }
    .post {
        font-size:18px;
    }
    .setcolor {
        color:#e2264d;
    }
    .noheart {
        color:initial;
    }
}
`

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

export const Boardcontent = ()=>{
    const PCsize:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tabletsize:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})
    const {env,userid,isLoading,isError} = FetchData()
    const [sessionid,setSessionid] = useState<number>()
    const [name,setName] = useState("")
    const [post,setPost] = useState("")
    const [flag,setFlag] = useState("")
    const [heartnumber,setHeartnumber] = useState<any>(0)
    const [heartflag,setHeartflag] = useState("")
    const [fontcolor,setFontcolor] = useState<any>({})
    const [postcontent,setPostcontent] = useState([])

    const search = useSearchParams();
    const board_id = search.get("board_id") as unknown as number
    const user_id = search.get("user_id") as unknown as number
    const username = search.get("username") as unknown as string
    const createdate = search.get("createdate") as unknown as string
    const content = search.get("content") as unknown as string

    useEffect(()=>{
        const id = Number(userid)
        setSessionid(id)
    },[userid])

    useEffect(()=>{
        if(!env) return
        axios.get(env+"/posts")
        .then(res=>{
            setPostcontent(res.data)
        }).catch(error=>{
            console.log(error)
        })
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[flag,env])

    useEffect(()=>{
        if(!env) return
        axios.get(env+"/hearts")
        .then(res=>{
            let heartcount:any = {}

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
    },[heartflag,env,sessionid])

    if(isError) return <p>error</p>
    if(isLoading) return <p>lodaing...</p>

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
            axios.post(env+"/hearts",{
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
        axios.post(env+"/posts",
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

    if(PCsize) {
    return (
            <Layout>
            <Container>
            <PC>
            <Link href="/components/board"><button className="returnbtn">掲示板へ戻る</button></Link>
            <span className={sessionid==user_id ? "none":"name"}>名前:</span><input type="text" className={sessionid==user_id ? "none":""} value={name} onChange={doName}/><br></br>
            <label className="postlabel">投稿内容:<span className="titlelabel">(必須)</span></label><textarea rows={8} cols={70} value={post} onChange={doPost}></textarea><br></br>
            <label></label><button type="submit" onClick={doSubmit}>返信する</button>
    
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
                        <span className="content" onClick={()=>setcolorflag(post.id)} >{key+1}&nbsp;投稿者:{post.username}&emsp;投稿日:{moment(post.created_at).format("YYYY-MM-DD h:mm:ss")}
                                &emsp;<FaHeart size={25} className={fontcolor[post.id] ? "setcolor":"noheart"} />{heartnumber ? heartnumber["heartcount"][post.id]:0}</span>
                        <p className="post">{post.postcontent}</p>
                        </div>
                    )
                })
            }
            </PC>
            </Container>
            </Layout>
    )
    }else if(Tabletsize) {
        return (
                <Layout>
                <Container>
                <Tablet>
                <Link href="/components/board"><button className="returnbtn">掲示板へ戻る</button></Link>
                <span className={sessionid==user_id ? "none":"name"}>名前:</span><input type="text" className={sessionid==user_id ? "none":""} value={name} onChange={doName}/><br></br>
                <label className="postlabel">投稿内容:<span className="titlelabel">(必須)</span></label><textarea rows={8} cols={70} value={post} onChange={doPost}></textarea><br></br>
                <label></label><button type="submit" onClick={doSubmit}>返信する</button><br></br>
        
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
                            <span className="content" onClick={()=>setcolorflag(post.id)} >{key+1}&nbsp;投稿者:{post.username}&emsp;投稿日:{moment(post.created_at).format("YYYY-MM-DD h:mm:ss")}
                                    &emsp;<FaHeart size={25} className={fontcolor[post.id] ? "setcolor":"noheart"} />{heartnumber ? heartnumber["heartcount"][post.id]:0}</span>
                            <p className="post">{post.postcontent}</p>
                            </div>
                        )
                    })
                }
                </Tablet>
                </Container>
                </Layout>
        )
    }else {
        return (
                <Layout>
                <Container>
                <Mobile>
                <Link href="/components/board"><button className="returnbtn">掲示板へ戻る</button></Link>
                <label className={sessionid==user_id ? "none":""}>名前:</label><input type="text" className={sessionid==user_id ? "none":""} value={name} onChange={doName}/><br></br>
                &emsp;投稿内容:<span className="titlelabel">(必須)</span><textarea rows={8} cols={60} value={post} onChange={doPost}></textarea><br></br>
                &emsp;<button type="submit" onClick={doSubmit}>返信する</button><br></br>
        
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
                            <span className="content" onClick={()=>setcolorflag(post.id)} >{key+1}&nbsp;投稿者:{post.username}&emsp;投稿日:{moment(post.created_at).format("YYYY-MM-DD h:mm:ss")}
                                    &emsp;<FaHeart size={25} className={fontcolor[post.id] ? "setcolor":"noheart"} />{heartnumber ? heartnumber["heartcount"][post.id]:0}</span>
                            <p className="post">{post.postcontent}</p>
                            </div>
                        )
                    })
                }
                </Mobile>
                </Container>
                </Layout>
        )
    }
}

export default Boardcontent