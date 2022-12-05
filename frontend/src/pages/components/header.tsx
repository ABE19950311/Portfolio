import styled from "styled-components"
import Link from "next/link"
import {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/navigation"
import Image from 'next/image'
import {FetchData} from "../../components/fetchdata"
import { Transition } from '@headlessui/react'
import ReactLoading from 'react-loading';
import { useMediaQuery } from "react-responsive"
import { slide as Menu } from 'react-burger-menu'

const BeargerHeader = styled.div`
background-color: white;

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

const SBurgerMenu = styled.ul`
li {
    margin-bottom:15px;

    &:hover{
        color:#ffa500;
    }
}
`

const SHeader = styled.div`
background-color: white;
display: flex;
align-items: center;
justify-content: space-between;

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

li {
    align-items: center;
    justify-content: center;
    text-align: center;

    span {    
        margin-right:20px;
        font-size:1.3vw;
    }
    &:hover{
        color:#ffa500;
    }
}
`

const Sbtn = styled.div`
cursor:pointer;

&:hover{
    color:#ffa500;
}
`

const styles = {
position:"relative",

bmBurgerButton: {
    position: 'absolute',
    width: '36px',
    height: '30px',
    right:"30px",
    top: '36px'
},
bmBurgerBars: {
    background: '#373a47'
},
bmBurgerBarsHover: {
    background: '#a90000'
},
bmCrossButton: {
    height: '24px',
    width: '24px'
},
bmCross: {
    background: '#bdc3c7'
},
bmMenuWrap: {
    position: 'fixed',
    height: '100%'
},
bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
},
bmMorphShape: {
    fill: '#373a47'
},
bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
},
bmItem: {
    display: 'inline-block'
},
bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
}
}

export const Header = ()=>{
    const PCsize:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const router = useRouter();
    const {env,loginstate,isLoading,isError} = FetchData()
    const [loginflag,setLoginflag] = useState("")

    useEffect(()=>{
        setLoginflag(loginstate)
    },[loginstate])

    console.log(env)
            console.log(process.env.NEXT_PUBLIC_ADDRESS)
            console.log(process.env.NEXT_PUBLIC_PRODUCTION_ADDRESS)
            console.log(react-env-production)

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
            <SHeader><SLogo><Link href="/"><Image src="/logo.png" width="100" height="100" alt="logo"/></Link></SLogo><ReactLoading type="spin" /></SHeader>
        </Transition>
    )

    const logout = ()=>{
        axios.delete(env+"/logout" as string)
        .then(res=> {
            router.push("/");
            setLoginflag("logout")
        }).catch(error=>{
            console.log("logouterror",error);
        })
    }

    if(PCsize) {
        return (  
            <SHeader>
            <SLogo><Link href="/"><Image src="/logo.png" width="100" height="100" alt="logo"/></Link></SLogo>
            {loginflag=="login" ? 
            <SMenu>
                <Link href="/components/lifepost"><li><span><strong>生活情報を投稿する</strong></span></li></Link>
                <Link href="/components/userlife"><li><span><strong>投稿された内容を確認</strong></span></li></Link>
                <Link href="/mappage"><li><span><strong>ハザードマップ</strong></span></li></Link>
                <Link href="/components/todo"><li><span><strong>TODOリスト</strong></span></li></Link>
                <Link href="/components/calendar"><li><span><strong>カレンダー</strong></span></li></Link>
                <Link href="/components/board"><li><span><strong>掲示板</strong></span></li></Link>
                <Link href="/components/mypage"><li><span><strong>マイページ</strong></span></li></Link>
                <Sbtn onClick={logout}><li><span><strong>ログアウト</strong></span></li></Sbtn>
            </SMenu>
            :
            <SMenu>
                <Link href="/components/userlife"><li><span><strong>投稿された内容を確認</strong></span></li></Link>
                <Link href="/mappage"><li><span><strong>ハザードマップ</strong></span></li></Link>
                <Link href="/components/calendar"><li><span><strong>カレンダー</strong></span></li></Link>
                <Link href="/components/newaccount"><li><span><strong>新規登録</strong></span></li></Link>
                <Link href="/components/login"><li><span><strong>ログイン</strong></span></li></Link>
            </SMenu>
            } 
            </SHeader>
        )
    }else{
        return (
            <BeargerHeader>
            <SLogo><Link href="/"><Image src="/logo.png" width="100" height="100" alt="logo"/></Link></SLogo>
            {loginflag=="login" ?
            <Menu right styles={styles}>
            <SBurgerMenu>
                <Link href="/components/lifepost"><li><span><strong>生活情報を投稿する</strong></span></li></Link>
                <Link href="/components/userlife"><li><span><strong>投稿された内容を確認</strong></span></li></Link>
                <Link href="/mappage"><li><span><strong>ハザードマップ</strong></span></li></Link>
                <Link href="/components/todo"><li><span><strong>TODOリスト</strong></span></li></Link>
                <Link href="/components/calendar"><li><span><strong>カレンダー</strong></span></li></Link>
                <Link href="/components/board"><li><span><strong>掲示板</strong></span></li></Link>
                <Link href="/components/mypage"><li><span><strong>マイページ</strong></span></li></Link>
                <Sbtn onClick={logout}><a href="#"><span><strong>ログアウト</strong></span></a></Sbtn>
            </SBurgerMenu>
            </Menu> 
            :
            <Menu right styles={styles}>
            <SBurgerMenu>
                <Link href="/components/userlife"><li><span><strong>投稿された内容を確認</strong></span></li></Link>
                <Link href="/mappage"><li><span><strong>ハザードマップ</strong></span></li></Link>
                <Link href="/components/calendar"><li><span><strong>カレンダー</strong></span></li></Link>
                <Link href="/components/newaccount"><li><span><strong>新規登録</strong></span></li></Link>
                <Link href="/components/login"><li><span><strong>ログイン</strong></span></li></Link>
            </SBurgerMenu>
            </Menu> 
            }
            </BeargerHeader>
        )
    }
}

export default Header