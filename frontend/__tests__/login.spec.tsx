import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event'
import {getPage} from "next-page-tester"
import Login from "../src/pages/components/login"

describe("Test Login Component",()=>{
    it("render button",async()=>{
        render(<Login />)
        const button = await screen.findAllByRole("button")
        expect(button).toHaveLength(1)
    })

    it("should be failed to submit",async()=>{
        render(<Login />)
        const submitbutton = screen.getByTestId("submit")
        // const username = screen.getByPlaceholderText("ユーザ名")
        // const password = screen.getByPlaceholderText("パスワード")
        // userEvent.type(username,"") //から文字はtypeする必要ないとのこと
        // userEvent.type(password,"")
        userEvent.click(submitbutton)
        expect(await screen.findByText("ユーザ名が空欄です")).toBeInTheDocument()
        expect(await screen.findByText("パスワードが空欄です")).toBeInTheDocument()
    })

})

