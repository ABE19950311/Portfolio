import styled from "styled-components"
import React, {useState,useEffect} from "react"
import {useRouter} from "next/router"
import Image from 'next/image'


const SDiv = styled.div`
padding: 20px 0px 0px 100px;
display: flex;
flex-wrap: wrap;
gap: 30px 20px;
`

const SItem = styled.div`
width:30%;
text-align: center;
box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`

const Sbtn = styled.button`
    margin-top: auto;
    font-size: 0.7rem;
    font-weight: 700;
    line-height: 1.5;
    position: relative;
    display: inline-block;
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

    border: 1px solid #ccc;
    background: #f1e767;
    background: -webkit-gradient(linear, left top, left bottom, from(#fdfbfb), to(#ebedee));
    background: -webkit-linear-gradient(top, #fdfbfb 0%, #ebedee 100%);
    background: linear-gradient(to bottom, #fdfbfb 0%, #ebedee 100%);
    -webkit-box-shadow: inset 1px 1px 1px #fff;
    box-shadow: inset 1px 1px 1px #fff;

    &:hover {
        background: -webkit-gradient(linear, left bottom, left top, from(#fdfbfb), to(#ebedee));
        background: -webkit-linear-gradient(bottom, #fdfbfb 0%, #ebedee 100%);
        background: linear-gradient(to top, #fdfbfb 0%, #ebedee 100%);
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
    <SDiv>
        <SItem>
            <p><strong>部屋探し・入居</strong></p>
            <Image src="/heya.png" layout="responsive" height="90px" width="90px" alt="heya"/> 
            <Sbtn onClick={()=>Router("heya")}><span>確認する</span></Sbtn>
        </SItem>
        <SItem>
            <p><strong>入居前後の手続き</strong></p>
            <Image src="/nyukyo.png" layout="responsive" height="90px" width="90px" alt="heya"/> 
            <Sbtn onClick={()=>Router("hikkoshi")}><span>確認する</span></Sbtn>
        </SItem>
        <SItem>
            <p><strong>防犯・防災</strong></p>
            <Image src="/bousai.png" layout="responsive" height="90px" width="90px" alt="heya"/> 
            <Sbtn onClick={()=>Router("bouhan")}><span>確認する</span></Sbtn>
        </SItem>
        <SItem>
            <p><strong>掃除</strong></p>
            <Image src="/souzi.png" layout="responsive" height="90px" width="90px" alt="heya"/> 
            <Sbtn onClick={()=>Router("souzi")}><span>確認する</span></Sbtn>
        </SItem>
        <SItem>
            <p><strong>料理</strong></p>
            <Image src="/ryouri.png" layout="responsive" height="90px" width="90px" alt="heya"/> 
            <Sbtn onClick={()=>Router("ryouri")}><span>確認する</span></Sbtn>
        </SItem>
        <SItem>
            <p><strong>洗濯</strong></p>
            <Image src="/sentaku.png" layout="responsive" height="90px" width="90px" alt="heya"/> 
            <Sbtn onClick={()=>Router("sentaku")}><span>確認する</span></Sbtn>
        </SItem>
    </SDiv>
    )
}

export default Dailylifey