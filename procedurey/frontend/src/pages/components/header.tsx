import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "axios"
import {useRouter} from "next/router"

export const Header = (props:{title:string})=>{
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}