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

export const Sentaku = ()=>{
    const PCsize:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tabletsize:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})

    if(PCsize) {
        return (
        <Layout>
            <PC>
            <h1>汚れや菌をためこまない方法</h1>
            <div className="steps">
                <h2>洗濯槽の中にためこまない</h2>
                    <p>湿気がこもって雑菌の繁殖が進んでしまい、臭くなる</p>
                <h2>脱水をしたらすぐに干す</h2>
                    <p>放置すればするほど菌が繁殖する</p>
                    <p>シワの原因にもなる</p>
                <h2>食べこぼし等のシミを放置しない</h2>
                    <p>時間が経つと落ちにくくなるため、気づいた時点で対応を</p>
                <h3></h3>
            </div>
            </PC>
        </Layout>
        )
    }else if(Tabletsize) {
        return (
        <Layout>
            <Tablet>
            <h1>汚れや菌をためこまない方法</h1>
            <div className="steps">
                <h2>洗濯槽の中にためこまない</h2>
                    <p>湿気がこもって雑菌の繁殖が進んでしまい、臭くなる</p>
                <h2>脱水をしたらすぐに干す</h2>
                    <p>放置すればするほど菌が繁殖する</p>
                    <p>シワの原因にもなる</p>
                <h2>食べこぼし等のシミを放置しない</h2>
                    <p>時間が経つと落ちにくくなるため、気づいた時点で対応を</p>
                <h3></h3>
            </div>
            </Tablet>
        </Layout>
        )
    }else {
        return (
        <Layout>
            <Mobile>
            <h2 className="headline">汚れや菌をためこまない方法</h2>
            <div className="steps">
                <h3>洗濯槽の中にためこまない</h3>
                    <p>湿気がこもって雑菌の繁殖が進んでしまい、臭くなる</p>
                <h3>脱水をしたらすぐに干す</h3>
                    <p>放置すればするほど菌が繁殖する</p>
                    <p>シワの原因にもなる</p>
                <h3>食べこぼし等のシミを放置しない</h3>
                    <p>時間が経つと落ちにくくなるため、気づいた時点で対応を</p>
                <h4></h4>
            </div>
            </Mobile>
        </Layout>
        )
    }
}

export default Sentaku