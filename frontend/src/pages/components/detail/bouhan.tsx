import styled from "styled-components"
import {Layout} from "../layout"
import { useMediaQuery } from "react-responsive"

const PC = styled.div`
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
    content: "POINT";  
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
    counter-reset: step-counter;
    position: relative;
    padding-left: 2rem; 
}
.steps:before {
    content: "";
    background-color: #111111;
    width: 2px;
    position: absolute;
    top: 0.7rem; 
    left: 0.7rem; 
    height: calc(100%); 
    z-index: 0;
}
.steps > h2 {
    counter-increment: step-counter;
    display: flex;
    align-items: center;
}
.steps > h2:before {
    content: counter(step-counter);
    background: #111111;
    color: white;
    font-size: 0.8rem;
    font-weight: normal;
    line-height: 1.5rem;
    text-align: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
    position: absolute;
    left: 0;
    z-index: 1;
}
.steps > h3 {
    counter-reset: step-counter;
    display: flex;
    align-items: center;
}
.steps > h3:before {
    content: "";
    background: #111111;
    color: white;
    font-size: 0.8rem;
    font-weight: normal;
    line-height: 1.5rem;
    text-align: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
    position: absolute;
    left: 0;
    z-index: 1;
}
`

const Tablet = styled.div`
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
    content: "POINT";  
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
    counter-reset: step-counter;
    position: relative;
    padding-left: 2rem; 
}
.steps:before {
    content: "";
    background-color: #111111;
    width: 2px;
    position: absolute;
    top: 0.7rem; 
    left: 0.7rem; 
    height: calc(100%); 
    z-index: 0;
}
.steps > h2 {
    counter-increment: step-counter;
    display: flex;
    align-items: center;
}
.steps > h2:before {
    content: counter(step-counter);
    background: #111111;
    color: white;
    font-size: 0.8rem;
    font-weight: normal;
    line-height: 1.5rem;
    text-align: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
    position: absolute;
    left: 0;
    z-index: 1;
}
.steps > h3 {
    counter-reset: step-counter;
    display: flex;
    align-items: center;
}
.steps > h3:before {
    content: "";
    background: #111111;
    color: white;
    font-size: 0.8rem;
    font-weight: normal;
    line-height: 1.5rem;
    text-align: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
    position: absolute;
    left: 0;
    z-index: 1;
}
`

const Mobile = styled.div`
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
    content: "POINT";  
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
    counter-reset: step-counter;
    position: relative;
    padding-left: 2rem; 
}
.steps:before {
    content: "";
    background-color: #111111;
    width: 2px;
    position: absolute;
    top: 0.7rem; 
    left: 0.7rem; 
    height: calc(100%); 
    z-index: 0;
}
.steps > h2 {
    counter-increment: step-counter;
    display: flex;
    align-items: center;
}
.steps > h2:before {
    content: counter(step-counter);
    background: #111111;
    color: white;
    font-size: 0.8rem;
    font-weight: normal;
    line-height: 1.5rem;
    text-align: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
    position: absolute;
    left: 0;
    z-index: 1;
}
.steps > h3 {
    counter-reset: step-counter;
    display: flex;
    align-items: center;
}
.steps > h3:before {
    content: "";
    background: #111111;
    color: white;
    font-size: 0.8rem;
    font-weight: normal;
    line-height: 1.5rem;
    text-align: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
    position: absolute;
    left: 0;
    z-index: 1;
}
`

export const Bouhan = ()=>{
    const PCsize:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tabletsize:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})
    
    if(PCsize) {
        return (
        <Layout>
            <PC>
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
            </PC>
        </Layout>
        )
    }else if(Tabletsize) {
        return (
        <Layout>
            <Tablet>
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
            </Tablet>
        </Layout>
        )
    }else {
        return (
        <Layout>
            <Mobile>
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
            </Mobile>
        </Layout>
        )
    }
}

export default Bouhan