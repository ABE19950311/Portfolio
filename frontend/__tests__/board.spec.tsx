import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event'
import {getPage} from "next-page-tester"
import Board from "../src/pages/components/board"
import renderer from "react-test-renderer";


describe("Test Board Component",()=>{

    it("スナップショット",async()=>{
        render(<Board />)
        // const name = await screen.findByTestId("nametest")
        // const title = await screen.findByTestId("titletest")
        // const content = await screen.findByTestId("contenttest")
        // const submitbutton = await screen.findByTestId("submit")
        // userEvent.type(name,"name")
        // userEvent.type(title,"title")
        // userEvent.type(content,"content")
        // userEvent.click(submitbutton)
    })

})

