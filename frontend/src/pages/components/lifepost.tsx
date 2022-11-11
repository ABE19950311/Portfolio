import styled from "styled-components"
import React, {useState,useEffect,useRef, Fragment} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"
import {Header} from "./header"
import moment from "moment"
import Layout from "./layout"

export const Lifepost =()=>{
    const [title,setTitle] = useState("")
    const [lifeitem,setLifeitem] = useState("")
    const [headline,setHeadline] = useState("")
    const [contnet,setContent] = useState({})
    const [detail,setDetail] = useState({})
    const [checkcontent,setCheckcontent] = useState("")
    const [formcount,setFormcount] = useState<any[]>([1])
    const [listcount,setListcount] = useState<number[]>([])

    const router = useRouter()

    const getenv = router.query.state as unknown as string

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
            1
        ]))
    }

    const doFormminus = ()=>{
        const length = formcount.length
        const count =formcount.splice(1,length-1)
        setFormcount(count)
    }

    const doListplus = (id:number)=>{
        setListcount((listcount)=>([
            ...listcount,
            id
        ]))
    }

    const doContent =(event:React.ChangeEvent<HTMLInputElement>)=>{
        const id = event.target.max
        const value= event.target.value

        setContent((content)=>({
            ...content,
            [id]:value
        }))
    }

    const doDetail =(event:React.ChangeEvent<HTMLTextAreaElement>)=>{
        const id = event.target.tabIndex
        const value= event.target.value

        setDetail((detail)=>({
            ...detail,
            [id]:value
        }))
    }

    const doSubmit =(event:React.MouseEvent<HTMLFormElement>)=>{
        event.preventDefault()

    }

    console.log(formcount)


    return (
        <Layout>
            <form onSubmit={doSubmit}>
                <label>投稿タイトル(必須):</label><input onChange={doTitle} type={"text"}/>
                <br></br>
                <input type={"radio"} id={"1"} name={"Life"} value={"部屋探し・入居"} onChange={doLifeitem}/><label>部屋探し・入居</label>
                <input type={"radio"} id={"2"} name={"Life"} value={"入居前後の手続き"} onChange={doLifeitem}/><label>入居前後の手続き</label>
                <input type={"radio"} id={"3"} name={"Life"} value={"防犯・防災"} onChange={doLifeitem}/><label>防犯・防災</label>
                <input type={"radio"} id={"4"} name={"Life"} value={"掃除"} onChange={doLifeitem}/><label>掃除</label>
                <input type={"radio"} id={"5"} name={"Life"} value={"料理"} onChange={doLifeitem}/><label>料理</label>
                <input type={"radio"} id={"6"} name={"Life"} value={"洗濯"} onChange={doLifeitem}/><label>洗濯</label>
                <input type={"radio"} id={"7"} name={"Life"} value={"その他"} onChange={doLifeitem}/><label>その他</label>
                <input type={"radio"} id={"8"} name={"Life"} value={"項目を選択しない"} onChange={doLifeitem}/><label>項目を選択しない</label>
                <br></br>
                <label>見出しの文章(必須):</label><input onChange={doHeadline} type={"text"}/>
                <br></br>
                <br></br>
                <button onClick={doFormplus}>入力項目を増やす</button><button onClick={doFormminus}>入力項目を減らす</button>

                {formcount.map((count:number,key:number)=>{
                    return (
                        <div className="plusform">
                            <label>{key+1}つ目の目次(必須):</label><input max={key+1} onChange={doContent} type={"text"}/>
                            <br></br>
                            <label>内容(必須):</label><textarea rows={8} cols={70} tabIndex={key+1} onChange={doDetail} />
                            <br></br>
                            <button onClick={()=>doListplus(1)}>リスト項目を増やす</button>
                        </div>   
                    )
                })}

                

                {/* {(()=>{
                    const form:any[] = [""]
                    const listarray:any = {}
                    const list:any[] = []
                    for(let i=1;i<3;++i) {
                        console.log(i)
                        form.push(
        

                            
                            {list.map((lists:any,key:number)=>{
                                    console.log(i)
                                    return (
                                        lists[i-1]
                                    )
                                })}
        
                        
                        )
                        {(()=>{
                            listcount.forEach((number:number,key:number)=>{
                                if(i==number||number==0) {
                                    list.push({[number]:<h1>test{number}</h1>})
                                }
                            })
                            
                        })()}  
                        // {(()=>{
                        //     for(let k=0;k<listcount.length;k++) {
                        //         let count = listcount[k]
                        //         listarray[count] = listarray[count] ? listarray[count]+1:1
                        //     }
                        //     for(let j=0;j<count;j++) {
                        //         list.push(
                        //             <><input /></>
                        //         )
                        //     }
                        // })()}  
                    }
                    return form
                })()} */}

                <br></br>
                <button type={"submit"}>送信する</button>
            </form>
        </Layout>
    )
}

export default Lifepost