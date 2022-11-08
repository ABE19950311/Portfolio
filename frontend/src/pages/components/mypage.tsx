import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import Router, {useRouter} from "next/router"
import Layout from "./layout"
import moment from "moment"

export const Mypage = ()=>{

    return(
        <Layout>
        <><h1>kouzinow</h1></>
        </Layout>
    )
}

export default Mypage