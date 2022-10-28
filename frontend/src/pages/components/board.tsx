import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import Router, {useRouter} from "next/router"
import Layout from "./layout"

export const Board = ()=>{
    const [name,setName] = useState("");
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const router=useRouter();

    const getenv = router.query.state as unknown as string;

    const doName = (event:{target:HTMLInputElement})=>{
        setName(event.target.value)
    }

    const doTitle = (event:{target:HTMLInputElement})=>{
        setTitle(event.target.value)
    }

    const doContent = (event:{target:HTMLTextAreaElement})=>{
        setContent(event.target.value)
    }

    const doSubmit = (event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
    }

    console.log(name)
    console.log(title)
    console.log(content)


    return (
        <>
        <Layout>
        <form>
        <input type="text" value={name} onChange={doName}/><input type="text" value={title} onChange={doTitle}/><br></br>
        <textarea rows={4} cols={40} value={content} onChange={doContent}/><br></br>
        <button type="submit" onClick={doSubmit}>作成する</button>
        </form>
        </Layout>
        </>
    )
}

export default Board