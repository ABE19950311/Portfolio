import  Dailylifey  from "../src/pages/index"
import { render,screen,RenderResult } from "@testing-library/react";

describe("Sampleコンポーネント", () => {
    test("should first", () => {
        const { getByText } = render(<Dailylifey />);
        expect(getByText("部屋探し・入居")).toBeTruthy();
    });
});