import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "axios"
import {useRouter} from "next/router"
import {Header} from "./header"
import {Footer} from "./footer"
import {Procedure} from "./procedure"

export const Detail = ()=>{
    const [item,setItem] = useState("");
    const router=useRouter();
    const query = router.query.state as unknown as string;
    console.log(query);

    useEffect(()=>{
        switch(query) {
            case "koseki":
                setItem("kose");
                break;
            case "hoken":
                setItem("hoke");
                break;
            case "fukushi":
                setItem("fuku");
                break;
            case "zeimu":
                setItem("zei");
                break;
            default:
                setItem("error");
                break;
        }
    },[])
    

    return (
        <div>
            <Header title=""/>
            <h1>{item}</h1>
            <Footer title="footerdayo!!!"/>
        </div>
    )
}

export default Detail;