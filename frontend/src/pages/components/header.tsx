import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "axios"
import {useRouter} from "next/router"


const SHeader = styled.div`
    background: #f0ffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    line-height: 0;
    width:100%
    

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

const SLogo = styled.div`
    padding:5px 0 0 5px;
    img {
        height:auto;
        width:100px;
    }
`

const SMenu = styled.ul`
    display: flex;
`

const Sbtn = styled.div`
margin: 0 30px;
&:hover{
    color:#ffa500;
}
`

const SItem = styled.li`
    a {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        height: 100%;
        padding-left:40px;
    }

    &:hover{
        color:#ffa500;
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
        <SHeader>
            <SLogo><img src="/logo.png"/></SLogo>
            <SMenu>
                <Link href="/components/todo"><SItem><a href="#">Todoリスト</a></SItem></Link>
                <Link href="/components/calendar"><SItem><a href="#">カレンダー</a></SItem></Link>
                <Link href="/components/mainpage"><SItem><a href="#">手続きリストへ戻る</a></SItem></Link>
            <Sbtn onClick={logout}><a href="#">ログアウト</a></Sbtn>
            </SMenu>
        </SHeader>
    )
}

export default Header