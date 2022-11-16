import styled from "styled-components"

const SFooter = styled.div`
width: 100%;
background-color: white;
color: #fff;
text-align: center;
padding: 30px 0;
bottom: 0; /*下に固定*/
`

export const Footer = ()=>{
    return (
        <SFooter>
        <p>test</p>
        </SFooter>
    )
}

export default Footer