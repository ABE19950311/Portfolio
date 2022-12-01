import styled from "styled-components"
import {useState,useEffect,useRef} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/navigation"
import Layout from "./layout"
import {FetchData} from "../../components/fetchdata"
import { useMediaQuery } from "react-responsive"

const PC = styled.div`
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
    width: 50%; 
    padding: 10px 15px; 
    font-size: 16px;
    border-radius: 3px; 
    border: 2px solid #ddd; 
    box-sizing: border-box; 
}
.title {
    width: 50%; 
    padding: 10px 15px; 
    font-size: 16px;
    border-radius: 3px; 
    border: 2px solid #ddd; 
    box-sizing: border-box; 
}
.headline {
    width: 50%;
    padding: 10px 15px; 
    font-size: 16px;
    border-radius: 3px; 
    border: 2px solid #ddd; 
    box-sizing: border-box; 
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
    display: flex;
    align-items: center;
}
.steps > h2:before {
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

const Tablet = styled.div`
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
    width: 50%; 
    padding: 10px 15px; 
    font-size: 16px;
    border-radius: 3px; 
    border: 2px solid #ddd; 
    box-sizing: border-box; 
}
.title {
    width: 50%; 
    padding: 10px 15px; 
    font-size: 16px;
    border-radius: 3px; 
    border: 2px solid #ddd; 
    box-sizing: border-box; 
}
.headline {
    width: 50%; 
    padding: 10px 15px; 
    font-size: 16px;
    border-radius: 3px; 
    border: 2px solid #ddd; 
    box-sizing: border-box; 
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
    display: flex;
    align-items: center;
}
.steps > h2:before {
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
.sousin {
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
    width: 50%; 
    padding: 10px 15px; 
    font-size: 16px;
    border-radius: 3px; 
    border: 2px solid #ddd; 
    box-sizing: border-box; 
}
.title {
    width: 50%; 
    padding: 10px 15px; 
    font-size: 16px;
    border-radius: 3px; 
    border: 2px solid #ddd; 
    box-sizing: border-box; 
}
.headline {
    width: 50%; 
    padding: 10px 15px; 
    font-size: 16px;
    border-radius: 3px; 
    border: 2px solid #ddd; 
    box-sizing: border-box; 
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
    display: flex;
    align-items: center;
}
.steps > h2:before {
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

export const Lifepost =()=>{
    const PCsize:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tabletsize:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})
    const {env,isLoading,isError} = FetchData()
    const [title,setTitle] = useState("")
    const [lifeitem,setLifeitem] = useState("")
    const [headline,setHeadline] = useState("")
    const [content,setContent] = useState<any[]>([])
    const [detail,setDetail] = useState<any[]>([])
    const [checkcontent,setCheckcontent] = useState<any[]>([])
    const [formflag,setFormflag] = useState(false)
    const [formcount,setFormcount] = useState<string[]>(["1"])
    const contenttimer = useRef<NodeJS.Timer|null>(null);
    const detailtimer = useRef<NodeJS.Timer|null>(null);
    const checktimer = useRef<NodeJS.Timer|null>(null);

    const router = useRouter()

    useEffect(()=>{
        if(formflag===true) {
            router.push("/components/userlife")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[formflag])

    useEffect(()=>{
        const initial = 1
        setContent([{[initial]:"",sortid:initial,nullflag:true}])
        setDetail([{[initial]:"",sortid:initial,nullflag:true}])
        setCheckcontent([{[initial]:"",sortid:initial,nullflag:true}])
    },[])

    if(isError) return <p>error</p>
    if(isLoading) return <p>lodaing...</p>

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
        const length = formcount.length
        setFormcount((formcount)=>([
            ...formcount,
            "1"
        ]))
        setContent((content)=>([
            ...content,
            {[length+1]:"",sortid:length+1,nullflag:true}
        ]))
        setDetail((detail)=>([
            ...detail,
            {[length+1]:"",sortid:length+1,nullflag:true}
        ]))
        setCheckcontent((checkcontent)=>([
            ...checkcontent,
            {[length+1]:"",sortid:length+1,nullflag:true}
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
        const nullflag = value.trim() ? false : true
        const obj = {[numberid]:value,sortid:numberid,nullflag:nullflag}
        
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
        const value= event.target.value.split("\n")
        const nullflag = event.target.value.trim() ? false : true
        const obj = {[id]:value,sortid:id,nullflag:nullflag}

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
        const value = event.target.value.split("\n")
        const nullflag = event.target.value.trim() ? false : true
        const obj = {[id]:value,sortid:id,nullflag:nullflag}

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

        const nullcontent = content.find((value)=>value.nullflag)
        const nulldetail = detail.find((value)=>value.nullflag)
    
        if(!title.trim()||!headline.trim()||nullcontent||nulldetail) return

        const jsoncontent = JSON.stringify(content)
        const jsondetail = JSON.stringify(detail)
        const jsoncheck = JSON.stringify(checkcontent)

        setFormflag(true)

        axios.post(env+"/lifeposts",
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
            setFormflag(true)
        }).catch(error=>{
            console.log(error)
        })
    }


    if(PCsize) {
    return (
        <Layout>
            <PC>
                <label>投稿タイトル<span>(必須):</span></label><input className="title"onChange={doTitle} type={"text"}/>
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
                <h1><label>見出しの文章<span>(必須):</span></label><input className="headline" onChange={doHeadline} type={"text"}/></h1>
        
                <button className="koumokubtn" onClick={doFormplus}>項目を増やす</button><button className="koumokubtn" onClick={doFormminus}>項目を減らす</button><button className="sousin" onClick={doSubmit}>送信する</button>
                <br></br>

                {formcount.map((count:string,key:number)=>{
                    return (
                        <div className="steps" key={key}>
                            <h2><label>{key+1}つ目の項目<span>(必須)</span>:</label><input className="koumoku" max={key+1} onChange={doContent} type={"text"}/></h2>
                            <br></br>
                            <label className="labelnaiyou">内容<span>(必須):</span></label><textarea rows={8} cols={70} tabIndex={key+1} onChange={doDetail} />
                            <br></br>
                            <label className="labelmatome">項目のまとめ(任意):</label><textarea rows={8} cols={70} tabIndex={key+1} onChange={doCheckcontent} />
                            <h2></h2>
                        </div>   
                    )
                })}

            </PC>
        </Layout>
    )
    }else if(Tabletsize) {
        return (
            <Layout>
                <Tablet>
                    <label>投稿タイトル<span>(必須):</span></label><input className="title"onChange={doTitle} type={"text"}/>
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
                    <h1><label>見出しの文章<span>(必須):</span></label><input className="headline" onChange={doHeadline} type={"text"}/></h1>
            
                    <button className="koumokubtn" onClick={doFormplus}>項目を増やす</button><button className="koumokubtn" onClick={doFormminus}>項目を減らす</button><button className="sousin" onClick={doSubmit}>送信する</button>
                    <br></br>
    
                    {formcount.map((count:string,key:number)=>{
                        return (
                            <div className="steps" key={key}>
                                <h2><label>{key+1}つ目の項目<span>(必須)</span>:</label><input className="koumoku" max={key+1} onChange={doContent} type={"text"}/></h2>
                                <br></br>
                                <label className="labelnaiyou">内容<span>(必須):</span></label><textarea rows={8} cols={70} tabIndex={key+1} onChange={doDetail} />
                                <br></br>
                                <label className="labelmatome">項目のまとめ(任意):</label><textarea rows={8} cols={70} tabIndex={key+1} onChange={doCheckcontent} />
                                <h2></h2>
                            </div>   
                        )
                    })}
    
                </Tablet>
            </Layout>
        )
    }else {
        return (
            <Layout>
                <Mobile>
                    <label>投稿タイトル<span>(必須):</span></label><input className="title"onChange={doTitle} type={"text"}/>
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
                    <h2 className="head"><label>見出しの文章<span>(必須):</span></label><input className="headline" onChange={doHeadline} type={"text"}/></h2>
            
                    <button className="koumokubtn" onClick={doFormplus}>項目を増やす</button><button className="koumokubtn" onClick={doFormminus}>項目を減らす</button><br></br>
                    <button className="sousin" onClick={doSubmit}>送信する</button>
                    <br></br>
                    <br></br>
    
                    {formcount.map((count:string,key:number)=>{
                        return (
                            <div className="steps" key={key}>
                                <h2><label>{key+1}つ目の項目<span>(必須)</span>:</label><input className="koumoku" max={key+1} onChange={doContent} type={"text"}/></h2>
                                <br></br>
                                内容<span>(必須)</span><textarea rows={8} cols={60} tabIndex={key+1} onChange={doDetail} />
                                <br></br>
                                項目のまとめ(任意)<textarea rows={8} cols={60} tabIndex={key+1} onChange={doCheckcontent} />
                                <h2></h2>
                            </div>   
                        )
                    })}
    
                </Mobile>
            </Layout>
        )
    }
}

export default Lifepost