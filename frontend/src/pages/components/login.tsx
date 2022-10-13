import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "axios"
import {useRouter} from "next/router"

const SBody = styled.body`
body {
    margin: 0;
}


p {
    margin: 0;
}

a {
    color: inherit;
    text-decoration: none;
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
`

const SForm = styled.div`
position: absolute;
top: 50%; /*親要素を起点に上から50%*/
left: 50%;  /*親要素を起点に左から50%*/
transform: translateY(-50%) translateX(-50%); /*要素の大きさの半分ずつを戻す*/
-webkit-transform: translateY(-50%) translateX(-50%);
`;

const SFormHead = styled.div`
    margin-bottom: 5px;
    font-weight: bold;
`;

const SFormInput = styled.input`
width: 120%; /*親要素いっぱい広げる*/
padding: 10px 15px; /*ボックスを大きくする*/
font-size: 16px;
border-radius: 3px; /*ボックス角の丸み*/
border: 2px solid #ddd; /*枠線*/
box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
`;

const SButton = styled.button`
font-weight: 700;
padding: 0.5rem 1.5rem;
cursor: pointer;

text-align: center;
vertical-align: middle;
text-decoration: none;
letter-spacing: 0.1em;
border-radius: 0.5rem;

border: 1px solid #ccc;
background: #f1e767;
background: -webkit-gradient(linear, left top, left bottom, from(#fdfbfb), to(#ebedee));
background: -webkit-linear-gradient(top, #fdfbfb 0%, #ebedee 100%);
background: linear-gradient(to bottom, #fdfbfb 0%, #ebedee 100%);
-webkit-box-shadow: inset 1px 1px 1px #fff;
box-shadow: inset 1px 1px 1px #fff;
    &:hover {
    background: -webkit-gradient(linear, left bottom, left top, from(#fdfbfb), to(#ebedee));
    background: -webkit-linear-gradient(bottom, #fdfbfb 0%, #ebedee 100%);
    background: linear-gradient(to top, #fdfbfb 0%, #ebedee 100%);
    }
`

const Login = ()=>{
    const [loginStatus,setLoginStatus] = useState("未ログイン");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();

    useEffect(()=>{
        checkLoginStatus();
    },[]);

    const checkLoginStatus = ()=>{
        axios.get(process.env.NEXT_PUBLIC_ADDRESS+"/logged_in" as string,
        {withCredentials:true})
        .then(res => {
            if(res.data.logged_in&&loginStatus==="未ログイン") {
                setLoginStatus("ログイン済み");
            }else if (!res.data.logged_in&&loginStatus==="ログイン済み") {
                setLoginStatus("未ログイン");
            }
        }).catch(error => {
            console.log("ログインエラー",error)
        })
    }

    const doName = (event:{target:HTMLInputElement})=>{
        setUsername(event.target.value);
    }

    const doPass = (event:{target:HTMLInputElement})=>{
        setPassword(event.target.value);
    }

    const doSubmit = (event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        axios.post(process.env.NEXT_PUBLIC_ADDRESS+"/login" as string,
            {
                user: {
                    username:username,
                    password:password
                }
            },
            {withCredentials:true}
        ).then(res => {
            console.log("login response: ", res.data.logged_in)
            if(res.data.logged_in) {
                router.push("/components/mainpage");
                setLoginStatus("ログイン済み");
            }
        }).catch(error => {
            console.log("registration error",error)
        })
        }

    return (
        <SBody>
        <SForm>
            <h3>ログイン状態:{loginStatus}</h3>
                <SFormHead>ユーザ名</SFormHead>
                <SFormInput type={"text"} onChange={doName} />
                <SFormHead>パスワード</SFormHead>
                <SFormInput type={"text"} onChange={doPass} /><br></br>
                <SButton type={"submit"} onClick={doSubmit}>ログイン</SButton><br></br>

                <Link href="/components/mainpage">
                    <a>ゲストユーザの方はこちら</a>
                </Link>
                <br />
                <Link href="/components/newaccount">
                    <a>新しくアカウントを作成する</a>
                </Link>
        </SForm>
        </SBody>
    )
}

export default Login;