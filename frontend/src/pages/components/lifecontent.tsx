import styled from "styled-components"
import React, {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"
import Layout from "./layout"
import {FetchData} from "../../components/fetchdata"
import { useMediaQuery } from "react-responsive"

const PCSteps = styled.div`
width:800px;
margin-left:20vw;
overflow-wrap:  break-word;

h1 {
    padding: 1rem 1rem;
    border-left: 5px solid #ff9800;
    background: #ffe0b2;
    color: #f57c00;
}
p {
    font-size:20px;
}
ul {
    position: relative;
    padding: 15px 40px 15px 30px;
    font: 14px/1.6 'arial narrow', sans-serif;
    border: solid 2px #adcce8;
    border-radius:8px;
    color: #448ccb;
    width:400px;
    background: #fff;
}
ul:before{
    content: "CHECK";  /* 好きな文字を記述 */
    position: absolute;
    display: block;
    top: -15px;
    left: 20px;
    background: #fff;
    font-size: 16px;
    font-weight: bold;
    padding: 0 10px;
}
ul li{
    font-weight: bold;
}

.steps {
/* 連番カウンター名の定義 */
counter-reset: step-counter;
/* 縦棒との位置関係に必要 */
position: relative;
/* 縦棒と連番のためのスペースを左に確保 */
padding-left: 2rem; /* 連番(1.5rem) + 余白 */
}
/* 縦棒 */
.steps:before {
content: "";
/* 幅と色 */
background-color: #111111;
width: 2px;
/* 位置 */
position: absolute;
top: 0.7rem; /* 円のwidthの半分 */
left: 0.7rem; /* 円のwidthの半分 */
height: calc(100%); /* 100% - top */
/* 連番より後ろに表示するため */
z-index: 0;
}
.steps > h2 {
/* 連番カウンターを+1する */
counter-increment: step-counter;
/* 連番カウンターを垂直方向に中央揃えで表示する */
display: flex;
align-items: center;
}
/* ①②③など連番 */
.steps > h2:before {
/* 連番カウンターの値を表示する */
content: counter(step-counter);
/* フォントと色 */
background: #111111;
color: white;
font-size: 0.8rem;
font-weight: normal;
/* 文字を中央に表示する */
line-height: 1.5rem;
text-align: center;
/* 円で表示する */
width: 1.5rem;
height: 1.5rem;
border-radius: 1.5rem;
/* .stepsでmargin-left +2rem したぶん左に戻す */
position: absolute;
left: 0;
/* 縦棒より手前に表示するため */
z-index: 1;
}
.steps > h3 {
    counter-reset: step-counter;
    /* 連番カウンターを垂直方向に中央揃えで表示する */
    display: flex;
    align-items: center;
}
.steps > h3:before {
    content: "";
    /* フォントと色 */
    background: #111111;
    color: white;
    font-size: 0.8rem;
    font-weight: normal;
    /* 文字を中央に表示する */
    line-height: 1.5rem;
    text-align: center;
    /* 円で表示する */
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
    /* .stepsでmargin-left +2rem したぶん左に戻す */
    position: absolute;
    left: 0;
    /* 縦棒より手前に表示するため */
    z-index: 1;
}
`

const TabSteps = styled.div`
width:800px;
margin-left:75px;
overflow-wrap:  break-word;

h1 {
    padding: 1rem 1rem;
    border-left: 5px solid #ff9800;
    background: #ffe0b2;
    color: #f57c00;
}
p {
    font-size:20px;
}
ul {
    position: relative;
    padding: 15px 40px 15px 30px;
    font: 14px/1.6 'arial narrow', sans-serif;
    border: solid 2px #adcce8;
    border-radius:8px;
    color: #448ccb;
    width:400px;
    background: #fff;
}
ul:before{
    content: "CHECK";  /* 好きな文字を記述 */
    position: absolute;
    display: block;
    top: -15px;
    left: 20px;
    background: #fff;
    font-size: 16px;
    font-weight: bold;
    padding: 0 10px;
}
ul li{
    font-weight: bold;
}

.steps {
/* 連番カウンター名の定義 */
counter-reset: step-counter;
/* 縦棒との位置関係に必要 */
position: relative;
/* 縦棒と連番のためのスペースを左に確保 */
padding-left: 2rem; /* 連番(1.5rem) + 余白 */
}
/* 縦棒 */
.steps:before {
content: "";
/* 幅と色 */
background-color: #111111;
width: 2px;
/* 位置 */
position: absolute;
top: 0.7rem; /* 円のwidthの半分 */
left: 0.7rem; /* 円のwidthの半分 */
height: calc(100%); /* 100% - top */
/* 連番より後ろに表示するため */
z-index: 0;
}
.steps > h2 {
/* 連番カウンターを+1する */
counter-increment: step-counter;
/* 連番カウンターを垂直方向に中央揃えで表示する */
display: flex;
align-items: center;
}
/* ①②③など連番 */
.steps > h2:before {
/* 連番カウンターの値を表示する */
content: counter(step-counter);
/* フォントと色 */
background: #111111;
color: white;
font-size: 0.8rem;
font-weight: normal;
/* 文字を中央に表示する */
line-height: 1.5rem;
text-align: center;
/* 円で表示する */
width: 1.5rem;
height: 1.5rem;
border-radius: 1.5rem;
/* .stepsでmargin-left +2rem したぶん左に戻す */
position: absolute;
left: 0;
/* 縦棒より手前に表示するため */
z-index: 1;
}
.steps > h3 {
    counter-reset: step-counter;
    /* 連番カウンターを垂直方向に中央揃えで表示する */
    display: flex;
    align-items: center;
}
.steps > h3:before {
    content: "";
    /* フォントと色 */
    background: #111111;
    color: white;
    font-size: 0.8rem;
    font-weight: normal;
    /* 文字を中央に表示する */
    line-height: 1.5rem;
    text-align: center;
    /* 円で表示する */
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
    /* .stepsでmargin-left +2rem したぶん左に戻す */
    position: absolute;
    left: 0;
    /* 縦棒より手前に表示するため */
    z-index: 1;
}
`

const MobSteps = styled.div`
width:490px;
overflow-wrap:  break-word;

h1 {
    padding: 1rem 1rem;
    border-left: 5px solid #ff9800;
    background: #ffe0b2;
    color: #f57c00;
}
p {
    font-size:18px;
}
ul {
    position: relative;
    padding: 15px 40px 15px 30px;
    font: 14px/1.6 'arial narrow', sans-serif;
    border: solid 2px #adcce8;
    border-radius:8px;
    color: #448ccb;
    width:400px;
    background: #fff;
}
ul:before{
    content: "CHECK";  /* 好きな文字を記述 */
    position: absolute;
    display: block;
    top: -15px;
    left: 20px;
    background: #fff;
    font-size: 16px;
    font-weight: bold;
    padding: 0 10px;
}
ul li{
    font-weight: bold;
}

.steps {
/* 連番カウンター名の定義 */
counter-reset: step-counter;
/* 縦棒との位置関係に必要 */
position: relative;
/* 縦棒と連番のためのスペースを左に確保 */
padding-left: 2rem; /* 連番(1.5rem) + 余白 */
}
/* 縦棒 */
.steps:before {
content: "";
/* 幅と色 */
background-color: #111111;
width: 2px;
/* 位置 */
position: absolute;
top: 0.7rem; /* 円のwidthの半分 */
left: 0.7rem; /* 円のwidthの半分 */
height: calc(100%); /* 100% - top */
/* 連番より後ろに表示するため */
z-index: 0;
}
.steps > h2 {
/* 連番カウンターを+1する */
counter-increment: step-counter;
/* 連番カウンターを垂直方向に中央揃えで表示する */
display: flex;
align-items: center;
}
/* ①②③など連番 */
.steps > h2:before {
/* 連番カウンターの値を表示する */
content: counter(step-counter);
/* フォントと色 */
background: #111111;
color: white;
font-size: 0.8rem;
font-weight: normal;
/* 文字を中央に表示する */
line-height: 1.5rem;
text-align: center;
/* 円で表示する */
width: 1.5rem;
height: 1.5rem;
border-radius: 1.5rem;
/* .stepsでmargin-left +2rem したぶん左に戻す */
position: absolute;
left: 0;
/* 縦棒より手前に表示するため */
z-index: 1;
}
.steps > h3 {
    counter-reset: step-counter;
    /* 連番カウンターを垂直方向に中央揃えで表示する */
    display: flex;
    align-items: center;
}
.steps > h3:before {
    content: "";
    /* フォントと色 */
    background: #111111;
    color: white;
    font-size: 0.8rem;
    font-weight: normal;
    /* 文字を中央に表示する */
    line-height: 1.5rem;
    text-align: center;
    /* 円で表示する */
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
    /* .stepsでmargin-left +2rem したぶん左に戻す */
    position: absolute;
    left: 0;
    /* 縦棒より手前に表示するため */
    z-index: 1;
}
`

type Content = {
    id:number,
    user_id:number,
    title:string,
    lifeitem:string,
    headline:string,
    created_at:Date,
    updated_at:Date,
    content:string,
    detail:string,
    checkcontent:string
}

type Comment = {
    id:number,
    lifepost_id:number,
    user_id:number,
    comment:string,
    commentuser:string,
    created_at:Date,
    updated_at:Date
}

type Sort = {
    sortid:number
}

export const Lifecontent = ()=>{
    const PC:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tablet:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})
    const Mobile:boolean = useMediaQuery({query: '(max-width: 519px)'})
    const {env,userid,loginstate,isLoading,isError} = FetchData()
    const [usercontent,setUsercontent] = useState<Content>()
    const [commentflag,setCommentflag] = useState(false)
    const [name,setName] = useState("")
    const [comment,setComment] = useState("")
    const [flag,setFlag] = useState("")
    const [commentdata,setCommentdata] = useState([])
    const [rescontent,setRescontent] = useState<any[]>([])
    const [resdetail,setResdetail] = useState<any[]>([])
    const [rescheckcontent,setRescheckcontent] = useState<any[]>([])
    const [content,setContent] = useState<any[]>([])
    const [detail,setDetail] = useState<any[]>([])
    const [checkcontent,setCheckcontent] = useState<any[]>([])

    const router = useRouter()
    const id = router.query.id as unknown as number
    const user_id = router.query.user_id as unknown as number

    useEffect(()=>{
        if(!env) return
        axios.post(env+"/userposts",
        {
            userpost: {
                id:id,
                user_id:user_id
            }
        }).then(res=>{
            setUsercontent(res.data)
            setRescontent(JSON.parse(res.data.content))
            setResdetail(JSON.parse(res.data.detail))
            setRescheckcontent(JSON.parse(res.data.checkcontent))
        }).catch(error=>{
            console.log(error)
        })
    },[id,user_id,env])

    useEffect(()=>{
        if(!env) return
        axios.get(`${env}/comments/${id}}`)
        .then(res=>{
            setCommentdata(res.data)
        }).catch(error=>{
            console.log(error)
        })
    },[id,env,flag])
    
    useEffect(()=>{
        setContent(rescontent.sort((a:Sort,b:Sort)=>a.sortid - b.sortid))
        setDetail(resdetail.sort((a:Sort,b:Sort)=>a.sortid - b.sortid))
        setCheckcontent(rescheckcontent.sort((a:Sort,b:Sort)=>a.sortid - b.sortid))
    },[rescontent,resdetail,rescheckcontent])

    if(isError) return <p>error</p>
    if(isLoading) return <p>lodaing...</p>
    if(usercontent==undefined) return

    const doName= (event:React.ChangeEvent<HTMLInputElement>)=>{
        setName(event.target.value)
    }

    const doComment = (event:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setComment(event.target.value)
    }

    const doSubmit = (event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault()

        axios.post(env+"/comments",
        {
            comments: {
                lifepost_id:id,
                user_id:userid,
                comment:comment,
                commentuser:name
            }
        }).then(res=>{
            setFlag(res.data)
        }).catch(error=>{
            console.log(error)
        })
    }


    if(PC) {
    return (
        <Layout>
            <PCSteps>
            <h1>{(usercontent as Content).headline}</h1>
            <div className="steps">
            {content.map((content:string[],key:number)=>{
                return (
                        <React.Fragment key={key}>
                            <h2>{content[key+1]}</h2>
                        {detail.map((detail:string[],sekey:number)=>{
                            return(
                                <React.Fragment key={sekey}>
                                <p>{detail[key+1]}</p>
                                </React.Fragment>
                            )
                        })}
                        {checkcontent.map((checkcontent:string[],thkey:number)=>{
                            return(
                                <React.Fragment key={thkey}>
                                {checkcontent[key+1] ? <h4>{checkcontent[key+1]}</h4>:<></>}
                                </React.Fragment>
                            )
                        })}
                        </React.Fragment>
                    )
            })}
            <h3></h3>
            </div>
            <button onClick={()=>commentflag ? setCommentflag(false):setCommentflag(true)}>コメントをする</button><br></br>
            <label className={commentflag ? "":"none"}>名前:</label><input className={commentflag ? "":"none"} type={"text"} onChange={doName} /><br></br>
            <label className={commentflag ? "":"none"}>コメント内容:</label><textarea className={commentflag ? "":"none"} rows={8} cols={70} onChange={doComment} /><br></br>
            <button className={commentflag ? "":"none"} type={"submit"} onClick={doSubmit} >コメントする</button>

            {commentdata.map((value:Comment,key:number)=>{
                return (
                <React.Fragment key={key}>
                <p key={key}>{value.commentuser}</p>
                <p>{value.comment}</p>
                </React.Fragment>
                )
            })}
            </PCSteps>
        </Layout>
    )
    }else if(Tablet) {
        return (
            <Layout>
                <TabSteps>
                <h1>{(usercontent as Content).headline}</h1>
                <div className="steps">
                {content.map((content:string[],key:number)=>{
                return (
                        <React.Fragment key={key}>
                            <h2>{content[key+1]}</h2>
                        {detail.map((detail:string[],sekey:number)=>{
                            return(
                                <React.Fragment key={sekey}>
                                <p>{detail[key+1]}</p>
                                </React.Fragment>
                            )
                        })}
                        {checkcontent.map((checkcontent:string[],thkey:number)=>{
                            return(
                                <React.Fragment key={thkey}>
                                {checkcontent[key+1] ? <h4>{checkcontent[key+1]}</h4>:<></>}
                                </React.Fragment>
                            )
                        })}
                        </React.Fragment>
                    )
                })}
                <h3></h3>
                </div>
                <button onClick={()=>commentflag ? setCommentflag(false):setCommentflag(true)}>コメントをする</button><br></br>
                <label className={commentflag ? "":"none"}>名前:</label><input className={commentflag ? "":"none"} type={"text"} onChange={doName} /><br></br>
                <label className={commentflag ? "":"none"}>コメント内容:</label><textarea className={commentflag ? "":"none"} rows={8} cols={70} onChange={doComment} /><br></br>
                <button className={commentflag ? "":"none"} type={"submit"} onClick={doSubmit} >コメントする</button>
    
                {commentdata.map((value:Comment,key:number)=>{
                return (
                <React.Fragment key={key}>
                <p key={key}>{value.commentuser}</p>
                <p>{value.comment}</p>
                </React.Fragment>
                )
                })}
                </TabSteps>
            </Layout>
        )
    }else {
        return (
            <Layout>
                <MobSteps>
                <h1>{(usercontent as Content).headline}</h1>
                <div className="steps">
                {content.map((content:string[],key:number)=>{
                return (
                        <React.Fragment key={key}>
                            <h2>{content[key+1]}</h2>
                        {detail.map((detail:string[],sekey:number)=>{
                            return(
                                <React.Fragment key={sekey}>
                                <p>{detail[key+1]}</p>
                                </React.Fragment>
                            )
                        })}
                        {checkcontent.map((checkcontent:string[],thkey:number)=>{
                            return(
                                <React.Fragment key={thkey}>
                                {checkcontent[key+1] ? <h4>{checkcontent[key+1]}</h4>:<></>}
                                </React.Fragment>
                            )
                        })}
                        </React.Fragment>
                    )
                })}
                <h3></h3>
                </div>
                <br></br>
                <button onClick={()=>commentflag ? setCommentflag(false):setCommentflag(true)}>コメントをする</button>
                <br></br>
                <br></br>
                <label className={commentflag ? "":"none"}>名前:</label><input className={commentflag ? "":"none"} type={"text"} onChange={doName} />
                <br></br>
                <br></br>
                <label className={commentflag ? "":"none"}>コメント内容:</label><textarea className={commentflag ? "":"none"} rows={8} cols={60} onChange={doComment} />
                <br></br>
                <br></br>
                <button className={commentflag ? "":"none"} type={"submit"} onClick={doSubmit} >コメントする</button>
    
                {commentdata.map((value:Comment,key:number)=>{
                return (
                <React.Fragment key={key}>
                <p key={key}>{value.commentuser}</p>
                <p>{value.comment}</p>
                </React.Fragment>
                )
                })}
                </MobSteps>
            </Layout>
        )
    }
}

export default Lifecontent

