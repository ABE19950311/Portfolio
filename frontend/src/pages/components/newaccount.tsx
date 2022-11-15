import styled from "styled-components"
import Link from "next/link"
import {useState,useEffect,useRef,useCallback} from "react"
import axios from "../../csrf-axios"
import Router, {useRouter} from "next/router"

const SDiv = styled.div`

.validation {
    font-size:12px;
    color:red;
    float:right;
}

.login-page {
    width: 360px;
    padding: 8% 0 0;
    margin: auto;
}
.form {
    position: relative;
    z-index: 1;
    background: #FFFFFF;
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin-top: 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
}
.form button {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    background: #2C7CFF;
    width: 100%;
    border: 0;
    padding: 15px;
    margin-top:15px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
    background: #005FFF;
}
.form .message {
    margin: 15px 0 0;
    color: #b3b3b3;
    font-size: 12px;
}
.form .message span {
    color: #4CAF50;
    text-decoration: none;
}

`


export const Newaccount = ()=>{
    const [validationName,setValidationName] = useState("");
    const [validationPass,setValidationPass] = useState("");
    const [validationPassfilm,setValidationPassfilm] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [passwordconfirm,setPasswordconfirm] = useState("");
    const [getenv,setGetenv] = useState("");
    const router = useRouter();
    const processtimer = useRef<NodeJS.Timer|null>(null);

    useEffect(()=>{
        if(process.env.NEXT_PUBLIC_ADDRESS!==undefined) {
            setGetenv(process.env.NEXT_PUBLIC_ADDRESS)
        }else{
            setGetenv(process.env.NEXT_PUBLIC_PRODUCTION_ADDRESS as string)
        }
    },[])

    useEffect(()=>{
        if(username.trim()!=="") {
            setValidationName("")
        }
    },[username])

    useEffect(()=>{
        if(password.trim()!==""&&passwordconfirm.trim()!==""&&password.trim()!==passwordconfirm.trim()) {
            setValidationPass("パスワードが一致しません")
        }else if(validationPass==="パスワードが一致しません"&&passwordconfirm!=="") {
            setValidationPass("")
        }else if(password.trim()!=="") {
            setValidationPass("")
        }
        if(passwordconfirm.trim()!=="") {
            setValidationPassfilm("")
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[password,passwordconfirm])

    const doName = (event:{target:HTMLInputElement})=>{
        setUsername(event.target.value);
    }

    const doPass = (event:{target:HTMLInputElement})=>{
        setPassword(event.target.value);
    }

    const doPassconfirm = (event:{target:HTMLInputElement})=>{
        setPasswordconfirm(event.target.value);
    }

    const debounce = (event:React.MouseEvent<HTMLFormElement>)=>{
        event.preventDefault();
        if(processtimer.current) clearTimeout(processtimer.current)

        processtimer.current = setTimeout(()=>{
            doSubmit(event)
        },1000)
    }

    const doSubmit = (event:React.MouseEvent<HTMLFormElement>)=>{
        event.preventDefault();

        if(username.trim()==="") {
            setValidationName("ユーザ名が空欄です")
        }
        if(password.trim()===""&&passwordconfirm.trim()==="") {
            setValidationPass("パスワードが空欄です")
            setValidationPassfilm("パスワードが空欄です")
        }else if(password.trim()!==""&&passwordconfirm.trim()==="") {
            setValidationPass("")
            setValidationPassfilm("パスワードが空欄です")
        }else if(password.trim()===""&&passwordconfirm.trim()!=="") {
            setValidationPass("パスワードが空欄です")
            setValidationPassfilm("")
        }
    
        if(username.trim()===""||password.trim()===""||passwordconfirm.trim()==="") return
        axios.post(getenv+"/signup" as string,
            {
                user: {
                    username:username,
                    password:password,
                    password_confirmation:passwordconfirm
                }
            },
        ).then(res => {
            console.log(res.data)
            if(res.data.status==="created") {
                router.push("/");
            }
        }).catch(error => {
            console.log("registration error",error)
        })

        }

    return (
        <SDiv>
        <div className="login-page">
        <div className="form">
        <form className="login-form" onSubmit={debounce}>
            <input type="text" onChange={doName} placeholder="ユーザ名"/><span className="validation">{validationName}</span>
            <input type="password" onChange={doPass} placeholder="パスワード"/><span className="validation">{validationPass}</span>
            <input type="password" onChange={doPassconfirm} placeholder="パスワード再入力"/><span className="validation">{validationPassfilm}</span>
            <button type="submit">新規登録</button>
            <Link href="/"><p className="message"><span>トップページへ戻る</span></p></Link>
            </form>
        </div>
        </div>
        </SDiv>
    )
}

export default Newaccount;