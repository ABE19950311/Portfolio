import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "axios"
import {useRouter} from "next/router"

const SFooter = styled.div`
width: 100%;
background-color: #89c7de;
color: #fff;
text-align: center;
padding: 30px 0;
bottom: 0; /*下に固定*/
`

export const Footer = ()=>{
    return (
        <SFooter>
        <p>test</p>
        </SFooter>
    )
}