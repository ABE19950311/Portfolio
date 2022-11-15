import styled from "styled-components"
import Link from "next/link"
import {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"
import Image from 'next/image'



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
    const [getenv,setGetenv] = useState("");
    const [sessionid,setSessionid] = useState("")

    useEffect(()=>{
        if(process.env.NEXT_PUBLIC_ADDRESS!==undefined) {
            setGetenv(process.env.NEXT_PUBLIC_ADDRESS)   
            axios.get(process.env.NEXT_PUBLIC_ADDRESS+"/sessions")
            .then(res=>{
                axios.defaults.headers.common['X-CSRF-Token'] = res.headers['x-csrf-token'];
            }).catch(error=>{
                console.log(error)
            })
            axios.get(process.env.NEXT_PUBLIC_ADDRESS+"/sessionid")
            .then(res=>{
                setSessionid(res.data)
            }).catch(error=>{
                console.log(error)
            })
        }else{
            setGetenv(process.env.NEXT_PUBLIC_PRODUCTION_ADDRESS as string)
            axios.get(process.env.NEXT_PUBLIC_PRODUCTION_ADDRESS+"/sessions")
            .then(res=>{
                axios.defaults.headers.common['X-CSRF-Token'] = res.headers['x-csrf-token'];
            }).catch(error=>{
                console.log(error)
            })
            axios.get(process.env.NEXT_PUBLIC_PRODUCTION_ADDRESS+"/sessionid")
            .then(res=>{
                setSessionid(res.data)
            }).catch(error=>{
                console.log(error)
            })
        }
    },[])

    const logout = ()=>{
        axios.delete(getenv+"/logout" as string)
        .then(res=> {
            router.push("/");
            setSessionid("")
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

    const lifepost =()=>{
        router.push({
            pathname:"/components/lifepost",
            query:{state:getenv}
            })
    }

    const userlife =()=>{
        router.push({
            pathname:"/components/userlife",
            query:{state:getenv}
            })
    }

    const mypage = ()=>{
        axios.post(getenv+"/mypages",
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
            query:{state:getenv}
            })
    }

    return (
        <SHeader>
            <SLogo><Image src="/logo.png" width="100" height="100" alt="logo"/></SLogo>
            {sessionid ? 
            <SMenu>
                <Link href="/"><SItem><span>トップページへ戻る</span></SItem></Link>
                <Sbtn onClick={lifepost}><a href="#"><span>生活情報を投稿する</span></a></Sbtn>
                <Sbtn onClick={userlife}><a href="#"><span>ユーザが投稿した情報を確認</span></a></Sbtn>
                <Link href="/mappage"><SItem><span>ハザードマップ</span></SItem></Link>
                <Sbtn onClick={todo}><a href="#"><span>TODOリスト</span></a></Sbtn>
                <Link href="/components/calendar"><SItem><span>カレンダー</span></SItem></Link>
                <Sbtn onClick={board}><a href="#"><span>掲示板</span></a></Sbtn>
                <Sbtn onClick={mypage}><a href="#"><span>マイページ</span></a></Sbtn>
                <Sbtn onClick={logout}><a href="#"><span>ログアウト</span></a></Sbtn>
            </SMenu>
            :
            <SMenu>
                <Link href="/"><SItem><span>トップページへ戻る</span></SItem></Link>
                <Sbtn onClick={userlife}><a href="#"><span>ユーザが投稿した情報を確認</span></a></Sbtn>
                <Link href="/mappage"><SItem><span>ハザードマップ</span></SItem></Link>
                <Link href="/components/calendar"><SItem><span>カレンダー</span></SItem></Link>
                <Link href="/components/newaccount"><SItem><span>新規登録</span></SItem></Link>
                <Link href="/components/login"><SItem><span>ログイン</span></SItem></Link>
            </SMenu>
            }
        </SHeader>
    )
}

export default Header