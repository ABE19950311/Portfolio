import { render,screen,RenderResult } from "@testing-library/react";

describe("toBe試す",()=>{
    test("値比較",()=>{
        expect(1000).toBe(1000)
    })
})

describe("toBenot",()=>{
    test("",()=>{
        expect(1000).not.toBe(1)
    })
})