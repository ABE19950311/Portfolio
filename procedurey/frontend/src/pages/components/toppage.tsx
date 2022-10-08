import Image from 'next/image'
import styled from "styled-components"
import Link from "next/link"

const Body = styled.div`
    margin: 0px;
    padding: 0px;
`

const Main = styled.div`

h1 {
    position:absolute;
    top: 40%;
    left: 50%;
    -ms-transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    margin:0;
    padding:0;
}

h3 {
    position:absolute;
    top: 40%;
    left: 50%;
    -ms-transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    margin-top:40px;
    padding:0;
}
`

const Button = styled.button`
    position:absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    margin:0;
    padding:0;
`

export const TopPage = ()=>{

    return (
        
        <div>
        <Body>
            <Main>
            <div>
                <Image src="/main.png" layout="fill" alt="logo"/>   
                <h1>Procedurey</h1>
                <h3>様々な手続きが、一目で分かる</h3>
                <Link href="/components/login">
                    <Button>利用する</Button>
                </Link>
            </div>
            </Main>
        </Body>
        </div>
    )
}