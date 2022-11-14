import styled from "styled-components"
import React, {useState,useEffect,useRef, Fragment} from "react"
import {useRouter} from "next/router"


export const Redirect = ()=>{
    const router = useRouter()
    const query = router.query.state as unknown as string

    useEffect(()=>{
        if(query==="lifepost") {
            router.push({
                pathname:"/components/userlife",
                query:{state:"lifepost"}
                })
        }
    })

    return (
        <>
        </>
    )
}

export default Redirect