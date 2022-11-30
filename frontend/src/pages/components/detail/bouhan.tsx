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

export const Bouhan = ()=>{
    const PC:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tablet:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})
    
    if(PC) {
        return (
        <Layout>
            <PCSteps>
            <h1>防犯・防災のための心がけ</h1>
            <div className="steps">
                <h2>家の周辺環境を確認する</h2>
                <p>ゴミ・タバコの放置、壁の落書き等が存在している場合、治安が芳しくない可能性あり</p>
                    <ul>
                        <li>道路のゴミ</li>
                        <li>壁の落書き</li>
                        <li>交番が近くに存在しているか</li>
                        <li>街灯が十分にあるか</li>
                        <li>夜の人通り</li>
                    </ul>
                <h2>空き巣・不審者対策</h2>
                <p>家の中外関係なく、基本に忠実に細心の注意を払う</p>
                    <ul>
                        <li>来訪者は必ず確認</li>
                        <li>夜は出来るだけ明るい道を選ぶ</li>
                        <li>防犯ブザー・アプリ等の用意</li>
                        <li>二重ロック等鍵の強化</li>
                        <li>近所の写真をSNSにアップしない</li>
                        <li>留守を悟られないよう小さい照明をつける</li>
                    </ul>
                <h2>地震・台風等自然災害の備え</h2>
                <p>非常時用の備蓄・避難場所を日頃から意識する</p>
                    <ul>
                        <li>大きな家具は固定する</li>
                        <li>日常用品を備蓄する</li>
                        <li>ハザードマップで周辺を確認</li>
                        <li>停電に備え枕元に懐中電灯を用意しておく</li>
                    </ul>
                <h3></h3>
            </div>
            </PCSteps>
        </Layout>
        )
    }else if(Tablet) {
        return (
        <Layout>
            <TabSteps>
            <h1>防犯・防災のための心がけ</h1>
            <div className="steps">
                <h2>家の周辺環境を確認する</h2>
                <p>ゴミ・タバコの放置、壁の落書き等が存在している場合、治安が芳しくない可能性あり</p>
                    <ul>
                        <li>道路のゴミ</li>
                        <li>壁の落書き</li>
                        <li>交番が近くに存在しているか</li>
                        <li>街灯が十分にあるか</li>
                        <li>夜の人通り</li>
                    </ul>
                <h2>空き巣・不審者対策</h2>
                <p>家の中外関係なく、基本に忠実に細心の注意を払う</p>
                    <ul>
                        <li>来訪者は必ず確認</li>
                        <li>夜は出来るだけ明るい道を選ぶ</li>
                        <li>防犯ブザー・アプリ等の用意</li>
                        <li>二重ロック等鍵の強化</li>
                        <li>近所の写真をSNSにアップしない</li>
                        <li>留守を悟られないよう小さい照明をつける</li>
                    </ul>
                <h2>地震・台風等自然災害の備え</h2>
                <p>非常時用の備蓄・避難場所を日頃から意識する</p>
                    <ul>
                        <li>大きな家具は固定する</li>
                        <li>日常用品を備蓄する</li>
                        <li>ハザードマップで周辺を確認</li>
                        <li>停電に備え枕元に懐中電灯を用意しておく</li>
                    </ul>
                <h3></h3>
            </div>
            </TabSteps>
        </Layout>
        )
    }else {
        return (
        <Layout>
            <MobSteps>
            <h1>防犯・防災のための心がけ</h1>
            <div className="steps">
                <h2>家の周辺環境を確認する</h2>
                <p>ゴミ・タバコの放置、壁の落書き等が存在している場合、治安が芳しくない可能性あり</p>
                    <ul>
                        <li>道路のゴミ</li>
                        <li>壁の落書き</li>
                        <li>交番が近くに存在しているか</li>
                        <li>街灯が十分にあるか</li>
                        <li>夜の人通り</li>
                    </ul>
                <h2>空き巣・不審者対策</h2>
                <p>家の中外関係なく、基本に忠実に細心の注意を払う</p>
                    <ul>
                        <li>来訪者は必ず確認</li>
                        <li>夜は出来るだけ明るい道を選ぶ</li>
                        <li>防犯ブザー・アプリ等の用意</li>
                        <li>二重ロック等鍵の強化</li>
                        <li>近所の写真をSNSにアップしない</li>
                        <li>留守を悟られないよう小さい照明をつける</li>
                    </ul>
                <h2>地震・台風等自然災害の備え</h2>
                <p>非常時用の備蓄・避難場所を日頃から意識する</p>
                    <ul>
                        <li>大きな家具は固定する</li>
                        <li>日常用品を備蓄する</li>
                        <li>ハザードマップで周辺を確認</li>
                        <li>停電に備え枕元に懐中電灯を用意しておく</li>
                    </ul>
                <h3></h3>
            </div>
            </MobSteps>
        </Layout>
        )
    }
}

export default Bouhan