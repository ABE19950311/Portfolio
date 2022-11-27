import styled from "styled-components"
import {useRouter} from "next/router"
import {Layout} from "./layout"
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

export const Detail = ()=>{
    const PC:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tablet:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})
    const Mobile:boolean = useMediaQuery({query: '(max-width: 519px)'})
    const router=useRouter();
    const query = router.query.state as unknown as string;

    const PCHeya = ()=>{
        return (
            <PCSteps>
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
            </PCSteps>
        )
    }

    const PCHikkoshi = ()=>{
        return (
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
        )
    }

    const PCBouhan = ()=>{
        return (
            <>
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
            </>
        )
    }

    const PCSouzi = ()=>{
        return (
            <PCSteps>
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
            </PCSteps>
        )
    }

    const PCRyouri = ()=>{
        return(
            <></>
        )
    }

    const PCSentaku =()=>{
        return(
            <></>
        )
    }

    const TabHeya = ()=>{
        return (
            <TabSteps>
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
            </TabSteps>
        )
    }

    const TabHikkoshi = ()=>{
        return (
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
        )
    }

    const TabBouhan = ()=>{
        return (
            <>
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
            </>
        )
    }

    const TabSouzi = ()=>{
        return (
            <TabSteps>
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
            </TabSteps>
        )
    }

    const TabRyouri = ()=>{
        return(
            <></>
        )
    }

    const TabSentaku =()=>{
        return(
            <></>
        )
    }

    const MobHeya = ()=>{
        return (
            <MobSteps>
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
            </MobSteps>
        )
    }

    const MobHikkoshi = ()=>{
        return (
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
        )
    }

    const MobBouhan = ()=>{
        return (
            <>
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
            </>
        )
    }

    const MobSouzi = ()=>{
        return (
            <MobSteps>
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
            </MobSteps>
        )
    }

    const MobRyouri = ()=>{
        return(
            <></>
        )
    }

    const MobSentaku =()=>{
        return(
            <></>
        )
    }

    if(PC) {
    return (
            <>
            <Layout>
            {(()=>{
                if(query==="heya") {
                    return <PCHeya />
                }else if(query==="hikkoshi") {
                    return <PCHikkoshi />
                }else if(query==="bouhan") {
                    return <PCBouhan />
                }else if(query==="souzi") {
                    return <PCSouzi />
                }else if(query==="ryouri") {
                    return <PCRyouri />
                }else if(query==="sentaku") {
                    return <PCSentaku />
                }else {
                    console.log("error")
                }
            })()}
            </Layout>
            </>
    )
    }else if(Tablet) {
        return (
            <>
            <Layout>
            {(()=>{
                if(query==="heya") {
                    return <TabHeya />
                }else if(query==="hikkoshi") {
                    return <TabHikkoshi />
                }else if(query==="bouhan") {
                    return <TabBouhan />
                }else if(query==="souzi") {
                    return <TabSouzi />
                }else if(query==="ryouri") {
                    return <TabRyouri />
                }else if(query==="sentaku") {
                    return <TabSentaku />
                }else {
                    console.log("error")
                }
            })()}
            </Layout>
            </>
    )
    }else {
        return (
            <>
            <Layout>
            {(()=>{
                if(query==="heya") {
                    return <MobHeya />
                }else if(query==="hikkoshi") {
                    return <MobHikkoshi />
                }else if(query==="bouhan") {
                    return <MobBouhan />
                }else if(query==="souzi") {
                    return <MobSouzi />
                }else if(query==="ryouri") {
                    return <MobRyouri />
                }else if(query==="sentaku") {
                    return <MobSentaku />
                }else {
                    console.log("error")
                }
            })()}
            </Layout>
            </>
    )
    }
}

export default Detail;