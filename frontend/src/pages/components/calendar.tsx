import {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import {Layout} from "./layout"
import FullCalendar, { DateSelectArg,EventApi } from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list"
import jaLocale from "@fullcalendar/core/locales/ja"
import {FetchData} from "../../components/fetchdata"

type Todo = {
    id:number,
    list:string,
    procedure:string,
    startdate:String,
    duedate:String
}

export const Calendar = ()=>{
    const {env,isLoading,isError} = FetchData()
    const [event,setEvent] = useState([]);
    const [eventlist,setEventlist] = useState({});

    useEffect(()=>{
        if(!env) return
        axios.get(env+"/todos" as string)
            .then(res => {
                setEvent(res.data);
            }).catch(error=> {
                console.log("response error",error);
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[env])

    useEffect(()=>{
        const schedule = ()=>{
            return event.map((events:Todo)=>{
                return {title:`${events.list}`,start:`${events.startdate}`,end:`${events.duedate}`}
            })
        }
        setEventlist(schedule);
    },[event])

    if(isError) return <p>error</p>
    if(isLoading) return <p>lodaing...</p>

    return (
        <>
        <Layout>
            <FullCalendar
          plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin,listPlugin]} // pluginsにdayGridPluginを設定する
          headerToolbar={{                          // 追加
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listWeek',
            }}
          initialView="dayGridMonth" // 初期表示のモードを設定する
            locales={[jaLocale]}
            locale="ja"
            events={eventlist}
            //{[
             //   {title:`test`, start: '2022-10-17', end: '2022-10-24'}
            //]} //eventsでカレンダーにイベんとついかできる jsonでいける
            selectable={true}
        />
        </Layout>
        </>
    )
}

export default Calendar;