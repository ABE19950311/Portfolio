import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "axios"
import {useRouter} from "next/router"
import {MainPage} from "./mainpage"


const Body = styled.div`
html,
pre,
code,
button {
font-family: "游ゴシック体", YuGothic, "游ゴシック", "Yu Gothic", "メイリオ", Meiryo, sans-serif;
}

html {
    color: #333;
    font-size: 14px;
    line-height: 1.6;
}

body {
    margin: 0;
}

*,
*::before,
*::after {
    box-sizing: border-box;
}

img {
    border: 0;
    margin: 0;
    max-width: 100%;
    vertical-align: top;
}

p {
    margin: 0;
}

a {
    color: inherit;
    text-decoration: none;
}

table {
    border-collapse: collapse;
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-size: 14px;
    font-weight: normal;
    margin: 0;
    padding: 0;
}

#wrapper {
    position: relative;
}

.outer-block {
    min-width: 800px;
}

.inner-block {
    margin: 0 auto;
    padding: 0 15px;
    position: relative;
    width: 100%;
    max-width: 1400px;
}

.parent {
    color: orangered;
}
.child {
    color: olivedrab;
}
`

const Container = styled.div`
border: 1px solid #ddd;
border-radius: 0 0 5px 5px;
padding: 20px;
margin-bottom: 30px;
`

const SCard = styled.ul`
display: flex;
flex-wrap: wrap;
`

const SItem = styled.li`
width: 32%;
text-align: center;
`

const Stxt = styled.p`
background: #fff;
margin: 5px 0 15px;
padding: 10px;
flex-grow: 1; /* ★ポイント★ */
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


export const Procedure = ()=>{
    const router=useRouter();

    const Router = (state:string) =>{
    router.push({
        pathname:"/components/detail",
        query:{state:state}
        })
    }

    return (       
    <Body>
    <Container>
    <SCard>
        <SItem>
            <p>戸籍・住民登録</p>
            <Stxt>テキストテキストテキストテキストテキストテキストテキスト</Stxt>
            <Sbtn onClick={()=>Router("koseki")}><span>MORE</span></Sbtn>
        </SItem>
        <SItem>
            <p>保険年金</p>
            <Stxt>テキストテキストテキストテキストテキストテキストテキストテキストテキスト</Stxt>
            <Sbtn onClick={()=>Router("hoken")}><span>MORE</span></Sbtn>
        </SItem>
        <SItem>
            <p>福祉</p>
            <Stxt>テキストテキストテキストテキストテキストテキストテキスト</Stxt>
            <Sbtn onClick={()=>Router("fukushi")}><span>MORE</span></Sbtn>
        </SItem>
        <SItem>
            <p>税務</p>
            <Stxt>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</Stxt>
            <Sbtn onClick={()=>Router("zeimu")}><span>MORE</span></Sbtn>
        </SItem>
        <SItem>
            <p>タイトル</p>
            <Stxt>テキストテキストテキストテキストテキスト</Stxt>
            <Sbtn><span>MORE</span></Sbtn>
        </SItem>
    </SCard>
    </Container>
    </Body>
    )
}

