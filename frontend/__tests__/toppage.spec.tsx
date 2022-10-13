import  Home  from "../src/pages/index"
import { render,screen,RenderResult } from "@testing-library/react";

describe("Sampleコンポーネント", () => {
    test("should first", () => {
        const { getByText } = render(<Home />);
        expect(getByText("Procedurey")).toBeTruthy();
        expect(getByText("様々な手続きが、一目で分かる")).toBeTruthy();
        expect(getByText("利用する")).toBeTruthy();
    });
});