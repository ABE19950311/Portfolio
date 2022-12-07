import styled from "styled-components"
import {FetchData} from "../../components/fetchdata"
import { useMediaQuery } from "react-responsive"
import React, {useState,useEffect} from "react"
import axios from "../../setting-axios"
import Image from 'next/image'

const PCFooter = styled.div`
width: 100%;
background-color: white;
bottom: 0; /*下に固定*/
display:flex;
justify-content: space-between;
align-items: center;

textarea  {
    margin:50px 50px 0 0;
}
.contact {
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

.contact {
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
.contact {
    display:inline-block;
    margin-left:50px;
}
button {
    display:block;
    margin:5px 0 20px 50px;
}
`

const TabLogo = styled.div`
    text-align:center;
`

const MobLogo = styled.div`
    text-align:center;
`

export const Footer = ()=>{
    const PCsize:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tabletsize:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})
    const [contact,setContact] = useState("")
    const {env,userid,isLoading,isError} = FetchData()
    const [sessionid,setSessionid] = useState("")

    useEffect(()=>{
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

    if(PCsize) {
        return (
            <PCFooter>
                <Image className="logo" src="/logo.png" width="200" height="200" alt="logo"/>
                <div>
                <span className="contact">お問い合わせはこちら</span>
                <textarea rows={6} cols={50} value={contact} onChange={doContact}></textarea>
                <button onClick={doSubmit}>送信する</button>
                </div>
            </PCFooter>
        )
    }else if(Tabletsize) {
        return (
            <TabFooter>
                <TabLogo><Image src="/logo.png" width="150" height="150" alt="logo"/></TabLogo>
                <div>
                <span className="contact">お問い合わせはこちら</span>
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
            <span className="contact">お問い合わせはこちら</span>
            <textarea rows={6} cols={50} value={contact} onChange={doContact}></textarea>
            <button onClick={doSubmit}>送信する</button>
            </div>
            </MobFooter>
        )
    }
}

export default Footer