import styled from "styled-components"
import React, {useState,useEffect} from "react"
import {useRouter} from "next/router"
import {Layout} from "./layout"

const Container = styled.div`
min-height: 100vh;
position: relative;/*←相対位置*/
padding-bottom: 120px;/*←footerの高さ*/
box-sizing: border-box;/*←全て含めてmin-height:100vhに*/
`

const Steps = styled.div`
width:800px;
margin-left:250px;

h1 {
    padding: 1rem 1rem;
    border-left: 5px solid #ff9800;
    background: #ffe0b2;
    color: #f57c00;
}
p {
    line-height:0.5;
}
ul {
    position: relative;
    padding: 15px 40px 15px 30px;
    font: 14px/1.6 'arial narrow', sans-serif;
    border: solid 2px #adcce8;
    border-radius:8px;
    color: #448ccb;
    width:400px;
    background: #fff;
}
ul:before{
    content: "TODO";  /* 好きな文字を記述 */
    position: absolute;
    display: block;
    top: -15px;
    left: 20px;
    background: #fff;
    font-size: 16px;
    font-weight: bold;
    padding: 0 10px;
}
ul li{
    font-weight: bold;
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
height: calc(100%); /* 100% - top */
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
.steps > h3 {
    counter-reset: step-counter;
    /* 連番カウンターを垂直方向に中央揃えで表示する */
    display: flex;
    align-items: center;
}
.steps > h3:before {
    content: "";
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

    const Heya = ()=>{
        return (
            <Steps>
            <h1>部屋選びから入居までの流れ</h1>
            <div className="steps">
                <h2>情報収集</h2>
                    <p>街の雰囲気/通勤・通学時間等を基に住むエリアを絞り、不動産情報サイトで相場を確認する。</p>
                    <p>住む上で譲れないポイントを割り出す。数が多い場合は優先順位を付けた方が良い。</p>
                    <ul>
                        <li>住みたい街の目星をつける</li>
                        <li>家賃相場を確認する</li>
                        <li>居住ポイントを割り出す</li>
                    </ul>
                <h2>不動産会社へ</h2>
                    <p>ネット未掲載の物件も存在するため、実際に不動産会社に足を運んで相談をした方が良い。</p>
                    <p>物件数を求めるなら大手不動産会社、掘り出し物件を期待する場合地域密着型不動産会社へ。</p>
                <h2>内見</h2>
                    <p>水回りの状態、日当たり、ポスト/ゴミ捨て場の状態等を入念にチェック</p>
                    <p>見るだけでなく、実際に水が流れるかも重要</p>
                <h2>申し込み・入居審査</h2>
                    <p>物件に問題がなければ申し込み。審査を受け、通過すれば契約へ</p>
                <h2>引っ越しに向けて各種手続き</h2>
                    <p>トラブル発生の基になるため、必ず賃貸借契約書をよく読んでから契約へ。</p>
                    <ul>
                        <li>契約に必要な物の用意(印鑑、本人確認書類等)</li>
                    </ul>
                <h2>入居手配/荷造り</h2>
                    <p>引越し業者を利用する場合、数社から見積もりを取り比較検討すること。</p>
                    <p>見積もりサイトの利用を行えば楽</p>
                    <p>電気/ガス/水道/インターネット/郵便局の移行手続きを忘れずに</p>
                    <ul>
                        <li>引越し業者手配</li>
                        <li>各種移行手続き(電気/ガス/水道/インターネット/郵便局等)</li>
                    </ul>
                <h2>入居</h2>
                    <p>荷物を運び入れる前に壁/床の状況を写真に撮っておくと良い。(退去時のトラブル回避)</p>
                    <ul>
                        <li>荷ほどき</li>
                        <li>電気/ガス等が問題なく使用できるか確認</li>
                    </ul>
                <h3></h3>
                
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
            <>
            <Layout>
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
            </Layout>
            </>
    )
}

export default Detail;