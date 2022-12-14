import styled from "styled-components"
import React, {useState,useEffect,useRef} from "react"
import axios from "../../setting-axios"
import {useRouter} from "next/router"
import Layout from "./layout"
import {FetchData} from "../../components/fetchdata"
import { useMediaQuery } from "react-responsive"
import {compressImage} from "../../image-compression"
import Image from "next/image"

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
.setimage {
    display: flex;
    justify-content: flex-start;

    img {
        height:auto;
        width:50%;
    }
}
span {
    color:red;
    font-weight:normal;
}
.filebutton {
    border: 0;
    text-align: center;
    display: inline-block;
    padding: 8px;
    width: 100px;
    margin: 7px;
    color: #ffffff;
    background-color: #FF9933;
    font-weight: 600;
    text-decoration: none;
    transition: box-shadow 200ms ease-out;
    cursor:pointer;
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
    margin-left:32px;
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
.setimage {
    display: flex;
    justify-content: flex-start;

    img {
        height:auto;
        width:50%;
    }
}
span {
    color:red;
    font-weight:normal;
}
.filebutton {
    border: 0;
    text-align: center;
    display: inline-block;
    padding: 8px;
    width: 100px;
    margin: 7px;
    color: #ffffff;
    background-color: #FF9933;
    font-weight: 600;
    text-decoration: none;
    transition: box-shadow 200ms ease-out;
    cursor:pointer;
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
    margin-left:32px;
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
width:340px;
margin-top:20px;

label {
    white-space: nowrap;
}
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
.filebutton {
    border: 0;
    text-align: center;
    display: inline-block;
    padding: 8px;
    width: 100px;
    margin: 7px;
    color: #ffffff;
    background-color: #FF9933;
    font-weight: 600;
    text-decoration: none;
    transition: box-shadow 200ms ease-out;
    cursor:pointer;
    transform: translate(0px,5px);
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
    transform: translate(35px,20px);
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
    transform: translate(105px,5px);
}
.koumoku {
    padding: 8px 50px 8px 15px;
    font-size: 16px;
    border-radius: 3px;
    border: 2px solid #ddd;
    box-sizing: border-box;
    transform: translate(-160px,35px);
}
.title {
    width: 80%;
    padding: 8px 15px;
    font-size: 16px;
    border-radius: 3px;
    border: 2px solid #ddd;
    box-sizing: border-box;
}
.headline {
    width: 90%;
    padding: 8px 15px;
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
.steps > h3 {
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

type Images = {
    [id:number]:any,
    sortid:number
}

type Sort = {
    sortid:number
}

type Checklife = {
    [id:number]:boolean
}

type Life = {
    [id:number]:string[],
    sortid:number,
    nullflag:boolean
}

export const Updatelife =()=>{
    const PCsize:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tabletsize:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})
    const {env,isLoading,isError} = FetchData()
    const [title,setTitle] = useState("")
    const [lifeitem,setLifeitem] = useState("")
    const [checklife,setChecklife] = useState<Checklife>({})
    const [headline,setHeadline] = useState("")
    const [image,setImage] = useState<Images[]>([])
    const [content,setContent] = useState<Content[]>([])
    const [detail,setDetail] = useState<Detail[]>([])
    const [checkcontent,setCheckcontent] = useState<Checkcontent[]>([])
    const [formcount,setFormcount] = useState<string[]>([])
    const [defaultdetail,setDefaultdetail] = useState<Detail[]>([])
    const [defaultcheck,setDefaultcheck] = useState<Checkcontent[]>([])
    const [currentContentid,setCurrentContentid] = useState(0)
    const router = useRouter()
    const updateid = router.query.id as unknown as number
    const updateuser = router.query.userid as unknown as number
    const contenttimer = useRef<NodeJS.Timer|null>(null)
    const detailtimer = useRef<NodeJS.Timer|null>(null)
    const checktimer = useRef<NodeJS.Timer|null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(()=>{
        if(!env||!updateid||!updateuser) return
            axios.post(env+"/userposts",
            {
                userpost: {
                    id:updateid,
                    user_id:updateuser
                }
            }).then(res=>{
                setTitle(res.data.title)
                setLifeitem(res.data.lifeitem)
                setHeadline(res.data.headline)
                setLifeitem(res.data.lifeitem)
                setImage(JSON.parse(res.data.image).sort((a:Sort,b:Sort)=>a.sortid - b.sortid))
                setContent(JSON.parse(res.data.content).sort((a:Sort,b:Sort)=>a.sortid - b.sortid))
                setDetail(JSON.parse(res.data.detail).sort((a:Sort,b:Sort)=>a.sortid - b.sortid))
                setDefaultdetail(JSON.parse(res.data.detail).sort((a:Sort,b:Sort)=>a.sortid - b.sortid))
                setCheckcontent(JSON.parse(res.data.checkcontent).sort((a:Sort,b:Sort)=>a.sortid - b.sortid))
                setDefaultcheck(JSON.parse(res.data.checkcontent).sort((a:Sort,b:Sort)=>a.sortid - b.sortid))
                    if(!formcount.length) {
                    JSON.parse(res.data.content).forEach(()=>{
                    setFormcount((formcount)=>([
                        ...formcount,
                        "1"
                        ]))
                    })
                    }
            }).catch(error=>{
                console.log(error)
            })
             // eslint-disable-next-line react-hooks/exhaustive-deps
    },[updateid,updateuser,env])

    useEffect(()=>{
        if(!lifeitem) return
        if(lifeitem==="?????????????????????") {
            setChecklife({1:true})
        }else if(lifeitem==="????????????????????????") {
            setChecklife({2:true})
        }else if(lifeitem==="???????????????") {
            setChecklife({3:true})
        }else if(lifeitem==="??????") {
            setChecklife({4:true})
        }else if(lifeitem==="??????") {
            setChecklife({5:true})
        }else if(lifeitem==="??????") {
            setChecklife({6:true})
        }else if(lifeitem==="?????????") {
            setChecklife({7:true})
        }else if(lifeitem==="none") {
            setChecklife({8:true})
        }
    },[lifeitem])

    if(isError) return <p>error</p>
    if(isLoading) return <p>lodaing...</p>

    const doTitle = (event:{target:HTMLInputElement})=>{
        setTitle(event.target.value)
    }

    const doLifeitem = (event:{target:HTMLInputElement})=>{
        const value = event.target.value
        const id = Number(event.target.id)
        const check = event.target.checked
        setLifeitem(value)
        setChecklife({[id]:check})
    }

    const doHeadline = (event:{target:HTMLInputElement})=>{
        setHeadline(event.target.value)
    }

    const inputClick = (currentid:number)=>{
        console.log("test")
        if(!inputRef.current) return
        setCurrentContentid(currentid)
        inputRef.current.click()
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
            {[length+1]:[],sortid:length+1,nullflag:true}
        ]))
        setCheckcontent((checkcontent)=>([
            ...checkcontent,
            {[length+1]:[],sortid:length+1,nullflag:true}
        ]))
    }

    const doFormminus = ()=>{
        const length = formcount.length
        if(length==1) return
        const count =formcount.splice(1,length-1)
        setFormcount(count)

        const contentfind = content.findIndex((content)=>content[length]||content[length]=="")
        const detailfind = detail.findIndex((detail)=>detail[length])
        const checkfind = checkcontent.findIndex((check)=>check[length])

        const defaultdetailfind = defaultdetail.findIndex((detail)=>detail[length])
        const defaultcheckfind = defaultcheck.findIndex((check)=>check[length])

        content.splice(contentfind,1)
        detail.splice(detailfind,1)
        checkcontent.splice(checkfind,1)

        defaultdetail.splice(defaultdetailfind,1)
        defaultcheck.splice(defaultcheckfind,1)

        const imagefilter = image.filter((value)=>{
            if(!value[length]) {
                return value
            }
        })
        setImage(imagefilter)
    }

    const doSetimage = async(event:React.ChangeEvent<HTMLInputElement>)=>{
        if(!event.target.files) return
        const reader = new FileReader()
        const id = currentContentid

        reader.onloadend = () => {
            const obj = {[id]:reader.result,sortid:id}
            setImage((image)=>([
                ...image,
                obj
            ]))
        }

        if(event.target.files[0]) {
        const compressimage = await compressImage(event.target.files[0])
        reader.readAsDataURL(compressimage)
        }
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

        const find = detail.findIndex((detail)=>detail[id])
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

        const find = checkcontent.findIndex((value)=>value[id])
        if(find==-1) return
        checkcontent.splice(find,1)
    }

    const doDeleteimage = (delid:number)=>{
        const filter = image.filter((value)=>{
            if(!value[delid]) {
                return value
            }
        })
        setImage(filter)
    }

    const doSubmit =(event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault()

        const nullcontent = content.find((value)=>value.nullflag)
        const nulldetail = detail.find((value)=>value.nullflag)

        if(!title.trim()||!headline.trim()||nullcontent||nulldetail) return

        const jsonimage = JSON.stringify(image)
        const jsoncontent = JSON.stringify(content)
        const jsondetail = JSON.stringify(detail)
        const jsoncheck = JSON.stringify(checkcontent)

        axios.patch(env+`/lifeposts/${updateid}`,
        {
            lifepost: {
                title:title,
                lifeitem:lifeitem==""||lifeitem=="????????????????????????" ? "none":lifeitem,
                headline:headline,
                image:jsonimage,
                content:jsoncontent,
                detail:jsondetail,
                checkcontent:jsoncheck
            }
        }).then(res=>{
            router.push("/components/userlife")
        }).catch(error=>{
            console.log(error)
        })
    }

    if(PCsize) {
        return (
            <Layout>
                <PC>
                    <label>??????????????????<span>(??????):</span></label><input defaultValue={title} className="title" onChange={doTitle} type={"text"}/>
                    <br></br><br></br>
                    <input type={"radio"} id={"1"} name={"Life"} value={"?????????????????????"} checked={checklife[1]} onChange={doLifeitem}/><label>?????????????????????</label>
                    <input type={"radio"} id={"2"} name={"Life"} value={"????????????????????????"} checked={checklife[2]} onChange={doLifeitem}/><label>????????????????????????</label>
                    <input type={"radio"} id={"3"} name={"Life"} value={"???????????????"} checked={checklife[3]} onChange={doLifeitem}/><label>???????????????</label>
                    <input type={"radio"} id={"4"} name={"Life"} value={"??????"} checked={checklife[4]} onChange={doLifeitem}/><label>??????</label>
                    <input type={"radio"} id={"5"} name={"Life"} value={"??????"} checked={checklife[5]} onChange={doLifeitem}/><label>??????</label>
                    <input type={"radio"} id={"6"} name={"Life"} value={"??????"} checked={checklife[6]} onChange={doLifeitem}/><label>??????</label>
                    <input type={"radio"} id={"7"} name={"Life"} value={"?????????"} checked={checklife[7]} onChange={doLifeitem}/><label>?????????</label>
                    <input type={"radio"} id={"8"} name={"Life"} value={"????????????????????????"} checked={checklife[8]} onChange={doLifeitem}/><label>????????????????????????</label>

                    <br></br>
                    <h1><label>??????????????????<span>(??????):</span></label><input defaultValue={headline} className="headline" onChange={doHeadline} type={"text"}/></h1>

                    <button className="koumokubtn" onClick={doFormplus}>??????????????????</button><button className="koumokubtn" onClick={doFormminus}>??????????????????</button><button className="sousin" onClick={doSubmit}>????????????</button>
                    <br></br>

                    {formcount.map((count:string,key:number)=>{
                        return (
                            <div className="steps" key={key}>
                                <h2><label>{key+1}???????????????<span>(??????)</span>:</label><input className="koumoku" max={key+1} defaultValue={content[key]?.[key+1]} onChange={doContent} type={"text"}/></h2>
                                <br></br>
                                <button className="filebutton" onClick={()=>inputClick(key+1)}>???????????????</button>
                                <input ref={inputRef} type={"file"} accept="image/*" style={{display:"none"}} onChange={doSetimage}/>
                                <button className="filebutton" onClick={()=>doDeleteimage(key+1)}>???????????????</button>
                                <br></br>
                                {image.map((value:any,seckey:number)=>{
                                    return (
                                        value[key+1] ?
                                        <React.Fragment key={seckey}>
                                            <Image src={value[key+1]} height="400" width="400" alt=""/>
                                        </React.Fragment>
                                        :
                                        <></>
                                    )
                                })}
                                <br></br>
                                <label className="labelnaiyou">??????<span>(??????):</span></label><textarea rows={8} cols={70} tabIndex={key+1} defaultValue={defaultdetail[key]?.[key+1].join("<br>").replace(/<br>/g,"\n")} onChange={doDetail} />
                                <br></br>
                                <label className="labelmatome">????????????(??????):</label><textarea rows={8} cols={70} tabIndex={key+1} defaultValue={defaultcheck[key]?.[key+1] ? defaultcheck[key]?.[key+1].join("<br>").replace(/<br>/g,"\n"):""} onChange={doCheckcontent} />
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
                        <label>??????????????????<span>(??????):</span></label><input defaultValue={title} className="title" onChange={doTitle} type={"text"}/>
                        <br></br><br></br>
                        <input type={"radio"} id={"1"} name={"Life"} value={"?????????????????????"} checked={checklife[1]} onChange={doLifeitem}/><label>?????????????????????</label>
                        <input type={"radio"} id={"2"} name={"Life"} value={"????????????????????????"} checked={checklife[2]} onChange={doLifeitem}/><label>????????????????????????</label>
                        <input type={"radio"} id={"3"} name={"Life"} value={"???????????????"} checked={checklife[3]} onChange={doLifeitem}/><label>???????????????</label>
                        <input type={"radio"} id={"4"} name={"Life"} value={"??????"} checked={checklife[4]} onChange={doLifeitem}/><label>??????</label>
                        <input type={"radio"} id={"5"} name={"Life"} value={"??????"} checked={checklife[5]} onChange={doLifeitem}/><label>??????</label>
                        <input type={"radio"} id={"6"} name={"Life"} value={"??????"} checked={checklife[6]} onChange={doLifeitem}/><label>??????</label>
                        <input type={"radio"} id={"7"} name={"Life"} value={"?????????"} checked={checklife[7]} onChange={doLifeitem}/><label>?????????</label>
                        <input type={"radio"} id={"8"} name={"Life"} value={"????????????????????????"} checked={checklife[8]} onChange={doLifeitem}/><label>????????????????????????</label>

                        <br></br>
                        <h1><label>??????????????????<span>(??????):</span></label><input defaultValue={headline} className="headline" onChange={doHeadline} type={"text"}/></h1>

                        <button className="koumokubtn" onClick={doFormplus}>??????????????????</button><button className="koumokubtn" onClick={doFormminus}>??????????????????</button><button className="sousin" onClick={doSubmit}>????????????</button>
                        <br></br>

                        {formcount.map((count:string,key:number)=>{
                            return (
                                <div className="steps" key={key}>
                                    <h2><label>{key+1}???????????????<span>(??????)</span>:</label><input className="koumoku" max={key+1} defaultValue={content[key]?.[key+1]} onChange={doContent} type={"text"}/></h2>
                                    <br></br>
                                    <button className="filebutton" onClick={()=>inputClick(key+1)}>???????????????</button>
                                    <input ref={inputRef} type={"file"} accept="image/*" style={{display:"none"}} onChange={doSetimage}/>
                                    <button className="filebutton" onClick={()=>doDeleteimage(key+1)}>???????????????</button>
                                    <br></br>
                                    {image.map((value:any,seckey:number)=>{
                                    return (
                                        value[key+1] ?
                                        <React.Fragment key={seckey}>
                                            <Image src={value[key+1]} height="400" width="400" alt=""/>
                                        </React.Fragment>
                                        :
                                        <></>
                                        )
                                    })}
                                    <br></br>
                                    <label className="labelnaiyou">??????<span>(??????):</span></label><textarea rows={8} cols={70} defaultValue={defaultdetail[key]?.[key+1].join("<br>").replace(/<br>/g,"\n")} tabIndex={key+1} onChange={doDetail} />
                                    <br></br>
                                    <label className="labelmatome">????????????(??????):</label><textarea rows={8} cols={70} tabIndex={key+1} defaultValue={defaultcheck[key]?.[key+1] ? defaultcheck[key]?.[key+1].join("<br>").replace(/<br>/g,"\n"):""} onChange={doCheckcontent} />
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
                        <label>??????????????????<span>(??????):</span></label><br></br><input defaultValue={title} className="title" onChange={doTitle} type={"text"}/>
                        <br></br><br></br>
                        <input type={"radio"} id={"1"} name={"Life"} value={"?????????????????????"} checked={checklife[1]} onChange={doLifeitem}/><label>?????????????????????</label>&emsp;
                        <input type={"radio"} id={"2"} name={"Life"} value={"????????????????????????"} checked={checklife[2]} onChange={doLifeitem}/><label>????????????????????????</label><br></br>
                        <input type={"radio"} id={"3"} name={"Life"} value={"???????????????"} checked={checklife[3]} onChange={doLifeitem}/><label>???????????????</label>&emsp;
                        <input type={"radio"} id={"4"} name={"Life"} value={"??????"} checked={checklife[4]} onChange={doLifeitem}/><label>??????</label>&emsp;
                        <input type={"radio"} id={"5"} name={"Life"} value={"??????"} checked={checklife[5]} onChange={doLifeitem}/><label>??????</label><br></br>
                        <input type={"radio"} id={"6"} name={"Life"} value={"??????"} checked={checklife[6]} onChange={doLifeitem}/><label>??????</label>&emsp;
                        <input type={"radio"} id={"7"} name={"Life"} value={"?????????"} checked={checklife[7]} onChange={doLifeitem}/><label>?????????</label>&emsp;
                        <input type={"radio"} id={"8"} name={"Life"} value={"????????????????????????"} checked={checklife[8]} onChange={doLifeitem}/><label>????????????????????????</label>

                        <br></br>
                        <h2 className="head"><label>??????????????????<span>(??????):</span></label><input defaultValue={headline} className="headline" onChange={doHeadline} type={"text"}/></h2>

                        <button className="kousin" onClick={doSubmit}>????????????</button><br></br>
                        <button className="koumokubtn" onClick={doFormplus}>??????????????????</button><button className="koumokubtn" onClick={doFormminus}>??????????????????</button>
                        <br></br>
                        <br></br>

                        {formcount.map((count:string,key:number)=>{
                            return (
                                <div className="steps" key={key}>
                                    <h3><label>{key+1}???????????????<span>(??????)</span>:</label><input className="koumoku" max={key+1} defaultValue={content[key]?.[key+1]} onChange={doContent} type={"text"}/></h3>
                                    <br></br>
                                    <button className="filebutton" onClick={()=>inputClick(key+1)}>???????????????</button>
                                    <input ref={inputRef} type={"file"} accept="image/*" style={{display:"none"}} onChange={doSetimage}/>
                                    <button className="filebutton" onClick={()=>doDeleteimage(key+1)}>???????????????</button>
                                    <br></br>
                                    {image.map((value:any,seckey:number)=>{
                                        return (
                                            value[key+1] ?
                                            <React.Fragment key={seckey}>
                                                <Image src={value[key+1]} layout="responsive" height="90" width="90" alt=""/>
                                            </React.Fragment>
                                            :
                                            <></>
                                        )
                                    })}
                                    <br></br>
                                    ??????<span>(??????)</span><textarea rows={8} cols={40} tabIndex={key+1} defaultValue={defaultdetail[key]?.[key+1].join("<br>").replace(/<br>/g,"\n")} onChange={doDetail} />
                                    <br></br>
                                    ????????????(??????)<textarea rows={8} cols={40} tabIndex={key+1} defaultValue={defaultcheck[key]?.[key+1] ? defaultcheck[key]?.[key+1].join("<br>").replace(/<br>/g,"\n"):""} onChange={doCheckcontent} />
                                    <h3></h3>
                                </div>
                            )
                        })}

                    </Mobile>
                </Layout>
            )
        }
}

export default Updatelife