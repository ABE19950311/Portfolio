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
            <a href="#">Imgyotei+SAMPLE inc.</a>
            </SLogo>
            <SMenu>
            <SNav>
                <Link href="/components/todo"><SItem><a href="#">Todoリスト</a></SItem></Link>
                <Link href="/components/calendar"><SItem><a href="#">カレンダー</a></SItem></Link>
                <SItem><a href="#">テキスト</a></SItem>
            </SNav>
            <Sbtn onClick={logout}>ログアウト</Sbtn>
            </SMenu>
        </SHeader>
        </Container>
        </Body>
    )
}