import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios, { AxiosRequestConfig } from "axios"
import {useRouter} from "next/router"
import {Header} from "./header"
import {Footer} from "./footer"
import {Procedure} from "./procedure"

type Todo = {
    id:number,
    list:string,
    procedure:string,
    startdate:Date,
    duedate:Date
}

const SForm = styled.form`

`

const SInput = styled.input`
width: 100%; /*親要素いっぱい広げる*/
padding: 10px 15px; /*ボックスを大きくする*/
font-size: 16px;
border-radius: 3px; /*ボックス角の丸み*/
border: 2px solid #ddd; /*枠線*/
box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
`
const SButton = styled.button`

`

export const Todo = ()=>{
    const [list,setList] = useState("");
    const [procedure,setProcedure] = useState("");
    const [todos,setTodos] = useState([]);
    const [flag,setFlag] = useState("");

    useEffect(()=>{
        axios.get(process.env.NEXT_PUBLIC_ADDRESS+"/todos" as string,
        {withCredentials:true}
        ).then(res=> {
            setTodos(res.data);
        }).catch(error=> {
            console.log("response error",error);
        })
    },[flag]);

    const doList = (event:{target:HTMLInputElement}) => {
        setList(event.target.value);
    }

    const doProcedure = (event:{target:HTMLInputElement}) => {
        setProcedure(event.target.value);
    }

    const doSubmit = (event:React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post(process.env.NEXT_PUBLIC_ADDRESS+"/todos" as string,
            {
                todos: {
                    list:list,
                    procedure:procedure
                }
            },
            {withCredentials:true}
        ).then(res=> {
            console.log(res.data);
            setFlag(res.data);
        }).catch(error=> {
            console.log("response error",error);
        })
    } 

    const doDelete = (id:number)=>{
        axios.delete(process.env.NEXT_PUBLIC_ADDRESS+`/todos/${id}` as string,
        {withCredentials:true}
        )
        .then(res => {
            setFlag(res.data);
        }).catch(error=> {
            console.log("response error",error);
        })
    }
    
    console.log(todos);

    return (
        <>
        <SForm onSubmit={doSubmit}>
            <SInput type={"text"} placeholder={"やること"} onChange={doList}/>
            <SInput type={"text"} placeholder={"手続き内容（任意）"}onChange={doProcedure}/>
            <SButton type={"submit"}>リスト作成</SButton>
        </SForm>
            <h1>TODOrisuto!!</h1>
            {todos.map((todo:Todo,key:number)=>{
                return (
                <div key={key}>
                <h3>{todo.list}</h3><h3>{todo.procedure}</h3><SButton onClick={()=>doDelete(todo.id)}>削除</SButton>
                </div>
                )
            })}
        </>
    )
}

export default Todo;