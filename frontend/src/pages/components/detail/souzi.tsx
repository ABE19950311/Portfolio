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
width:340px;
overflow-wrap:  break-word;

.headline {
    padding: 1rem 0.2rem;
    border-left: 5px solid #ff9800;
    background: #ffe0b2;
    color: #f57c00;
}
p {
    font-size:15px;
}
ul {
    position: relative;
    padding: 15px 40px 15px 30px;
    font: 14px/1.6 'arial narrow', sans-serif;
    border: solid 2px #adcce8;
    border-radius:8px;
    color: #448ccb;
    width:305px;
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
.steps > h3 {
    counter-increment: step-counter;
    display: flex;
    align-items: center;
}
.steps > h3:before {
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
.steps > h4 {
    counter-reset: step-counter;
    display: flex;
    align-items: center;
}
.steps > h4:before {
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

export const Souzi = ()=>{
    const PCsize:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tabletsize:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})

    if(PCsize) {
        return (
        <Layout>
            <PC>
            <h1>掃除・片付け概要</h1>
            <div className="steps">
                <h2>掃除道具の用意</h2>
                    <p>一人暮らしであれば、コスト・置き場所等の観点から最低限用意</p>
                    <ul>
                        <li>スポンジ</li>
                        <li>掃除機</li>
                        <li>アルコール除菌スプレー</li>
                        <li>フローリングワイパー</li>
                        <li>中性洗剤</li>
                        <li>使い捨てシート</li>
                        <li>粘着クリーナー</li>
                        <li>etc</li>
                    </ul>
                <h2>汚れ・カビ対策</h2>
                    <p>汚れが定着してしまう前に日頃から予防掃除が大切</p>
                    <p>クローゼット・押入れ</p>
                    <p>→湿気がたまりやすく、カビが生えやすい。定期的な換気と除湿剤を入れておく</p>
                    <p>風呂・水回り</p>
                    <p>→防カビ剤を定期的にたいて防止する。洗面台や浴室ドアは汚れがたまりやすいため</p>
                    <p> マスキングテープを貼って保護。</p>
                <h3></h3>

            </div>
            </PC>
        </Layout>
        )
    }else if(Tabletsize) {
        return (
        <Layout>
            <Tablet>
            <h1>掃除・片付け概要</h1>
            <div className="steps">
                <h2>掃除道具の用意</h2>
                    <p>一人暮らしであれば、コスト・置き場所等の観点から最低限用意</p>
                    <ul>
                        <li>スポンジ</li>
                        <li>掃除機</li>
                        <li>アルコール除菌スプレー</li>
                        <li>フローリングワイパー</li>
                        <li>中性洗剤</li>
                        <li>使い捨てシート</li>
                        <li>粘着クリーナー</li>
                        <li>etc</li>
                    </ul>
                <h2>汚れ・カビ対策</h2>
                    <p>汚れが定着してしまう前に日頃から予防掃除が大切</p>
                    <p>クローゼット・押入れ</p>
                    <p>→湿気がたまりやすく、カビが生えやすい。定期的な換気と除湿剤を入れておく</p>
                    <p>風呂・水回り</p>
                    <p>→防カビ剤を定期的にたいて防止する。洗面台や浴室ドアは汚れがたまりやすいため</p>
                    <p> マスキングテープを貼って保護。</p>
                <h3></h3>

            </div>
            </Tablet>
        </Layout>
        )
    }else {
        return (
        <Layout>
            <Mobile>
            <h2 className="headline">掃除・片付け概要</h2>
            <div className="steps">
                <h3>掃除道具の用意</h3>
                    <p>一人暮らしであれば、コスト・置き場所等の観点から最低限用意</p>
                    <ul>
                        <li>スポンジ</li>
                        <li>掃除機</li>
                        <li>アルコール除菌スプレー</li>
                        <li>フローリングワイパー</li>
                        <li>中性洗剤</li>
                        <li>使い捨てシート</li>
                        <li>粘着クリーナー</li>
                        <li>etc</li>
                    </ul>
                <h3>汚れ・カビ対策</h3>
                    <p>汚れが定着してしまう前に日頃から予防掃除が大切</p>
                    <p>クローゼット・押入れ</p>
                    <p>→湿気がたまりやすく、カビが生えやすい。定期的な換気と除湿剤を入れておく</p>
                    <p>風呂・水回り</p>
                    <p>→防カビ剤を定期的にたいて防止する。洗面台や浴室ドアは汚れがたまりやすいため</p>
                    <p> マスキングテープを貼って保護。</p>
                <h4></h4>

            </div>
            </Mobile>
        </Layout>
        )
    }
}

export default Souzi