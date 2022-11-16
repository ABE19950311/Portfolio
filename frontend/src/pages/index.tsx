import styled from "styled-components"
import {useRouter} from "next/router"
import Image from 'next/image'
import {Layout} from "./components/layout"


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
    const router=useRouter();

    const Router = (state:string) =>{
    router.push({
        pathname:"/components/detail",
        query:{state:state}
        })
    }

    return (
    <Layout>       
    <SDiv>
        <div className="item">
            <p><strong>部屋探し・入居</strong></p>
            <Image src="/heya.png" layout="responsive" height="90" width="90" alt="heya"/> 
            <button onClick={()=>Router("heya")}><span>確認する</span></button>
        </div>
        <div className="item">
            <p><strong>入居前後の手続き</strong></p>
            <Image src="/nyukyo.png" layout="responsive" height="90" width="90" alt="hikkoshi"/> 
            <button onClick={()=>Router("hikkoshi")}><span>確認する</span></button>
        </div>
        <div className="item">
            <p><strong>防犯・防災</strong></p>
            <Image src="/bousai.png" layout="responsive" height="90" width="90" alt="bouhan"/> 
            <button onClick={()=>Router("bouhan")}><span>確認する</span></button>
        </div>
        <div className="item">
            <p><strong>掃除</strong></p>
            <Image src="/souzi.png" layout="responsive" height="90" width="90" alt="souzi"/> 
            <button onClick={()=>Router("souzi")}><span>確認する</span></button>
        </div>
        <div className="item">
            <p><strong>料理</strong></p>
            <Image src="/ryouri.png" layout="responsive" height="90" width="90" alt="ryouri"/> 
            <button onClick={()=>Router("ryouri")}><span>確認する</span></button>
        </div>
        <div className="item">
            <p><strong>洗濯</strong></p>
            <Image src="/sentaku.png" layout="responsive" height="90" width="90" alt="sentaku"/> 
            <button onClick={()=>Router("sentaku")}><span>確認する</span></button>
        </div>
    </SDiv>
    </Layout>
    )
}

export default Dailylifey
