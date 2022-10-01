import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "axios"
import {useRouter} from "next/router"
import {Header} from "./header"
import {Footer} from "./footer"
import {Procedure} from "./procedure"

export const MainPage = ()=>{
    
    return (
        <div>
            <div>
            <Header />
            </div>
            <div>
            <Procedure />
            </div>
            <div>
            <Footer />
            </div>
        </div>
    )
}

export default MainPage;
