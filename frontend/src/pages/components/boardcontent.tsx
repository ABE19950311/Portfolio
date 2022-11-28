import styled from "styled-components"
import {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"
import moment from "moment"
import { FaHeart } from "react-icons/fa";
import Header from "./header"
import {FetchData} from "../../components/fetchdata"
import { useMediaQuery } from "react-responsive"


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

const PCDiv = styled.div` 
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

const TabDiv = styled.div` 
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

const MobDiv = styled.div` 
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

export const Boardcontent = ()=>{
    const PC:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tablet:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})
    const Mobile:boolean = useMediaQuery({query: '(max-width: 519px)'})
    const {env,userid,loginstate,isLoading,isError} = FetchData()
    const [sessionid,setSessionid] = useState<number>()
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
    const content = router.query.content as unknown as string;

    console.log(heartnumber)
    console.log(fontcolor)

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

    const doBoard = ()=>{
        router.push({
            pathname:"/components/board",
        })
    }

    if(PC) {
    return (
        <>
            <Header />
            <Container>
            <PCDiv>
            <button className="returnbtn" onClick={doBoard}>掲示板へ戻る</button>
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
                        <span className="content" onClick={()=>setcolorflag(post.id)} >{key+1}&nbsp;投稿者:{post.username}&emsp;投稿日:{moment(post.created_at).format("YYYY-MM-DD h:mm:ss")}&emsp;<FaHeart size={25} className={fontcolor[post.id] ? "setcolor":"noheart"} />{heartnumber ? heartnumber["heartcount"][post.id]:0}</span>
                        <p className="post">{post.postcontent}</p>
                        </div>
                    )
                })
            }
            </PCDiv>
            </Container>
        </>
    )
    }else if(Tablet) {
        return (
            <>
                <Header />
                <Container>
                <TabDiv>
                <button className="returnbtn" onClick={doBoard}>掲示板へ戻る</button>
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
                            <span className="content" onClick={()=>setcolorflag(post.id)} >{key+1}&nbsp;投稿者:{post.username}&emsp;投稿日:{moment(post.created_at).format("YYYY-MM-DD h:mm:ss")}&emsp;<FaHeart size={25} className={fontcolor[post.id] ? "setcolor":"noheart"} />{heartnumber ? heartnumber["heartcount"][post.id]:0}</span>
                            <p className="post">{post.postcontent}</p>
                            </div>
                        )
                    })
                }
                </TabDiv>
                </Container>
            </>
        )
    }else {
        return (
            <>
                <Header />
                <Container>
                <MobDiv>
                <button className="returnbtn" onClick={doBoard}>掲示板へ戻る</button>
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
                            <span className="content" onClick={()=>setcolorflag(post.id)} >{key+1}&nbsp;投稿者:{post.username}&emsp;投稿日:{moment(post.created_at).format("YYYY-MM-DD h:mm:ss")}&emsp;<FaHeart size={25} className={fontcolor[post.id] ? "setcolor":"noheart"} />{heartnumber ? heartnumber["heartcount"][post.id]:0}</span>
                            <p className="post">{post.postcontent}</p>
                            </div>
                        )
                    })
                }
                </MobDiv>
                </Container>
            </>
        )
    }
}

export default Boardcontent