import { TopPage } from "../src/pages/components/toppage"
import { render,screen,RenderResult } from "@testing-library/react";

describe("Sampleコンポーネント", () => {
    test("should first", () => {
        const { getByText } = render(<TopPage />);
        expect(getByText("Procedurey")).toBeTruthy();
        expect(getByText("様々な手続きが、一目で分かる")).toBeTruthy();
        expect(getByText("利用する")).toBeTruthy();
    });
});