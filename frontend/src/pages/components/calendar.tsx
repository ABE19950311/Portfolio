import styled from "styled-components"
import {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import {Layout} from "./layout"
import FullCalendar, { DateSelectArg,EventApi } from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list"
import jaLocale from "@fullcalendar/core/locales/ja"

type Todo = {
    id:number,
    list:string,
    procedure:string,
    startdate:String,
    duedate:String
}

export const Calendar = ()=>{
    let eventGuid = 0;
    const [event,setEvent] = useState([]);
    const [eventlist,setEventlist] = useState({});
    const createEventId = () => String(eventGuid++);

    useEffect(()=>{
        axios.get(process.env.NEXT_PUBLIC_ADDRESS+"/todos" as string)
            .then(res => {
                setEvent(res.data);
            }).catch(error=> {
                console.log("response error",error);
            })
    },[])

    useEffect(()=>{
        const schedule = ()=>{
            return event.map((events:Todo)=>{
                return {title:`${events.list}`,start:`${events.startdate}`,end:`${events.duedate}`}
            })
        }
        setEventlist(schedule);
    },[event])

    const handleSelect = (selectInfo:DateSelectArg)=>{   
        let title = prompt("イベント内容を入力して下さい")?.trim();
        let calendar = selectInfo.view.calendar;
        calendar.unselect();
        if(title) {
            calendar.addEvent({
                id:createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay,
            })
        }
    }

    console.log(handleSelect);

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
            select={handleSelect}
        />
        </Layout>
        </>
    )
}

export default Calendar;