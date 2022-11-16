import styled from "styled-components"
import {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"
import {Header} from "./header"
import DatePicker,{registerLocale} from "react-datepicker"
import ja from "date-fns/locale/ja"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"
import { MdSearch } from "react-icons/md";

registerLocale("ja",ja);

type Todo = {
    id:number,
    user_id:number,
    list:string,
    life:string,
    startdate:String,
    duedate:String
}

const SDiv = styled.div`
line-height: 1.25;
max-width:1500px;
margin-bottom:20px;

h2{
    text-align:center;
    border-top: double 4px #27acd9;
	border-bottom: double 4px #27acd9;
	padding: 0.5rem 0;
}

.datepos {
    margin-left:40%;
}

.inputpos {
    text-align:center;
}

.search {
    position: relative;
    display: flex;
    justify-content:center;
}

.searchicon {
    position: absolute;
    color: #333;
    font-size: 2rem;
    transform: translate(25px,5px);
}

.datepicker {
        text-align:left;
        font-size:16px;
        padding: 6px 40px; /*ボックスを大きくする*/
        border-radius: 3px; /*ボックス角の丸み*/
        border: 2px solid #ddd; /*枠線*/
        box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
    }

.custominput {
    padding: 10px 100px 10px 10px;
    font-size: 16px;
    border-radius: 3px; /*ボックス角の丸み*/
    border: 2px solid #ddd; /*枠線*/
    box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}

.todolabel {
    color:red;
}

.customselect {
        padding: 10px; 15px;
        border-radius: 4px;
        border: none;
        box-shadow: 0 0 0 1px #ccc inset;
        cursor: pointer;
        font-size:16px;
    
    &::focus {
        outline: 0;
        box-shadow: 0 0 0 2px rgb(33, 150, 243) inset;
    }
}

.custombutton {
    font-weight: 700;
    padding: 0.5rem 1.5rem;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    text-align: center;
    vertical-align: middle;
    text-decoration: none;
    border-radius: 0.5rem;
    border: 2px solid #27acd9;
    background: #27acd9;
    color: #fff;
}

`

const STable = styled.table`
border-collapse: collapse;
margin: 0 auto;
padding: 0;
width: 1000px;
table-layout: fixed;
overflow-wrap: break-word;

.check {
    text-align:center;
}

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
    width:120px;
}

.due {
    width:120px;
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
    width:120px;
}

.txt_due{
    text-align: left;
    width:120px;
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

.tdselect {
    margin-left:5px;
    outline: none;
    background-color: #FFFFFF;
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


export const Todo = ()=>{
    const [list,setList] = useState("");
    const [life,setLife] = useState("");
    const [search,setSearch] = useState("");
    const [todos,setTodos] = useState([]);
    const [flag,setFlag] = useState("");
    const [selectlife,setSelectlife] = useState("");
    const [deleteid,setDeleteid] = useState<string[]>([]);
    const [checkdata,setCheckdata] = useState<any>({});
    const [startclass,setStartclass] = useState(false);
    const [dueclass,setDueclass] = useState(false);
    const router=useRouter();

    const getenv = router.query.state as unknown as string;

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

    const doSeleclife = (event:{target:HTMLSelectElement}) => {
        setSelectlife(event.target.value);
    }

    const startdateasc = () => {
        setStartclass(!startclass)
        const sorttodo = 
                todos.sort((a:Todo,b:Todo)=>{
                if(a.startdate<b.startdate) return -1;
                if(a.startdate>b.startdate) return 1;
                if(a.duedate==null) return 1;
                if(b.duedate==null) return -1;
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
                if(a.duedate==null) return 1;
                if(b.duedate==null) return -1;
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
                if(a.duedate==null) return 1;
                if(b.duedate==null) return -1;
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
                if(a.duedate==null) return 1;
                if(b.duedate==null) return -1;
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

    const doSubmit = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(list!=="") {
        axios.post(getenv+"/todos" as string,
            {
                todos: {
                    list:list,
                    startdate:startDate,
                    duedate:endDate,
                    life:life ? life:"none",
                },
            },
        ).then(res=> {
            console.log(res.data);
            setFlag(res.data);
            setList("");
            setLife("");
            setStartDate(undefined)
            setEndDate(undefined)       
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

    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()

    console.log(startDate)

    return (
        <>
        <Header />

        <SDiv>
        <h2>TODOリスト作成</h2>

            <div className="datepos">
            {startDate ?  
                <DatePicker
                    className="datepicker"
                    dateFormat="yyyy-MM-dd"
                    locale="ja"
                    selected={moment(startDate).toDate()}
                    selectsStart
                    startDate={moment(startDate).toDate()}
                    onChange={handleChangeStart}
                />
                :
                <DatePicker
                    className="datepicker"
                    dateFormat="yyyy-MM-dd"
                    locale="ja"
                    selectsStart
                    startDate={moment(startDate).toDate()}
                    onChange={handleChangeStart}
                    placeholderText="開始日"
                />
            }

            {endDate ? 
                <DatePicker
                    className="datepicker"
                    dateFormat="yyyy-MM-dd"
                    locale="ja"
                    selected={moment(endDate).toDate()}
                    selectsEnd
                    endDate={moment(endDate).toDate()}
                    onChange={handleChangeEnd}
                />
                :
                <DatePicker
                    className="datepicker"
                    dateFormat="yyyy-MM-dd"
                    locale="ja"
                    selectsEnd
                    endDate={moment(endDate).toDate()}
                    onChange={handleChangeEnd}
                    placeholderText="期日"
                />
            }
            </div>

            <div className="inputpos">
            <br></br>
            <label>TODO内容入力<span className="todolabel">(必須)</span>:</label><input className="custominput" type={"text"} value={list} onChange={doList}/>
            <label>&emsp;項目を選択:</label><select className="customselect" onChange={doLife} value={life}>
                <option value="none">none</option>
                <option value="部屋探し・入居">部屋探し・入居</option>
                <option value="入居前後の手続き">入居前後の手続き</option>
                <option value="防犯・防災">防犯・防災</option>
                <option value="掃除">掃除</option>
                <option value="料理">料理</option>
                <option value="洗濯">洗濯</option>
            </select>
            &emsp;&emsp;<button className="custombutton" type={"submit"} onClick={doSubmit}>リスト作成</button><br></br><br></br><br></br>
            <div className="search">
            <MdSearch className="searchicon"/><input className="custominput" type={"text"} placeholder={"TODO内容を検索"} onChange={doSearch}/>
            &emsp;&emsp;<button className="custombutton" type={"button"} onClick={doDelete}>チェック項目削除</button>
            </div>
            </div>

        </SDiv>

                    <STable>
                    <thead className="thead">
                        <tr className="tr">
                        <td className="check"><input type="checkbox" onChange={doAllcheck}/></td>
                        <td className={`start ${startclass ? "startdesc":"startasc"}`} scope="col" onClick={startclass ? startdateasc:startdatedesc}>開始日</td>
                        <td className={`due ${dueclass ? "duedesc":"dueasc"}`} scope="col" onClick={dueclass ? duedateasc:duedatedesc}>期日</td>
                        <td className="life" scope="col">項目
                                <select className="tdselect" onChange={doSeleclife}>
                                    <option value="フィルター項目">フィルター項目</option>
                                    <option value="none">none</option>
                                    <option value="部屋探し・入居">部屋探し・入居</option>
                                    <option value="入居前後の手続き">入居前後の手続き</option>
                                    <option value="防犯・防災">防犯・防災</option>
                                    <option value="掃除">掃除</option>
                                    <option value="料理">料理</option>
                                    <option value="洗濯">洗濯</option>
                                </select>
                        </td>
                        <td className="todo" scope="col">TODO</td>
                        </tr>
                    </thead>
                    </STable>

            {todos.filter((todos:Todo)=>{
                if(todos.life.includes(selectlife)) {
                    return todos;
                }else if(selectlife==="フィルター項目"){
                    return todos;
                }
            }).filter((todos:Todo)=>{
                if(todos.list.includes(search)) {
                    return todos;
                }else if(search==="") {
                    return todos;
                }
            }).map((todo:Todo,key:number)=>{
                return (
                <STable key={key}>
                    <tbody className="tbody">
                        <tr className="tr">
                            <th className="txt_check"><input value={todo.id} id="check" checked={checkdata[todo.id]} type="checkbox" onChange={doCheck} /></th>
                            <td data-label="開始日" className="txt_start">{todo.startdate}</td>
                            <td data-label="期日" className="txt_due">{todo.duedate}</td>
                            <td data-label="手続き内容" className="txt_life">{todo.life}</td>
                            <td data-label="TODO" className="txt_todo">{todo.list}</td>
                        </tr>
                    </tbody>
                </STable>
                )
            })}
        </>
    )
}

export default Todo;