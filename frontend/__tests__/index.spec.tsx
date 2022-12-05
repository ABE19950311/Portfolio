import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {getPage} from "next-page-tester"
import Dailylifey from "../src/pages/index"


jest.mock('next/navigation', () => ({
    useRouter() {
        return {
        route: '/',
        pathname: '/',
        query: {},
        push: jest.fn(),
    }
    },
    useSearchParams() {
        return {
            route: '/',
            get: jest.fn(),
        }
    }
}));

describe('たし算', () => {
  it('1+3', () => {
    const result = 1 + 3;
    expect(result).toBe(4);
  });
});

// describe("Dailylifey",()=>{
//     it("index.tsxレンダリングテスト",()=>{
//         render(<Dailylifey />)
//     })
// })

// describe("ページ遷移",()=>{
//     it("ページ遷移のテスト",async()=>{
//         const {page} = await getPage({
//             route: "/",
//         })
//         render(page)

//         userEvent.click(screen.getByTestId("heya"))
//         expect(await screen.findByText("部屋選びから入居までの流れ")).toBeInTheDocument()
//     })
// })

// describe("ページ遷移",()=>{
//     it("ページ遷移のテスト",async()=>{
//         const {page} = await getPage({
//             route: "/",
//         })
//         render(page)

//         userEvent.click(screen.getByTestId("hikkoshi")) 
//         expect(await screen.findByText("入居前後の手続き内容")).toBeInTheDocument()
//     })
// })

// describe("ページ遷移",()=>{
//     it("ページ遷移のテスト",async()=>{
//         const {page} = await getPage({
//             route: "/",
//         })
//         render(page)

//         userEvent.click(screen.getByTestId("bouhan"))
//         expect(await screen.findByText("防犯・防災のための心がけ")).toBeInTheDocument()
//     })
// })

// describe("ページ遷移",()=>{
//     it("ページ遷移のテスト",async()=>{
//         const {page} = await getPage({
//             route: "/",
//         })
//         render(page)

//         userEvent.click(screen.getByTestId("souzi"))
//         expect(await screen.findByText("掃除・片付け概要")).toBeInTheDocument()
    
//     })
// })

// describe("ページ遷移",()=>{
//     it("ページ遷移のテスト",async()=>{
//         const {page} = await getPage({
//             route: "/",
//         })
//         render(page)

//         userEvent.click(screen.getByTestId("ryouri"))
//         expect(await screen.findByText("料理概要")).toBeInTheDocument()
//     })
// })

// describe("ページ遷移",()=>{
//     it("ページ遷移のテスト",async()=>{
//         const {page} = await getPage({
//             route: "/",
//         })
//         render(page)

//         userEvent.click(screen.getByTestId("sentaku"))
//         expect(await screen.findByText("洗濯概要")).toBeInTheDocument()
//     })
// })

