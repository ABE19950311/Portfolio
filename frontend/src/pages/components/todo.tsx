import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect,useRef} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"
import {Header} from "./header"
import {Footer} from "./footer"
import {Procedure} from "./dailylifey"
import DatePicker,{registerLocale} from "react-datepicker"
import ja from "date-fns/locale/ja"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"
import { identity } from "@fullcalendar/react"
import { check } from "prettier"

registerLocale("ja",ja);

type Todo = {
    id:number,
    user_id:number,
    list:string,
    life:string,
    startdate:String,
    duedate:String
}

type Check = {
    id:string,
    checked:boolean
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
width: 1000px;
table-layout: fixed;
overflow-wrap: break-word;

.start {
    cursor: pointer;
    position: relative;
}

.start::before, .start::after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    border: 5px solid transparent;
    right: 10px;
    top: 50%;
}

.start::before {
    border-bottom-color: #aaa;
    margin-top: -10px;
}

.start::after {
    border-top-color: #aaa;
    margin-top: 2px;
}

.due {
    cursor: pointer;
    position: relative;
}

.due::before, .due::after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    border: 5px solid transparent;
    right: 10px;
    top: 50%;
}

.due::before {
    border-bottom-color: #aaa;
    margin-top: -10px;
}

.due::after {
    border-top-color: #aaa;
    margin-top: 2px;
}

.startasc::before {
    border-bottom-color: #444;
}
.startdesc::after {
    border-top-color: #444;
}

.dueasc::before {
    border-bottom-color: #444;
}
.duedesc::after {
    border-top-color: #444;
}

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

.check {
    width:100px;
}

.start {
    width:150px;
}

.due {
    width:150px;
}

.todo {
    width:350px
}

.life {
    width:170px;
}

.txt_check{
    width:100px;
}

.txt_start{
    text-align: left;
    width:150px;
}

.txt_due{
    text-align: left;
    width:150px;
}

.txt_todo{
    text-align: left;
    width:350px
}

.txt_life{
    text-align: left;
    width:170px;
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

const SSelect = styled.select`
`

export const Todo = ()=>{
    const [list,setList] = useState("");
    const [life,setLife] = useState("");
    const [search,setSearch] = useState("");
    const [todos,setTodos] = useState([]);
    const [flag,setFlag] = useState("");
    const [deleteid,setDeleteid] = useState<string[]>([]);
    const [checkdata,setCheckdata] = useState<any>({});
    const [startclass,setStartclass] = useState(false);
    const [dueclass,setDueclass] = useState(false);
    const router=useRouter();
    const domRef = useRef<HTMLInputElement>(null);

    const getenv = router.query.state as unknown as string;
    console.log(getenv)

    useEffect(()=>{
        axios.get(getenv+"/todos" as string
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

    const doLife = (event:{target:HTMLSelectElement}) => {
        setLife(event.target.value);
    }

    const doSearch = (event:{target:HTMLInputElement}) => {
        setSearch(event.target.value);
    }

    const startdateasc = () => {
        setStartclass(!startclass)
        const sorttodo = 
                todos.sort((a:Todo,b:Todo)=>{
                if(a.startdate<b.startdate) return -1;
                if(a.startdate>b.startdate) return 1;
                return 0;
            })
            setTodos(sorttodo)
    }

    const startdatedesc = () => {
        setStartclass(!startclass)
        const sorttodo = 
                todos.sort((a:Todo,b:Todo)=>{
                if(a.startdate<b.startdate) return 1;
                if(a.startdate>b.startdate) return -1;
                return 0;
            })
            setTodos(sorttodo)
    }

    const duedateasc = () => {
        setDueclass(!dueclass)
        console.log("asc")
        const sorttodo = 
                todos.sort((a:Todo,b:Todo)=>{
                if(a.duedate<b.duedate) return -1;
                if(a.duedate>b.duedate) return 1;
                return 0;
            })
            setTodos(sorttodo)
    }

    const duedatedesc = () => {
        setDueclass(!dueclass)
        console.log("desc")
        const sorttodo = 
                todos.sort((a:Todo,b:Todo)=>{
                if(a.duedate<b.duedate) return 1;
                if(a.duedate>b.duedate) return -1;
                return 0;
            })
            setTodos(sorttodo)
    }

    const doCheck = (event:{target:HTMLInputElement})=>{
        let check = event.target.checked
        let id = (event.target.value) as string
        setCheckdata((checkdata:any)=>({
            ...checkdata,
            [id]:check
        }))
        if(check===true&&!deleteid.includes(id)) {
            setDeleteid([...deleteid,id])
        }else if(check===false&&deleteid.includes(id)) {
            setDeleteid(
                deleteid.filter((idlist)=>{
                    return !idlist.includes(id)
                })
            )
        }
    }

    const doSubmit = (event:React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(list!==""&&life!=="") {
        axios.post(getenv+"/todos" as string,
            {
                todos: {
                    list:list,
                    startdate:startDate,
                    duedate:endDate,
                    life:life,
                },
            },
        ).then(res=> {
            console.log(res.data);
            setFlag(res.data);
            setList("");
            setLife("");
        }).catch(error=> {
            console.log("response error",error);
        })
    }
    }
    
    const doDelete = ()=>{
        deleteid.forEach((id)=>{
            axios.delete(getenv+`/todos/${id}` as string)
            .then(res => {
                setFlag(res.data);
            }).catch(error=> {
                console.log("response error",error);
            })
            setDeleteid([])
            setCheckdata({})
        })
    }

    const doAllcheck = (event:{target:HTMLInputElement})=>{
        setCheckdata({})
        if(event.target.checked===true) {
        todos.forEach((todo:Todo)=>{
            return setCheck(todo.id)
        })
        }else if(event.target.checked===false) {
        todos.forEach((todo:Todo)=>{
            return delCheck(todo.id)
        })
        }
    }

    const setCheck = (id:number)=>{
        let todoid = String(id)
        setCheckdata((checkdata:any)=>({
            ...checkdata,
            [todoid]:true
        }))
        setDeleteid((deleteid:string[])=>([
            ...deleteid,todoid
            ]
        ))
    }

    const delCheck = (id:number)=>{
        let todoid = String(id)
        setCheckdata((checkdata:any)=>({
            ...checkdata,
            [todoid]:false
        }))
        setDeleteid((deleteid:any)=>(
                deleteid.filter((list:any)=>{
                return !list.includes(todoid)
            }))
        )
    }

    console.log(todos)

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
            <SSelect onChange={doLife}>
                <option value="none">none</option>
                <option value="部屋探し・入居">部屋探し・入居</option>
                <option value="入居後手続き">入居後手続き</option>
                <option value="防犯・防災">防犯・防災</option>
                <option value="掃除">掃除</option>
            </SSelect><br></br>
            <SButton type={"submit"}>リスト作成</SButton><br></br>
            <SInput type={"text"} placeholder={"検索内容"} onChange={doSearch}/><SButton type={"button"} onClick={doDelete}>削除</SButton>
        </SForm>
        </Body>
                    <STable>
                    <thead className="thead">
                        <tr className="tr">
                        <td className="check"><SCheck type={"checkbox"} onChange={doAllcheck}/></td>
                        <td className={`start ${startclass ? "startdesc":"startasc"}`} scope="col" onClick={startclass ? startdateasc:startdatedesc}>開始日</td>
                        <td className={`due ${dueclass ? "duedesc":"dueasc"}`} scope="col" onClick={dueclass ? duedateasc:duedatedesc}>期日</td>
                        <td className="life" scope="col">項目</td>
                        <td className="todo" scope="col">TODO</td>
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
                            <th className="txt_check"><SCheck value={todo.id} id="check" checked={checkdata[todo.id]} type={"checkbox"} onChange={doCheck} ref={domRef}/></th>
                            <td data-label="開始日" className="txt_start">{todo.startdate}</td>
                            <td data-label="期日" className="txt_due">{todo.duedate}</td>
                            <td data-label="手続き内容" className="txt_life">{todo.life}</td>
                            <td data-label="TODO" className="txt_todo">{todo.list}</td>
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