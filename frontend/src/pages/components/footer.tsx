import styled from "styled-components"
import {FetchData} from "../../components/fetchdata"
import { useMediaQuery } from "react-responsive"

const SFooter = styled.div`
width: 100%;
background-color: white;
color: #fff;
text-align: center;
padding: 30px 0;
bottom: 0; /*下に固定*/
`

export const Footer = ()=>{
    const PC:boolean = useMediaQuery({query:'(min-width: 960px)'})
    const Tablet:boolean = useMediaQuery({query:'(min-width: 520px) and (max-width: 959px)'})
    const Mobile:boolean = useMediaQuery({query: '(max-width: 519px)'})

    return (
        <SFooter>
        <p>test</p>
        </SFooter>
    )
}

export default Footer