import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event'
import {getPage} from "next-page-tester"
import Board from "../src/pages/components/board"


describe("test",()=>{
    it("render",()=>{
        render(<Board />)
    })
})

// describe("useeffect",()=>{
//     it("hook",()=>{
//         //const {result} = renderHook(()=>Board())//カスタムフックテストの場合renderHook使用？

//     })
// })