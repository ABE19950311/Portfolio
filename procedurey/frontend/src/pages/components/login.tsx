import styled from "styled-components"
import Link from "next/link"

const Login = ()=>{

    const Container = styled.div`
    position:absolute;
    top: 50%;
left: 50%;
-ms-transform: translate(-50%,-50%);
-webkit-transform: translate(-50%,-50%);
transform: translate(-50%,-50%);
margin:0;
padding:0;

a {
    color:blue;
}
    `

    return (
        <div>
            <Container>
            <form>
                <label htmlFor="user">ユーザ名</label><input type="text" id="user"/><br />
                <label htmlFor="pass">パスワード</label><input type="text" id="pass"/><br />
                <input type="submit" value="ログイン"/>
            </form>

                <Link href="/components/mainpage">
                    <a>ゲストユーザの方はこちら</a>
                </Link>
                <br />
                <Link href="/components/newaccount">
                    <a>新しくアカウントを作成する</a>
                </Link>
            </Container>
        </div>
    )
}

export default Login;