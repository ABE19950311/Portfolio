import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "axios"
import {useRouter} from "next/router"

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

const SHeader = styled.div`
    background: #fef3ed;
    padding: 15px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    `

const SLogo = styled.div`
    a {
        display: flex;
        align-items: center;
    }

    img {
        margin-right: 10px;
    }
`

const SMenu = styled.div`
    display: flex;
    align-items: center;
`

const SNav = styled.ul`
display: flex;
`

const Sbtn = styled.div`
margin-left: 30px;
`

const SItem = styled.li`
    a {
        display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
    }
`


export const Header = (props:{title:string})=>{
    return (
        <Body>
        <Container>
        <SHeader>
            <SLogo>
            <a href="#">Imgyotei+SAMPLE inc.</a>
            </SLogo>
            <SMenu>
            <SNav>
                <Link href="/components/todo"><SItem><a href="#">Todoリスト</a></SItem></Link>
                <SItem><a href="#">テキストテキ</a></SItem>
                <SItem><a href="#">テキスト</a></SItem>
            </SNav>
            <Sbtn><a href="#">CONTACT</a></Sbtn>
            </SMenu>
        </SHeader>
        </Container>
        </Body>
    )
}