import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "axios"
import {useRouter} from "next/router"
import {Header} from "./header"
import {Footer} from "./footer"
import FullCalendar from "@fullcalendar/react"
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
    const [event,setEvent] = useState([]);
    const [eventlist,setEventlist] = useState({});

    
    useEffect(()=>{
        axios.get(process.env.NEXT_PUBLIC_ADDRESS+"/todos" as string,
            {withCredentials:true})
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

    console.log(event);

    const handleSelect = ()=>{   
        console.log("test");
    }

    return (
        <div>
            <Header />
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
            <Footer />
        </div>
    )
}

export default Calendar;