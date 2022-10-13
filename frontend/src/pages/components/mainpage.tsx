import styled from "styled-components"
import {Layout} from "./layout"
import {Procedure} from "./procedure"

const Container = styled.div`
min-height: 100vh;
position: relative;/*←相対位置*/
padding-bottom: 120px;/*←footerの高さ*/
box-sizing: border-box;/*←全て含めてmin-height:100vhに*/
`




export const MainPage = ()=>{
    
    return (
        <>
        <Layout>
        <Procedure />
        </Layout>
        </>
    )
}

export default MainPage;
