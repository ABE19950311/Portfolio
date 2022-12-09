import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event'
import {getPage} from "next-page-tester"
import FetchData from '../src/components/fetchdata';
import axios from "axios"
import {useState as useStateMock} from "react"
import renderer from "react-test-renderer";

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

jest.mock("axios")
const axiosMock = axios as jest.Mocked<typeof axios>

describe("Test FetchDataHook",()=>{

    const setState = jest.fn()

    afterEach(() => {
        jest.restoreAllMocks()
    });

    beforeEach(() => {
        (useStateMock as jest.Mock).mockImplementation(init => [init, setState]);
    });

    it("test useEffect",async()=>{
    //     await act(async()=>{
    //         const {waitForNextUpdate,rerender} = renderHook(()=>FetchData(),{
    //             initialProps: "/api/test"
    //         })
    //         await waitForNextUpdate();
    //   // 新しいオブジェクトを渡した場合をシミュレートします
    //     rerender("test1");
    //     await waitForNextUpdate();
    //     rerender("test2");
    //     await waitForNextUpdate();
    //     })
    //     expect

        // await act(async()=>{
        //     const {result,waitFor,unmount,waitForNextUpdate} = renderHook(()=>FetchData())
        //     const [env,setEnv] = useStateMock("/api/test")

        //     await waitForNextUpdate();

        //     axiosMock.get.mockImplementation(()=>{
        //         const [userid,setUserid] = useStateMock("testid")
        //         return Promise.resolve(userid)
        //     })

        //     const res = await FetchData()
            

        //     //const [userid,setUserid] = useStateMock(data.userid)
            

        //     unmount()
        //     //expect(result.current.env===env)
        //     expect("test").toStrictEqual(result.current.env)
        // })


        // expect(result.current.env).toStrictEqual(env)


    })

})