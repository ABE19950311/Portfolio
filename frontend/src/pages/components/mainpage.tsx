import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "axios"
import {useRouter} from "next/router"
import {Header} from "./header"
import {Footer} from "./footer"
import {Procedure} from "./procedure"

const Container = styled.div`
min-height: 100vh;
position: relative;/*←相対位置*/
padding-bottom: 120px;/*←footerの高さ*/
box-sizing: border-box;/*←全て含めてmin-height:100vhに*/
`

const SBody = styled.body`
    *{margin:0,padding:0}
`


export const MainPage = ()=>{
    
    return (
        <>
        <SBody>
        <Header />
        <Procedure />
        <Container>
        <Footer />
        </Container>
        </SBody>
        </>
    )
}

export default MainPage;
