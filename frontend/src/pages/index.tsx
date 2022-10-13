import {TopPage} from "./components/toppage"
import {TitleHead} from "./components/head"
import styled from "styled-components"

const Test = styled.body`
*{margin:0,padding:0}
`


const Home = () => {
return (
  <Test>
      <TitleHead />
      
      <TopPage />
      </Test>
    
  )
}

export default Home
