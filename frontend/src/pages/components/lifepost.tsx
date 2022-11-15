import styled from "styled-components"
import React, {useState,useEffect,useRef, Fragment} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"
import {Header} from "./header"
import moment from "moment"
import Layout from "./layout"


const Steps = styled.div`
width:800px;
margin:20px 0 0 250px;

h1 {
    padding: 1rem 1rem;
    border-left: 5px solid #ff9800;
    background: #ffe0b2;
    color: #f57c00;
}
p {
    line-height:0.5;
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



export const Lifepost =()=>{
    const [title,setTitle] = useState("")
    const [lifeitem,setLifeitem] = useState("")
    const [headline,setHeadline] = useState("")
    const [content,setContent] = useState<any[]>([])
    const [detail,setDetail] = useState<any[]>([])
    const [checkcontent,setCheckcontent] = useState<any[]>([])
    const [formcount,setFormcount] = useState<string[]>(["1"])
    const [flag,setFlag] = useState("")
    const [lifepost,setLifepost] = useState("")
    const [formflag,setFormflag] = useState(false)

    const router = useRouter()

    const getenv = router.query.state as unknown as string

    useEffect(()=>{ 
        axios.get(getenv+"/lifeposts")
        .then(res=>{
            setLifepost(res.data)
        }).catch(error=>{
            console.log(error)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[flag])

    useEffect(()=>{
        if(formflag===true) {
            router.push({
                pathname:"/components/userlife",
                query:{life:"lifepost",state:getenv}
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[formflag])


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
        const obj = {[numberid]:value}

        setContent((content)=>([
            ...content,
            obj
        ]))

        const find = content.findIndex((content)=>content[numberid]||content[numberid]=="")
        if(find==-1) return
        content.splice(find,1)
    }

    const doDetail =(event:React.ChangeEvent<HTMLTextAreaElement>)=>{
        const id = event.target.tabIndex
        const value= event.target.value
        const obj = {[id]:value}

        setDetail((detail)=>([
            ...detail,
            obj
        ]))

        const find = detail.findIndex((detail)=>detail[id]||detail[id]=="")
        if(find==-1) return
        detail.splice(find,1)
    }

    const doCheckcontent = (event:React.ChangeEvent<HTMLTextAreaElement>)=>{
        const id = event.target.tabIndex
        const value = event.target.value
        const obj = {[id]:value}

        setCheckcontent((checkcontent)=>([
            ...checkcontent,
                obj
        ]))

        const find = checkcontent.findIndex((value)=>value[id]||value[id]=="")
        if(find==-1) return
        checkcontent.splice(find,1)
    }

    const doSubmit =(event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault()
        
        const jsoncontent = JSON.stringify(content)
        const jsondetail = JSON.stringify(detail)
        const jsoncheck = JSON.stringify(checkcontent)

        setFormflag(true)

        axios.post(getenv+"/lifeposts",
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
            console.log(res.data)
            setFlag(res.data)
            setFormflag(true)
        }).catch(error=>{
            console.log(error)
        })
    }

    return (
        <Layout>
            <Steps>
                <label>投稿タイトル(必須):</label><input onChange={doTitle} type={"text"}/>
                <br></br>
                <input type={"radio"} id={"1"} name={"Life"} value={"部屋探し・入居"} onChange={doLifeitem}/><label>部屋探し・入居</label>
                <input type={"radio"} id={"2"} name={"Life"} value={"入居前後の手続き"} onChange={doLifeitem}/><label>入居前後の手続き</label>
                <input type={"radio"} id={"3"} name={"Life"} value={"防犯・防災"} onChange={doLifeitem}/><label>防犯・防災</label>
                <input type={"radio"} id={"4"} name={"Life"} value={"掃除"} onChange={doLifeitem}/><label>掃除</label>
                <input type={"radio"} id={"5"} name={"Life"} value={"料理"} onChange={doLifeitem}/><label>料理</label>
                <input type={"radio"} id={"6"} name={"Life"} value={"洗濯"} onChange={doLifeitem}/><label>洗濯</label>
                <input type={"radio"} id={"7"} name={"Life"} value={"その他"} onChange={doLifeitem}/><label>その他</label>
                <input type={"radio"} id={"8"} name={"Life"} value={"項目を選択しない"} defaultChecked onChange={doLifeitem}/><label>項目を選択しない</label>

                <br></br>
                <h1><label>見出しの文章(必須):</label><input onChange={doHeadline} type={"text"}/></h1>
                <br></br>
                <button onClick={doFormplus}>入力項目を増やす</button><button onClick={doFormminus}>入力項目を減らす</button>
                <br></br>

                {formcount.map((count:string,key:number)=>{
                    return (
                        <div className="steps" key={key}>
                            <h2><label>{key+1}つ目の目次(必須):</label><input max={key+1} onChange={doContent} type={"text"}/></h2>
                            <br></br>
                            <label>内容(必須):</label><textarea rows={8} cols={70} tabIndex={key+1} onChange={doDetail} />
                            <br></br>
                            <label>{key+1}つ目の項目のまとめ(任意):</label><textarea rows={8} cols={70} tabIndex={key+1} onChange={doCheckcontent} />
                            <h2></h2>
                        </div>   
                    )
                })}

                <br></br>
                <button onClick={doSubmit}>送信する</button>
            </Steps>
        </Layout>
    )
}

export default Lifepost