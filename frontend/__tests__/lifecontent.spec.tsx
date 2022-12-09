import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event'
import {getPage} from "next-page-tester"
import Board from "../src/pages/components/board"
import renderer from "react-test-renderer";

describe("Test Lifecontent Component",()=>{

    it("スナップショット",async()=>{
        const {page} = await getPage({
                        route: "/components/lifecontent",
                    })
        const snap = renderer.create(page).toJSON()
        expect(snap).toMatchSnapshot()
    })
})