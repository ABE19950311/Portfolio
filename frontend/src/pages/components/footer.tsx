import styled from "styled-components"
import {FetchData} from "../../components/fetchdata"
import { useMediaQuery } from "react-responsive"
import Link from "next/link"
import React, {useState,useEffect,useLayoutEffect} from "react"
import axios from "../../csrf-axios"
import Image from 'next/image'
import useSWR from "swr"
import { Transition } from '@headlessui/react'
import ReactLoading from 'react-loading';
import { slide as Menu } from 'react-burger-menu'

const PCFooter = styled.div`
width: 100%;
background-color: white;
bottom: 0; /*下に固定*/
display:flex;
justify-content: space-between;

textarea  {
    margin:50px 50px 0 0;
}

span {
    display:inline-block;
    transform: translate(160px,-120px);
}

button {
    display:block;
    margin-top:5px;
    transform: translate(160px,0px);
}
`

const TabFooter = styled.div`
width: 100%;
background-color: white;
bottom: 0; /*下に固定*/

span {
    display:inline-block;
    transform: translate(160px,-120px);
}

button {
    display:inline-block;
    margin-bottom:40px;
    transform: translate(-375px,20px);
}
`

const MobFooter = styled.div`
width: 100%;
background-color: white;
bottom: 0; /*下に固定*/

textarea  {
    margin-left:50px;
}

span {
    display:inline-block;
    margin-left:50px;
}

button {
    display:block;
    margin:5px 0 20px 50px;
}
`

const SLogo = styled.div`
transform: translate(50px,5px);
`

const TabLogo = styled.div`
text-align:center;
`

const MobLogo = styled.div`
text-align:center;
`

export const Footer = ()=>{
    const PC:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tablet:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})
    const Mobile:boolean = useMediaQuery({query: '(max-width: 519px)'})
    const [contact,setContact] = useState("")
    const {env,userid,loginstate,isLoading,isError} = FetchData()
    const [sessionid,setSessionid] = useState("")

    useLayoutEffect(()=>{
        setSessionid(userid)
    },[userid])

    if(isError) return <p>error</p>
    if(isLoading) return <p>lodaing...</p>
    
    const doContact = (event:{target:HTMLTextAreaElement})=>{
        setContact(event.target.value)
    }

    const doSubmit = (event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault()

        axios.post(env+"/contacts",
        {
            contacts:{
                user_id:sessionid,
                contactpost:contact
            }
        }).then(res=>{
            console.log(res.data)
            setContact("")
        }).catch(error=>{
            console.log(error)
        })
    }

    if(PC) {
        return (
            <PCFooter>
                <SLogo><Image src="/logo.png" width="200" height="200" alt="logo"/></SLogo>
                <div>
                <span>お問い合わせはこちら</span>
                <textarea rows={6} cols={50} value={contact} onChange={doContact}></textarea>
                <button onClick={doSubmit}>送信する</button>
                </div>
            </PCFooter>
        )
    }else if(Tablet) {
        return (
            <TabFooter>
                <TabLogo><Image src="/logo.png" width="150" height="150" alt="logo"/></TabLogo>
                <div>
                <span>お問い合わせはこちら</span>
                <textarea rows={6} cols={50} value={contact} onChange={doContact}></textarea>
                <button onClick={doSubmit}>送信する</button>
                </div>
            </TabFooter>
        )
    }else {
        return (
            <MobFooter>
            <MobLogo><Image src="/logo.png" width="150" height="150" alt="logo"/></MobLogo>
            <div>
            <span>お問い合わせはこちら</span>
            <textarea rows={6} cols={50} value={contact} onChange={doContact}></textarea>
            <button onClick={doSubmit}>送信する</button>
            </div>
            </MobFooter>
        )
    }
}

export default Footer