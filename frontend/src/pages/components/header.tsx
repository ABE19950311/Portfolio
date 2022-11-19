import styled from "styled-components"
import Link from "next/link"
import {useState,useEffect,useLayoutEffect} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"
import Image from 'next/image'
import useSWR from "swr"
import {FetchData} from "./fetchdata"
import { Transition } from '@headlessui/react'
import ReactLoading from 'react-loading';



const SHeader = styled.div`
    background-color: white;
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
    span {
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
    const {env,userid,loginstate,isLoading,isError} = FetchData()
    const [sessionid,setSessionid] = useState("")
    const [loginflag,setLoginflag] = useState("")

    useLayoutEffect(()=>{
        setSessionid(userid)
        setLoginflag(loginstate)
    },[userid,loginstate])

    if(isError) return <p>error</p>
    if(isLoading||loginflag=="") return (
        <Transition
            show={isLoading||loginflag==""}
            enter="transition-opacity duration-75 delay-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <SHeader><SLogo><Image src="/logo.png" width="100" height="100" alt="logo"/></SLogo><ReactLoading type="spin" /></SHeader>
        </Transition>
    )


    const logout = ()=>{
        axios.delete(env+"/logout" as string)
        .then(res=> {
            router.push("/");
            setSessionid("")
            setLoginflag("logout")
        }).catch(error=>{
            console.log("logouterror",error);
        })
    }

    const todo = ()=>{
        router.push({
            pathname:"/components/todo",
            })
    }

    const board = ()=>{
        router.push({
            pathname:"/components/board",
            })
    }

    const lifepost =()=>{
        router.push({
            pathname:"/components/lifepost",
            })
    }

    const userlife =()=>{
        router.push({
            pathname:"/components/userlife",
            })
    }

    const mypage = ()=>{
        axios.post(env+"/mypages",
            {
            users: {
                user_id:sessionid
            }
        }).then(res=>{
            console.log(res.data)
        }).catch(error=>{
            console.log(error)
        })
        router.push({
            pathname:"/components/mypage",
            })
    }

    return (
        <SHeader>
            <SLogo><Image src="/logo.png" width="100" height="100" alt="logo"/></SLogo>
            {loginflag=="login" ? 
            <SMenu>
                <Link href="/"><SItem><span><strong>トップページへ戻る</strong></span></SItem></Link>
                <Sbtn onClick={lifepost}><a href="#"><span><strong>生活情報を投稿する</strong></span></a></Sbtn>
                <Sbtn onClick={userlife}><a href="#"><span><strong>ユーザが投稿した情報を確認</strong></span></a></Sbtn>
                <Link href="/mappage"><SItem><span><strong>ハザードマップ</strong></span></SItem></Link>
                <Sbtn onClick={todo}><a href="#"><span><strong>TODOリスト</strong></span></a></Sbtn>
                <Link href="/components/calendar"><SItem><span><strong>カレンダー</strong></span></SItem></Link>
                <Sbtn onClick={board}><a href="#"><span><strong>掲示板</strong></span></a></Sbtn>
                <Sbtn onClick={mypage}><a href="#"><span><strong>マイページ</strong></span></a></Sbtn>
                <Sbtn onClick={logout}><a href="#"><span><strong>ログアウト</strong></span></a></Sbtn>
            </SMenu>
            :
            <SMenu>
                <Link href="/"><SItem><span><strong>トップページへ戻る</strong></span></SItem></Link>
                <Sbtn onClick={userlife}><a href="#"><span><strong>ユーザが投稿した情報を確認</strong></span></a></Sbtn>
                <Link href="/mappage"><SItem><span><strong>ハザードマップ</strong></span></SItem></Link>
                <Link href="/components/calendar"><SItem><span><strong>カレンダー</strong></span></SItem></Link>
                <Link href="/components/newaccount"><SItem><span><strong>新規登録</strong></span></SItem></Link>
                <Link href="/components/login"><SItem><span><strong>ログイン</strong></span></SItem></Link>
            </SMenu>
            }
        </SHeader>
    )
}

export default Header