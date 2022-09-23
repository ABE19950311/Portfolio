import styled from "styled-components"
import Link from "next/link"
import {useState,useEffect} from "react"
import axios from "axios"

const SForm = styled.form`
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

export const Newaccount = ()=>{
    const [name,setName] = useState("");
    const [pass,setPass] = useState("");
    const [pass2,setPass2] = useState("");

    const doName = (event:{target:HTMLInputElement})=>{
        setName(event.target.value);
    }

    const doPass = (event:{target:HTMLInputElement})=>{
        setPass(event.target.value);
    }

    const doPass2 = (event:{target:HTMLInputElement})=>{
        setPass2(event.target.value);
    }

    const doSubmit = (event:any)=>{
        event.prevent.default();
        if(pass===pass2) {
            try {
                axios.post(process.env.NEXT_PUBLIC_ADDRESS as string,{
                    username:name,
                    password_digest:pass
                },{headers:{"Content-Type":"application/json"}})
                .then((res)=>{
                    return res.data;
                })}catch(error) {
                    console.log(error);
                }
            }
        }

    return (
        <SForm onSubmit={doSubmit}>
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
                <input type="submit" value="アカウント作成" />
        </SForm>
    )
}

export default Newaccount;