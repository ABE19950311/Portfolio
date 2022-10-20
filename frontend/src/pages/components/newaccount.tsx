import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "axios"
import Router, {useRouter} from "next/router"

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

export const Newaccount = ()=>{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [passwordConfirmation,setPasswordConfirmation] = useState("");
    const [getenv,setGetenv] = useState("");
    const router = useRouter();

    useEffect(()=>{
        if(process.env.NEXT_PUBLIC_ADDRESS!==undefined) {
            setGetenv(process.env.NEXT_PUBLIC_ADDRESS)
        }else{
            setGetenv(process.env.NEXT_PUBLIC_PRODUCTION_ADDRESS as string)
        }
    },[])

    console.log(getenv)
    console.log(username)
    console.log(password)
    console.log(passwordConfirmation)

    const doName = (event:{target:HTMLInputElement})=>{
        setUsername(event.target.value);
    }

    const doPass = (event:{target:HTMLInputElement})=>{
        setPassword(event.target.value);
    }

    const doPass2 = (event:{target:HTMLInputElement})=>{
        setPasswordConfirmation(event.target.value);
    }

    const doSubmit = (event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        axios.post(getenv+"/signup" as string,
            {
                user: {
                    username:username,
                    password:password,
                    password_confirmation:passwordConfirmation
                }
            },
            {withCredentials:true}
        ).then(res => {
            if(res.data.status==="created") {
                router.push("/components/login");
            }
        }).catch(error => {
            console.log("registration error",error)
        })
        }

    return (
        <SForm>
            <div>
                <SFormHead>ユーザ名</SFormHead>
                <SFormInput type={"text"} onChange={doName} />
            </div>
            <div>
                <SFormHead>パスワード</SFormHead>
                <SFormInput type={"text"} onChange={doPass} />
            </div>
            <div>
                <SFormHead>パスワード再入力</SFormHead>
                <SFormInput type={"text"} onChange={doPass2} />
            </div>
                <SButton type={"submit"} onClick={doSubmit}>登録</SButton>
        </SForm>
    )
}

export default Newaccount;