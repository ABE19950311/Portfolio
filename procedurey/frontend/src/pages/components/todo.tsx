import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios, { AxiosRequestConfig } from "axios"
import {useRouter} from "next/router"
import {Header} from "./header"
import {Footer} from "./footer"
import {Procedure} from "./procedure"
import DatePicker,{registerLocale} from "react-datepicker"
import ja from "date-fns/locale/ja"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"

registerLocale("ja",ja);

type Todo = {
    id:number,
    list:string,
    procedure:string,
    startdate:String,
    duedate:String
}

const Body = styled.div`
text-align:center;
width:70%

body {
    margin: 0;
}

*,
*::before,
*::after {
    box-sizing: border-box;
}

p {
    margin: 0;
}

a {
    color: inherit;
    text-decoration: none;
}

table {
    border-collapse: collapse;
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

h2{
    border-top: double 4px #27acd9;
	border-bottom: double 4px #27acd9;
	padding: 0.5rem 0;

    .test {
        width: 30%; /*親要素いっぱい広げる*/
padding: 10px 15px; /*ボックスを大きくする*/
border-radius: 3px; /*ボックス角の丸み*/
border: 2px solid #ddd; /*枠線*/
box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
    }
`

const SForm = styled.form`
    margin-bottom:20px;

`

const SInput = styled.input`
width: 30%; /*親要素いっぱい広げる*/
padding: 10px 15px; /*ボックスを大きくする*/
font-size: 16px;
border-radius: 3px; /*ボックス角の丸み*/
border: 2px solid #ddd; /*枠線*/
box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
`
const SButton = styled.button`
font-weight: 700;
padding: 0.5rem 1.5rem;
cursor: pointer;

text-align: center;
vertical-align: middle;
text-decoration: none;
letter-spacing: 0.1em;
border-radius: 0.5rem;

border: 1px solid #ccc;
background: #f1e767;
background: -webkit-gradient(linear, left top, left bottom, from(#fdfbfb), to(#ebedee));
background: -webkit-linear-gradient(top, #fdfbfb 0%, #ebedee 100%);
background: linear-gradient(to bottom, #fdfbfb 0%, #ebedee 100%);
-webkit-box-shadow: inset 1px 1px 1px #fff;
box-shadow: inset 1px 1px 1px #fff;
    &:hover {
    background: -webkit-gradient(linear, left bottom, left top, from(#fdfbfb), to(#ebedee));
    background: -webkit-linear-gradient(bottom, #fdfbfb 0%, #ebedee 100%);
    background: linear-gradient(to top, #fdfbfb 0%, #ebedee 100%);
    }

`

const SUl = styled.ul`
    display: flex;

li {
    color: #333;
    border-left: solid 8px #f4a006;
    background: rgba(244, 160, 6, 0.1);
    margin-bottom: 5px;
    padding: 0.5rem;
    width: 25%;
}
`
const SCheck = styled.input`
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
        if(list!==""&&procedure!=="") {
        axios.post(process.env.NEXT_PUBLIC_ADDRESS+"/todos" as string,
            {
                todos: {
                    list:list,
                    startdate:startDate,
                    duedate:endDate,
                    procedure:procedure,
                },
            },
            {withCredentials:true},
         //   {headers:{"Content-Type":"application/json"}}
        ).then(res=> {
            console.log(res.data);
            setFlag(res.data);
        }).catch(error=> {
            console.log("response error",error);
        })
    }
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

//DatePicker関数

const handleChangeStart = (selectedDate:Date) => {
    setStartDate(toUtcIso8601str(moment(selectedDate)))
    }

const handleChangeEnd = (selectedDate:Date) => {
    setEndDate(toUtcIso8601str(moment(selectedDate)))
    }
/**
 * JST基準に変換して返す
 * @param {string} dateTimeStr YYYY-MM-DDTHH:mm:00Z
 * @returns {moment.Moment}
 */
    const parseAsMoment = (dateTimeStr:Date) => {
    return moment.utc(dateTimeStr, 'YYYY-MM-DDTHH:mm:00Z', 'ja').utcOffset(9)
    }

    /**
   * 日付形式に変換して返す
   * @param {moment.Moment} momentInstance
   * @returns {string}
   */
    const toUtcIso8601str = (momentInstance:any):Date => {
    return momentInstance
        .clone()
        .utc()
        .format('YYYY-MM-DD')
    }

    const [startDate, setStartDate] = useState(toUtcIso8601str(moment()))
    const [endDate, setEndDate] = useState(toUtcIso8601str(moment()))

    console.log(todos)
    console.log(list)
    console.log(startDate)
    console.log(endDate)
    console.log(procedure)

    return (
        <>
        <Header />
        <Body>
        <h2>TODOリスト作成</h2>
        <SForm onSubmit={doSubmit}>
            <DatePicker
                className="test"
                dateFormat="yyyy-MM-dd"
                locale="ja"
                selected={moment(startDate).toDate()}
                selectsStart
                startDate={moment(startDate).toDate()}
                onChange={handleChangeStart}
            />
            <DatePicker
                dateFormat="yyyy-MM-dd"
                locale="ja"
                selected={moment(endDate).toDate()}
                selectsEnd
                endDate={moment(endDate).toDate()}
                onChange={handleChangeEnd}
            />
            <SInput type={"text"} placeholder={"やること"} onChange={doList}/><br></br>
            <SInput type={"text"} placeholder={"手続き内容（任意）"}onChange={doProcedure}/><br></br>
            <SButton type={"submit"}>リスト作成</SButton>
        </SForm>
        </Body>
            {todos.map((todo:Todo,key:number)=>{
                return (
                <Body key={key}>
                <SUl>
                <SCheck type={"checkbox"}></SCheck>
                <li>開始日:{todo.startdate}</li>
                <li>終了日:{todo.duedate}</li>
                <li>手続き内容:{todo.procedure}</li>
                <li>TODO:{todo.list}</li>
                <SButton onClick={()=>doDelete(todo.id)}>削除</SButton>
                </SUl>
                </Body>
                )
            })}
        <Footer />
        </>
    )
}

export default Todo;