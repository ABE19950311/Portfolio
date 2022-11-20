import styled from "styled-components"
import React, {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"
import Layout from "./layout"
import {FetchData} from "../../components/fetchdata"


const Steps = styled.div`
width:800px;
margin-left:250px;
overflow-wrap:break-word;

.none {
    display:none;
}

h1 {
    padding: 1rem 1rem;
    border-left: 5px solid #ff9800;
    background: #ffe0b2;
    color: #f57c00;
}
p {
    line-height:0.5;
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
    content: "TODO";  /* 好きな文字を記述 */
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

.check {
    position: relative;
    padding: 15px 40px 15px 30px;
    font: 14px/1.6 'arial narrow', sans-serif;
    border: solid 2px #adcce8;
    border-radius:8px;
    color: #448ccb;
    width:400px;
    background: #fff;
}

.check:before {
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

export const Lifecontent = ()=>{
    const {env,userid,loginstate,isLoading,isError} = FetchData()
    const [usercontent,setUsercontent] = useState<Content>()
    const [commentflag,setCommentflag] = useState(false)
    const [name,setName] = useState("")
    const [comment,setComment] = useState("")

    const router = useRouter()
    const id = router.query.id as unknown as number
    const user_id = router.query.user_id as unknown as number

    useEffect(()=>{
        axios.post(env+"/userposts",
        {
            userpost: {
                id:id,
                user_id:user_id
            }
        }).then(res=>{
            setUsercontent(res.data)
        }).catch(error=>{
            console.log(error)
        })
    },[id,user_id,env])

    if(isError) return <p>error</p>
    if(isLoading) return <p>lodaing...</p>
    if(usercontent==undefined) return

    const content = JSON.parse(usercontent.content)
    const detail = JSON.parse(usercontent.detail)
    const checkcontent = JSON.parse(usercontent.checkcontent)

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
            console.log(res.data)
        }).catch(error=>{
            console.log(error)
        })
    }


    return (
        <Layout>
            <Steps>
            <h1>{(usercontent as Content).headline}</h1>
            <div className="steps">
            {content.map((content:string[],key:number)=>{
                return (
                        <>
                        <h2 key={key}>{content[key+1]}</h2>
                        {detail.map((detail:string[])=>{
                            return(
                                <>
                                <p key={key}>{detail[key+1]}</p>
                                </>
                            )
                        })}
                        {checkcontent.map((checkcontent:string[])=>{
                            return(
                            <>
                                {checkcontent[key+1] ? <h4 key={key}>{checkcontent[key+1]}</h4>:<></>}
                            </>
                            )
                        })}
                        </>
                )
            })}
            <h3></h3>
            </div>
            <button onClick={()=>commentflag ? setCommentflag(false):setCommentflag(true)}>コメントをする</button><br></br>
            <label className={commentflag ? "":"none"}>名前:</label><input className={commentflag ? "":"none"} type={"text"} onChange={doName} /><br></br>
            <label className={commentflag ? "":"none"}>コメント内容:</label><textarea className={commentflag ? "":"none"} rows={8} cols={70} onChange={doComment} /><br></br>
            <button className={commentflag ? "":"none"} type={"submit"} onClick={doSubmit} >コメントする</button>
            </Steps>
        </Layout>
    )
}

export default Lifecontent

