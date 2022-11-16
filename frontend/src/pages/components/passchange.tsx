import styled from "styled-components"
import {useState,useEffect,useRef} from "react"
import axios from "../../csrf-axios"
import {useRouter} from "next/router"

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

`


export const Passchange = ()=>{
    const [validationPass,setValidationPass] = useState("");
    const [validationNewPass,setValidationNewPass] = useState("");
    const [validationNewPassfilm,setValidationNewPassfilm] = useState("");
    const [username,setUsername] = useState("");
    const [sessionid,setSessionid] = useState("");
    const [oldpass,setOldpass] = useState("");
    const [password,setPassword] = useState("");
    const [passwordconfirm,setPasswordconfirm] = useState("");
    const router = useRouter();
    const processtimer = useRef<NodeJS.Timer|null>(null);

    const getenv = router.query.state as unknown as string;

    useEffect(()=>{
        axios.get(getenv+"/sessionid")
        .then(res=>{
            setSessionid(res.data)
        }).catch(error=>{
            console.log(error)
        })
        axios.get(getenv+"/sessionname")
        .then(res=>{
            setUsername(res.data)
        }).catch(error=>{
            console.log(error)
        })
    },[router,getenv])    

    useEffect(()=>{
        if(oldpass.trim()!=="") {
        setValidationPass("")
        }
    },[oldpass])

    useEffect(()=>{
        if(password.trim()!==""&&passwordconfirm!==""&&password.trim()!==passwordconfirm.trim()) {
            setValidationNewPass("パスワードが一致しません")
        }else if(validationNewPass==="パスワードが一致しません"&&passwordconfirm.trim()!=="") {
            setValidationNewPass("")
        }else if(password.trim()!=="") {
            setValidationNewPass("")
        }
        if(passwordconfirm.trim()!=="") {
            setValidationNewPassfilm("")
        }else{
            setValidationNewPass("")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[password,passwordconfirm])

    const doPass = (event:{target:HTMLInputElement})=>{
        setOldpass(event.target.value);
    }

    const doNewPass = (event:{target:HTMLInputElement})=>{
        setPassword(event.target.value);
    }

    const doNewPassconfirm = (event:{target:HTMLInputElement})=>{
        setPasswordconfirm(event.target.value);
    }

    const debounce = (event:React.MouseEvent<HTMLFormElement>)=>{
        event.preventDefault();
        if(processtimer.current) clearTimeout(processtimer.current)

        processtimer.current = setTimeout(()=>{
            doSubmit(event)
        },1000)
    }

    const doMypage =()=>{
        router.push({
            pathname:"/components/mypage",
            query:{state:getenv}
            })
    }

    const doSubmit = (event:React.MouseEvent<HTMLFormElement>)=>{
        event.preventDefault();

        if(oldpass.trim()==="") {
            setValidationPass("パスワードが空欄です")
        }
        if(password.trim()===""&&passwordconfirm==="") {
            setValidationNewPass("パスワードが空欄です")
            setValidationNewPassfilm("パスワードが空欄です")
        }else if(password.trim()===""&&passwordconfirm!=="") {
            setValidationNewPass("パスワードが空欄です")
            setValidationNewPassfilm("")
        }else if(password.trim()!==""&&passwordconfirm==="") {
            setValidationNewPass("")
            setValidationNewPassfilm("パスワードが空欄です")
        }

        if(validationPass||oldpass.trim()===""||password.trim()===""||passwordconfirm.trim()==="") return

        axios.post(getenv+"/usercheck",
        {
            user :{
                username:username,
                password:oldpass
            }
        }
        ).then(res=>{
            if(res.data.status) {
                axios.patch(getenv+"/newpass",
                {
                    user :{
                        username:username,
                        password:password,
                        password_confirmation:passwordconfirm
                    }
                }).then(res=>{
                    router.push({
                        pathname:"/components/mypage",
                        query:{state:getenv}
                        });
                }).catch(error=>{
                    console.log(error)
                })
            }else if(!res.data.status) {
                setValidationPass("現在のパスワードが一致しません")
            }
        })

        }

    return (
        <SDiv>
        <div className="login-page">
        <div className="form">
        <form className="login-form" onSubmit={debounce}>
            <input type="text" onChange={doPass} placeholder="現在のパスワード"/><span className="validation">{validationPass}</span>
            <input type="password" onChange={doNewPass} placeholder="新しいパスワード"/><span className="validation">{validationNewPass}</span>
            <input type="password" onChange={doNewPassconfirm} placeholder="新しいパスワード再入力"/><span className="validation">{validationNewPassfilm}</span>
            <button type="submit">パスワードを変更する</button>
            <button onClick={doMypage}>マイページへ戻る</button>
            </form>
        </div>
        </div>
        </SDiv>
    )
}

export default Passchange;