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

export const Heya = ()=>{
    const PCsize:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tabletsize:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})

    if(PCsize) {
    return (
        <Layout>
        <PC>
        <h1>部屋選びから入居までの流れ</h1>
        <div className="steps">
            <h2>情報収集</h2>
                <p>&emsp;街の雰囲気/通勤・通学時間等を基に住むエリアを絞り、不動産情報サイトで相場を確認する。
                住む上で譲れないポイントを割り出す。数が多い場合は優先順位を付けた方が良い。</p>
                <ul>
                    <li>住みたい街の目星をつける</li>
                    <li>家賃相場を確認する</li>
                    <li>居住ポイントを割り出す</li>
                </ul>
            <h2>不動産会社へ</h2>
                <p>&emsp;ネット未掲載の物件も存在するため、実際に不動産会社に足を運んで相談をした方が良い。
                物件数を求めるなら大手不動産会社、掘り出し物件を期待する場合地域密着型不動産会社へ。</p>
            <h2>内見</h2>
                <p>&emsp;水回りの状態、日当たり、ポスト/ゴミ捨て場の状態等を入念にチェック
                見るだけでなく、実際に水が流れるかも重要</p>
            <h2>申し込み・入居審査</h2>
                <p>&emsp;物件に問題がなければ申し込み。審査を受け、通過すれば契約へ</p>
            <h2>引っ越しに向けて各種手続き</h2>
                <p>&emsp;トラブル発生の基になるため、必ず賃貸借契約書をよく読んでから契約へ。</p>
                <ul>
                    <li>契約に必要な物の用意(印鑑、本人確認書類等)</li>
                </ul>
            <h2>入居手配/荷造り</h2>
                <p>&emsp;引越し業者を利用する場合、数社から見積もりを取り比較検討すること。
                見積もりサイトの利用を行えば楽
                電気/ガス/水道/インターネット/郵便局の移行手続きを忘れずに</p>
                <ul>
                    <li>引越し業者手配</li>
                    <li>各種移行手続き(電気/ガス/水道/インターネット/郵便局等)</li>
                </ul>
            <h2>入居</h2>
                <p>&emsp;荷物を運び入れる前に壁/床の状況を写真に撮っておくと良い。(退去時のトラブル回避)</p>
                <ul>
                    <li>荷ほどき</li>
                    <li>電気/ガス等が問題なく使用できるか確認</li>
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
            </Tablet>
            </Layout>
        )
    }else {
        return (
            <Layout>
            <Mobile>
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
            </Mobile>
            </Layout>
        )
    }
}

export default Heya