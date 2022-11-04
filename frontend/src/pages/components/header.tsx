import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"
import Image from 'next/image'



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
`

const SMenu = styled.ul`
    display: flex;
`

const Sbtn = styled.div`
margin-right:20px;
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
        margin-right:20px
    }

    &:hover{
        color:#ffa500;
    }
`

export const Header = ()=>{
    const router = useRouter();
    const [getenv,setGetenv] = useState("");

    useEffect(()=>{
        if(process.env.NEXT_PUBLIC_ADDRESS!==undefined) {
            setGetenv(process.env.NEXT_PUBLIC_ADDRESS)    
        }else{
            setGetenv(process.env.NEXT_PUBLIC_PRODUCTION_ADDRESS as string)
        }
    },[])

    console.log(getenv)

    const logout = ()=>{
        axios.delete(getenv+"/logout" as string)
        .then(res=> {
            router.push("/components/login");
        }).catch(error=>{
            console.log("logouterror",error);
        })
    }

    const todo = ()=>{
        router.push({
            pathname:"/components/todo",
            query:{state:getenv}
            })
    }

    const board = ()=>{
        router.push({
            pathname:"/components/board",
            query:{state:getenv}
            })
    }

    return (
        <SHeader>
            <SLogo><Image src="/logo.png" height="100px" width="100px" alt="logo"/></SLogo>
            <SMenu>
                <Link href="/mappage"><SItem><a href="#">ハザードマップ</a></SItem></Link>
                <Link href="/components/mainpage"><SItem><a href="#">手続きリストへ戻る</a></SItem></Link>
                <Link href="/components/calendar"><SItem><a href="#">カレンダー</a></SItem></Link>
                <Sbtn onClick={todo}><a href="#">TODOリスト</a></Sbtn>
                <Sbtn onClick={board}><a href="#">掲示板</a></Sbtn>
                <Sbtn onClick={logout}><a href="#">ログアウト</a></Sbtn>
            </SMenu>
        </SHeader>
    )
}

export default Header