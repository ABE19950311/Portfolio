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

export const Ryouri = ()=>{
    const PCsize:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tabletsize:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})

    if(PCsize) {
        return (
        <Layout>
            <PC>
            <h1>揃えたいキッチングッズ</h1>
            <div className="steps">
                <h2>調理道具</h2>
                    <ul>
                        <li>包丁、まないた</li>
                        <li>菜箸</li>
                        <li>鍋</li>
                        <li>フライ返し、お玉</li>
                    </ul>
                <h2>調理家電</h2>
                    <ul>
                        <li>電子レンジ</li>
                        <li>炊飯器</li>
                    </ul>
                <h2>食器</h2>
                    <ul>
                        <li>茶碗</li>
                        <li>グラス、マグカップ</li>
                        <li>どんぶり</li>
                        <li>箸、スプーン、フォーク、ナイフ</li>
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
            <h1>揃えたいキッチングッズ</h1>
            <div className="steps">
                <h2>調理道具</h2>
                    <ul>
                        <li>包丁、まないた</li>
                        <li>菜箸</li>
                        <li>鍋</li>
                        <li>フライ返し、お玉</li>
                    </ul>
                <h2>調理家電</h2>
                    <ul>
                        <li>電子レンジ</li>
                        <li>炊飯器</li>
                    </ul>
                <h2>食器</h2>
                    <ul>
                        <li>茶碗</li>
                        <li>グラス、マグカップ</li>
                        <li>どんぶり</li>
                        <li>箸、スプーン、フォーク、ナイフ</li>
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
            <h2 className="headline">揃えたいキッチングッズ</h2>
            <div className="steps">
                <h3>調理道具</h3>
                    <ul>
                        <li>包丁、まないた</li>
                        <li>菜箸</li>
                        <li>鍋</li>
                        <li>フライ返し、お玉</li>
                    </ul>
                <h3>調理家電</h3>
                    <ul>
                        <li>電子レンジ</li>
                        <li>炊飯器</li>
                    </ul>
                <h3>食器</h3>
                    <ul>
                        <li>茶碗</li>
                        <li>グラス、マグカップ</li>
                        <li>どんぶり</li>
                        <li>箸、スプーン、フォーク、ナイフ</li>
                    </ul>
                <h4></h4>
            </div>
            </Mobile>
        </Layout>
        )
    }
}


export default Ryouri