import styled from "styled-components"
import Head from 'next/head'
import {Header} from "./header"
import {Footer} from "./footer"
import { ReactNode } from "react"

type Props = {
    children: ReactNode;
}

const Wrapper = styled.div`
display: flex;
flex-flow: column;
min-height: 200vh;

main {
    flex: 1;
    }
`

export const Layout = (props:Props)=>{
    return (
        <>
            <Head>
            <title>Dailylifey</title>
            <meta charSet="utf-8" />
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Wrapper>
            <Header />
            <main>{props.children}</main>
            <Footer />
            </Wrapper>
        </>
    )
}

export default Layout
