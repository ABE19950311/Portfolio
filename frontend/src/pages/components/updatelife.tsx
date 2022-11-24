import styled from "styled-components"
import {useState,useEffect,useRef} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"
import Layout from "./layout"
import {FetchData} from "../../components/fetchdata"
import { useMediaQuery } from "react-responsive"

const PCSteps = styled.div`
width:800px;
margin-top:20px;
margin-left:15vw;

h1 {
    padding: 1rem 1rem;
    border-left: 5px solid #ff9800;
    background: #ffe0b2;
    color: #f57c00;
}
p {
    line-height:0.5;
}
span {
    color:red;
    font-weight:normal;
}
.koumokubtn {
        border: 0;
        text-align: center;
        display: inline-block;
        padding: 11px;
        width: 120px;
        margin: 7px;
        color: #ffffff;
        background-color: #36a2eb;
        border-radius: 8px;
        font-weight: 600;
        text-decoration: none;
        transition: box-shadow 200ms ease-out;
        cursor:pointer;
}
.sousin {
    cursor: pointer;
    text-decoration: inherit;
    font-size: 1rem;
    color: white;
    background-color: black;
    padding: 0.5rem 2rem;
    border-image-slice: 1;
    border-image-Creator: linear-gradient(to left, #743ad5, #d53a9d);
    margin-left:250px;
}
.koumoku {
    width: 50%; /*親要素いっぱい広げる*/
    padding: 10px 15px; /*ボックスを大きくする*/
    font-size: 16px;
    border-radius: 3px; /*ボックス角の丸み*/
    border: 2px solid #ddd; /*枠線*/
    box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}
.title {
        width: 50%; /*親要素いっぱい広げる*/
        padding: 10px 15px; /*ボックスを大きくする*/
        font-size: 16px;
        border-radius: 3px; /*ボックス角の丸み*/
        border: 2px solid #ddd; /*枠線*/
        box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}
.headline {
        width: 50%; /*親要素いっぱい広げる*/
        padding: 10px 15px; /*ボックスを大きくする*/
        font-size: 16px;
        border-radius: 3px; /*ボックス角の丸み*/
        border: 2px solid #ddd; /*枠線*/
        box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
        transform: translate(0px,-4px);
}
.labelnaiyou {
    display: inline-block;
    transform: translate(0px,-60px);
    margin-left:64px;
}
.labelmatome {
    display: inline-block;
    transform: translate(0px,-60px);
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
display: flex;
align-items: center;
}
/* ①②③など連番 */
.steps > h2:before {
/* 連番カウンターの値を表示する */
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
margin-top:20px;
margin-left:75px;

h1 {
    padding: 1rem 1rem;
    border-left: 5px solid #ff9800;
    background: #ffe0b2;
    color: #f57c00;
}
p {
    line-height:0.5;
}
span {
    color:red;
    font-weight:normal;
}
.koumokubtn {
        border: 0;
        text-align: center;
        display: inline-block;
        padding: 11px;
        width: 120px;
        margin: 7px;
        color: #ffffff;
        background-color: #36a2eb;
        border-radius: 8px;
        font-weight: 600;
        text-decoration: none;
        transition: box-shadow 200ms ease-out;
        cursor:pointer;
}
.sousin {
    cursor: pointer;
    text-decoration: inherit;
    font-size: 1rem;
    color: white;
    background-color: black;
    padding: 0.5rem 2rem;
    border-image-slice: 1;
    border-image-Creator: linear-gradient(to left, #743ad5, #d53a9d);
    margin-left:250px;
}
.koumoku {
    width: 50%; /*親要素いっぱい広げる*/
    padding: 10px 15px; /*ボックスを大きくする*/
    font-size: 16px;
    border-radius: 3px; /*ボックス角の丸み*/
    border: 2px solid #ddd; /*枠線*/
    box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}
.title {
        width: 50%; /*親要素いっぱい広げる*/
        padding: 10px 15px; /*ボックスを大きくする*/
        font-size: 16px;
        border-radius: 3px; /*ボックス角の丸み*/
        border: 2px solid #ddd; /*枠線*/
        box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}
.headline {
        width: 50%; /*親要素いっぱい広げる*/
        padding: 10px 15px; /*ボックスを大きくする*/
        font-size: 16px;
        border-radius: 3px; /*ボックス角の丸み*/
        border: 2px solid #ddd; /*枠線*/
        box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
        transform: translate(0px,-4px);
}
.labelnaiyou {
    display: inline-block;
    transform: translate(0px,-60px);
    margin-left:64px;
}
.labelmatome {
    display: inline-block;
    transform: translate(0px,-60px);
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
display: flex;
align-items: center;
}
/* ①②③など連番 */
.steps > h2:before {
/* 連番カウンターの値を表示する */
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
width:519px;
margin-top:20px;

.head {
    padding: 1rem 1rem;
    border-left: 5px solid #ff9800;
    background: #ffe0b2;
    color: #f57c00;
}
p {
    line-height:0.5;
}
span {
    color:red;
    font-weight:normal;
}
.koumokubtn {
        border: 0;
        text-align: center;
        display: inline-block;
        padding: 11px;
        width: 120px;
        margin: 7px;
        color: #ffffff;
        background-color: #36a2eb;
        border-radius: 8px;
        font-weight: 600;
        text-decoration: none;
        transition: box-shadow 200ms ease-out;
        cursor:pointer;
        transform: translate(115px,0px);
}
.kousin {
    cursor: pointer;
    text-decoration: inherit;
    font-size: 1rem;
    color: white;
    background-color: black;
    padding: 0.5rem 2rem;
    border-image-slice: 1;
    border-image-Creator: linear-gradient(to left, #743ad5, #d53a9d);
    transform: translate(185px,10px);
}
.koumoku {
    width: 50%; /*親要素いっぱい広げる*/
    padding: 10px 15px; /*ボックスを大きくする*/
    font-size: 16px;
    border-radius: 3px; /*ボックス角の丸み*/
    border: 2px solid #ddd; /*枠線*/
    box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}
.title {
        width: 50%; /*親要素いっぱい広げる*/
        padding: 10px 15px; /*ボックスを大きくする*/
        font-size: 16px;
        border-radius: 3px; /*ボックス角の丸み*/
        border: 2px solid #ddd; /*枠線*/
        box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}
.headline {
        width: 50%; /*親要素いっぱい広げる*/
        padding: 10px 15px; /*ボックスを大きくする*/
        font-size: 16px;
        border-radius: 3px; /*ボックス角の丸み*/
        border: 2px solid #ddd; /*枠線*/
        box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
        transform: translate(0px,-4px);
}
.labelnaiyou {
    display: inline-block;
    transform: translate(0px,-60px);
    margin-left:64px;
}
.labelmatome {
    display: inline-block;
    transform: translate(0px,-60px);
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
display: flex;
align-items: center;
}
/* ①②③など連番 */
.steps > h2:before {
/* 連番カウンターの値を表示する */
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

type Life = {
    id:number,
    user_id:number,
    title:string,
    lifeitem:string,
    headline:string,
    created_at:Date,
    updated_at:Date,
    content:string[],
    detail:string[],
    checkcontent:string[]
}

type Sort = {
    sortid:number
}

export const Updatelife =()=>{
    const PC:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tablet:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})
    const Mobile:boolean = useMediaQuery({query: '(max-width: 519px)'})
    const {env,userid,loginstate,isLoading,isError} = FetchData()
    const [title,setTitle] = useState("")
    const [lifeitem,setLifeitem] = useState("")
    const [headline,setHeadline] = useState("")
    const [content,setContent] = useState<any[]>([])
    const [detail,setDetail] = useState<any[]>([])
    const [checkcontent,setCheckcontent] = useState<any[]>([])

    const [deftitle,defsetTitle] = useState("")
    const [deflifeitem,defsetLifeitem] = useState("")
    const [defheadline,defsetHeadline] = useState("")
    const [defcontent,defsetContent] = useState<any[]>([])
    const [defdetail,defsetDetail] = useState<any[]>([])
    const [defcheckcontent,defsetCheckcontent] = useState<any[]>([])
    
    const router = useRouter()
    const updateid = router.query.id as unknown as number
    const updateuser = router.query.userid as unknown as number
    const contenttimer = useRef<NodeJS.Timer|null>(null);
    const detailtimer = useRef<NodeJS.Timer|null>(null);
    const checktimer = useRef<NodeJS.Timer|null>(null);
    const [formcount,setFormcount] = useState<string[]>([])

    useEffect(()=>{
        if(!env||!updateid||!updateuser) return
            axios.post(env+"/userposts",
            {
                userpost: {
                    id:updateid,
                    user_id:updateuser
                }
            }).then(res=>{
                defsetTitle(res.data.title)
                defsetLifeitem(res.data.lifeitem)
                defsetHeadline(res.data.headline)
                    if(!formcount.length) {
                    JSON.parse(res.data.content).forEach(()=>{
                    setFormcount((formcount)=>([
                        ...formcount,
                        "1"
                        ]))
                    })
                    }
                defsetContent(JSON.parse(res.data.content))
                defsetDetail(JSON.parse(res.data.detail))
                defsetCheckcontent(JSON.parse(res.data.checkcontent))
            }).catch(error=>{
                console.log(error)
            })
             // eslint-disable-next-line react-hooks/exhaustive-deps
    },[updateid,updateuser,env])

    useEffect(()=>{
        setTitle(deftitle)
        setLifeitem(deflifeitem)
        setHeadline(defheadline)
        setContent(defcontent.sort((a:Sort,b:Sort)=>a.sortid - b.sortid))
        setDetail(defdetail.sort((a:Sort,b:Sort)=>a.sortid - b.sortid))
        setCheckcontent(defcheckcontent.sort((a:Sort,b:Sort)=>a.sortid - b.sortid))
    },[deftitle,deflifeitem,defheadline,defcontent,defdetail,defcheckcontent])

    if(isError) return <p>error</p>
    if(isLoading) return <p>lodaing...</p>

    console.log(content)
    console.log(detail)
    console.log(checkcontent)

    const doTitle = (event:{target:HTMLInputElement})=>{
        setTitle(event.target.value)
    }

    const doLifeitem = (event:{target:HTMLInputElement})=>{
        setLifeitem(event.target.value)
    }

    const doHeadline = (event:{target:HTMLInputElement})=>{
        setHeadline(event.target.value)
    }

    const doFormplus = ()=>{
        setFormcount((formcount)=>([
            ...formcount,
            "1"
        ]))
    }
    
    const doFormminus = ()=>{
        const length = formcount.length
        if(length==1) return
        const count =formcount.splice(1,length-1)
        setFormcount(count)

        const contentfind = content.findIndex((content)=>content[length]||content[length]=="")
        const detailfind = detail.findIndex((detail)=>detail[length]||detail[length]=="")
        const checkfind = checkcontent.findIndex((value)=>value[length]||value[length]=="")
    
        content.splice(contentfind,1)
        detail.splice(detailfind,1)
        checkcontent.splice(checkfind,1)
    }


    const doContent =(event:React.ChangeEvent<HTMLInputElement>)=>{
        const id = event.target.max
        const numberid = Number(id)
        const value= event.target.value
        const obj = {[numberid]:value,sortid:numberid}
        
        if(contenttimer.current) clearTimeout(contenttimer.current)

        contenttimer.current = setTimeout(()=>{
            setContent((content)=>([
                ...content,
                obj
            ]))
        },200)

        const find = content.findIndex((content)=>content[numberid]||content[numberid]=="")
        if(find==-1) return
        content.splice(find,1)

    }

    const doDetail =(event:React.ChangeEvent<HTMLTextAreaElement>)=>{
        const id = event.target.tabIndex
        const value= event.target.value
        const obj = {[id]:value,sortid:id}

        if(detailtimer.current) clearTimeout(detailtimer.current)

        detailtimer.current = setTimeout(()=>{
        setDetail((detail)=>([
            ...detail,
            obj
        ]))
        },200)

        const find = detail.findIndex((detail)=>detail[id]||detail[id]=="")
        if(find==-1) return
        detail.splice(find,1)
    }

    const doCheckcontent = (event:React.ChangeEvent<HTMLTextAreaElement>)=>{
        const id = event.target.tabIndex
        const value = event.target.value
        const obj = {[id]:value,sortid:id}

        if(checktimer.current) clearTimeout(checktimer.current)

        checktimer.current = setTimeout(()=>{
        setCheckcontent((checkcontent)=>([
            ...checkcontent,
                obj
        ]))
        },200)

        const find = checkcontent.findIndex((value)=>value[id]||value[id]=="")
        if(find==-1) return
        checkcontent.splice(find,1)
    }

    const doSubmit =(event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault()
        
        const jsoncontent = JSON.stringify(content)
        const jsondetail = JSON.stringify(detail)
        const jsoncheck = JSON.stringify(checkcontent)

        axios.patch(env+`/lifeposts/${updateid}`,
        {   
            lifepost: {
                title:title,
                lifeitem:lifeitem==""||lifeitem=="項目を選択しない" ? "none":lifeitem,
                headline:headline,
                content:jsoncontent,
                detail:jsondetail,
                checkcontent:jsoncheck
            }
        }).then(res=>{
            router.push({
                pathname:"/components/userlife",
                query:{life:"updatepost"}
                })
        }).catch(error=>{
            console.log(error)
        })
    }

    //defaultValue={defcontent[key+0]?.[key+1]
    console.log(defcontent)

    if(PC) {
        return (
            <Layout>
                <PCSteps>
                    <label>投稿タイトル<span>(必須):</span></label><input defaultValue={deftitle} className="title" onChange={doTitle} type={"text"}/>
                    <br></br><br></br>
                    <input type={"radio"} id={"1"} name={"Life"} value={"部屋探し・入居"} onChange={doLifeitem}/><label>部屋探し・入居</label>
                    <input type={"radio"} id={"2"} name={"Life"} value={"入居前後の手続き"} onChange={doLifeitem}/><label>入居前後の手続き</label>
                    <input type={"radio"} id={"3"} name={"Life"} value={"防犯・防災"} onChange={doLifeitem}/><label>防犯・防災</label>
                    <input type={"radio"} id={"4"} name={"Life"} value={"掃除"} onChange={doLifeitem}/><label>掃除</label>
                    <input type={"radio"} id={"5"} name={"Life"} value={"料理"} onChange={doLifeitem}/><label>料理</label>
                    <input type={"radio"} id={"6"} name={"Life"} value={"洗濯"} onChange={doLifeitem}/><label>洗濯</label>
                    <input type={"radio"} id={"7"} name={"Life"} value={"その他"} onChange={doLifeitem}/><label>その他</label>
                    <input type={"radio"} id={"8"} name={"Life"} value={"項目を選択しない"} defaultChecked onChange={doLifeitem}/><label>項目を選択しない</label>
    
                    <br></br>
                    <h1><label>見出しの文章<span>(必須):</span></label><input defaultValue={defheadline} className="headline" onChange={doHeadline} type={"text"}/></h1>
            
                    <button className="koumokubtn" onClick={doFormplus}>項目を増やす</button><button className="koumokubtn" onClick={doFormminus}>項目を減らす</button><button className="sousin" onClick={doSubmit}>送信する</button>
                    <br></br>
    
                    {formcount.map((count:string,key:number)=>{
                        return (
                            <div className="steps" key={key}>
                                <h2><label>{key+1}つ目の項目<span>(必須)</span>:</label><input className="koumoku" max={key+1} defaultValue={defcontent[key+0]?.[key+1]} onChange={doContent} type={"text"}/></h2>
                                <br></br>
                                <label className="labelnaiyou">内容<span>(必須):</span></label><textarea rows={8} cols={70} tabIndex={key+1} defaultValue={defdetail[key+0]?.[key+1]} onChange={doDetail} />
                                <br></br>
                                <label className="labelmatome">項目のまとめ(任意):</label><textarea rows={8} cols={70} tabIndex={key+1} defaultValue={defcheckcontent[key+0]?.[key+1]} onChange={doCheckcontent} />
                                <h2></h2>
                            </div>   
                        )
                    })}
    
                </PCSteps>
            </Layout>
        )
        }else if(Tablet) {
            return (
                <Layout>
                    <TabSteps>
                        <label>投稿タイトル<span>(必須):</span></label><input defaultValue={deftitle} className="title" onChange={doTitle} type={"text"}/>
                        <br></br><br></br>
                        <input type={"radio"} id={"1"} name={"Life"} value={"部屋探し・入居"} onChange={doLifeitem}/><label>部屋探し・入居</label>
                        <input type={"radio"} id={"2"} name={"Life"} value={"入居前後の手続き"} onChange={doLifeitem}/><label>入居前後の手続き</label>
                        <input type={"radio"} id={"3"} name={"Life"} value={"防犯・防災"} onChange={doLifeitem}/><label>防犯・防災</label>
                        <input type={"radio"} id={"4"} name={"Life"} value={"掃除"} onChange={doLifeitem}/><label>掃除</label>
                        <input type={"radio"} id={"5"} name={"Life"} value={"料理"} onChange={doLifeitem}/><label>料理</label>
                        <input type={"radio"} id={"6"} name={"Life"} value={"洗濯"} onChange={doLifeitem}/><label>洗濯</label>
                        <input type={"radio"} id={"7"} name={"Life"} value={"その他"} onChange={doLifeitem}/><label>その他</label>
                        <input type={"radio"} id={"8"} name={"Life"} value={"項目を選択しない"} defaultChecked onChange={doLifeitem}/><label>項目を選択しない</label>
        
                        <br></br>
                        <h1><label>見出しの文章<span>(必須):</span></label><input defaultValue={defheadline} className="headline" onChange={doHeadline} type={"text"}/></h1>
                
                        <button className="koumokubtn" onClick={doFormplus}>項目を増やす</button><button className="koumokubtn" onClick={doFormminus}>項目を減らす</button><button className="sousin" onClick={doSubmit}>送信する</button>
                        <br></br>
        
                        {formcount.map((count:string,key:number)=>{
                            return (
                                <div className="steps" key={key}>
                                    <h2><label>{key+1}つ目の項目<span>(必須)</span>:</label><input className="koumoku" max={key+1} defaultValue={defcontent[key+0]?.[key+1]} onChange={doContent} type={"text"}/></h2>
                                    <br></br>
                                    <label className="labelnaiyou">内容<span>(必須):</span></label><textarea rows={8} cols={70} defaultValue={defdetail[key+0]?.[key+1]} tabIndex={key+1} onChange={doDetail} />
                                    <br></br>
                                    <label className="labelmatome">項目のまとめ(任意):</label><textarea rows={8} cols={70} tabIndex={key+1} defaultValue={defcheckcontent[key+0]?.[key+1]} onChange={doCheckcontent} />
                                    <h2></h2>
                                </div>   
                            )
                        })}
        
                    </TabSteps>
                </Layout>
            )
        }else {
            return (
                <Layout>
                    <MobSteps>
                        <label>投稿タイトル<span>(必須):</span></label><input defaultValue={deftitle} className="title" onChange={doTitle} type={"text"}/>
                        <br></br><br></br>
                        <input type={"radio"} id={"1"} name={"Life"} value={"部屋探し・入居"} onChange={doLifeitem}/><label>部屋探し・入居</label>
                        <input type={"radio"} id={"2"} name={"Life"} value={"入居前後の手続き"} onChange={doLifeitem}/><label>入居前後の手続き</label>
                        <input type={"radio"} id={"3"} name={"Life"} value={"防犯・防災"} onChange={doLifeitem}/><label>防犯・防災</label>
                        <input type={"radio"} id={"4"} name={"Life"} value={"掃除"} onChange={doLifeitem}/><label>掃除</label>
                        <input type={"radio"} id={"5"} name={"Life"} value={"料理"} onChange={doLifeitem}/><label>料理</label><br></br>
                        <input type={"radio"} id={"6"} name={"Life"} value={"洗濯"} onChange={doLifeitem}/><label>洗濯</label>
                        <input type={"radio"} id={"7"} name={"Life"} value={"その他"} onChange={doLifeitem}/><label>その他</label>
                        <input type={"radio"} id={"8"} name={"Life"} value={"項目を選択しない"} defaultChecked onChange={doLifeitem}/><label>項目を選択しない</label>
        
                        <br></br>
                        <h2 className="head"><label>見出しの文章<span>(必須):</span></label><input defaultValue={defheadline} className="headline" onChange={doHeadline} type={"text"}/></h2>
                
                        <button className="koumokubtn" onClick={doFormplus}>項目を増やす</button><button className="koumokubtn" onClick={doFormminus}>項目を減らす</button><br></br>
                        <button className="kousin" onClick={doSubmit}>更新する</button>
                        <br></br>
                        <br></br>
        
                        {formcount.map((count:string,key:number)=>{
                            return (
                                <div className="steps" key={key}>
                                    <h2><label>{key+1}つ目の項目<span>(必須)</span>:</label><input className="koumoku" max={key+1} defaultValue={defcontent[key+0]?.[key+1]} onChange={doContent} type={"text"}/></h2>
                                    <br></br>
                                    内容<span>(必須)</span><textarea rows={8} cols={60} tabIndex={key+1} defaultValue={defdetail[key+0]?.[key+1]} onChange={doDetail} />
                                    <br></br>
                                    項目のまとめ(任意)<textarea rows={8} cols={60} tabIndex={key+1} defaultValue={defcheckcontent[key+0]?.[key+1]} onChange={doCheckcontent} />
                                    <h2></h2>
                                </div>   
                            )
                        })}
        
                    </MobSteps>
                </Layout>
            )
        }
}

export default Updatelife