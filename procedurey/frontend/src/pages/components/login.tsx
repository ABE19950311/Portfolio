import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "axios"
import {useRouter} from "next/router"

const SForm = styled.div`
    display: grid;
    grid-template: auto / 100%;
    gap: 30px;
    border-radius: 8px;
    margin: auto;
`;

const SFormHead = styled.div`
    margin-bottom: 5px;
    font-weight: bold;
`;

const SFormInput = styled.input`
    border: none;
    width: 100%;
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 4px;
    transition: 0.3s;

    &:focus {
    outline: none;
    background: #e7e7e7;
    transition: 0.3s;
    }
`;

const SButton = styled.button`

`;

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

    const doLogout = ()=>{
        axios.delete(process.env.NEXT_PUBLIC_ADDRESS+"/logout" as string,
        {withCredentials:true})
        .then(res => {
            setLoginStatus("未ログイン");
        }).catch(error => {
            console.log("ログアウトエラー",error);
        })
    }

    return (
        <SForm>
            <h3>ログイン状態:{loginStatus}</h3>
            <div>
                <SFormHead>ユーザ名</SFormHead>
                <SFormInput type={"text"} onChange={doName} />
            </div>
            <div>
                <SFormHead>パスワード</SFormHead>
                <SFormInput type={"text"} onChange={doPass} />
            </div>
                <SButton type={"submit"} onClick={doSubmit}>ログイン</SButton>
                <SButton onClick={doLogout}>ログアウト</SButton>

                <Link href="/components/mainpage">
                    <a>ゲストユーザの方はこちら</a>
                </Link>
                <br />
                <Link href="/components/newaccount">
                    <a>新しくアカウントを作成する</a>
                </Link>
        </SForm>
    )
}

export default Login;