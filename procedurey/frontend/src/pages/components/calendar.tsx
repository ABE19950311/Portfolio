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
import jaLocale from "@fullcalendar/core/locales/ja"

export const Calendar = ()=>{
    return (
        <div>
            <Header />
            <FullCalendar
                plugins={[dayGridPlugin]}
                locale={jaLocale}
                initialEvents={[{ title: 'initial event', start: new Date() }]}
            />
            <Footer />
        </div>
    )
}

export default Calendar;