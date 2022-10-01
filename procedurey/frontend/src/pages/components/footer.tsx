import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "axios"
import {useRouter} from "next/router"

const SFooter = styled.div`
    #footer02 {
    background: #222;
    }

    .ie #footer02 .logo img,
    #footer02 .logo {
    display: inline-block;
    width: 120px;
    }

    #footer02 .nav li a {
    padding: 15px;
    color: #ccc;
    }

    #footer02 .c-btn {
    margin-left: 25px;
    }

@media screen and (min-width: 641px) {
    #footer02 .logo {
        padding: 10px 0;
    }

    #footer02 .wrap {
        padding: 20px 0;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #footer02 .cont {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
    }

    #footer02 .nav {
        display: inline-block;
    }

    #footer02 .nav li {
        display: inline-block;
    }

    #footer02 .nav li a:hover {
        color: #ca353b;
    }
    }


    @media only screen and (max-width: 640px) {
    #footer02 {
        padding: 20px 0 0;
    }

    #footer02 .inner-block {
        padding: 0;
    }

    .ie #footer02 .logo img,
    #footer02 .logo {
        display: block;
        margin: 0 auto 20px;
    }

    #footer02 .c-btn {
        margin-bottom: 20px;
    }

    #footer02 .nav li {
        border-top: 1px solid #555;
    }

    #footer02 .nav li a {
        padding: 12px 20px;
        display: block;
        background-size: 5px auto;
    }

    #footer02 .nav li:last-child {
        border-bottom: 1px solid #555;
    }
    }
`

export const Footer = ()=>{
    return (
        <SFooter>
        <footer id="footer02" className="outer-block">
        <div className="inner-block">
            <div className="wrap">
            <div className="logo">
                <p>logoyotei</p>
            </div>
            <div className="cont">
                <div className="c-btn">
                <a href="https://b-risk.jp/contact/">CONTACT</a>
                </div>
                <ul className="nav">
                <li><a href="https://b-risk.jp/works/">WORKS</a></li>
                <li><a href="https://b-risk.jp/blog/">BLOG</a></li>
                <li><a href="https://b-risk.jp/recruit/">RECRUIT</a></li>
                <li><a href="https://b-risk.jp/company/">COMPANY</a></li>
                </ul>
            </div>
            </div>
        </div>
        <div className="copyright">
            何かコメントいれる
        </div>
        </footer>
        </SFooter>
    )
}