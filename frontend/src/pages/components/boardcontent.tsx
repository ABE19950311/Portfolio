import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import Router, {useRouter} from "next/router"
import Layout from "./layout"
import moment from "moment"

export const Boardcontent = ()=>{
    const router=useRouter();

    const content = router.query.content as unknown as string;
    const id = router.query.id as unknown as number;

    return (
        <>
        <Layout>
            <h1>{content}</h1>
            <h1>{id}</h1>
        </Layout>
        </>
    )
}

export default Boardcontent