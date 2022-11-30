import styled from "styled-components"
import {Layout} from "../layout"
import { useMediaQuery } from "react-responsive"

const PCSteps = styled.div`
width:800px;
margin-left:20vw;
overflow-wrap:  break-word;

h1 {
    padding: 1rem 1rem;
    border-left: 5px solid #ff9800;
    background: #ffe0b2;
    color: #f57c00;
}
p {
    font-size:20px;
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
    content: "CHECK";  /* 好きな文字を記述 */
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
background-color: #111111;
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
background: #111111;
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
    background: #111111;
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

const TabSteps = styled.div`
width:800px;
overflow-wrap:  break-word;

h1 {
    padding: 1rem 1rem;
    border-left: 5px solid #ff9800;
    background: #ffe0b2;
    color: #f57c00;
}
p {
    font-size:20px;
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
    content: "CHECK";  /* 好きな文字を記述 */
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
background-color: #111111;
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
background: #111111;
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
    background: #111111;
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

const MobSteps = styled.div`
width:490px;
overflow-wrap:  break-word;

h1 {
    padding: 1rem 1rem;
    border-left: 5px solid #ff9800;
    background: #ffe0b2;
    color: #f57c00;
}
p {
    font-size:18px;
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
    content: "CHECK";  /* 好きな文字を記述 */
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
background-color: #111111;
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
background: #111111;
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
    background: #111111;
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

export const Hikkoshi = ()=>{
    const PC:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tablet:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})
    
    if(PC) {
        return (
        <Layout>
            <PCSteps>
            <h1>入居前後の手続き内容</h1>
            <div className="steps">
                <h2>電気・ガス・水道・ネット回線</h2>
                    <p>引っ越しの１週間ほど前までには入居後に利用する会社に連絡</p>
                <h2>転出届・転居届提出</h2>
                    <p>住民票の移動が必要になるため、現住所の市区町村役場で転出届を提出</p>
                    <p>同じ市区町村内なら転居届を提出する</p>
                <h2>郵便物の転送手続き</h2>
                    <p>郵便局の窓口で転居届用紙を入手し、直接提出するかポストへ投函</p>
                <h2>転入届提出</h2>
                    <p>引っ越し先の役所に書類を提出</p>
                    <p>転出届を提出した際に貰える転出証明書が必要なため注意</p>
                <h2>運転免許・マイナンバー・国民健康保険、年金の住所変更</h2>
                    <p>新住所で１４日以内に手続き実施</p>
                <h3></h3>
                
            </div>
            </PCSteps>
        </Layout>
        )
    }else if(Tablet) {
        return (
        <Layout>
            <TabSteps>
            <h1>入居前後の手続き内容</h1>
            <div className="steps">
                <h2>電気・ガス・水道・ネット回線</h2>
                    <p>引っ越しの１週間ほど前までには入居後に利用する会社に連絡</p>
                <h2>転出届・転居届提出</h2>
                    <p>住民票の移動が必要になるため、現住所の市区町村役場で転出届を提出</p>
                    <p>同じ市区町村内なら転居届を提出する</p>
                <h2>郵便物の転送手続き</h2>
                    <p>郵便局の窓口で転居届用紙を入手し、直接提出するかポストへ投函</p>
                <h2>転入届提出</h2>
                    <p>引っ越し先の役所に書類を提出</p>
                    <p>転出届を提出した際に貰える転出証明書が必要なため注意</p>
                <h2>運転免許・マイナンバー・国民健康保険、年金の住所変更</h2>
                    <p>新住所で１４日以内に手続き実施</p>
                <h3></h3>
                
            </div>
            </TabSteps>
        </Layout>
        )
    }else {
        return (
        <Layout>
            <MobSteps>
            <h1>入居前後の手続き内容</h1>
            <div className="steps">
                <h2>電気・ガス・水道・ネット回線</h2>
                    <p>引っ越しの１週間ほど前までには入居後に利用する会社に連絡</p>
                <h2>転出届・転居届提出</h2>
                    <p>住民票の移動が必要になるため、現住所の市区町村役場で転出届を提出</p>
                    <p>同じ市区町村内なら転居届を提出する</p>
                <h2>郵便物の転送手続き</h2>
                    <p>郵便局の窓口で転居届用紙を入手し、直接提出するかポストへ投函</p>
                <h2>転入届提出</h2>
                    <p>引っ越し先の役所に書類を提出</p>
                    <p>転出届を提出した際に貰える転出証明書が必要なため注意</p>
                <h2>運転免許・マイナンバー・国民健康保険、年金の住所変更</h2>
                    <p>新住所で１４日以内に手続き実施</p>
                <h3></h3>
                
            </div>
            </MobSteps>
        </Layout>
        )
    }
}

export default Hikkoshi