import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "axios"
import {useRouter} from "next/router"

const Body = styled.div`
body {
    margin: 0;
}

p {
    margin: 0;
}

a {
    color: inherit;
    text-decoration: none;
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
`

const Container = styled.div`
border: 1px solid #ddd;
border-radius: 0 0 5px 5px;
`

const SHeader = styled.div`
    background: #00FFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    `

const SLogo = styled.div`
    padding:5px 0 0 5px;
    img {
        height:auto;
        width:100px;
    }
`

const SMenu = styled.div`
    padding: 15px 30px;
    display: flex;
    padding-left:5px;
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


export const Header = ()=>{
    const router = useRouter();

    const logout = ()=>{
        axios.delete(process.env.NEXT_PUBLIC_ADDRESS+"/logout" as string,
        {withCredentials:true})
        .then(res=> {
            router.push("/components/login");
        }).catch(error=>{
            console.log("logouterror",error);
        })
    }

    return (
        <Body>
        <Container>
        <SHeader>
            <SLogo>
                <img src="/logo.png" />
            </SLogo>
            <SMenu>
            <SNav>
                <Link href="/components/todo"><SItem><a href="#">Todoリスト</a></SItem></Link>
                <Link href="/components/calendar"><SItem><a href="#">カレンダー</a></SItem></Link>
                <Link href="/components/mainpage"><SItem><a href="#">手続きリストへ戻る</a></SItem></Link>
            </SNav>
            <Sbtn onClick={logout}><a href="#">ログアウト</a></Sbtn>
            </SMenu>
        </SHeader>
        </Container>
        </Body>
    )
}