import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "../csrf_axios"
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
    user_id:number,
    list:string,
    procedure:string,
    startdate:String,
    duedate:String
}

const Container = styled.div`
min-height: 100vh;
position: relative;/*←相対位置*/
padding-bottom: 120px;/*←footerの高さ*/
box-sizing: border-box;/*←全て含めてmin-height:100vhに*/
`

const Body = styled.div`
font-family: "Open Sans", sans-serif;
line-height: 1.25;
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

const STable = styled.table`
border-collapse: collapse;
margin: 0 auto;
padding: 0;
width: 650px;
table-layout: fixed;
overflow-wrap: break-word;

tr {
background-color: #fff;
border: 1px solid #bbb;
padding: .35em;
}

th,td {
padding: 1em 10px 1em 1em;
border-right: 1px solid #bbb;
}

th {
font-size: .85em;
}

thead tr{
background-color: #eee;
}

.txt{
    text-align: left;
    font-size: .85em;
}

tbody tr:hover{
    background-color: #fffae9;
}

@media screen and (max-width: 600px) {
table {
    border: 0;
    width:100%
}
table th{
    background-color: #eee;
    display: block;
    border-right: none;
}
table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

table tr {
    display: block;
    margin-bottom: .625em;
}

table td {
    border-bottom: 1px solid #bbb;
    display: block;
    font-size: .8em;
    text-align: right;
    position: relative;
    padding: .625em .625em .625em 4em;
    border-right: none;
}

table td::before {
    content: attr(data-label);
    font-weight: bold;
    position: absolute;
    left: 10px;
}

table td:last-child {
    border-bottom: 0;
}
`
const SCheck = styled.input`
`


export const Todo = ()=>{
    const [list,setList] = useState("");
    const [procedure,setProcedure] = useState("");
    const [search,setSearch] = useState("");
    const [todos,setTodos] = useState([]);
    const [flag,setFlag] = useState("");
    const router=useRouter();

    const getenv = router.query.state as unknown as string;
    console.log(getenv)

    useEffect(()=>{
        axios.get(getenv+"/sessions")
        axios.get(getenv+"/todos" as string,
        {withCredentials:true}
        ).then(res=> {
            setTodos(res.data);
        }).catch(error=> {
            console.log("response error",error);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[flag]);

    const doList = (event:{target:HTMLInputElement}) => {
        setList(event.target.value);
    }

    const doProcedure = (event:{target:HTMLInputElement}) => {
        setProcedure(event.target.value);
    }

    const doSearch = (event:{target:HTMLInputElement}) => {
        setSearch(event.target.value);
    }

    const doSubmit = (event:React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(list!==""&&procedure!=="") {
        axios.post(getenv+"/todos" as string,
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
            setList("");
            setProcedure("");
        }).catch(error=> {
            console.log("response error",error);
        })
    }
    }
    
    const doDelete = (id:number)=>{
        axios.delete(getenv+`/todos/${id}` as string,
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
            <SInput type={"text"} value={list} placeholder={"やること"} onChange={doList}/><br></br>
            <SInput type={"text"} value={procedure} placeholder={"手続き内容（任意）"}onChange={doProcedure}/><br></br>
            <SButton type={"submit"}>リスト作成</SButton><br></br>
            <SInput type={"text"} placeholder={"検索内容"} onChange={doSearch}/>
        </SForm>
        </Body>
                    <STable>
                    <thead className="thead">
                        <tr className="tr">
                        <td className="non"></td>
                        <td className="td" scope="col">開始日</td>
                        <td className="td" scope="col">期日</td>
                        <td className="td" scope="col">TODO</td>
                        <td className="td" scope="col">手続き内容</td>
                        <td className="non"></td>
                        </tr>
                    </thead>
                    </STable>
            {todos.filter((todos:Todo)=>{
                if(todos.list.includes(search)) {
                    return todos;
                }else if(search===""){
                    return todos;
                }
            }).map((todo:Todo,key:number)=>{
                return (
                <Body key={key}>
                <STable>
                    <tbody className="tbody">
                        <tr className="tr">
                            <th className="th"> <SCheck type={"checkbox"}></SCheck></th>
                            <td data-label="開始日" className="txt">{todo.startdate}</td>
                            <td data-label="期日" className="txt">{todo.duedate}</td>
                            <td data-label="TODO" className="txt">{todo.list}</td>
                            <td data-label="手続き内容" className="txt">{todo.procedure}</td>
                            <td><SButton onClick={()=>doDelete(todo.id)}>削除</SButton></td>
                        </tr>
                    </tbody>
                </STable>
                </Body>
                )
            })}
        </>
    )
}

export default Todo;