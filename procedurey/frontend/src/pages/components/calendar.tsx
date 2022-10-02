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

export const Calendar = ()=>{

    const handleSelect = ()=>{
        
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
            events={[
                {title:'eventを', start: '2022-10-14'},
                {title:'こんな感じで追加できます', start: '2022-10-17', end: '2022-10-24'}
            ]}　//eventsでカレンダーにイベんとついかできる jsonでいける
            selectable={true}
            select={handleSelect}
        />
            <Footer />
        </div>
    )
}

export default Calendar;