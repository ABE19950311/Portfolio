process.env.TEST_ENV = "jest"

import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {getPage} from "next-page-tester"
import Board from "../src/pages/components/board"
import { act, renderHook, RenderResult } from '@testing-library/react-hooks'
import FetchData from "../src/components/fetchdata"
import React, { useState as useStateMock } from 'react'

const envcheck = process.env.TEST_ENV ? process.env.TEST_ENV:undefined

jest.mock("react",()=>({
    ...jest.requireActual("react"),
    useState: jest.fn()
}))


describe("board",()=>{
    it("表示テスト",()=>{
        render(<Board />)
    })
})

// describe("test",()=>{
//     const setState = jest.fn()

//     it("test",()=>{
//         const {result} = renderHook(()=>FetchData())
//         expect(result.current.userid).toBe()
//     })
// })

// describe("board",()=>{
//     it("useEffecttest",()=>{
//         const {result} = renderHook(()=>Board())
//         expect(result.current)
//     })
// })