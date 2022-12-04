import styled from "styled-components"
import Image from 'next/legacy/image'
import {Layout} from "./components/layout"
import Link from "next/link"

import {useState,useEffect} from "react"
import axios from "../csrf-axios"

const SDiv = styled.div`
padding: 20px 0px 0px 100px;
display: flex;
flex-wrap: wrap;
gap: 30px 20px;

.item {
    flex-direction: column;
    width:30%;
    display: flex;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
button {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    font-weight: 700;
    line-height: 1.5;
    padding: 0.5rem 1.5rem;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    text-align: center;
    vertical-align: middle;
    text-decoration: none;
    letter-spacing: 0.1em;
    border-radius: 0.5rem;
    border: 2px solid #27acd9;
    background: #27acd9;
    color: #fff;
}
`


export const Dailylifey = ()=>{
    const [env,setEnv] = useState("")
    const [error,setError] = useState("")
    const [userid,setUserid] = useState("")
    const [loginstate,setLoginstate] = useState("")
    console.log(process.env.NEXT_PUBLIC_PRODUCTION_ADDRESS)
            console.log(process.env.NEXT_PUBLIC_ADDRESS)

            console.log(env)


    useEffect(()=>{
        if(process.env.NEXT_PUBLIC_ADDRESS!==undefined) {
            console.log(process.env.NEXT_PUBLIC_PRODUCTION_ADDRESS)
            console.log(process.env.NEXT_PUBLIC_ADDRESS)
            setEnv(process.env.NEXT_PUBLIC_ADDRESS as string)
            axios.get(process.env.NEXT_PUBLIC_ADDRESS+"/sessionid")
            .then(res=>{
                axios.defaults.headers.common['X-CSRF-Token'] = res.headers['x-csrf-token'];
                setUserid(res.data.id)
                setLoginstate(res.data.state)
            }).catch(error=>{
                setError(error)
            })
        }else{
            console.log(process.env.NEXT_PUBLIC_PRODUCTION_ADDRESS)
            console.log(process.env.NEXT_PUBLIC_ADDRESS)
            setEnv(process.env.NEXT_PUBLIC_PRODUCTION_ADDRESS as string)
            axios.get(process.env.NEXT_PUBLIC_PRODUCTION_ADDRESS+"/sessionid")
            .then(res=>{
                axios.defaults.headers.common['X-CSRF-Token'] = res.headers['x-csrf-token'];
                setUserid(res.data.id)
                setLoginstate(res.data.state)
            }).catch(error=>{
                setError(error)
            })
        }
    },[])

    return (
    <Layout>       
    <SDiv>
        <div className="item">
            <p><strong>部屋探し・入居</strong></p>
            <Image src="/heya.png" layout="responsive" height="90" width="90" alt="heya"/> 
            <Link data-testid="heya" href="/components/detail/heya"><button><span>確認する</span></button></Link>
        </div>
        <div className="item">
            <p><strong>入居前後の手続き</strong></p>
            <Image src="/nyukyo.png" layout="responsive" height="90" width="90" alt="hikkoshi"/> 
            <Link data-testid="hikkoshi" href="/components/detail/hikkoshi"><button><span>確認する</span></button></Link>
        </div>
        <div className="item">
            <p><strong>防犯・防災</strong></p>
            <Image src="/bousai.png" layout="responsive" height="90" width="90" alt="bouhan"/> 
            <Link data-testid="bouhan" href="/components/detail/bouhan"><button><span>確認する</span></button></Link>
        </div>
        <div className="item">
            <p><strong>掃除</strong></p>
            <Image src="/souzi.png" layout="responsive" height="90" width="90" alt="souzi"/> 
            <Link data-testid="souzi" href="/components/detail/souzi"><button><span>確認する</span></button></Link>
        </div>
        <div className="item">
            <p><strong>料理</strong></p>
            <Image src="/ryouri.png" layout="responsive" height="90" width="90" alt="ryouri"/> 
            <Link data-testid="ryouri" href="/components/detail/ryouri"><button><span>確認する</span></button></Link>
        </div>
        <div className="item">
            <p><strong>洗濯</strong></p>
            <Image src="/sentaku.png" layout="responsive" height="90" width="90" alt="sentaku"/> 
            <Link data-testid="sentaku" href="/components/detail/sentaku"><button><span>確認する</span></button></Link>
        </div>
    </SDiv>
    </Layout>
    )
}

export default Dailylifey
