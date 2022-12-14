import styled from "styled-components"
import React, {useState,useEffect,useRef} from "react"
import axios from "../../setting-axios"
import {useRouter} from "next/router"
import Layout from "./layout"
import {FetchData} from "../../components/fetchdata"
import { useMediaQuery } from "react-responsive"
import moment from "moment"
import ReactPaginate from 'react-paginate'; 

const PC = styled.div`
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
.setimage {
    display: flex;
    justify-content: flex-start;

    img {
        height:auto;
        width:50%;
    }
}
.namelabel {
    margin-bottom:3px;
    display: inline-block;
    width: 150px;
    top: 50%;
}
.commentlabel {
    margin-bottom:3px;
    display: inline-block;
    width: 150px;
    top: 50%;
    transform: translate(0px,-70px)
}
.commentspan {
    color:red;
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
.nologin {
    color: #364e96;
    padding: 0.5em 0;
    border-top: solid 3px #364e96;
    border-bottom: solid 3px #364e96;
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
    content: "POINT";  /* 好きな文字を記述 */
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
    list-style:none;
    font-weight: bold;
}
.steps {
    counter-reset: step-counter;
    position: relative;
    padding-left: 2rem; 
}
.steps:before {
    content: "";
    background-color: #111111;
    width: 2px;
    position: absolute;
    top: 0.7rem; 
    left: 0.7rem; 
    height: calc(100%); 
    z-index: 0;
}
.steps > h2 {
    counter-increment: step-counter;
    display: flex;
    align-items: center;
}
.steps > h2:before {
    content: counter(step-counter);
    background: #111111;
    color: white;
    font-size: 0.8rem;
    font-weight: normal;
    line-height: 1.5rem;
    text-align: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
    position: absolute;
    left: 0;
    z-index: 1;
}
.steps > h3 {
    counter-reset: step-counter;
    display: flex;
    align-items: center;
}
.steps > h3:before {
    content: "";
    background: #111111;
    color: white;
    font-size: 0.8rem;
    font-weight: normal;
    line-height: 1.5rem;
    text-align: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
    position: absolute;
    left: 0;
    z-index: 1;
}
.none {
    display:none;
}
`

const Tablet = styled.div`
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
.setimage {
    display: flex;
    justify-content: flex-start;

    img {
        height:auto;
        width:50%;
    }
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
.commentspan {
    color:red;
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
.nologin {
    color: #364e96;
    padding: 0.5em 0;
    border-top: solid 3px #364e96;
    border-bottom: solid 3px #364e96;
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
    content: "POINT";  
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
    list-style:none;
    font-weight: bold;
}
.steps {
    counter-reset: step-counter;
    position: relative;
    padding-left: 2rem; 
}
.steps:before {
    content: "";
    background-color: #111111;
    width: 2px;
    position: absolute;
    top: 0.7rem; 
    left: 0.7rem; 
    height: calc(100%); 
    z-index: 0;
}
.steps > h2 {
    counter-increment: step-counter;
    display: flex;
    align-items: center;
}
.steps > h2:before {
    content: counter(step-counter);
    background: #111111;
    color: white;
    font-size: 0.8rem;
    font-weight: normal;
    line-height: 1.5rem;
    text-align: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
    position: absolute;
    left: 0;
    z-index: 1;
}
.steps > h3 {
    counter-reset: step-counter;
    display: flex;
    align-items: center;
}
.steps > h3:before {
    content: "";
    background: #111111;
    color: white;
    font-size: 0.8rem;
    font-weight: normal;
    line-height: 1.5rem;
    text-align: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
    position: absolute;
    left: 0;
    z-index: 1;
}
`

const Mobile = styled.div`
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
.setimage {
    display: flex;
    justify-content: flex-start;

    img {
        height:auto;
        width:50%;
    }
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
.commentspan {
    color:red;
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
.nologin {
    color: #364e96;
    padding: 0.5em 0;
    border-top: solid 3px #364e96;
    border-bottom: solid 3px #364e96;
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
    content: "POINT";  
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
    list-style:none;
    font-weight: bold;
}
.steps {
    counter-reset: step-counter;
    position: relative;
    padding-left: 2rem; 
}
.steps:before {
    content: "";
    background-color: #111111;
    width: 2px;
    position: absolute;
    top: 0.7rem; 
    left: 0.7rem; 
    height: calc(100%); 
    z-index: 0;
}
.steps > h2 {
    counter-increment: step-counter;
    display: flex;
    align-items: center;
}
.steps > h2:before {
    content: counter(step-counter);
    background: #111111;
    color: white;
    font-size: 0.8rem;
    font-weight: normal;
    line-height: 1.5rem;
    text-align: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
    position: absolute;
    left: 0;
    z-index: 1;
}
.steps > h3 {
    counter-reset: step-counter;
    display: flex;
    align-items: center;
}
.steps > h3:before {
    content: "";
    background: #111111;
    color: white;
    font-size: 0.8rem;
    font-weight: normal;
    line-height: 1.5rem;
    text-align: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
    position: absolute;
    left: 0;
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

type Contents = {
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

type Content = {
    [id:number]:string,
    sortid:number,
    nullflag:boolean
}

type Detail = {
    [id:number]:string[],
    sortid:number,
    nullflag:boolean
}

type Checkcontent = {
    [id:number]:string[],
    sortid:number,
    nullflag:boolean
}

type Image = {
    [id:number]:string,
    sortid:number
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
    const PCsize:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tabletsize:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})
    const {env,userid,isLoading,isError} = FetchData()
    const [usercontent,setUsercontent] = useState<Contents>()
    const [name,setName] = useState("")
    const [comment,setComment] = useState<string[]>([])
    const [flag,setFlag] = useState("")
    const [commentdata,setCommentdata] = useState<Comment[]>([])
    const [image,setImage] = useState<Image[]>([])
    const [content,setContent] = useState<Content[]>([])
    const [detail,setDetail] = useState<Detail[]>([])
    const [checkcontent,setCheckcontent] = useState<Checkcontent[]>([])
    const [commentSlice,setCommentSlice] = useState<Comment[]>([])
    const [offset,setOffset] = useState(0); 
    const perPage: number = 5; 

    const formRef = useRef<HTMLTextAreaElement>(null)
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
            setImage(JSON.parse(res.data.image).sort((a:Sort,b:Sort)=>a.sortid - b.sortid))
            setContent(JSON.parse(res.data.content).sort((a:Sort,b:Sort)=>a.sortid - b.sortid))
            setDetail(JSON.parse(res.data.detail).sort((a:Sort,b:Sort)=>a.sortid - b.sortid))
            setCheckcontent(JSON.parse(res.data.checkcontent).sort((a:Sort,b:Sort)=>a.sortid - b.sortid))
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
        const slicedata = commentdata.slice(offset,offset+perPage)
        setCommentSlice(slicedata)
    },[commentdata,offset])

    if(isError) return <p>error</p>
    if(isLoading) return <p>lodaing...</p>
    if(usercontent==undefined) return

    const doName= (event:React.ChangeEvent<HTMLInputElement>)=>{
        setName(event.target.value)
    }

    const doComment = (event:React.ChangeEvent<HTMLTextAreaElement>)=>{
        const value = event.target.value.trim().split("\n")
        setComment(value)
    }

    const doSubmit = (event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault()

        const existcommentcheck = comment.filter((value:string)=>{
            if(value) {
                return value
            }
        })

        if(!existcommentcheck.length) return
    
        const jsoncomment = JSON.stringify(comment)

        axios.post(env+"/comments",
        {
            comments: {
                lifepost_id:id,
                user_id:userid,
                comment:jsoncomment,
                commentuser:name ? name:"匿名さん"
            }
        }).then(res=>{
            setFlag(res.data)
            setName("")
            setComment([])
            if(!formRef.current) return
            formRef.current.value=""
        }).catch(error=>{
            console.log(error)
        })
    }

    const handlePageChange = (data:any) => {
        let page_number = data['selected']
        setOffset(page_number*perPage)
    }

    console.log(checkcontent)

    if(PCsize) {
    return (
        <Layout>
            <PC>
            <h1>{(usercontent as Contents).headline}</h1>
            <div className="steps">
            {content.map((content:Content,key:number)=>{
                return (
                        <React.Fragment key={key}>
                            <h2>{content[key+1]}</h2>
                            {image.map((image:Image,imgkey:number)=>{
                                return (
                                    <React.Fragment key={imgkey}>
                                        <div className="setimage">
                                        <img src={image[key+1]}/>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                            {detail[key][key+1].map((detdata:string,detkey:number)=>{
                                return (
                                    <React.Fragment key={detkey}>
                                        <p>{detdata}</p>
                                    </React.Fragment>
                                )
                            })}
                            {checkcontent[key].nullflag===false ?
                            <ul>
                            {checkcontent[key][key+1].map((checkdata:string,checkkey:number)=>{
                                return (
                                    <React.Fragment key={checkkey}>
                                        <li>{checkdata}</li>
                                    </React.Fragment>
                                )
                            })}
                            </ul>
                            :
                            <></>
                            }
                        </React.Fragment>
                    )
            })}
            <h3></h3>
            </div>
            <br></br>

            {userid ?
            <>
            <label className="namelabel">名前:</label><input type={"text"} value={name} onChange={doName} /><br></br>
            <label className="commentlabel">コメント内容<span className="commentspan">(必須)</span>:</label><textarea ref={formRef} rows={8} cols={70} onChange={doComment} /><br></br>
            <button type={"submit"} onClick={doSubmit} >コメントする</button><br></br>
            </>
            :
            <>
            <h3 className="nologin">コメントするにはログインをお願い致します</h3>
            <br></br>
            </>
            }
        
            {commentSlice.map((value:Comment,key:number)=>{
                return (
                    <div className="comment" key={key}>
                    <span className="content">&nbsp;{value.commentuser}&emsp;&emsp;{moment(value.created_at).format("YYYY-MM-DD h:mm:ss")}</span>
                    {JSON.parse(commentSlice[key].comment).map((value:string,comkey:number)=>{
                        return (
                            <React.Fragment key={comkey}>
                            <p className="postcomment">{value}</p>
                            </React.Fragment>
                        )
                    })}
                    </div>
                )
            })}
            </PC>
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
    }else if(Tabletsize) {
        return (
            <Layout>
                <Tablet>
                <h1>{(usercontent as Contents).headline}</h1>
                <div className="steps">
                {content.map((content:Content,key:number)=>{
                return (
                        <React.Fragment key={key}>
                            <h2>{content[key+1]}</h2>
                            {image.map((image:Image,imgkey:number)=>{
                                return (
                                    <React.Fragment key={imgkey}>
                                        <div className="setimage">
                                        <img src={image[key+1]}/>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                            {detail[key][key+1].map((detdata:string,detkey:number)=>{
                                return (
                                    <React.Fragment key={detkey}>
                                        <p>{detdata}</p>
                                    </React.Fragment>
                                )
                            })}
                            {checkcontent[key].nullflag===false ?
                            <ul>
                            {checkcontent[key][key+1].map((checkdata:string,checkkey:number)=>{
                                return (
                                    <React.Fragment key={checkkey}>
                                        <li>{checkdata}</li>
                                    </React.Fragment>
                                )
                            })}
                            </ul>
                            :
                            <></>
                            }
                        </React.Fragment>
                    )
                })}
                <h3></h3>
                </div>

                {userid ?
                <>
                <label className="namelabel">名前:</label><input type={"text"} value={name} onChange={doName} /><br></br>
                <label className="commentlabel">コメント内容:<span className="commentspan">(必須)</span></label><textarea ref={formRef} rows={8} cols={70} onChange={doComment} /><br></br>
                <button type={"submit"} onClick={doSubmit} >コメントする</button><br></br>
                </>
                :
                <>
                <br></br>
                <h3 className="nologin">コメントするにはログインをお願い致します</h3>
                <br></br>
                </>
                }
    
                {commentSlice.map((value:Comment,key:number)=>{
                return (
                    <div className="comment" key={key}>
                    <span className="content">&nbsp;{value.commentuser}&emsp;&emsp;{moment(value.created_at).format("YYYY-MM-DD h:mm:ss")}</span>
                    {JSON.parse(commentSlice[key].comment).map((value:string,comkey:number)=>{
                        return (
                            <React.Fragment key={comkey}>
                            <p className="postcomment">{value}</p>
                            </React.Fragment>
                        )
                    })}
                    </div>
                )
                })}
                </Tablet>
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
                <Mobile>
                <h1>{(usercontent as Contents).headline}</h1>
                <div className="steps">
                {content.map((content:Content,key:number)=>{
                return (
                        <React.Fragment key={key}>
                            <h2>{content[key+1]}</h2>
                            {image.map((image:Image,imgkey:number)=>{
                                return (
                                    <React.Fragment key={imgkey}>
                                        <div className="setimage">
                                        <img src={image[key+1]}/>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                            {detail[key][key+1].map((detdata:string,detkey:number)=>{
                                return (
                                    <React.Fragment key={detkey}>
                                        <p>{detdata}</p>
                                    </React.Fragment>
                                )
                            })}
                            {checkcontent[key].nullflag===false ?
                            <ul>
                            {checkcontent[key][key+1].map((checkdata:string,checkkey:number)=>{
                                return (
                                    <React.Fragment key={checkkey}>
                                        <li>{checkdata}</li>
                                    </React.Fragment>
                                )
                            })}
                            </ul>
                            :
                            <></>
                            }
                        </React.Fragment>
                    )
                })}
                <h3></h3>
                </div>
                <br></br>

                {userid ?
                <>
                <br></br>
                <br></br>
                <label className="namelabel">名前:</label><input type={"text"} value={name} onChange={doName} />
                <br></br>
                <br></br>
                <label className="commentlabel">コメント内容:<span className="commentspan">(必須)</span></label><textarea ref={formRef} rows={8} cols={60} onChange={doComment} />
                <br></br>
                <br></br>
                <button type={"submit"} onClick={doSubmit} >コメントする</button>
                </>
                :
                <>
                <h3 className="nologin">コメントするにはログインをお願い致します</h3>
                </>
                }
                
                <br></br>

                {commentSlice.map((value:Comment,key:number)=>{
                return (
                    <div className="comment" key={key}>
                    <span className="content">&nbsp;{value.commentuser}&emsp;&emsp;{moment(value.created_at).format("YYYY-MM-DD h:mm:ss")}</span>
                    {JSON.parse(commentSlice[key].comment).map((value:string,comkey:number)=>{
                        return (
                            <React.Fragment key={comkey}>
                            <p className="postcomment">{value}</p>
                            </React.Fragment>
                        )
                    })}
                    </div>
                    )
                })}
                </Mobile>
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

