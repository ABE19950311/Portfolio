import styled from "styled-components"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "axios"
import {useRouter} from "next/router"
import {Header} from "./header"
import {Footer} from "./footer"
import {Procedure} from "./procedure"

const Container = styled.div`
min-height: 100vh;
position: relative;/*←相対位置*/
padding-bottom: 120px;/*←footerの高さ*/
box-sizing: border-box;/*←全て含めてmin-height:100vhに*/
`

const Steps = styled.div`
h1 {
    padding: 1rem 1rem;
    border-left: 5px solid #ff9800;
    background: #ffe0b2;
    color: #f57c00;
}
.steps {
/* 連番カウンター名の定義 */
counter-reset: step-counter;
/* 縦棒との位置関係に必要 */
position: relative;
/* 縦棒と連番のためのスペースを左に確保 */
padding-left: 2rem; /* 連番(1.5rem) + 余白 */
}
/* 縦棒 */
.steps:before {
content: "";
/* 幅と色 */
background-color: #d59533;
width: 2px;
/* 位置 */
position: absolute;
top: 0.7rem; /* 円のwidthの半分 */
left: 0.7rem; /* 円のwidthの半分 */
height: calc(100% - 0.7rem); /* 100% - top */
/* 連番より後ろに表示するため */
z-index: 0;
}
.steps > h2 {
/* 連番カウンターを+1する */
counter-increment: step-counter;
/* 連番カウンターを垂直方向に中央揃えで表示する */
display: flex;
align-items: center;
}
/* ①②③など連番 */
.steps > h2:before {
/* 連番カウンターの値を表示する */
content: counter(step-counter);
/* フォントと色 */
background: #d59533;
color: white;
font-size: 0.8rem;
font-weight: normal;
/* 文字を中央に表示する */
line-height: 1.5rem;
text-align: center;
/* 円で表示する */
width: 1.5rem;
height: 1.5rem;
border-radius: 1.5rem;
/* .stepsでmargin-left +2rem したぶん左に戻す */
position: absolute;
left: 0;
/* 縦棒より手前に表示するため */
z-index: 1;
}
`

export const Detail = ()=>{
    const [item,setItem] = useState("");
    const router=useRouter();
    const query = router.query.state as unknown as string;
    console.log(query);


    const Heya = ()=>{
        console.log("test")
        return (
            <Steps>
            <h1>部屋選びから入居までの流れ</h1>
            <div className="steps">
                <h2>情報収集</h2>
                <p>いい感じの大きさに野菜と肉を切ります。</p>

                <h2>不動産会社へ</h2>
                <p>切った具材を鍋に入れて煮込みます。</p>

                <h2>内見</h2>
                <p>カレールーなど調味料を入れて完成です。</p>

                <h2>申し込み・入居審査</h2>
                <h2>引っ越しに向けて各種手続き</h2>
                <h2>入居</h2>
            </div>
            </Steps>
        )
    }

    const Bouhan = ()=>{
        return (
            <>
            <Steps>
            <h1>カレーライスの作り方</h1>
            <div className="steps">
                <h2>野菜と肉を切る</h2>
                <p>いい感じの大きさに野菜と肉を切ります。</p>

                <h2>煮込む</h2>
                <p>切った具材を鍋に入れて煮込みます。</p>

                <h2>味付け</h2>
                <p>カレールーなど調味料を入れて完成です。</p>

                <h2>てすと</h2>
                <h2></h2>
            </div>
            </Steps>
            </>
        )
    }

    const Hikkoshi = ()=>{
        return (
            <>
            </>
        )
    }

    const Souzi = ()=>{
        return (
            <>
            </>
        )
    }

    return (
        <div>
            <Header />
            {(()=>{
                if(query==="heya") {
                    return <Heya />
                }else if(query==="hikkoshi") {
                    return <Hikkoshi />
                }else if(query==="bouhan") {
                    return <Bouhan />
                }else if(query==="souzi") {
                    return <Souzi />
                }else {
                    console.log("error");
                }
            })()}
            <Container>
            <Footer />
            </Container>
        </div>
    )
}

export default Detail;