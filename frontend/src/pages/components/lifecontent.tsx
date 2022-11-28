import styled from "styled-components"
import React, {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"
import Layout from "./layout"
import {FetchData} from "../../components/fetchdata"
import { useMediaQuery } from "react-responsive"
import moment from "moment"
import ReactPaginate from 'react-paginate'; 

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
.namelabel {
    margin-bottom:3px;
    display: inline-block;
    width: 110px;
    top: 50%;
}
.commentlabel {
    margin-bottom:3px;
    display: inline-block;
    width: 110px;
    top: 50%;
    transform: translate(0px,-70px)
}
.comment {
    overflow-wrap:break-word;
    width:80%;
    display:inline-block;
    padding:10px 0 0 15px;
    margin-top:10px;
    background-color:#FFFFCC;
    border: solid 1px #FFFFCC;
}
    .content {
        font-size:16px;
    }

    .postcomment {
        font-size:16px;
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
.namelabel {
    margin-bottom:3px;
    display: inline-block;
    width: 110px;
    top: 50%;
}
.commentlabel {
    margin-bottom:3px;
    display: inline-block;
    width: 110px;
    top: 50%;
    transform: translate(0px,-70px)
}
.comment {
    overflow-wrap:break-word;
    width:80%;
    display:inline-block;
    padding:10px 0 0 15px;
    margin-top:10px;
    background-color:#FFFFCC;
    border: solid 1px #FFFFCC;
}
    .content {
        font-size:16px;
    }

    .postcomment {
        font-size:16px;
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
.namelabel {
    margin-bottom:3px;
    display: inline-block;
    width: 50px;
}
.commentlabel {
    margin-bottom:3px;
    display: inline-block;
    transform: translate(0px,0px)
}
.comment {
    overflow-wrap:break-word;
    width:95%;
    display:inline-block;
    padding:10px 0 0 15px;
    margin-top:10px;
    background-color:#FFFFCC;
    border: solid 1px #FFFFCC;
}
    .content {
        font-size:16px;
    }

    .postcomment {
        font-size:16px;
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

const PageContainer = styled.div`
margin: 24px 0;
& ul {
    display: flex;
    justify-content: center;
    font-size: 14px;
}
& li {
    list-style-type: none;
    margin: 0 4px;
    cursor: pointer;
    transition: opacity 0.2s ease;
    &:hover {
    opacity: 0.6;
    }
}
& .previous a, .next a {
    display: block;
    margin-top: 15px;
    width: 16px;
    height: 16px;
    text-indent: -1000px;
    transform: rotate(45deg);
    overflow: hidden;
}
& .previous a {
    border-left: 1px solid #39c;
    border-bottom: 1px solid #39c;
}
& .next a {
    border-top: 1px solid #39c;
    border-right: 1px solid #39c;
}
& li.selected {
    pointer-events: none;
}
& li.selected a {
    background-color: #39c !important;
    color: #fff !important;
}
& li:not(.previous,.next) a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border: 1px solid #39c;
    color: #39c;
}
& li.break a {
    border: none;
}
.disabled {
    opacity: 0.2;
    pointer-events: none;
}
@media (max-width: 600px) {
    & .previous a, .next a {
    margin-top: 13px;
    width: 8px;
    height: 8px;
    }
    & li:not(.previous,.next) a {
    width: 32px;
    height: 32px;
    }
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
    const [offset,setOffset] = useState(0); // 何番目のアイテムから表示するか
    const perPage: number = 5; // 1ページあたりに表示したいアイテムの数

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
                commentuser:name ? name:"匿名さん"
            }
        }).then(res=>{
            setFlag(res.data)
            setName("")
            setComment("")
        }).catch(error=>{
            console.log(error)
        })
    }

    const handlePageChange = (data:any) => {
        let page_number = data['selected']
        setOffset(page_number*perPage)
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
            <br></br>
            <label className="namelabel">名前:</label><input type={"text"} value={name} onChange={doName} /><br></br>
            <label className="commentlabel">コメント内容:</label><textarea  value={comment} rows={8} cols={70} onChange={doComment} /><br></br>
            <button type={"submit"} onClick={doSubmit} >コメントする</button><br></br>

            {commentdata.slice(offset,offset+perPage)
            .map((value:Comment,key:number)=>{
                return (
                    <div className="comment" key={key}>
                    <span className="content">&nbsp;{value.commentuser}&emsp;&emsp;{moment(value.created_at).format("YYYY-MM-DD h:mm:ss")}</span>
                    <p className="postcomment">{value.comment}</p>
                    </div>
                )
            })}
            </PCSteps>
            <PageContainer>
                <ReactPaginate
                    pageCount={Math.ceil(commentdata.length/perPage)} // 全部のページ数。端数の場合も考えて切り上げに。
                    marginPagesDisplayed={4} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
                    pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
                    onPageChange={handlePageChange} // クリック時のfunction
                    containerClassName="pagination justify-center" // ul(pagination本体)
                    pageClassName="page-item" // li
                    pageLinkClassName="page-link rounded-full" // a
                    activeClassName="active" // active.li
                    activeLinkClassName="active" // active.li < a
                    
                    // 戻る・進む関連
                    previousClassName="page-item" // li
                    nextClassName="page-item" // li
                    previousLabel={'<'} // a
                    previousLinkClassName="previous-link"
                    nextLabel={'>'} // a
                    nextLinkClassName="next-link"
                    // 先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくする
                    disabledClassName="disabled-button d-none"
                    // 中間ページの省略表記関連
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                />
                </PageContainer>
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
                <label className="namelabel">名前:</label><input type={"text"} value={name} onChange={doName} /><br></br>
                <label className="commentlabel">コメント内容:</label><textarea  value={comment} rows={8} cols={70} onChange={doComment} /><br></br>
                <button type={"submit"} onClick={doSubmit} >コメントする</button><br></br>
    
                {commentdata.slice(offset,offset+perPage)
                .map((value:Comment,key:number)=>{
                return (
                    <div className="comment" key={key}>
                    <span className="content">&nbsp;{value.commentuser}&emsp;&emsp;{moment(value.created_at).format("YYYY-MM-DD h:mm:ss")}</span>
                    <p className="postcomment">{value.comment}</p>
                    </div>
                )
                })}
                </TabSteps>
                <PageContainer>
                <ReactPaginate
                    pageCount={Math.ceil(commentdata.length/perPage)} // 全部のページ数。端数の場合も考えて切り上げに。
                    marginPagesDisplayed={4} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
                    pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
                    onPageChange={handlePageChange} // クリック時のfunction
                    containerClassName="pagination justify-center" // ul(pagination本体)
                    pageClassName="page-item" // li
                    pageLinkClassName="page-link rounded-full" // a
                    activeClassName="active" // active.li
                    activeLinkClassName="active" // active.li < a
                    
                    // 戻る・進む関連
                    previousClassName="page-item" // li
                    nextClassName="page-item" // li
                    previousLabel={'<'} // a
                    previousLinkClassName="previous-link"
                    nextLabel={'>'} // a
                    nextLinkClassName="next-link"
                    // 先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくする
                    disabledClassName="disabled-button d-none"
                    // 中間ページの省略表記関連
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                />
                </PageContainer>
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
                <br></br>
                <br></br>
                <label className="namelabel">名前:</label><input type={"text"} value={name} onChange={doName} />
                <br></br>
                <br></br>
                <label className="commentlabel">コメント内容:</label><textarea  value={comment} rows={8} cols={60} onChange={doComment} />
                <br></br>
                <br></br>
                <button type={"submit"} onClick={doSubmit} >コメントする</button>
                <br></br>

                {commentdata.slice(offset,offset+perPage)
                .map((value:Comment,key:number)=>{
                return (
                    <div className="comment" key={key}>
                    <span className="content">&nbsp;{value.commentuser}&emsp;&emsp;{moment(value.created_at).format("YYYY-MM-DD h:mm:ss")}</span>
                    <p className="postcomment">{value.comment}</p>
                    </div>
                    )
                })}
                </MobSteps>
                <PageContainer>
                <ReactPaginate
                    pageCount={Math.ceil(commentdata.length/perPage)} // 全部のページ数。端数の場合も考えて切り上げに。
                    marginPagesDisplayed={4} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
                    pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
                    onPageChange={handlePageChange} // クリック時のfunction
                    containerClassName="pagination justify-center" // ul(pagination本体)
                    pageClassName="page-item" // li
                    pageLinkClassName="page-link rounded-full" // a
                    activeClassName="active" // active.li
                    activeLinkClassName="active" // active.li < a
                    
                    // 戻る・進む関連
                    previousClassName="page-item" // li
                    nextClassName="page-item" // li
                    previousLabel={'<'} // a
                    previousLinkClassName="previous-link"
                    nextLabel={'>'} // a
                    nextLinkClassName="next-link"
                    // 先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくする
                    disabledClassName="disabled-button d-none"
                    // 中間ページの省略表記関連
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                />
                </PageContainer>
            </Layout>
        )
    }
}

export default Lifecontent

