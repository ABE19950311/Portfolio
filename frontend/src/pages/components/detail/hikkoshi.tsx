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


export const Hikkoshi = ()=>{
    const PCsize:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tabletsize:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})
    
    if(PCsize) {
        return (
        <Layout>
            <PC>
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
            </PC>
        </Layout>
        )
    }else if(Tabletsize) {
        return (
        <Layout>
            <Tablet>
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
            </Tablet>
        </Layout>
        )
    }else {
        return (
        <Layout>
            <Mobile>
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
            </Mobile>
        </Layout>
        )
    }
}

export default Hikkoshi