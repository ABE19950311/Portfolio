import styled from "styled-components"
import Link from "next/link"
import {useState,useEffect} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"

const SDiv = styled.div`

.login-page {
    width: 360px;
    padding: 8% 0 0;
    margin: auto;
}

.validation {
    font-size:12px;
    color:red;
    float:right;
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
.form .register-form {
    display: none;
}

`


export const Login = ()=>{
    const [validationName,setValidationName] = useState("");
    const [validationPass,setValidationPass] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [getenv,setGetenv] = useState("");
    const router = useRouter();

    console.log(process.env.NEXT_PUBLIC_ADDRESS)
    console.log(process.env.NEXT_PUBLIC_PRODUCTION_ADDRESS)
    console.log(getenv)

    useEffect(()=>{
        if(process.env.NEXT_PUBLIC_ADDRESS!==undefined) {
            setGetenv(process.env.NEXT_PUBLIC_ADDRESS)
            axios.get(process.env.NEXT_PUBLIC_ADDRESS+"/sessions")
            .then(res=>{
                axios.defaults.headers.common['X-CSRF-Token'] = res.headers['x-csrf-token'];
            }).catch(error=>{
                console.log(error)
            })
        }else{
            setGetenv(process.env.NEXT_PUBLIC_PRODUCTION_ADDRESS as string)
            axios.get(process.env.NEXT_PUBLIC_PRODUCTION_ADDRESS+"/sessions")
            .then(res=>{
                axios.defaults.headers.common['X-CSRF-Token'] = res.headers['x-csrf-token'];
            }).catch(error=>{
                console.log(error)
            })
        }
    },[])

    useEffect(()=>{
        if(username.trim()!=="") {
            setValidationName("")
        }
        if(password.trim()!=="") {
            setValidationPass("")
        }
    },[username,password])

    const doName = (event:{target:HTMLInputElement})=>{
        setUsername(event.target.value);
    }

    const doPass = (event:{target:HTMLInputElement})=>{
        setPassword(event.target.value);
    }

    const doSubmit = (event:React.MouseEvent<HTMLFormElement>)=>{
        event.preventDefault();

        if(username.trim()==="") {
            setValidationName("ユーザ名が空欄です")
        }
        if(password.trim()==="") {
            setValidationPass("パスワードが空欄です")
        }

        if(validationName||validationPass||username.trim()===""||password.trim()==="") return
        axios.post(getenv+"/login" as string,
            {
                user: {
                    username:username,
                    password:password
                }
            }).then(res => {
            if(res.data.logged_in) {
                router.push({
                    pathname:"/",
                    query:{state:getenv}
                    });
            }else if(!res.data.logged_in) {
                    setValidationName("ユーザ名またはパスワードが一致しません")
                    setValidationPass("ユーザ名またはパスワードが一致しません")
                    setUsername("")
                    setPassword("")
            }
        }).catch(error => {
            console.log("registration error",error)
        })

        }

    return (
        <SDiv>
        <div className="login-page">
        <div className="form">
        <form className="login-form" onSubmit={doSubmit}>
            <input type="text" onChange={doName}  value={username} placeholder="ユーザ名"/><span className="validation">{validationName}</span>
            <input type="password" onChange={doPass} value={password} placeholder="パスワード"/><span className="validation">{validationPass}</span>
            <button type="submit">ログイン</button>
            <Link href="/"><p className="message"><span>トップページへ戻る</span></p></Link>
            </form>
        </div>
        </div>
        </SDiv>
    )
}

export default Login;